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
      <el-button type="primary" @click="setDialogForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { setProxyConfig } from '@/api';

export default {
  name: 'proxyDialog',
  props: {
    visible: Boolean,
    type: String,
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
      dialogForm: state => state.dialogForm,
    }),
    form: {
      get() {
        return this.dialogForm;
      },
      set(n) {
        this.SET_DIALOG_FORM(n);
      },
    },
  },
  methods: {
    ...mapMutations('Proxy', ['SET_DIALOG_FORM', 'INIT_DIALOG']),
    async setDialogForm() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          await setProxyConfig({
            body: {
              data: this.$parent.getRequestData(),
            },
          });
          this.$message.success(`${this.type} proxy条例成功`);

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
      this.INIT_DIALOG();
    },
  },
};
</script>

<style scoped>
</style>
