import TinyLog from './tinylog'
import { initEvents } from './lib/events'

// throw new Error('测试')
(function (window) {
  initEvents(window)
  window.TinyLog = TinyLog
})(window)

console.log(window.TinyLog({}))