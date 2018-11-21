const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const dbConfig = require('../db/DBConfig');
const userSQL = require('../db/customerSql');
const multipart = require('connect-multiparty');
const customerService = require('../service/customer/customer');

const multipartMiddleware = multipart();

// 使用DBConfig.js的配置信息创建一个MySQL连接池
const pool = mysql.createPool( dbConfig.mysql );

// 响应一个JSON数据
let responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({     code:'-200',     msg: '操作失败'
        });
    } else {
        res.json(ret);
    }};
// 添加用户
router.post('/addCustomer',multipartMiddleware ,function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        let param = req.body || req.params;
        // 建立连接 增加一个用户信息
        connection.query(userSQL.insert, customerService.handleReceiveRequest(param) ,function(err, result) {
            let data;
            if(result) {
                data = {
                    code: 200,
                    msg:'操作成功',
                    result:result
                };
            }else{
                data = {
                    code: -200,
                    msg:'操作失败',
                    result:err
                };
            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, data);

            // 释放连接
            connection.release();

        });
    });
});
// 查询用户
router.get('/queryCustomer' ,function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        let param = req.body || req.params;
        // 建立连接 增加一个用户信息
        connection.query(userSQL.queryAll ,function(err, result) {
            let data;
            if(result) {
                data = {
                    code: 200,
                    msg:'操作成功',
                    result:result
                };
            }else{
                data = {
                    code: -200,
                    msg:'操作失败',
                    result:err
                };
            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, data);

            // 释放连接
            connection.release();

        });
    });
});

module.exports = router;