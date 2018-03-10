import performance from './lib/performance'
import { initEvents } from './lib/events'

// console.log(performance)
// initEvents()

// throw new Error('测试')
(function (window) {
  window.onload = e => {
    console.log(performance)
  }
})(window)