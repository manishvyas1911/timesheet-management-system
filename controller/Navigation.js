
var path = require('path');



function NAVIGATION(router,passport){
	var self=this;
	self.handleRoutes(router,passport);
};

NAVIGATION.prototype.handleRoutes=function(router,passport){
	 
	router.get("/",function(req,res){
		res.sendFile(path.resolve(__dirname+"/../views/"+'login.html'));
     });
	
	router.get("/login.html",function(req,res){
		res.sendFile(path.resolve(__dirname+"/../views/"+'login.html'));
	  });
	 
	router.get("/register.html",function(req,res){
		 res.sendFile(path.resolve(__dirname+"/../views/"+'register.html'));
	});
	router.get("/game.html",function(req,res){
		 res.sendFile(path.resolve(__dirname+"/../views/"+'game.html'));
	});
	
	router.get("/showDetailedAttendance.html",function(req,res){
		var sesn = req.session;
		if(sesn.email ) {
			 // res.sendFile(__dirname+"/views/"+'timesheet.html');
			res.render("showDetailedAttendance.html",{
	    		  email:sesn.email,
	    		  first_name:sesn.first_name,
			      last_name:sesn.last_name
	    		});
		}
		else {
			 res.redirect('login.html');
		    
		}
	});
	
	router.get("/home.html",function(req,res){
		var sesn = req.session;
		
		if(sesn.email ) {
			 // res.sendFile(__dirname+"/views/"+'timesheet.html');
			res.render("home.html",{
	    		  email:sesn.email,
	    		  first_name:sesn.first_name,
			      last_name:sesn.last_name
	    		});
		}
		else {
			 res.redirect('login.html');
		    
		}
	});
	
	router.get("/addtimesheet.html",function(req,res){
		var sesn=req.session;
		
		if(sesn.email){
			res.render("addtimesheet.html",{
				 email:sesn.email,
	    		 first_name:sesn.first_name,
			     last_name:sesn.last_name
			});
		}
		else {
			 res.sendFile(path.resolve(__dirname+"/../views/"+'login.html'));
		}
	});
	
	router.get("/viewtimesheet.html",function(req,res){
		var sesn=req.session;
		
		if(sesn.email){
			res.render("viewtimesheet.html",{
				 email:sesn.email,
	    		 first_name:sesn.first_name,
			     last_name:sesn.last_name
			});
		}
		else {
			 res.sendFile(path.resolve(__dirname+"/../views/"+'login.html'));
		}
	});
	
	
	
	router.get("/profile.html",function(req,res){
		var sesn=req.session;
		
		if(sesn.email){
			res.render("profile.html",{
				 email:sesn.email,
	    		 first_name:sesn.first_name,
			     last_name:sesn.last_name
			});
		}
		else {
			res.sendFile(__dirname+"/../views/"+'login.html');
		}
	});
	
	
	router.get("/employeesheet.html",function(req,res){
		var sesn=req.session;
		
		if(sesn.email){
			res.render("employeesheet.html",{
				 email:sesn.email,
	    		 first_name:sesn.first_name,
			     last_name:sesn.last_name
			});
		}
		else {
			 res.sendFile(path.resolve(__dirname+"/../views/"+'login.html'));
		}
	});
	
/*	router.get('/', function(req, res) {
	        res.render('login.html'); // load the index.ejs file
	    });

	    // route for login form
	    // route for processing the login form
	    // route for signup form
	    // route for processing the signup form

	    // route for showing the profile page
	router.get('/profile', isLoggedIn, function(req, res) {
	    	res.render("home.html",{
	    		  email:"",
	    		  first_name:"",
			      last_name:""
	    		});
	    });
	
	    // =====================================
	    // FACEBOOK ROUTES =====================
	    // =====================================
	    // route for facebook authentication and login
	router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

	    // handle the callback after facebook has authenticated the user
	router.get('/auth/facebook/callback',
	        passport.authenticate('facebook', {
	            successRedirect : '/',
	            failureRedirect : '/'
	        }));

	    // route for logging out
	router.get('/logout', function(req, res) {
	        req.logout();
	        res.redirect('/');
	    });*/

	

/*	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on
	    if (req.isAuthenticated())
	    { return next();
	    }
	    // if they aren't redirect them to the home page
	    res.redirect('/');
	}*/
	
	
};


module.exports=NAVIGATION;
