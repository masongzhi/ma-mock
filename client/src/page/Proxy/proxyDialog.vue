<template>
  <el-dialog
      title="增加proxy条例"
      :visible.sync="visible"
      width="50%"
      :before-close="handleClose"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="proxy地址" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="handleClose">返 回</el-button>
      <el-button type="primary" @click="setMockItem">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'proxyDialog',
  props: {
    visible: Boolean,
  },
  data() {
    return {
      rules: {
        name: [{ type: 'string', required: true, message: '请输入备注', trigger: 'blur' }],
        url: [{ type: 'string', required: true, message: '请输入proxy地址', trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapState('Proxy', {
      mockItem: state => state.mockItem,
      oldURL: state => state.oldURL,
    }),
    form: {
      get() {
        return this.mockItem;
      },
      set(n) {
        this.SET_MOCK_ITEM(n);
      },
    },
  },
  methods: {
    ...mapMutations('Mock', ['SET_MOCK_ITEM', 'INIT_MOCK_DIALOG']),
    async setMockItem() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          // const row = this.form;
          // await setMockData({
          //   body: {
          //     ...row,
          //     data: JSON.parse(row.data),
          //     oldURL: this.oldURL,
          //   },
          // });
          this.$message.success('增加mock条例成功');

          this.handleClose();
          this.$emit('refresh');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose() {
      this.$emit('update:visible', false);
      this.INIT_MOCK_DIALOG();
    },
  },
};
</script>

<style scoped>
</style>
