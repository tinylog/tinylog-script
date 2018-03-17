import rest from './request'
import { LogInterfaces } from './url-instances'

/**
 * @method 初次连接需要进行该请求，服务端会进行 Cookie 处理，前端无需关心返回值
 */
export const initialize = async ({ referrer, lang, ua, os }) => {
  return rest.request({
    method: 'post',
    url: LogInterfaces.Initialize,
    data: {
      referrer, lang, ua, os, host: 'https://www.qq.com'
    }
  })
}

/**
 * @method 当前页面的用户行为数据，如果有的话需要把前一个页面的 PageId 传回，没有 PageId 视这个页面为入口页面
 * 会返回 PageId，该 PageId 在发送该页面的数据资源信息的时候需要带上，以及跳转下一个页面的时候要用
 */
export const reportPage = ({ token, url, startTime, prePageId, referrer, loadPage, domReady, redirect, lookupDomain, ttfb, request, tcp, loadEvent }) => {
  return rest.request({
    headers: {
      authorization: token
    },
    method: 'post',
    url: LogInterfaces.Page,
    data: {
      url, 
      startTime, 
      prePageId, 
      referrer, 
      loadPage, 
      domReady, 
      redirect, 
      lookupDomain, 
      ttfb, 
      request, 
      tcp, 
      loadEvent
    }
  })
}

/**
 * @method 当前页面的所有资源数据，需要把前面的 PageId 传回来
 */
export const reportAssets = ({ token, pageId, assets }) => {
  return rest.request({
    headers: {
      authorization: token
    },
    method: 'post',
    url: LogInterfaces.Assets,
    data: {
      pageId, assets
    }
  })
}

/**
 * @method 网页退出，把当前哪个页面发送过来，以及退出时间
 */
export const reportExit = ({ token, pageId, exitTime }) => {
  return rest.request({
    headers: {
      authorization: token
    },
    method: 'post',
    url: LogInterfaces.Exit,
    data: {
      pageId, exitTime
    }
  })
}