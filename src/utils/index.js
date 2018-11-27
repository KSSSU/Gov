import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import CryptoJS from 'crypto-js';

const TokenKey = 'x-access-token';

export function getToken() {
  return Vue.cookie.get(TokenKey);
}

export function setToken(token) {
  return Vue.cookie.set(TokenKey, token);
}

export function removeToken() {
  return Vue.cookie.delete(TokenKey);
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = '';
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, typeof len === 'number' ? len : 4);
  if (date) random = random + Date.now();
  return random;
};

/**
 * 加密处理
 */
export const encryption = params => {
  const { data, type, param } = params;
  let { key } = params;
  const result = JSON.parse(JSON.stringify(data));
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele]);
    });
  } else {
    param.forEach(ele => {
      const data = result[ele];
      key = CryptoJS.enc.Latin1.parse(key); // eslint-disable-line
      const iv = key;
      // 加密
      const encrypted = CryptoJS.AES.encrypt(
        // eslint-disable-line
        data,
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC, // eslint-disable-line
          padding: CryptoJS.pad.ZeroPadding // eslint-disable-line
        }
      );
      result[ele] = encrypted.toString();
    });
  }
  return result;
};

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  Vue.cookie.delete(TokenKey);
  store.commit('RESET_STORE');
  // router.options.isAddDynamicMenuRoutes = false;
}
