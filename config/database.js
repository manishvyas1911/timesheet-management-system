var mysql = require('mysql');

var pool;
module.exports = {
  
getPool: function () {
    if (pool)
     { return pool;}
    pool = mysql.createPool({
  	connectionLimit :100,
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'tms',
      debug    : false,
      waitForConnections:true  
      });
    return pool;
  }
};

