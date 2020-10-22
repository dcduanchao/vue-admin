import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import { getToken } from 'network/cookies';

const Login1 = () => import("views/login/Index")
const Login = () => import("views/login/login")
const LayIndex = () => import("views/layout/Index")
const Role = () => import("views/system/role/Index")
const Menu = () => import("views/system/menu/Index")

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/index",
    name: "Index",
    component: LayIndex,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home
      },
      {
        path: "/system/role",
        name: "Role",
        component: Role
      },
      {
        path: "/system/menu",
        name: "Menu",
        component: Menu
      },

    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {

  //to 即将访问
  //from  跳转路径
  //next 放行
  if (to.path === '/login') return next();

  const token = getToken();

  if (!token) return next('/login');
  next()
})

export default router;
