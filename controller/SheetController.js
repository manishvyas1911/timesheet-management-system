var bodyparser=require('body-parser');
var urlencodedparser=bodyparser.urlencoded({extended : false});
var sheetBean=require("../bean/SheetBean.js");
var SheetModel=require("../model/SheetModel.js");
var mysql=require("mysql");

var async=require("async");

function SHEET_CONTROLLER(router,connection){
	var self=this;
	self.handleRoutes(router,connection);
}



SHEET_CONTROLLER.prototype.handleRoutes=function(router,connection){
	
	router.post("/GetTags",urlencodedparser,function(req,res){
		var sesn = req.session;
		var email=sesn.email;
		
		var dataJson={};
		dataJson=req.body;
		var start=dataJson.start;
		var end=dataJson.end;
		console.log("start :"+start+"end :"+end);
		 SheetModel.GET_TAGS(email,start,end,connection).then(function(dataFromDB){
		
		/* var tags={emp_email: 'manishvyas1911@gmail.com',
		    date: '15/07/2017',
		    timestamp: '1500057000',
		    t10_11am: '15/07/2017 ',
		    t11_12am: 'a',
		    t12_1pm: 'b',
		    t1_2pm: 'c',
		    t2_3pm: 'd',
		    t3_4pm: 'e',
		    t4_5pm: 'f',
		    t5_6pm: 'g',
		    t6_7pm: 'h',
		    extra: 'i',
		    projects: '' }; */
			 console.log("in controller : "+dataFromDB)
	     var data={};
		 var  event=[];
         if (dataFromDB[0].timeSheetData.t10_11am) {
			   event.push({title: dataFromDB[0].timeSheetData.t10_11am ,start: new Date(dataFromDB[0].timeSheetData.timestamp*1000)});
		     }
		  data['event']=event;
          console.log(JSON.stringify("dataaaa"+data));
          
		 
		 res.json(dataFromDB);
		 
		 });
		
	});
	
	router.get("/ViewTimesheet",function(req,res){
		var sesn = req.session;
		var email=sesn.email;
		 SheetModel.GET_TIMESHEET(email,connection).then(function(data){
		 res.json(data);
		 });
		
	});
	
	router.post("/GetWorkByDate",urlencodedparser,function(req,res){
		var sesn = req.session;
		var email=sesn.email;
		
		var workJson={};
		workJson=req.body;
		var date=workJson.date;
		console.log("dadadadada"+date);	
	 var query="select * from ?? where ??=? AND ??=? ";
		    var table=["timesheet","emp_email",email,"date",date];
		    query=mysql.format(query,table);
		    console.log(query);
		    connection.query(query,function(err,rows){
		    	if(err){
		    		res.json({"error":true,"message":"error executing query"});
		    		console.log(err);
		    	}else{
		    		res.json({"error":false,"message":"Success","timeSheetData":rows});
		    		console.log(rows);
		    	}
	});
		
	});
	
	router.post("/FilterTimesheetEmp",urlencodedparser,function(req,res){
		   var datesJson={};
		   datesJson=req.body;
		  var startDateTS= SheetModel.DateToTimestamp(datesJson.startDate);
		  var endDateTS= SheetModel.DateToTimestamp(datesJson.endDate);
		  
		  var empEmail;
		    var sesn = req.session;
			var email=sesn.email;
		  if(datesJson.empEmail === "none")
		  {
			  empEmail=email;
		  }
		  else{
			 empEmail=datesJson.empEmail ;
		  }
		  
        var query="select * from ?? where ??=? AND ??>=? AND ??<=? order by ?? desc";
			    var table=["timesheet","emp_email",empEmail,"timestamp",startDateTS,"timestamp",endDateTS,"timestamp"];
			    query=mysql.format(query,table);
			    console.log(query);
			    connection.query(query,function(err,rows){
			    	if(err){
			    		res.json({"error":true,"message":"error executing query"});
			    		console.log(err);
			    	}else{
			    		res.json({"error":false,"message":"Success","timeSheetData":rows});
			    		console.log(rows);
			    	}
			    });
				
		});
	
	router.post("/FilterTimesheet",urlencodedparser,function(req,res){
	   var datesJson={};
	   datesJson=req.body;
	  var startDateTS= SheetModel.DateToTimestamp(datesJson.startDate);
	  var endDateTS= SheetModel.DateToTimestamp(datesJson.endDate);
	 
	   var sesn = req.session;
		var email=sesn.email;

		 var query="select * from ?? where ??=? AND ??>=? AND ??<=? order by ?? desc";
		    var table=["timesheet","emp_email",email,"timestamp",startDateTS,"timestamp",endDateTS,"timestamp"];
		    query=mysql.format(query,table);
		    console.log(query);
		    connection.query(query,function(err,rows){
		    	if(err){
		    		res.json({"error":true,"message":"error executing query"});
		    		console.log(err);
		    	}else{
		    		res.json({"error":false,"message":"Success","timeSheetData":rows});
		    		console.log(rows);
		    	}
		    });
			
	});
	
	
	router.post("/AddTimesheetShield",urlencodedparser,function(req,res){
		var sesn = req.session;
		var email=sesn.email;
		
		var workJson={};
		   workJson=req.body;
		   
		var date=workJson.date;
		var am1011=workJson.am1011;
		var am1112=workJson.am1112;
		var	pm1201=workJson.pm1201;
		var pm0102=workJson.pm0102;
		var pm0203=workJson.pm0203;
		var pm0304=workJson.pm0304;
		var pm0405=workJson.pm0405;
		var pm0506=workJson.pm0506;
		var pm0607=workJson.pm0607;
		var extra=workJson.extra;
		
		var Sheet=new sheetBean.SHEET_BEAN();
	   	 Sheet.emp_email=email;
	   	 Sheet.date=date;
	   	 Sheet.timestmp=SheetModel.DateToTimestamp(Sheet.date);
		    
		
 	 SheetModel.DATE_EMAIL_CHECK(Sheet,connection).then(function(data){
       		 
           	 if(data.status){
           		var query="insert into ??(??,??,??,??,??,??,??,??,??,??,??,??,??) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
            	var table=["timesheet","emp_email","date","timestamp","t10_11am","t11_12am","t12_1pm","t1_2pm","t2_3pm",
            	           "t3_4pm","t4_5pm","t5_6pm","t6_7pm","extra",
            	           email,date,Sheet.timestmp,am1011,am1112,pm1201,pm0102,pm0203,pm0304,pm0405,pm0506,pm0607,extra];
            	query=mysql.format(query,table);
            	
            	connection.query(query,function(err,rows){
            		if(err) {
            			res.send("Work Not Added Successful");
                    } else {
                    	res.send("Work Added Successful");
                    }
            	}); 
           	 }
           	 else{
           		
           		var query1="update ?? set ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? where ??=? AND ??=?";
            	var table1=["timesheet","emp_email",email,"date",date,"timestamp",Sheet.timestmp,"t10_11am",am1011,
            	           "t11_12am",am1112,"t12_1pm",pm1201,"t1_2pm",pm0102,"t2_3pm",pm0203,
            	           "t3_4pm",pm0304,"t4_5pm",pm0405,"t5_6pm",pm0506,"t6_7pm",pm0607,"extra",extra,"emp_email",Sheet.emp_email,"date",Sheet.date];
            	query1=mysql.format(query1,table1);
            	
            	connection.query(query1,function(err,rows){
            		if(err) {
            			res.send("Work Not Updated Successful");
                    } else {
                    	res.send("Work Updated Successful");
                    }
            	});
           		 
           	 }
 	 });
		

	
	});
	
	router.post("/AddTimesheet",urlencodedparser,function(req,res){
        var timesheetJson = {};
		timesheetJson=req.body;
		var sesn = req.session;
		var email=sesn.email;
		console.log(timesheetJson);
		
		var x = 0;
		
		function check_Insert_Update(sheet,callback) {
			 var Sheet=new sheetBean.SHEET_BEAN();
		   	 Sheet.emp_email=email;
		   	 Sheet.date=sheet[x].date;
		   	 Sheet.time=sheet[x].time;
		   	 Sheet.title=sheet[x].title;
		   	 
		   	 Sheet.timestmp=SheetModel.DateToTimestamp(Sheet.date);
		    
		   	 SheetModel.DATE_EMAIL_CHECK(Sheet,connection).then(function(data){
       		 
           	 if(data.status){
           		 
           			console.log("Date email check "+"no entry "+data.status);
								
                     SheetModel.INSERTSHEET(Sheet,connection).then(function(data){
					    	if(data.status){
					    		callback();
					    		console.log("insert success "+ Sheet.title+" "+Sheet.date+" "+Sheet.time+" "+Sheet.timestmp); 
					    	}
					    	else{
					    		console.log("insert failure "+ Sheet.title+" "+Sheet.date+" "+Sheet.time);
					    	}
					    });
				
					 }
					else{
						console.log("Date email check "+"entry "+data.status);
						  SheetModel.UPDATESHEET(Sheet,connection).then(function(data){
						    	if(data.status){
						    		callback();
						    		console.log("update success "+ Sheet.title+" "+Sheet.date+" "+Sheet.time);
						    	}
						    	else{
						    		console.log("update failure "+ Sheet.title+" "+Sheet.date+" "+Sheet.time);
						    	}
						    });
					 }
           	
           });
		   	
		    
		}
		var loopArray=function(sheet){
			check_Insert_Update(sheet,function(){
		     
		         x++;
		        if(x < sheet.length) {
		            loopArray(sheet);   
		        }
		    }); 
		};

	
		loopArray(timesheetJson);
		
	res.send("Work Added Successful");
		
		
	}); 

	};
	


module.exports = SHEET_CONTROLLER;