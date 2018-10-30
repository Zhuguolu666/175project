var express = require('express');
var mysql = require('mysql');

var router = express.Router();
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
var multipart = require('connect-multiparty'); 

var multipartMiddleware = multipart();

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

// 响应一个JSON数据
var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') { 
          res.json({     code:'-200',     msg: '操作失败'   
        }); 
    } else { 
      res.json(ret); 
  }};
// 添加用户
router.post('/addUser',multipartMiddleware ,function(req, res, next){
    // 从连接池获取连接 

    pool.getConnection(function(err, connection) { 
    // 获取前台页面传过来的参数  
    // console.log(req)
    var param = req.body || req.params;   
    console.log(param)
    // 建立连接 增加一个用户信息 
    connection.query(userSQL.insert, [param.name,param.age,param.id] ,function(err, result) {
        // console.log(result)
            if(result) {      
                var result = {   
                        code: 200,   
                        msg:'操作成功',
                        result:result
                };  
            }else{
                console.log(err)
            }     
            
        // 以json形式，把操作结果返回给前台页面     
        responseJSON(res, result);   

        // 释放连接  
        connection.release();  

        });
    });
 });
module.exports = router