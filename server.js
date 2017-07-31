var express = require("express");
var session=require("express-session");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var path = require('path');
var ejs=require('ejs');
var passport = require('passport') ; 

var usercontroller=require("./controller/UserController.js");
var facebooklogin=require("./controller/FacebookLogin.js");
var dbConfig=require("./config/database.js");
var Navigation=require("./controller/Navigation.js");
var sheetcontroller=require("./controller/SheetController.js");
var attendancecontroller=require("./controller/AttendanceController.js");

var app  = express();


function APP(){
    var self = this; 
    self.connectMysql();
}

APP.prototype.connectMysql = function() {
	 var self = this;
	    var pool      =    mysql.createPool({
	    	
	    	connectionLimit : dbConfig.connectionLimit,
	               host     : dbConfig.localhost,
	               user     : dbConfig.user,
	               password : dbConfig.password,
	               database : dbConfig.database,
	               debug    : dbConfig.debug
	               
	    });
	    
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress();
        }
    });
}

APP.prototype.configureExpress = function() {
      var self = this;
      app.set('port', process.env.PORT ||3003);
      app.use(session({secret: 'ssshhhhh'}));
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());   //Returns middleware that only parses jsons
      var router = express.Router();
      app.use('/tms', router);
      app.use(express.static(__dirname + '/public'));
      app.engine('html',ejs.renderFile);
      app.set('view engine', 'html');
      router.use(express.static(__dirname+'/public'));
      
      var connection = require('./config/handleDB.js');
      
      var facebook_login=new facebooklogin(passport,connection,router)
      var user_controller=new usercontroller(router,connection);
      var navigation=new Navigation(router,passport);
      var sheet_controller=new sheetcontroller(router,connection);
      var attendance_controller=new attendancecontroller(router,connection);
      self.startServer();
}


APP.prototype.startServer = function() {
     var server=app.listen(app.get('port'),function(){
    	  var host=server.address().address;
    	  var port=server.address().port;
          console.log("server started",host,port);
      });
}

APP.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1); 
}



new APP();