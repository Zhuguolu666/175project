//import orderStore from '../stores/orderStore.js'

const formatTime = (date, str) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  let mfr = '/'
  if (str == 'YYYY-MM-DD HH:mm:ss') {
    mfr = '-'
  }
  return [year, month, day].map(formatNumber).join(mfr) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**
 * 将目标字符串转换成日期对象
 * @param  {String} source 目标字符串
 * @return {Date}        转换后的日期对象
 */
const dateParse = (source) => {
  var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
  if ('string' == typeof source) {
    if (reg.test(source) || isNaN(Date.parse(source))) {
      var d = source.split(/ |T/),
        d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0],
        d0 = d[0].split(/[^\d]/);
      return new Date(d0[0] - 0,
        d0[1] - 1,
        d0[2] - 0,
        d1[0] - 0,
        d1[1] - 0,
        d1[2] - 0);
    } else {
      return new Date(source);
    }
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//正则判断
function Regular(str, reg) {
  if (reg.test(str))
    return true;
  return false;
}
//是否为中文
function IsChinese(str) {
  var reg = /^[\u0391-\uFFE5]+$/;
  return Regular(str, reg);
}
//去左右空格;
function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}
let timeoutId = null;
/*
 * 强制使用此reLaunch方法
 * @Function reLaunch
 * @param obj Obejct  即wx.reLaunch的参数
 **/
const reLaunch = function (obj) {
  //鸡贼的一波操作，重写reLaunch，目的清空所有的autorun
  new baseStore().unAutorunAll()
  //orderStore.unAutorunAll()
  wx.reLaunch(Object.assign({
    url: '',
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) {
    },
  }, obj || {}))
}
const getCurrentPageUrl = function () {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}

// 将函数做promise化的包装
const promisify = function (f) {
  return function () {
    let args = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve, reject) {
      args.push(function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
      f.apply(null, args);
    });
  }
}

module.exports = {
  promisify,
  formatTime: formatTime,
  dateParse: dateParse,
  IsChinese: IsChinese,
  trim: trim,
  reLaunch: reLaunch,
  getCurrentPageUrl: getCurrentPageUrl,
  /**
   * 设置元素显示
   */
  show(className = `wux-animate--fade-in`, visibleKey = '_visible', animateKey = '_animateCss') {
    if (typeof this.setData != 'function') return

    this.setData({
      [animateKey]: className,
      [visibleKey]: !0,
    })
  },
  /**
   * 设置元素隐藏
   */
  hide(className = `wux-animate--fade-out`, visibleKey = '_visible', animateKey = '_animateCss', timer = 300) {
    if (typeof this.setData != 'function') return

    this.setData({
      [animateKey]: className,
    })

    // 给动画展现以时间
    let self = this
    timeoutId && clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      self.setData({
        [visibleKey]: !1,
      })
    }, timer)
  },
  // 节流器，让函数在固定的时间范围内，只执行一次, 会带来threshhold的延时
  // 用法：var throttledCheck = throttle(check, 100)
  //      addEvent(window, 'scroll', throttledCheck)
  throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 100)
    var last, deferTimer

    return function () {
      var context = scope || this

      var now = +(new Date())
      var args = arguments
      if (last && now < last + threshhold) {
        clearTimeout(deferTimer)
        deferTimer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, threshhold)
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  }
}
