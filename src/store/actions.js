import * as types from './mutation-types'
import {
  loginByUsername,
  getUserInfo,
  logout,
} from '@/api/umps/login'
import { encryption } from '@/util/util'
import {
  setToken,
  removeToken,
} from '@/util/auth'

export const LogOut = function ({ commit }) {
  return new Promise((resolve, reject) => {
    logout().then(() => {
      // 清除用户信息
      commit(types.SET_USER_INFO, {})
      commit(types.SET_ACCESS_TOKEN, '')
      commit(types.SET_REFRESH_TOKEN, '')
      commit(types.SET_ROLES, [])
      removeToken()
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}
export const GetUserInfo = function ({ commit, state }) {
  return new Promise((resolve, reject) => {
    getUserInfo(state.token).then(response => {
      const data = response.data.data
      commit(types.SET_USER_INFO, data.sysUserVO)
      commit(types.SET_ROLES, data.roles)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export const LoginByUsername = function ({ commit }, userInfo) {
  return new Promise((resolve, reject) => {
    const user = encryption({
      data: userInfo,
      key: 'dipscloudisbest1',
      param: ['password'],
    })
    loginByUsername(user.username, user.password, user.code, user.randomStr).then(response => {
      const { data } = response
      setToken(data.access_token)
      commit(types.SET_ACCESS_TOKEN, data.access_token)
      commit(types.SET_REFRESH_TOKEN, data.refresh_token)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}
