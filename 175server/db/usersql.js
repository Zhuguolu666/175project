var UserSQL = {  
    insert:'INSERT INTO Person(name,age,id) VALUES(?,?,?)', 
    queryAll:'SELECT * FROM Person',  
    getUserById:'SELECT * FROM Person WHERE uid = ? ',
  };
module.exports = UserSQL;