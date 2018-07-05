<template>
  <div>
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
  </div>
</template>

<script>
// import { getAllMockData } from '@/api';
import { mapState } from 'vuex';

export default {
  name: 'proxy',
  computed: {
    ...mapState({
      proxyConfig: state => state.proxyConfig,
      currentProxyUrl: state => state.currentProxyUrl,
    }),
  },
  methods: {
    handleEdit() {},
    handleDelete() {},
  },
};
</script>

<style scoped>
</style>
