import Vue from "vue";
import VueRouter from "vue-router";
import Login from '@/views/Login/index.vue'
import Layout from '@/components/Layout.vue'
import Home from '@/views/home'
import Member from '@/views/member'
import Supplier from '@/views/supplier'
import Goods from '@/views/goods'
import Stuff from '@/views/stuff'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {title: '首页'}
      },
      // {
      //   path: "/member",
      //   name: "Member",
      //   component: Member,
      // },
    ]
  },
  {
    path: "/member",
    component: Layout,
    children: [
      {
        path: '/',
        component: Member,
        meta: {title: '会员管理'}
      }
    ]
  },
  {
    path: "/supplier",
    component: Layout,
    children: [
      {
        path: '/',
        component: Supplier,
        meta: {title: '供应商管理'}
      }
    ]
  },
  {
    path: "/goods",
    component: Layout,
    children: [
      {
        path: '/',
        component: Goods,
        meta: {title: '商品管理'}
      }
    ]
  },
  {
    path: "/stuff",
    component: Layout,
    children: [
      {
        path: '/',
        component: Stuff,
        meta: {title: '员工管理'}
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
