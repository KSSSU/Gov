/**
 * 主路由配置
 * import是路由组件的懒加载，即被 Webpack 自动代码分割的异步组件
 * webpackChunkName是把组件按组分块，打包在同个异步块 (chunk) 中
 */

import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { clearLoginInfo } from '@/utils';

Vue.use(Router);

const Home = () => import(/* webpackChunkName: "gv" */ '@/views/home/index');
const Subscription = () =>
  import(/* webpackChunkName: "gv" */ '@/views/subscription/index');
const Mine = () => import(/* webpackChunkName: "gv" */ '@/views/mine/index');
const Topic = () => import(/* webpackChunkName: "gv" */ '@/views/mine/topic');
const TopicList = () =>
  import(/* webpackChunkName: "gv" */ '@/components/TopicList');
const Message = () =>
  import(/* webpackChunkName: "gv" */ '@/views/mine/message');
const History = () =>
  import(/* webpackChunkName: "gv" */ '@/views/mine/history');
const Detail = () => import(/* webpackChunkName: "gv" */ '@/components/Detail');
const Search = () => import(/* webpackChunkName: "gv" */ '@/components/Search');
const Login = () => import(/* webpackChunkName: "gv" */ '@/views/common/login');
const Register = () =>
  import(/* webpackChunkName: "gv" */ '@/views/common/register');
const TouristRegister = () =>
  import(/* webpackChunkName: "gv" */ '@/views/common/touristRegister');

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        hasFooter: true,
        noScroll: false
      }
    },
    {
      path: '/topicList/:value',
      name: 'TopicList',
      component: TopicList,
      meta: {
        hasFooter: false,
        noScroll: false
      }
    },
    {
      path: '/subscription',
      name: 'Subscription',
      component: Subscription,
      meta: {
        hasFooter: true,
        noScroll: false
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta: {
        hasFooter: true,
        noScroll: false
      },
      beforeEnter: (to, from, next) => {
        let token = Vue.cookie.get('x-access-token');
        if (!token || !/\S/.test(token)) {
          clearLoginInfo();
          next({
            name: 'Login'
          });
        }
        next();
      }
    },
    {
      path: '/topic',
      name: 'Topic',
      component: Topic,
      meta: {
        hasFooter: false,
        noScroll: false
      }
    },
    {
      path: '/history',
      name: 'History',
      component: History,
      meta: {
        hasFooter: false,
        noScroll: false
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: {
        hasFooter: false,
        noScroll: false
      }
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      meta: {
        hasFooter: false,
        noScroll: false
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        hasFooter: false,
        noScroll: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        hasFooter: true,
        noScroll: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        hasFooter: true,
        noScroll: false
      }
    },
    {
      path: '/touristRegister',
      name: 'TouristRegister',
      component: TouristRegister,
      meta: {
        hasFooter: true,
        noScroll: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // directRightUrl()
  console.log(to);
  //是否显示底部导航
  store.commit('SHOW_FOOTER', to.meta.hasFooter);
  //判断是否为baseHome页面
  // store.commit('IS_HOME', to.name == 'baseHome');
  //页面是否需要滚动
  // store.commit('NO_SCROLL', to ? to.meta.noScroll : true);
  next();
});

export default router;
