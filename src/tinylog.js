import Performance from './lib/performance'
import { initialize, reportPage } from './lib/api'
import Store from './lib/store'

class TinyLog {
  constructor(config = {}) {
    this.store = new Store()
    this.config = config
  }

  async initialize() {
    const { common, os, times, entries } = new Performance().start(this.config)
    let token = this.store.getToken()
    let pageId = this.store.getPageId()
    if (!token) {
      const { data } = await initialize({
        referrer: document.referrer,
        lang: common.lang,
        ua: common.ua,
        os: os.type
      })
      token = data.token
      this.store.setToken(token)
    }
    if (!pageId) {
      const { data } = await reportPage({
        token,
        url: window.location.href,
        startTime: new Date().toISOString(),
        referrer: document.referrer,
        loadPage: times.loadPage,
        domReady: times.domReady,
        redirect: times.redirect,
        lookupDomain: times.lookupDomain,
        ttfb: times.ttfb,
        request: times.request,
        tcp: times.tcp,
        loadEvent: times.loadEvent
      })
      pageId = data.pageId
      this.store.setPageId(pageId)
    }
  }
}


export const tinyLog = (config) => {
  return new TinyLog(config).initialize()
} 
