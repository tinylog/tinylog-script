import { tinyLog } from './tinylog'
import { initEvents } from './lib/events'

(function (window, document) {
  initEvents(window, document)
  window.tinyLog = tinyLog
})(window, document)

console.log(window.tinyLog({}))