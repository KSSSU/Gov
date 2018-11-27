import http from '@/utils/httpRequest';
import axios from 'axios';
import * as request from './resource';

export default {
  /**
   * 获取热门政策
   * @param {Number} page 当前页数
   * @param {Number} limit 限制页数
   */
  getHotPolicy(page, limit) {
    return http(request.HotPolicy, {
      params: {
        page: page || 1,
        limit: limit || 10,
        views: 'views'
      }
    });
  },

  /**
   * 获取订阅的政策
   * @param {Number} page 当前页数
   * @param {Number} limit 限制页数
   */
  getSubscribedPolicy(page, limit) {
    return http(request.SubscribedPolicy, {
      params: {
        page: page || 1,
        limit: limit || 10
      }
    });
  },

  /**
   * 获取通用政策
   * @param {Number} page 当前页数
   * @param {Number} limit 限制页数
   */
  getGeneralPolicy(page, limit) {
    return http(request.GeneralPolicy, {
      params: {
        page: page || 1,
        limit: limit || 10
      }
    });
  },

  /**
   * 申报政策
   * @param {Number} page 当前页数
   * @param {Number} limit 限制页数
   */
  getDeclarationPolicy(page, limit) {
    return http(request.DeclarationPolicy, {
      params: {
        page: page || 1,
        limit: limit || 10
      }
    });
  },

  /**
   * 政策解读
   * @param {Number} page 当前页数
   * @param {Number} limit 限制页数
   */
  getAnalyzingPolicy(page, limit) {
    return http(request.AnalyzingPolicy, {
      params: {
        page: page || 1,
        limit: limit || 10
      }
    });
  },

  /**
   * 获取政策资讯
   * @param {Number} page 当前页数
   * @param {Number} limit 限制页数
   */
  getPolicyInfo(page, limit) {
    return http(request.PolicyInfo, {
      params: {
        page: page || 1,
        limit: limit || 10
      }
    });
  },

  /**
   * 获取今日政策
   * @param {Number} page 当前页数
   * @param {Number} limit 限制页数
   */
  getTodayPolicy(page, limit) {
    return http(request.TodayPolicy, {
      params: {
        page: page || 1,
        limit: limit || 10,
        views: 'views'
      }
    });
  },

  /**
   * 获取通用政策详情
   * @param {Number} id 政策ID
   */
  getPolicyDetail(id) {
    return http(`${request.PolicyDetail}/${id}`);
  },

  /**
   * 获取申报政策详情
   * @param {Number} id 政策ID
   */
  getDeclarePolicyDetail(id) {
    return http(`${request.DeclarePolicyDetail}/${id}`);
  },

  /**
   * 获取政策解读详情
   * @param {Number} id 政策ID
   */
  getExplainPolicyDetail(id) {
    return http(`${request.DeclarePolicyDetail}/${id}`);
  },

  /**
   * 获取政策资讯详情
   * @param {Number} id 政策ID
   */
  getInformationPolicyDetail(id) {
    return http(`${request.DeclarePolicyDetail}/${id}`);
  },

  /**
   * 搜索
   * @param {String} value 标题
   * @param {Number} page 当前页数
   * @param {Number} limit 限制页数
   */
  getSearchResult(value, page, limit) {
    return http(request.Search, {
      params: {
        generalTitle: value || '',
        page: page || 1,
        limit: limit || 10
      }
    });
  },

  /**
   * 所有主题
   */
  getPolicyTopic(limit) {
    return http(request.PolicyTopic, {
      params: {
        limit: limit || 36,
        type: 'policy_theme'
      }
    });
  },

  /**
   * 已订阅的主题
   */
  getSubscribedTopic(userId) {
    return http(request.SubscribedTopic, {
      params: {
        userId: userId,
        limit: 36,
        type: 'policy_theme'
      }
    });
  },

  /**
   * 保存订阅的主题
   */
  saveSubscribedTopic(userId, topic) {
    return http(request.SaveTopic, {
      params: {
        userId: userId,
        topic: topic
      }
    });
  },

  /**
   * 获取指定主题的政策列表
   */
  getTopicList(theme, page, limit) {
    return http(request.TopicList, {
      params: {
        theme: theme,
        page: page || 1,
        limit: limit || 10
      }
    });
  },

  /**
   * 用户登陆
   * @param {String} phone 手机号，即帐号名称
   * @param {String} captcha 验证码
   */
  login(username, password, code, randomStr) {
    const grantType = 'password';
    const scope = 'server';
    console.log('login api');
    return http({
      url: request.Login,
      headers: {
        Authorization: 'Basic ZGlwczpkaXBz'
      },
      method: 'post',
      params: {
        username,
        password,
        randomStr,
        code,
        grant_type: grantType,
        scope
      }
    });
  },

  logout() {
    return http(request.Logout);
  },

  /**
   * 用户注册
   * @param {String} phone 手机号，即帐号名称
   * @param {String} captcha 验证码
   */
  register(data) {
    return http({
      url: request.Register,
      method: 'post',
      data
    });

    // return http(request.Register, {
    //   params: {
    //     phone: phone,
    //     captcha: captcha
    //   }
    // });
  },

  /**
   * 用户信息
   * @param {String} id 用户ID
   */
  getUserInfo() {
    return http(request.User);
  }
};
