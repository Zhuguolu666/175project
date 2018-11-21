module.exports = {
  getAjax(url,params,success,error){
    wx.request({
      url: url, 
      method:'GET',
      data: params,
      success(res) {
        if(res.data.code == 200){
          if(success && typeof success == 'function'){
            success(res);
          }         
        }
      },
      error(x,y,z){
        console.log(x,y,z);
        if (error && typeof error == 'function') {
          error();
        } 
      }
    })
  },
  postAjax(url, params, success, error) {
    wx.request({
      url: url,
      method: 'POST',
      data: params,
      header: { 'content-type':'application/x-www-form-urlencoded'},
      success(res) {
        if (res.data.code == 200) {
          if (success && typeof success == 'function') {
            success(res);
          }
        }
      },
      error(x, y, z) {
        console.log(x, y, z);
        if (error && typeof error == 'function') {
          error();
        }
      }
    })
  },
}