var bodyparser=require('body-parser');
var urlencodedparser=bodyparser.urlencoded({extended : false});


var AttendanceModel=require("../model/AttendanceModel.js");
var attendanceBean=require("../bean/AttendanceBean.js");

function ATTENDANCE_CONTROLLER(router,connection){
	var self=this;
	self.handleRoutes(router,connection);
}

ATTENDANCE_CONTROLLER.prototype.handleRoutes=function(router,connection){
	
	
  router.get("/EmployeesDetails",function(req,res){
				var sesn = req.session;
				var email=sesn.email;
				
				
			});
			
	
	router.post("/AddSwipeIn",urlencodedparser,function(req,res){
		var sesn = req.session;
		var email=sesn.email;
		
		var signArr={};
		signArr=req.body;
		var currentMillis=signArr.current;
		let Attendance=new attendanceBean.ATTENDANCE_BEAN();
		
		Attendance.emp_email=email;
		Attendance.sign_date=AttendanceModel.DateFromTimestamp(currentMillis);
		Attendance.sign_time=AttendanceModel.TimeFromTimestamp(currentMillis);
		Attendance.sign_timestamp=signArr.current;
		Attendance.sign_status="In";
		
		AttendanceModel.Sign(Attendance,connection).then(function(data){
			
			if(data.status){
				data.sign_date=Attendance.sign_date;
				data.sign_time=Attendance.sign_time;
				data.sign_status=Attendance.sign_status;
				res.json(data);
			}
			else{
		       res.json(data);
			}
		 });
		
			
	
				
	});
	
	router.post("/AddSwipeOut",urlencodedparser,function(req,res){
		var sesn = req.session;
		var email=sesn.email;
		
		var signArr={};
		signArr=req.body;
		var currentMillis=signArr.current;
		let Attendance=new attendanceBean.ATTENDANCE_BEAN();
		
		Attendance.emp_email=email;
		Attendance.sign_date=AttendanceModel.DateFromTimestamp(currentMillis);
		Attendance.sign_time=AttendanceModel.TimeFromTimestamp(currentMillis);
		Attendance.sign_timestamp=signArr.current;
		Attendance.sign_status="Out";
		
		//Out And Update
		AttendanceModel.Sign(Attendance,connection).then(function(data){
			console.log(data+"signout"); 
			if(data.status){
				data.sign_date=Attendance.sign_date;
				data.sign_time=Attendance.sign_time;
				data.sign_status=Attendance.sign_status;
				res.json(data);
			}
			else{
		       res.json(data);
			}
		 });
		
	});
	
	router.get("/GetSignStatus",function(req,res){
		var sesn = req.session;
		var email=sesn.email;
		AttendanceModel.GET_SIGN_STATUS(email,connection).then(function(data){
		 res.json(data);
		 });
		
	});
	
	router.get("/ViewSinSout",function(req,res){
		var sesn = req.session;
		var email=sesn.email;
		AttendanceModel.GetHistorySignins(email,connection).then(function(data){
			res.json(data);
			
		 });
		
	});
	
	
	
	

	
	
};

module.exports = ATTENDANCE_CONTROLLER;
