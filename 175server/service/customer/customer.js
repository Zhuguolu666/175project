const insertParams = require('../../params/customer');
const customerService = {
      handleReceiveRequest:function (param) {
          if(param && Object.prototype.toString.call(param).slice(8,-1) === 'Object'){
              return insertParams.map(v=>{
                  if(param[v]){
                      return param[v]
                  }else{
                      return ''
                  }
              })
          }
      }
};


module.exports = customerService;