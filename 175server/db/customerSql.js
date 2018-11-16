const insertParams = require('../params/customer');

let insertConditions = insertParams.map(v=>{
    return '?'
});

let CustomerSql = {
    insert:`INSERT INTO user(${insertParams.join(',')}) VALUES(${insertConditions})`,
    queryAll:'SELECT * FROM user',  
    getUserById:'SELECT * FROM user WHERE uid = ? ',
  };
module.exports = CustomerSql;