import request from './request'

export const initEvents = () => {
  window.addEventListener('beforeunload', () => {
    return request.request({
      url: '/test'
    }).then(() => {
      console.log('test')
    })
  })
  window.onerror = (msg, url, row, col, error) => {
    console.log({
      msg,  // 错误信息
      url,  // 发生错误对应的脚本链接
      row,  // 行号
      col   // 列号
    })
  }
  window.addEventListener('error', event => {
    console.log(event)
  }, true)
}