import { API_ROOT } from './config.js';

const gov = {
  hotPolicy: '/gov/policy/declare/page', // 热门政策
  subscribedPolicy: '/gov/policy/declare/page', // 订阅政策
  generalPolicy: '/gov/policy/general/selectAll', // 通用政策
  declarationPolicy: '/gov/policy/declare/page', // 申报政策
  analyzingPolicy: '/gov/policy/explain/page', // 政策解读
  policyInfo: '/gov/policy/information/get/page', // 政策资讯
  topicList: '/gov/policy/general/selectAll', // 指定主题的政策列表
  todayPolicy: '/gov/policy/declare/page', // 今日政策
  policyDetail: '/gov/policy/general', // 通用政策详情
  declarePolicyDetail: '/gov/policy/declare', // 申报政策详情
  search: '/gov/policy/general/selectAll', // 搜索

  login: '/auth/oauth/token', // 用户登录
  logout: '/auth/oauth/removeToken', // 用户注销

  register: '/admin/user/register', // 用户注册
  user: '/admin/user/info', // 用户信息
  policyTopic: '/admin/dict/dictPage', // 所有主题
  subscribedTopic: '/dict/dictPage/subscribed', // 已订阅主题
  saveTopic: '/dict/dictPage/subscribed' // 保存已订阅主题
};

export const HotPolicy = API_ROOT.concat(gov.hotPolicy);
export const SubscribedPolicy = API_ROOT.concat(gov.subscribedPolicy);
export const GeneralPolicy = API_ROOT.concat(gov.generalPolicy);
export const DeclarationPolicy = API_ROOT.concat(gov.declarationPolicy);
export const AnalyzingPolicy = API_ROOT.concat(gov.analyzingPolicy);
export const PolicyInfo = API_ROOT.concat(gov.policyInfo);
export const TodayPolicy = API_ROOT.concat(gov.todayPolicy);
export const TopicList = API_ROOT.concat(gov.topicList);
export const PolicyDetail = API_ROOT.concat(gov.policyDetail);
export const DeclarePolicyDetail = API_ROOT.concat(gov.declarePolicyDetail);
export const Search = API_ROOT.concat(gov.search);

export const Login = API_ROOT.concat(gov.login);
export const Logout = API_ROOT.concat(gov.logout);

export const Register = API_ROOT.concat(gov.register);
export const User = API_ROOT.concat(gov.user);
export const PolicyTopic = API_ROOT.concat(gov.policyTopic);

export const SubscribedTopic = API_ROOT.concat(gov.subscribedTopic);
export const SaveTopic = API_ROOT.concat(gov.saveTopic);
