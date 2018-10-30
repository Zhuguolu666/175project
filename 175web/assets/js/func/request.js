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
    // let form = new FormData();
    // Object.keys(params).forEach(v=>{
    //   form.append(v,params[v])
    // })
    wx.request({
      url: url,
      method: 'POST',
      data: params,
      // headers:{},
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
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