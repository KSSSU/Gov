import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedTopicTitle: '', // 选中的政策主题的标题
    selectedTab: 'home', // 默认Tabs标签
    selectedNav: 1, // 默认Navbar标签
    hasFooterTab: true, //是否有Tabs标签
    isEditTopic: false, // 是否在编辑主题，用于首次登陆时选择主题
    searchText: '', // 搜索文字
    accessToken: '', // accessToken
    refreshToken: '', // refreshToken
    userInfo: '', // 用户信息
    roles: '' // 用户角色
  },
  mutations: {
    [types.SET_TOPIC_TITLE](state, params) {
      state.selectedTopicTitle = params;
    },
    [types.SELECT_TAB](state, params) {
      state.selectedTab = params;
    },
    [types.SELECT_NAVBAR](state, params) {
      state.selectedNav = params;
    },
    [types.SHOW_FOOTER](state, params) {
      state.hasFooterTab = params;
    },
    [types.RESET_TOPIC_EDITING_STATUS](state, params) {
      state.isEditTopic = params;
    },
    [types.SET_SEARCH_TEXT](state, params) {
      state.searchText = params;
    },
    [types.SET_ACCESS_TOKEN](state, params) {
      state.accessToken = params;
    },
    [types.SET_REFRESH_TOKEN](state, params) {
      state.refreshToken = params;
    },
    [types.SET_USER_INFO](state, params) {
      state.userInfo = params;
    },
    [types.SET_ROLES](state, params) {
      state.roles = params;
    },
    [types.RESET_STORE](state, params) {
      Object.keys(state).forEach(key => {
        // state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      });
    }
  }
});

export default store;
