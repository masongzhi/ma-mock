import Vue from 'vue';
import Router from 'vue-router';

const Mock = () => import(/* webpackChunkName: "Mock" */ '@/page/Mock');
const Proxy = () => import(/* webpackChunkName: "Proxy" */ '@/page/Proxy');

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/readme',
    },
    {
      path: '/mock',
      component: Mock,
    },
    {
      path: '/proxy',
      component: Proxy,
    },
  ],
});
