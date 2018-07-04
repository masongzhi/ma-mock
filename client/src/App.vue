<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <el-menu
            :router="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="min-height: 100vh;">
          <div class="menu-title">Mock Proxy</div>
          <el-menu-item v-for="item in menuItems" :key="item.route" :index="item.route">
            {{item.label}}
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header">
          proxy地址：
          <el-select v-model="proxyUrl" clearable placeholder="proxy地址" @change="changeCurrentProxy">
            <el-option
                v-for="item in proxyConfig"
                :key="item.url"
                :label="item.name"
                :value="item.url">
            </el-option>
          </el-select>
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
import { changeProxy } from '@/api';

export default {
  name: 'App',
  data() {
    return {
      menuItems: [
        { route: '/users', label: '使用说明' },
        { route: '/proxy', label: 'PROXY 配置' },
        { route: '/mock', label: '自定义 MOCK 数据' },
      ],
    };
  },
  computed: {
    ...mapState({
      proxyConfig: state => state.proxyConfig,
      currentProxyUrl: state => state.currentProxyUrl,
    }),
    proxyUrl: {
      get() {
        return this.currentProxyUrl;
      },
      set(val) {
        this.SET_CURRENT_PROXY_URL(val);
      },
    },
  },
  methods: {
    ...mapActions(['getProxyConfig']),
    ...mapMutations(['SET_CURRENT_PROXY_URL']),
    async changeCurrentProxy(url) {
      await changeProxy({
        body: { url },
      });
    },
  },
  created() {
    this.getProxyConfig();
  },
};
</script>
<style scoped>
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
