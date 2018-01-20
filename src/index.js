import performance from './lib/performance'
import axios from 'axios'

console.log(performance)

window.addEventListener('beforeunload', () => {
  return axios.request({
    url: '/test'
  }).then(() => {
    console.log('test')
  })
})