import { tinyLog } from './tinylog'
import { initEvents } from './lib/events'

(function () {
  window.tinyLog = tinyLog
})()

console.log(window.tinyLog({
  // baseURL: 'https://tinylog.ruiming.me'
  baseURL: 'http://localhost:3000'
}))