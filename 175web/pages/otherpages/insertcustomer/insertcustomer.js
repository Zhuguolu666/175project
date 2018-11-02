// pages/insertcustomer/insertcustomer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedUrl: '../../../assets/images/pub.png',
    unSelectedUrl: '../../../assets/images/pubed.png',
    form:{
      customerType:0,//0成人，1小孩
      applyStatus:'N',
      courseProperty:0,//0体验,1活动,2正课
      birthday:'',
      applyDate:'',
      nation:''
    },
    showNation:false,
    formItem:'',
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: 'rgba(245,166,35,1)' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: 'rgba(245,166,35,1)' }
    ],
    animationData: {},
    animationNation: {},
    showBg:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //日历动画
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    });
    this.animation = animation;
    this.setData({
      animationData: animation.export()
    })
    //民族动画
    var nationAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    });
    this.nationAnimation = nationAnimation;
    this.setData({
      animationNation: nationAnimation.export()
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  changeCustomer(e){
    let type = e.target.dataset.item;
    if (type == 'customer'){
      this.data.form.customerType = e.target.dataset.type;
    } else if (type == 'course'){
      this.data.form.applyStatus = e.target.dataset.type;
    } else {
      this.data.form.courseProperty = e.target.dataset.type;
    }    
    this.setData({
      form: this.data.form
    })
  },
  selectDate(e){
    this.animation.translateY(-275).step()
    this.setData({
      animationData: this.animation.export()
    });
    this.setData({
      showBg: true,
      formItem: e.target.dataset.item
    }); 
  },
  chooseDate(event){
    let clickDay = event.detail.day;
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "rgba(245,166,35,1)"
    });
    this.setData({
      showBg: false
    });
    this.animation.translateY(-275).step()
    this.setData({
      animationData: this.animation.export()
    });
    let date = JSON.stringify(event.detail.year) + '-' + (event.detail.month < 10 ? ('0' + event.detail.month) : JSON.stringify(event.detail.month)) + '-' + (event.detail.day < 10 ? ('0' + event.detail.day) : JSON.stringify(event.detail.day));
    if(this.data.formItem === 'birth'){
      this.data.form.birthday = date;   
    } else if (this.data.formItem === 'apply'){
      this.data.form.applyDate = date; 
    }
    this.setData({
      form: this.data.form
    });
    this.animation.translateY(275).step()
    this.setData({
      animationData: this.animation.export()
    });
  },
  closeCalendar(){
    this.setData({
      showBg: false
    });  
    this.animation.translateY(275).step()
    this.setData({
      animationData: this.animation.export()
    });
  },
  getNation(){
    this.nationAnimation.translateX(-200).step()
    this.setData({
      animationNation: this.nationAnimation.export()
    });
    this.setData({
      showNation: !this.data.showNation
    })
  }
})