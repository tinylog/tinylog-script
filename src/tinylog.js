import Performance from './lib/performance'
import { initializeApi, reportPageApi, reportAssetsApi, reportExitApi } from './lib/api'
import { initAxios } from './lib/request'
import Store from './lib/store'

class TinyLog {
  constructor(config = {}) {
    this.store = new Store()
    this.config = config
    this.isPerformanceExit = false
    this.performance = {}
  }

  /**
   * @method 请求库配置初始化
   */
  initAxios() {
    initAxios(this.config)
  }

  /**
   * @method 事件注册
   */
  initEvents() {
    // 窗口关闭发送数据事件
    window.addEventListener('beforeunload', (e) => {
      this.reportExit()
    })

    // 异常捕获上报事件
    window.addEventListener('error', (e) => {
      console.log('error', e)
    }, true)

    // 路由变化监听事件
    window.addEventListener('popstate', (e) => {
      console.log('popstate', e)
    })

    // 哈希路由变化监听事件
    window.addEventListener('hashchange', (e) => {
      console.log('hashchange', e)
    })
  }

  /**
   * @method tinylog数据以及事件初始化
   */
  async initialize() {
    this.initAxios(this.config)
    /*
    const { common, os, times, entries } = this.getPerformance()
    let token = this.store.getToken()
    let pageId = this.store.getPageId()
    if (!token) {
      const { data } = await initializeApi({
        referrer: document.referrer,
        lang: common.lang,
        ua: common.ua,
        os: os.type
      })
      token = data.token
      this.store.setToken(token)
    }
    if (!pageId) {
      const { data: pageRes } = await this.reportPage(token, times)
      pageId = pageRes.pageId
      this.store.setPageId(pageId)
      const { data: assetsRes } = await this.reportAssets(token, pageId, entries)
    }*/
    this.initEvents()
  }

  /**
   * @method 获取页面加载性能行为数据
   */
  getPerformance () {
    if (!this.isPerformanceExit) {
      this.performance = new Performance().start(this.config)
      this.isPerformanceExit = true
    }
    return this.performance
  }

  /**
   * @method 页面性能数据上报 
   */
  async reportPage (token, times) {
    return reportPageApi({
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
  }

  /**
   * @method 资源性能数据上报 
   */
  async reportAssets (token, pageId, entries) {
    return reportAssetsApi({
      token,
      pageId,
      assets: entries.map(item => {
        return {
          entryType: item.entryType,
          initiatorType: 0, // TODO 修改为: item.initiatorType
          name: item.name,
          redirect: item.redirect,
          lookupDomain: item.lookupDomain,
          request: item.request,
          duration: item.duration
        }
      })
    })
  }

  /**
   * @method 退出上报
   */
  async reportExit () {
    /*
    return reportExitApi({
      token: this.store.getToken(),
      pageId: this.store.getPageId(),
      exitTime: new Date().toISOString()
    })*/
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', '/log/exit', false)
    xmlHttp.send()
  }
}


export const tinyLog = (config) => {
  return new TinyLog(config).initialize()
} 
