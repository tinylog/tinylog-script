import { tinyLog } from './tinylog'
import { initEvents } from './lib/events'

(function () {
  window.tinyLog = tinyLog
})()

console.log(window.tinyLog({
  baseURL: 'https://tinylog.ruiming.me',
  host: 'www.qq.com'
}))