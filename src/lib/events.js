import rest from './request'

export const initEvents = (window, document) => {
  // 窗口关闭发送数据事件
  window.addEventListener('beforeunload', (e) => {
    console.log('beforeunload', e)
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