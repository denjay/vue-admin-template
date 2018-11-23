import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = [] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is index will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.permissions === null) { // 判断当前用户是否已拉取完permissions
        new Promise((resolve, reject) => {
          store.dispatch('GetRole').then(res => {
            resolve(res.data.data)
          }).catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
            reject(err)
          })
        }).then(isSuper => {
          store.dispatch('GetPermissions').then(res => { // 拉取permissions
            const permissions = res.data
            store.dispatch('GenerateRoutes', { permissions, isSuper }).then(() => { // 根据permissions权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          }).catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      // 否则全部重定向到登录页
      window.location = `/kong/auth/static/jwt_login.html?to=${window.location.href.replace(/#/g, '%23')}`
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
