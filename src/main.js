// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueCookie from 'vue-cookie';
import router from './router';
import store from './store';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import '@/assets/css/main.scss';

import httpRequest from '@/utils/httpRequest';

Vue.prototype.$http = httpRequest; // ajax请求方法

Vue.config.productionTip = false;

Vue.use(MintUI);
Vue.use(VueCookie);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});
