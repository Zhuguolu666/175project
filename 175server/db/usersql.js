var UserSQL = {  
    insert:'INSERT INTO user(name,age,id) VALUES(?,?,?)', 
    queryAll:'SELECT * FROM user',  
    getUserById:'SELECT * FROM user WHERE uid = ? ',
  };
module.exports = UserSQL;