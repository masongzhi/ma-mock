import Vue from 'vue';
import Router from 'vue-router';

const Mock = () => import(/* webpackChunkName: "Mock" */ '@/page/Mock');
const Proxy = () => import(/* webpackChunkName: "Proxy" */ '@/page/Proxy');
const Readme = () => import(/* webpackChunkName: "Readme" */ '@/page/Readme');

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/mock',
    },
    {
      path: '/mock',
      component: Mock,
    },
    {
      path: '/proxy',
      component: Proxy,
    },
    {
      path: '/readme',
      component: Readme,
    },
  ],
});
