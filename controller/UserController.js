var bodyparser=require('body-parser');
var urlencodedparser=bodyparser.urlencoded({extended : false});

var usermodel=require("../model/UserModel.js");
var UserBean=require("../bean/UserBean.js");



function USER_CONTROLLER(router,connection){
	var self=this;
	self.handleRoutes(router,connection);
}

USER_CONTROLLER.prototype.handleRoutes=function(router,connection){
	
	
	router.get("/EmployeesDetails",function(req,res){
				var sesn = req.session;
				var email=sesn.email;
				
				usermodel.GET_DESIGNATION_REPORTED(email,connection).then(function(data){
					var designation=data[0].designation;
					var email=data[0].email;
					console.log("designation"+designation+" "+"email"+email);
					usermodel.GET_USERS(designation,email,connection).then(function(userdata){
						res.json({"error":false,"message":"Success","users":userdata});
						console.log(userdata);
				    });
					
					});
			});
			
	
	router.post("/UserLogin",urlencodedparser,function(req,res){
		 var email= req.body.email;
		 var password=req.body.password;
		
		usermodel.EMAIL_CHECK(email,connection,function(err,data){
			if(err){
				res.render("login.html",{
					 msg:"Email Not Exists."
				 	});
			}
			else{
				console.log(data.status);
				if(data.status){
					
				    res.render("login.html",{
				     msg:"Email Not Exists."
					 	});
				}
				else{
					
				 var User=new UserBean.USER_BEAN();
				 User.email=email;
				 User.password=password;
				
			   	  usermodel.LOGIN(User,connection,function(err,data){
					  if(err){
						  res.redirect("/login.html");
					  }
					  else{
						 
						   if(data.length >0){
						   console.log(data[0].email);
						  var sesn=req.session;
						   sesn.first_name=data[0].first_name;
						   sesn.last_name=data[0].last_name;
						   sesn.email=data[0].email;
						   
						  res.redirect('/tms/home.html');
						  }
						  else{
						   res.redirect("/tms/login.html");
						  }
					  }
					
				    });	
				}
				
			}  //else email check
			
		});
				
	});
	
	
	router.get('/LogOut',function(request,response){
		request.session.destroy(function(err) {
		  if(err) {
		    console.log(err);
		  } else {
			  response.redirect('/tms/login.html');
		  }
		}); 
		});
	
	
	router.post("/UserRegistration",urlencodedparser,function(req,res){
		
		var obj = {};
		
		//res.status(200);
		console.log(req.body);
		
		obj=req.body;
		
	    var firstName=obj.firstName;
		var lastName=obj.lastName;
		var email=obj.email;
		var password=obj.password;
		
		//res.send("Registered Successfully.");	
	     //can put empty conditions here
		
					
					usermodel.EMAIL_CHECK(email,connection,function(err,data){
						if(err){
							res.send("Email Already exist");
						}
						else{
							if(data.status){

								var User=new UserBean.USER_BEAN();
								User.first_name=firstName;
								User.last_name=lastName;
								User.email=email;
								User.password=password;
								
                               usermodel.REGISTRATION(User,connection,function(err,data){
									
									if(err){
										res.send("Registration Not Successful.");	
									}
									else{
										if(data.status){
											res.send("Registered Successfully. Click Login to continue..");		
										}
									}	
									
								});	
							}
							else{
								res.send("Email Already Exists");	
							 }
						}
				

				});
	
	});

	
	
};

module.exports = USER_CONTROLLER;