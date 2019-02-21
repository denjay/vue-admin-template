import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.permissions判断是否与当前用户权限匹配
 * @param permissions  后台获取到的权限对象
 * @param route  单个路由记录
 */
function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    if (route.meta.permissions.length === 0) {
      return true
    }
    return route.meta.permissions.some(permission => { return (permission in permissions) && (permissions[permission].ops.includes('view')) })
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param permissions  后台获取到的权限对象
 */
function filterAsyncRouter(routes, permissions) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route } // 深拷贝
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permissions, isSuper } = data
        let accessedRouters
        if (isSuper) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, permissions)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
