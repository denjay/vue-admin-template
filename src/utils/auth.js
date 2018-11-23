import Cookies from 'js-cookie'

const TokenKey = 'sessionid'

export function getToken() {
  return window.localStorage.getItem('jwt.token')
}

export function getName() {
  return window.localStorage.getItem('jwt.username')
}

export function removeToken() {
  window.localStorage.removeItem('jwt.token')
  return Cookies.remove(TokenKey)
}
