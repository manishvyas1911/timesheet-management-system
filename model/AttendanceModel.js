var mysql=require("mysql");
var Q = require('q');


function getCurrentDate(){
	
	 var newDate =new Date(); 
	 var dd = newDate.getDate();
	 var mm = newDate.getMonth()+1; //January is 0!

	 var yyyy = newDate.getFullYear();
	 if(dd<10){
	     dd='0'+dd;
	 } 
	 if(mm<10){
	     mm='0'+mm;
	 } 
	 return  dd+'/'+mm+'/'+yyyy;
	 
}


function isArrayEmpty(array){
	 if(array.length === 0 || array === [] ){
			return true;
		} 
}


function GET_SIGN_STATUS(email,connection){
	var todayDate=getCurrentDate();
	
	 var query="select ?? from ?? where ??=? And ??=? order by ?? DESC";
	    var table=["sign_status","attendance","emp_email",email,"sign_date",todayDate,"sign_timestamp"];
	    query=mysql.format(query,table);
	    var deferred=Q.defer();
	    connection.query(query,function(err,rows){
	    	if(err){
	    		deferred.resolve({"error":true,"message":"error executing query"});
	    	}else{
	    		
	    		deferred.resolve({"error":false,"message":"Success","signStatus":rows});	
	    	}
	    });
	    
	    return deferred.promise;
}

function GetHistorySignins(email,connection){
	
	 var query="select * from ?? where ??=? ORDER BY ?? DESC LIMIT 6";
	    var table=["attendance","emp_email",email,"sign_timestamp"];
	    query=mysql.format(query,table);
	    var deferred=Q.defer();
	    connection.query(query,function(err,rows){
	    	if(err){
	    		deferred.resolve({"error":true,"message":"error executing query"});
	    	}else{
	    		deferred.resolve({"error":false,"message":"Success","signData":rows});	
	    	}
	    });
	    
	    return deferred.promise;
}




function Sign(Attendance,connection){
	
	var query="insert into ??(??,??,??,??,??) values(?,?,?,?,?)";

	var table=["attendance","emp_email","sign_date","sign_time","sign_timestamp","sign_status",
	           Attendance.emp_email,Attendance.sign_date,Attendance.sign_time,
	           Attendance.sign_timestamp,Attendance.sign_status];
	query=mysql.format(query,table);
	   var deferred=Q.defer();
	connection.query(query,function(err,rows){
		
		if(err){
    		deferred.resolve({"error":false,"status":false});
    	}else{
    		deferred.resolve({"error":false,"status":true});	
    		//console.log(rows);
    	}

	});
return deferred.promise;
}



/*function SignOut(Attendance,connection){
	
	var query="update ?? SET ??=?,??=?,??=?,??=? where ??=? And ??=?";
	var table=["attendance","date",Attendance.date,"time",Attendance.time,
	           "timestamp",Attendance.timestmp,"sign_status",Attendance.sign_status,
	           "emp_email",Attendance.emp_email,"date",Attendance.date];
	query=mysql.format(query,table);
	   var deferred=Q.defer();
	connection.query(query,function(err,rows){
		
		if(err){
    		deferred.resolve({"error":true,"status":false});
    	}else{
    		deferred.resolve({"error":false,"status":true});
    		console.log(rows);
    	}

	});
return deferred.promise;
}
*/


function DateFromTimestamp(timestamp){
	
	 var newDate =new Date(timestamp); 
	 var dd = newDate.getDate();
	 var mm = newDate.getMonth()+1; //January is 0!

	 var yyyy = newDate.getFullYear();
	 if(dd<10){
	     dd='0'+dd;
	 } 
	 if(mm<10){
	     mm='0'+mm;
	 } 
	 return  dd+'/'+mm+'/'+yyyy;
	 
}

Number.prototype.pad = function (len) {
    return (new Array(len+1).join("0") + this).slice(-len);
};

function TimeFromTimestamp(timestamp){
	var today = new Date(timestamp);
	return today.getHours().pad(2) + ":" + today.getMinutes().pad(2) + ":" + today.getSeconds().pad(2);
}


module.exports.TimeFromTimestamp=TimeFromTimestamp;
module.exports.DateFromTimestamp=DateFromTimestamp;

module.exports.Sign=Sign;
module.exports.GET_SIGN_STATUS=GET_SIGN_STATUS;
module.exports.GetHistorySignins=GetHistorySignins;