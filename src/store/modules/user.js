import { logout, getPermissions, isSuper } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    permissions: null,
    isSuper: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state) => {
      state.name = window.Auth.username()
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ROLE: (state, isSuper) => {
      state.isSuper = isSuper
    }
  },

  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     login(username, userInfo.password).then(response => {
    //       const data = response.data
    //       setToken(data.token)
    //       commit('SET_TOKEN', data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 获取用户信息和权限
    GetPermissions({ commit, state }) {
      return new Promise((resolve, reject) => {
        getPermissions().then(response => {
          const data = response.data
          if (data instanceof Object && data.toString() === '[object Object]') { // 验证是否返回permissions
            commit('SET_PERMISSIONS', data)
          } else {
            reject('getPermissions: permissions must be object !')
          }
          commit('SET_NAME')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户角色（是否为super)
    GetRole({ commit, state }) {
      return new Promise((resolve, reject) => {
        isSuper().then(response => {
          commit('SET_ROLE', response.data.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
