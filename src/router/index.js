import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                              if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true                          if set true, will always show the root menu, whatever its child routes length
*                                           if not set alwaysShow, only more than one route under the children
*                                           it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect                      if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'                        the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'                          the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'                        the icon show in the sidebar,
    permissions： ['permission-name']       the permissions required for this route(如果不存在permissions属性，或者该属性为空列表，表示无权限限制)
  }
**/
export const constantRouterMap = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '',
    component: Layout,
    hidden: true,
    redirect: 'index',
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      name: 'Index',
      meta: {
        title: 'home',
        icon: 'home',
        noCache: true
      }
    }]
  }
]

export const asyncRouterMap = [{
  path: '/example',
  component: Layout,
  alwaysShow: true,
  redirect: '/example/table',
  name: 'Example',
  meta: {
    title: 'example',
    icon: 'example'
  },
  children: [{
    path: 'table',
    name: 'Table',
    component: () => import('@/views/table/index'),
    meta: {
      title: 'table',
      icon: 'table'
    }
  },
  {
    path: 'tree',
    name: 'Tree',
    component: () => import('@/views/tree/index'),
    meta: {
      title: 'treeTable',
      icon: 'tree',
      permissions: ['process_maintenance']
    }
  }
  ]
},

{
  path: '/rightmanage',
  component: Layout,
  alwaysShow: true,
  name: 'RightManage',
  meta: {
    title: 'rightManage',
    icon: 'rights'
  },
  children: [{
    path: 'appuser',
    name: 'AppUser',
    component: () => import('@/views/rightmanage/appuser'),
    meta: {
      title: 'userRights',
      icon: 'user',
      permissions: ['SYSTEMUSER']
    }
  },
  {
    path: 'approle',
    name: 'AppRole',
    component: () => import('@/views/rightmanage/approle'),
    meta: {
      title: 'roleRights',
      icon: 'role',
      permissions: ['SYSTEMUSER']
    }
  },
  {
    path: 'curruser',
    name: 'CurrUser',
    component: () => import('@/views/rightmanage/curruser'),
    meta: {
      title: 'changePassword',
      icon: 'password'
    }
  }
  ]
},

{
  path: '/i18n',
  component: Layout,
  children: [{
    path: 'index',
    component: () => import('@/views/i18n-demo/index'),
    name: 'I18n',
    meta: {
      title: 'i18n',
      icon: 'international'
    }
  }]
},

// 外链
// {
//   path: 'external-link',
//   component: Layout,
//   children: [{
//     path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
//     meta: {
//       title: 'external Link',
//       icon: 'link'
//     }
//   }]
// },

{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
