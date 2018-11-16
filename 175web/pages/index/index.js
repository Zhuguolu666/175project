import { getApi, postApi } from '../../assets/js/api/api.js'

const app = getApp()
Page({
  data: {
    imgUrls:[
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // testGetApi('http://172.16.1.28:3000/users',{},(res)=>{
    //   console.log(res)
    // });
    // testPostApi('http://172.16.1.28:3000/test/addUser', {name:'huhuihua',age:18,id:3}, (res) => {
    //   console.log(res)
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toInsertPage(e){
    if (e.target.dataset.type === "write"){
      wx.navigateTo({
        url: '../otherpages/insertcustomer/insertcustomer'
      })
    }else{
      wx.showToast({
        title: '开发中,敬请期待...',
        icon: 'none',
        duration: 2000
      })
    }
  }
})
