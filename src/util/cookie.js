import Cookies from 'js-cookie'

const TokenKey = 'hexToke'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token, expired) {
  return Cookies.set(TokenKey, token, {expires: new Date(expired)})
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
