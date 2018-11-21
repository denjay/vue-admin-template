import Cookies from 'js-cookie'

const TokenKey = 'sessionid'

export function getToken() {
  // return Cookies.get(TokenKey)
  return window.localStorage.getItem('jwt.token')
}

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

export function removeToken() {
  window.localStorage.removeItem('jwt.token')
  return Cookies.remove(TokenKey)
}
