<template>
  <div>
    <el-row class="mb10" type="flex" justify="end">
      <el-button size="mini" @click="mockItemVisible = true">增加mock数据</el-button>
    </el-row>
    <el-table
        :data="data"
        style="width: 100%"
    >
      <el-table-column
          label="启用"
          width="55">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="勾选后启用这条规则" placement="left">
            <el-checkbox @change="(val) => handleSelectionChange(val, scope.row)"
                         v-model="scope.row.enable"></el-checkbox>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
          prop="data.mark"
          label="备注"
      >
      </el-table-column>
      <el-table-column
          prop="url"
          label="mock地址"
      >
      </el-table-column>
      <el-table-column
          label="mock数据"
      >
        <template slot-scope="{row}">
          <el-button size="mini" @click="() => handleShowDialog(row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="修改mock数据"
        :visible.sync="mockDataVisible"
        width="30%"
    >
      <el-input
          type="textarea"
          :autosize="{minRows: 4}"
          placeholder="请输入内容"
          v-model="mockData">
      </el-input>
      <div slot="footer">
        <el-button @click="mockDataVisible = false">返 回</el-button>
        <el-button @click="mockData = formatJSON(mockData)">格式化</el-button>
        <el-button type="primary" @click="setMockData">修 改</el-button>
      </div>
    </el-dialog>

    <CreateMockItem
        :visible.sync="mockItemVisible"
        @refresh="search"
    />
  </div>
</template>

<script>
import { getAllMockData, enableMockUrl, setMockData, delMockData } from '@/api';
import CreateMockItem from './createMockItem';
import { mapMutations } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'mock',
  components: { CreateMockItem },
  data() {
    return {
      data: [],
      mockDataVisible: false,
      mockData: '',
      dialogRow: null,
      mockItemVisible: false,
    };
  },

  methods: {
    ...mapMutations('Mock', ['SET_MOCK_ITEM', 'SET_OLD_URL']),
    handleEdit(index, row) {
      const nRow = cloneDeep({ ...row, mark: row.data.mark });
      nRow.data = this.formatJSON(nRow.data);
      this.SET_MOCK_ITEM(nRow);
      // 使用原url
      this.SET_OLD_URL(row.url);
      this.mockItemVisible = true;
    },
    async handleDelete(index, row) {
      this.$confirm('此操作将永久删除该mock文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await delMockData({
            body: {
              url: row.url,
            },
          });
          this.$message.success('删除成功');
          this.search();
        })
        .catch(() => {});
    },
    async handleSelectionChange(val, row) {
      await enableMockUrl(
        {
          body: {
            enable: val,
          },
        },
        encodeURIComponent(row.url)
      );
      this.$message.success('修改成功');
      await this.search();
    },
    handleShowDialog(row) {
      this.mockData = this.formatJSON(row.data);
      this.dialogRow = row;
      this.mockDataVisible = true;
    },
    formatJSON(val) {
      try {
        val = typeof val === 'string' ? val : JSON.stringify(val);
        return JSON.stringify(JSON.parse(val), null, 4);
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    async setMockData() {
      const row = this.dialogRow;
      await setMockData({
        body: {
          url: row.url,
          data: JSON.parse(this.mockData),
        },
      });
      this.mockDataVisible = false;
      this.$message.success('修改mock数据成功');
      await this.search();
    },
    async search() {
      const data = await getAllMockData();
      this.data = data.data;
    },
  },
  created() {
    this.search();
  },
};
</script>

<style scoped>
</style>
