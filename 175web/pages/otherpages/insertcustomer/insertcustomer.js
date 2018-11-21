const nationList = require('../../../assets/js/data/data.js');
import { insertCustomer } from '../../../assets/js/api/api.js'
Page({
  data: {
    selectedUrl: '../../../assets/images/pub.png',
    unSelectedUrl: '../../../assets/images/pubed.png',
    form:{
      customerType:0,//0成人，1小孩
      applyStatus:'N',
      applyProperty:0,//0体验,1活动,2正课
      birthday:'',
      applyDate:'',
      nation:'',
      name:'',
      nickName:'',
      sex:'',
      phoneNumber:'',
      urgencyPerson: '',
      urgencyNumber: '',
      address: '',
      age: '',
      class: '',
      courseFee: '',
      courseTime: '',
      courseReset: '',
      courseName: '',
      courseCount: '',
      courseTimeLength: '',
      needRemind: ''
    },
    nationList: nationList.nationData,
    nationIndex:'',
    formItem:'',
  },
  onLoad: function (options) {
  
  },
  onReady: function () {

  },
  onShow: function () {
  
  },
  changeForm(e){
    this.setData({
      [e.target.dataset.type]: e.detail.value
    })
  },
  changeFormKey(e){
    this.setData({
      [e.currentTarget.dataset.type]: e.currentTarget.dataset.value
    })
  },
  selectDate(e){
    this.setData({
      [e.target.dataset.type]: e.detail.value
    })
  },
  bindPickerChange(e){
    this.setData({
      nationIndex: e.detail.value,
      'form.nation': this.data.nationList[e.detail.value].name
    })
  },
  insertCustomer(){
    insertCustomer('http://172.16.1.29:3000/customer/addCustomer', this.data.form, (res) => {
      wx.navigateTo({
        url: '../customerlist/customerlist'
      })
    })
  }
})