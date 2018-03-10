import rest from './request'

export const initEvents = (window) => {
  // 窗口关闭发送数据事件
  if (window.onbeforeunload) {
    window.onbeforeunload = () => {
      return rest.request({
        url: 'http://localhost:3000/test'
      }).then(() => {
        console.log('test')
      })
    }
  } else {
    window.addEventListener('beforeunload', () => {
      return rest.request({
        url: 'http://localhost:3000/test'
      }).then(() => {
        console.log('test')
      })
    })
  }

  // 异常捕获上报事件
  if (window.onerror) {
    window.onerror = (msg, url, row, col, error) => {
      console.log({
        msg,  // 错误信息
        url,  // 发生错误对应的脚本链接
        row,  // 行号
        col   // 列号
      })
    }
  } else {
    window.addEventListener('error', (e) => {
      console.log(event)
    }, true)
  }

  // 路由变化监听事件
  if (window.onpopstate) {
    window.onpopstate = (e) => {
    }
  } else {
    window.addEventListener('popstate', (e) => {
    })
  }

  if (window.onhashchange) {
    window.onhashchange = (e) => {
    }
  } else {
    window.addEventListener('hashchange', (e) => {
    })
  }

}