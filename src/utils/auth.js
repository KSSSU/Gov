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
