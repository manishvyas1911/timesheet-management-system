var mysql=require("mysql");
var Q = require('q');

function isArrayEmpty(array){
	 if(array.length === 0 || array === [] ){
	    	return true;
	    } 
}

function GET_DESIGNATION_REPORTED(email,connection,callback){
	var query="select * from ?? where ?? = ?";
	var table=["users","email",email];
	query=mysql.format(query,table);
	var deferred=Q.defer();
	connection.query(query,function(err,rows){
		if(err){
			deferred.resolve({"status":0,"message":err});
		}
		else{
			deferred.resolve(rows);
		}
	});
	
	return deferred.promise;
}

function GET_USERS(designation,email,connection,callback){
	var query;
	var table;
	if(designation <=2){
		query="select first_name,last_name,email from ?? where ?? > ?";
		table=["users","designation",designation];
	}
	else{
		 query="select first_name,last_name,email from ?? where ?? > ? AND ??=?";
		 table=["users","designation",designation,"report_to",email];
	}
	
	query=mysql.format(query,table);
	var deferred=Q.defer();
	connection.query(query,function(err,rows){
		if(err){
			deferred.resolve({"status":0,"message":err});
		}
		else{
			deferred.resolve(rows);
		}
	});
	
	return deferred.promise;
}

function EMAIL_CHECK(email,connection,callback){

	var query = "SELECT * FROM ?? WHERE ??=?";
	var table=["users","email",email];
	query=mysql.format(query,table);
	
		connection.query(query,function(err,rows){
			
			
			if(err){
				callback(null,{"status":true});
			}
			else{
				
				if(isArrayEmpty(rows)){
				   callback(null,{"status":true});	
				}
				else{
				 callback(null,{"status":false});
				}
			}
	
  });
	 
}


function LOGIN(User,connection,callback){

	var query = "SELECT * FROM ?? WHERE ?? = BINARY ? AND password= ?";
	var table=["users","email",User.email,User.password];
	query=mysql.format(query,table);
	
		connection.query(query,function(err,rows){
		
		if(err){
			callback(err,{"status":false});
		}else{
			if(isArrayEmpty(rows)){
				   callback(null,{"status":false});	
				}
				else{
				   callback(null,rows);
				}
		}
	
	});
}


function FACEBOOK_LOGIN(User,connection,callback){
	var query="SELECT * FROM ?? WHERE ?? = BINARY ?";
	console.log("2"+User.email);
	var table=["users","email",User.email];
	query=mysql.format(query,table);
   connection.query(query,function(err,rows){
		
		if(err){
			callback(null,{"status":false});
		}else{
			if(isArrayEmpty(rows)){
			
				   callback(null,rows);	
				}
				else{
					console.log(rows);
				   callback(null,rows);
				}
		}

	});
}


function REGISTRATION(User,connection,callback){
	console.log("in registration"+User.email);
	var query="insert into ??(??,??,??,??) values(?,?,?,?)";
	var table=["users","first_name","last_name","email","password",User.first_name,User.last_name,
	           User.email,User.password];
	query=mysql.format(query,table);
	connection.query(query,function(err,rows){
		
		if(err) {
			callback(null,{"status":false});
        } else {
        	console.log('in regi 4'+rows);
        	callback(null,{"status":true});
        }

	});
}





module.exports.EMAIL_CHECK=EMAIL_CHECK;
module.exports.REGISTRATION=REGISTRATION;
module.exports.LOGIN=LOGIN;
module.exports.FACEBOOK_LOGIN=FACEBOOK_LOGIN;
module.exports.GET_DESIGNATION_REPORTED=GET_DESIGNATION_REPORTED;
module.exports.GET_USERS=GET_USERS;
