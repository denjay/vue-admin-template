import request from '@/utils/request'

export function getPermissions() {
  return request({
    url: '/kong/rightmanage/v1.0/cur-permissions?systemname=RepairSystemWeb',
    method: 'get'
  })
}

export function isSuper() {
  return request({
    url: '/kong/mw-maintenance/v1.0/getrights',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/kong/auth/v1.0/logout_jwt',
    method: 'get'
  })
}
