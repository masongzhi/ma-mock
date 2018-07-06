<template>
  <div>
    <el-row class="mb10" type="flex" justify="end">
      <el-button size="mini" @click="createProxyItem">增加proxy</el-button>
    </el-row>
    <el-table
        :data="proxyConfig"
        style="width: 100%">

      <el-table-column
          prop="url"
          label="proxy地址"
      >
      </el-table-column>
      <el-table-column
          prop="name"
          label="备注"
      >
      </el-table-column>
      <el-table-column
          label="状态"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.url === currentProxyUrl ? 'success' : 'info'">{{scope.row.url === currentProxyUrl ? '已启用' : '未启用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ProxyDialog
        :visible.sync="dialogVisible"
        :type="dialogType"
        @refresh="refresh"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import ProxyDialog from './proxyDialog';
import cloneDeep from 'lodash/cloneDeep';
import without from 'lodash/without';
import { setProxyConfig } from '@/api';

export default {
  name: 'proxy',
  components: { ProxyDialog },
  data() {
    return {
      dialogVisible: false,
      dialogType: '',
      currentRow: {},
    };
  },
  computed: {
    ...mapState({
      proxyConfig: state => state.proxyConfig,
      currentProxyUrl: state => state.currentProxyUrl,
    }),
    ...mapState('Proxy', {
      dialogForm: state => state.dialogForm,
    }),
  },
  methods: {
    ...mapActions(['getProxyConfig']),
    ...mapMutations('Proxy', ['SET_DIALOG_FORM']),
    handleEdit(index, row) {
      this.currentRow = row;
      this.SET_DIALOG_FORM(cloneDeep(row));
      this.dialogType = 'edit';
      this.dialogVisible = true;
    },
    async handleDelete(index, row) {
      this.$confirm('此操作将删除该proxy数据, 是否继续?', {
        type: 'warning',
      })
        .then(async () => {
          this.dialogType = 'delete';
          this.currentRow = row;
          await setProxyConfig({
            body: {
              data: this.getRequestData(),
            },
          });
          this.$message.success(`${this.dialogType} proxy条例成功`);
          await this.refresh();
        })
        .catch(() => {});
    },
    async refresh() {
      await this.getProxyConfig();
    },
    createProxyItem() {
      this.dialogType = 'create';
      this.dialogVisible = true;
    },
    getRequestData() {
      let data = [];
      switch (this.dialogType) {
        case 'create':
          data = [...this.proxyConfig, this.dialogForm];
          break;
        case 'edit':
          data = without([...this.proxyConfig, this.dialogForm], this.currentRow);
          break;
        case 'delete':
          data = without(this.proxyConfig, this.currentRow);
      }
      return data;
    },
  },
};
</script>

<style scoped>
</style>
