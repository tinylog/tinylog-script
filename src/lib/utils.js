/**
 * @method 获取浏览器类型已经版本
 * @param {string} ua 
 */
export const getBrowserVersion = (ua) => {
  ua = ua.toLowerCase()
  let browser = ''
  let version = ''
  if (ua.indexOf('msie') > 0) {
    let regStr_ie = /msie [\d.]+;/gi;
    browser = 'IE';
    version = '' + ua.match(regStr_ie)
  }
  //firefox
  else if (ua.indexOf('firefox') > 0) {
    let regStr_ff = /firefox\/[\d.]+/gi;
    browser = 'firefox';
    version = '' + ua.match(regStr_ff);
  }
  //Chrome
  else if (ua.indexOf('chrome') > 0) {
    let regStr_chrome = /chrome\/[\d.]+/gi;
    browser = 'chrome';
    version = '' + ua.match(regStr_chrome);
  }
  //Safari
  else if (ua.indexOf('safari') > 0 && ua.indexOf('chrome') < 0) {
    let regStr_saf = /version\/[\d.]+/gi;
    browser = 'safari';
    version = '' + ua.match(regStr_saf);
  }
  //Opera
  else if (ua.indexOf('opera') >= 0) {
    let regStr_opera = /version\/[\d.]+/gi;
    browser = 'opera';
    version = '' + ua.match(regStr_opera);
  } else {
    let browser = navigator.appName;
    if (browser == 'Netscape') {
      let version = ua.split(';');
      let trim_Version = version[7].replace(/[ ]/g,
        '');
      let rvStr = trim_Version.match(/[\d\.]/g).toString();
      let rv = rvStr.replace(/[,]/g, '');
      version = rv;
      browser = 'IE'
    }
  }
  version = (version + '').replace(/[^0-9.]/ig, '');
  return {
    version,
    type: browser
  }
}

export const getOs = (ua) => {
  let system = {
    win: false,
    mac: false,
    xll: false,
    iphone: false,
    ipoad: false,
    ipad: false,
    ios: false,
    android: false,
    nokiaN: false,
    winMobile: false,
    wii: false,
    ps: false
  };
  // 检测平台
  let p = navigator.platform;
  system.win = p.indexOf('Win') == 0;
  system.mac = p.indexOf('Mac') == 0;
  system.xll = (p.indexOf('Xll') == 0 || p.indexOf('Linux')== 0);
  // 检测Windows操作系统
  if (system.win) {
    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
      if (RegExp['$1'] == 'NT') {
        switch (RegExp['$2']) {
          case '5.0':
            system.win = '2000';
            break;
          case '5.1':
            system.win = 'XP';
            break;
          case '6.0':
            system.win = 'Vista';
            break;
          case '6.1':
            system.win = '7';
            break;
          case '6.2':
            system.win = '8';
            break;
          default:
            system.win = 'NT';
            break;
        }
      } else if (RegExp['$1'] == '9x') {
        system.win = 'ME';
      } else {
        system.win = RegExp['$1'];
      }
    }
  }
  // 移动设备
  system.iphone = ua.indexOf('iPhone') > -1;
  system.ipod = ua.indexOf('iPod') > -1;
  system.ipad = ua.indexOf('iPad') > -1;
  system.nokiaN = ua.indexOf('nokiaN') > -1;
  // windows mobile
  if (system.win == 'CE') {
    system.winMobile = system.win;
  } else if (system.win == 'Ph') {
    if (/Windows Phone OS (\d+.\d)/i.test(ua)) {
      system.win = 'Phone';
      system.winMobile = parseFloat(RegExp['$1']);
    }
  }
  // 检测IOS版本
  if (system.mac && ua.indexOf('Mobile') > -1) {
    if (/CPU (?:iPhone )?OS (\d+_\d+)/i.test(ua)) {
      system.ios = parseFloat(RegExp['$1'].replace('_','.'));
    } else {
      system.ios = 2;    // 不能真正检测出来，所以只能猜测
    }
  }
  // 检测Android版本
  if (/Android (\d+\.\d+)/i.test(ua)) {
    system.android = parseFloat(RegExp['$1']);
  }
  // 游戏系统
  system.wii = ua.indexOf('Wii') > -1;
  system.ps = /PlayStation/i.test(ua);
  return {
    system
  }
}