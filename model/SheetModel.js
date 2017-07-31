var mysql=require("mysql");
var Q = require('q');

function isArrayEmpty(array){
	 if(array.length === 0 || array === [] ){
			return true;
		} 
}


/*
SELECT * FROM `timesheet` WHERE emp_email="manishvyas1911@gmail.com" and
timestamp >= UNIX_TIMESTAMP(CURDATE())

SELECT * FROM `timesheet` WHERE emp_email="manishvyas1911@gmail.com" and 
timestamp >= UNIX_TIMESTAMP(DATE_SUB(CURDATE(), INTERVAL 1 DAY)) AND 
timestamp < UNIX_TIMESTAMP(CURDATE())


SELECT * FROM `timesheet` WHERE emp_email="manishvyas1911@gmail.com" and
timestamp >= UNIX_TIMESTAMP(CURDATE()) and timestamp < UNIX_TIMESTAMP(DATE_ADD(CURDATE(), INTERVAL 1 DAY))
*/
function GET_TAGS(email,start,end,connection){
	 var query="SELECT * FROM ?? WHERE ??=? and ?? >= UNIX_TIMESTAMP(CURDATE()) and ?? < UNIX_TIMESTAMP(DATE_ADD(CURDATE(), INTERVAL 1 DAY))";
	    var table=["timesheet","emp_email",email,"timestamp","timestamp"];
	    query=mysql.format(query,table);
	    var deferred=Q.defer();
	    connection.query(query,function(err,rows){
	    	if(err){
	    		deferred.resolve({"error":true,"message":"error executing query"});
	    	}else{
	    		deferred.resolve({"error":false,"message":"Success","timeSheetData":rows});	
	    		console.log("in model"+rows);
	    	}
	    });
	    
	    return deferred.promise;
}


function GET_TIMESHEET(email,connection){
	 var query="select * from ?? where ??=? order by ?? desc";
	    var table=["timesheet","emp_email",email,"timestamp"];
	    query=mysql.format(query,table);
	    var deferred=Q.defer();
	    connection.query(query,function(err,rows){
	    	if(err){
	    		deferred.resolve({"error":true,"message":"error executing query"});
	    	}else{
	    		deferred.resolve({"error":false,"message":"Success","timeSheetData":rows});	
	    	}
	    });
	    
	    return deferred.promise;
}


function DATE_EMAIL_CHECK(Sheet,connection){
	var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
	var table=["timesheet","emp_email",Sheet.emp_email,"date",Sheet.date];
	query=mysql.format(query,table);
	  var deferred=Q.defer();
		connection.query(query,function(err,rows){
			console.log(JSON.stringify(rows));
			if(err){
				//callback(null,{"status":true});
			  deferred.resolve({"status":true});	
			}
			else{
				
				if(isArrayEmpty(rows)){
					//callback(null,{"status":true});
					
					deferred.resolve({"status":true});	
				 }
				else{
					//callback(null,{"status":false});
					deferred.resolve({"status":false});	
				}
			}
	
  });
return deferred.promise;
}

function INSERTSHEET(Sheet,connection){
	var timeColumn;
	
	switch(Sheet.time) {
    case "am1011":
    	timeColumn = "t10_11am";
        break;
    case "am1112":
    	timeColumn = "t11_12am";
        break;
    case "pm1201":
    	timeColumn = "t12_1pm";
        break;
    case "pm0102":
    	timeColumn = "t1_2pm";
        break;
    case "pm0203":
    	timeColumn = "t2_3pm";
        break;
    case "pm0304":
    	timeColumn = "t3_4pm";
        break;
    case "pm0405":
    	timeColumn = "t4_5pm";
        break;
    case "pm0506":
    	timeColumn = "t5_6pm";
        break;
    case "pm0607":
    	timeColumn = "t6_7pm";
        break;
    default:
    	timeColumn = "extra";
   }
	var query="insert into ??(??,??,??,??) values(?,?,?,?)";
	var table=["timesheet","emp_email","date",timeColumn,"timestamp",Sheet.emp_email,Sheet.date,Sheet.title,Sheet.timestmp];
	query=mysql.format(query,table);
	  var deferred=Q.defer();
	connection.query(query,function(err,rows){
		
		if(err) {
			deferred.resolve({"status":false});	
			
        } else {
        	deferred.resolve({"status":true});	
        	
        }

	});
	return deferred.promise;
}

function UPDATESHEET(Sheet,connection){
	var timeColumn;
	
	switch(Sheet.time) {
    case "am1011":
    	timeColumn = "t10_11am";
        break;
    case "am1112":
    	timeColumn = "t11_12am";
        break;
    case "pm1201":
    	timeColumn = "t12_1pm";
        break;
    case "pm0102":
    	timeColumn = "t1_2pm";
        break;
    case "pm0203":
    	timeColumn = "t2_3pm";
        break;
    case "pm0304":
    	timeColumn = "t3_4pm";
        break;
    case "pm0405":
    	timeColumn = "t4_5pm";
        break;
    case "pm0506":
    	timeColumn = "t5_6pm";
        break;
    case "pm0607":
    	timeColumn = "t6_7pm";
        break;
    default:
    	timeColumn = "extra";
   }
	var query="UPDATE ?? SET ??=? WHERE ??=? AND ??=?";
	var table=["timesheet",timeColumn,Sheet.title,"emp_email",Sheet.emp_email,"date",Sheet.date];
	query=mysql.format(query,table);
	var deferred=Q.defer();
	connection.query(query,function(err,rows){
		
		if(err) {
			deferred.resolve({"status":false});	
			
        } else {
        	deferred.resolve({"status":true});	
        	
        }

	});
	return deferred.promise;
}

function DateToTimestamp(dateString){
	 var parts =(dateString).split('/');
     var newDate =new Date(parts[1]+"/"+parts[0]+"/"+parts[2]); 
     var ts = Math.round((newDate).getTime() / 1000);
     return ts ;
}



module.exports.DateToTimestamp=DateToTimestamp;
module.exports.INSERTSHEET=INSERTSHEET;
module.exports.UPDATESHEET=UPDATESHEET;
module.exports.DATE_EMAIL_CHECK=DATE_EMAIL_CHECK;
module.exports.GET_TIMESHEET=GET_TIMESHEET;
module.exports.GET_TAGS=GET_TAGS;