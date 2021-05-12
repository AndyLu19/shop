import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import Home from '../views/Home/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/Login.vue'),
    // beforeEnter只在跳转到该路由才会触发
    beforeEnter(to,from,next) {
      const isLogin = localStorage.isLogin;
      if (isLogin){
        next({name: 'Home'});
      }else{
        next();
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/Register/Register.vue'),
    // beforeEnter只在跳转到该路由才会触发
    beforeEnter(to,from,next) {
      const isLogin = localStorage.isLogin;
      if (isLogin){
        next({name: 'Home'});
      }else{
        next();
      }
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop/Shop.vue')
  },
  {
    path: '/cartlist',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartlist" */ '../views/CartList/CartList.vue')
  },
  {
    path: '/orderconfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderconfirmation" */ '../views/OrderConfirmation/OrderConfirmation.vue')
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderlist" */ '../views/OrderList/OrderList.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "my" */ '../views/My/My.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "address" */ '../views/Address/Address.vue')
  },
  {
    path: '/addaddress',
    name: 'AddAddress',
    component: () => import(/* webpackChunkName: "addaddress" */ '../views/AddAddress/AddAddress.vue')
  },
  {
    path: '/editaddress/:id',
    name: 'EditAddress',
    component: () => import(/* webpackChunkName: "editaddress" */ '../views/EditAddress/EditAddress.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 任何路由跳转都会触发
router.beforeEach((to,from,next) => {
  //获取到本地储存的isLogin属性
  const isLogin = localStorage.isLogin;
  //如果已登录或者跳转到登录页面或者注册页面，就放行
  if(isLogin || to.name === 'Login' || to.name === 'Register'){
    next();
  }else {
    //跳转到登陆页面
    next({name: 'Login'})
  }
})

export default router
