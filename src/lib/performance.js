class Performance {
  constructor () {
    this.timing = window.performance.timing
    this.navigation = window.performance.navigation
    this.memory = window.performance.memory || {}
    this.times = {}
    this.entries = []
  }
  // 获取页面加载性能指数
  getPerformanceTime () {
    const t = this.timing
    const times = {}
    // 页面加载开始到完成时间
    times.loadPage = t.loadEventEnd - t.loadEventStart
    // 解析dom树的时间
    times.domReady = t.domComplete - t.responseEnd
    // 重定向时间
    times.redirect = t.redirectEnd - t.redirectStart
    // DNS 查询时间
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart
    // 读取页面第一个字节的时间
    // 这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
    times.ttfb = t.responseStart - t.navigationStart
    // 内容加载完成的时间
    times.request = t.responseEnd - t.requestStart
    // 执行 onload 回调函数的时间
    times.loadEvent = t.loadEventEnd - t.loadEventStart
    // DNS 缓存时间
    times.appcache = t.domainLookupStart - t.fetchStart
    // TCP 建立连接完成握手的时间
    times.connect = t.connectEnd - t.connectStart
    this.times = times
    return this.times
  }
  // 获取每个资源加载性能指数
  getEntries () {
    const entries = performance.getEntries()
    entries.forEach(entry => {
      this.entries.push(this.getEntryTiming(entry))
    })
    return this.entries
  }

  // 获取资源对应的时间信息
  getEntryTiming (entry) {
    const t = entry
    const times = {}
    // 重定向的时间
    times.redirect = t.redirectEnd - t.redirectStart
    // DNS 查询时间
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart
    // 内容加载完成的时间
    times.request = t.responseEnd - t.requestStart
    // TCP 建立连接完成握手的时间
    times.connect = t.connectEnd - t.connectStart
    // 挂载 entry 返回
    times.name = entry.name
    // 请求类型
    times.entryType = entry.entryType
    // 详细资源
    times.initiatorType = entry.initiatorType
    // 请求资源耗时
    times.duration = entry.duration
    return times
  }

  start () {
    this.getPerformanceTime()
    this.getEntries()
    return {
      times: this.times,
      entries: this.entries
    }
  }
}

export default new Performance()