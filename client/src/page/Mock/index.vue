<template>
  <div>
    <el-table
        :data="data"
        style="width: 100%">
      <el-table-column
          prop="url"
          label="mock地址"
      >
      </el-table-column>
      <el-table-column
          prop="url"
          label="proxy地址"
      >
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
import { getAllMockData } from '@/api';
export default {
  name: 'index',
  data() {
    return {
      data: []
    }
  },
  methods: {
    handleEdit() {},
    handleDelete() {},
  },
  async created() {
    const data = await getAllMockData();
    this.data = data;
  },
};
</script>

<style scoped>
</style>
