/*
* 模块说明: 提供带动画效果的显示隐藏之类的公共函数, 方便组件中很便捷的使用
* */
module.exports = Behavior({
  behaviors: [],
  properties: {
    // 用于
    options: {
      type: Object,
      value: {
        scope: ''
      }
    },
  },
  data: {
    _visible: !1, // 用于记录当前的visible状态
    timeoutId: null
  },
  attached: function () {
  },
  methods: {
    // 带动画效果的显示
    _show(className = `wux-animate--fade-in`, cb = function () {}) {
      this.setData({
        // [`${this.data.scope}.animateCss`]: className,
        // [`${this.data.scope}.visible`]: !0,
        "animateCss": className,
        "_visible": !0,
      })
      cb.call(this)
    },

    // 带动画效果的隐藏
    _hide(className = `wux-animate--fade-out`, cb = function () {}, timer = 300) {
      this.setData({
        // [`${this.data.scope}.animateCss`]: className,
        animateCss: className,
      })
      // 隐藏防抖
      this.timeoutId && clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.setData({
          // [`${this.data.scope}.visible`]: !1,
          "_visible": !1,
        })
        cb.call(this)
      }, timer)
    },
    // 响应事件，让自身显示
    _onShow () {
      typeof this.show == 'function' && this.show()
    },
    // 响应事件，让自身隐藏
    _onCancel (e) {
      typeof this.hide == 'function' && this.hide()
    },
    // 点击浮层不隐藏的时候给这个事件
    _onKeep (e) {
    },
    // 针对弹出面板，监测关闭按钮事件，自己调用hide来隐藏自己，一般在ready初始化时使用
    _onPopWatchClose () {
      let _self = this
      let app = getApp()
      app.event.on('PageClose', function () {
        console.log('关闭按钮被点击')
        // 处于显示状态时
        // if (_self.data._visible) {
          console.log('显示状态的组件来处理这个关闭事件，隐藏自己')
          _self.hide()
          app.event.emit('CustomClose', false)
        // }
      })
    },
    // 解绑定事件的处理，一般在页面或组件销毁的时候调用
    _offPopWatchClose () {
      let app = getApp()
      app.event.off('PageClose')
    }
  }
})

