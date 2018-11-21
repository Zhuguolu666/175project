import { queryCustomer } from '../../../assets/js/api/api.js'
Page({
  data: {
    listData:[]
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    this.queryList()
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  queryList(){
    queryCustomer('http://172.16.1.29:3000/customer/queryCustomer',{},res=>{
      console.log(res)
      this.setData({
        listData:res.data.result
      })
    })
  }
})