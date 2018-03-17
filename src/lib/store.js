const namespace = 'tinylog'

const TokenKey = `${namespace}-token`
const PageIdKey = `${namespace}-pageId`

class Store {
  setToken (token) {
    sessionStorage.setItem(TokenKey, token)
  }
  getToken () {
    return sessionStorage.getItem(TokenKey)
  }
  setPageId (pageId) {
    sessionStorage.setItem(PageIdKey, pageId)
  }
  getPageId () {
    return sessionStorage.getItem(PageIdKey)
  }
}

export default Store