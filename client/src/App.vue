<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <el-menu
            :router="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="$route.path"
            style="min-height: 100vh;">
          <div class="menu-title">Mock Proxy</div>
          <el-menu-item v-for="item in menuItems" :key="item.route" :index="item.route">
            {{item.label}}
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header">
          <div>
            proxy地址：
            <el-select v-model="proxyUrl" clearable placeholder="proxy地址" @change="changeCurrentProxy">
              <el-option
                  v-for="item in proxyConfig"
                  :key="item.url"
                  :label="item.name"
                  :value="item.url">
              </el-option>
            </el-select>
          </div>
          <div class="ml10">
            启用mock：
            <el-switch v-model="enableMock" @change="changeEnableMock"></el-switch>
          </div>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { changeProxy, getEnableMock, changeEnableMock } from '@/api';

export default {
  name: 'App',
  data() {
    return {
      menuItems: [
        { route: '/readme', label: '使用说明' },
        { route: '/proxy', label: 'PROXY 配置' },
        { route: '/mock', label: '自定义 MOCK 数据' },
      ],
    };
  },
  computed: {
    ...mapState({
      proxyConfig: state => state.proxyConfig,
      currentProxyUrl: state => state.currentProxyUrl,
      s_enableMock: state => state.enableMock,
    }),
    proxyUrl: {
      get() {
        return this.currentProxyUrl;
      },
      set(val) {
        this.SET_CURRENT_PROXY_URL(val);
      },
    },
    enableMock: {
      get() {
        return this.s_enableMock;
      },
      set(val) {
        this.SET_ENABLE_MOCK(val);
      },
    },
  },
  methods: {
    ...mapActions(['getProxyConfig']),
    ...mapMutations(['SET_CURRENT_PROXY_URL', 'SET_ENABLE_MOCK']),
    async changeCurrentProxy(url) {
      await changeProxy({
        body: { url },
      });
      this.$notify({
        title: 'proxy地址',
        message: '修改成功',
        type: 'success',
      });
    },
    async getEnableMock() {
      const data = await getEnableMock();
      this.SET_ENABLE_MOCK(data.data.enableMock);
    },
    async changeEnableMock(val) {
      await changeEnableMock({
        body: {
          enable: val,
        },
      });
      this.$notify({
        title: '启用mock',
        message: '修改成功',
        type: 'success',
      });
    },
  },
  created() {
    this.getEnableMock();
    this.getProxyConfig();
  },
};
</script>
<style lang="scss" scoped>
.menu-title {
  font-size: 18px;
  text-align: center;
  font-weight: bolder;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #fff;
}

.header {
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
}

.main {
  background: #f8f8fb;
}
</style>
