import { tinyLog } from './tinylog'
import { initEvents } from './lib/events'

(function () {
  window.tinyLog = tinyLog
})()

window.tinyLog({
  baseURL: 'https://tinylog.ruiming.me',
  host: 'www.qq.com',
  appKey: 'EDOB3132k3DCLKO343ED'
})
