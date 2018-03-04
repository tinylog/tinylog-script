# 前端脚本监控数据格式


## 网页性能数据

```
{
  url: 当前请求页面的url
  referrer: 来源
  loadPage: 页面加载开始到完成时间
  domReady: 解析dom树的时间
  redirect: 重定向的时间
  lookupDomain: DNS查询时间
  ttfb: 读取页面第一个字节的时间
  request: 内容加载完成的时间
  tcp: tcp建立连接完成握手的时间
  loadEvent: 执行onload回调函数的时间
}
```

## 页面单个资源的加载数据

```
{
  redirect: 重定向的时间
  lookupDomain: DNS查询时间
  request: 资源加载完成的时间
  name: 资源的uri
  entryType: 请求的类型, 比如: resource, navigation
  initiatorType: 详细的资源类型, 比如: script, navigation
  duration: 资源的耗时
}
```

## 页面所有的资源加载数据

```
[
  {
    redirect: 重定向的时间
    lookupDomain: DNS查询时间
    request: 资源加载完成的时间
    name: 资源的uri
    entryType: 请求的类型, 比如: resource, navigation
    initiatorType: 详细的资源类型, 比如: script, navigation
    duration: 资源的耗时
  }, 
  {
    ...
  }
]
```

## 页面资源状态信息

```
{
  name: 名称
  status: 状态码
  type: 类型
  size: 大小
  time: 时间
  waterfall: 对象(瀑布流)
}
```

## 前端错误上报数据

```
{
  msg: 错误信息
  url: 发生错误对应的脚本链接
  row: 行号
  col: 列号
  timestamp: 发生时间戳
}
```

## 前端用户信息数据

```
{
  lang: 语言
  os: 操作系统
  ua: 用户浏览器标识
  (ip: 用户的ip地址) // 服务端自行获取, 前端不提供, 地区, 城市, 国家
  ext: 待扩展的数据
}
```

## 前端用户行为总体数据

```
{
  totalTime: 在页面停留的总时间
  ...
}
```

## 前端用户行为当前页面数据

```
{
  totalTime: 当前页面的停留时间
  url: 当前的页面停留页面url
}
```


## 分析的功能

- 通过referrer分析页面跳转堆栈