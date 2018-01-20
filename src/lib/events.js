import request from './request'

export const initEvents = () => {
  window.addEventListener('beforeunload', () => {
    return request.request({
      url: '/test'
    }).then(() => {
      console.log('test')
    })
  })
}