var configAuth=require("../config/auth.js");
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var usermodel=require("../model/UserModel.js");
var UserBean=require("../bean/UserBean.js");

function FACEBOOK_LOGIN(passport,connection,router){
	
	   router.use(passport.initialize());
	    router.use(passport.session());
	    
	// Passport session setup.
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});
	
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields: ['email',"displayName","name"]
      },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
        	/*console.log(profile.id);
        	console.log(token);
        	console.log(profile.displayName);
        	console.log(profile.emails[0].value);
        	console.log(profile.name.givenName);
        	console.log(profile.name.familyName);
        	console.log(JSON.stringify(profile));
        	*/
        	
        	var User=new UserBean.USER_BEAN();
			 User.email=profile.emails[0].value;
			 User.first_name=profile.name.givenName;
			 User.last_name=profile.name.familyName;
			 User.password=profile.emails[0].value;
			
			 usermodel.FACEBOOK_LOGIN(User,connection,function(err,data){
        		if(err){
        			throw err;}
        		else{
        			
        		
        			 if(data.length===0){
        				usermodel.REGISTRATION(User,connection,function(err,data){
        					if(err){
								console.log("Registration Not Successful.");	
							}
							else{
								if(data.status){
									console.log("Successfully Registered with facebook");
									
								}
								
							}
        				});
        				
        			 }
        			 else{
        				 console.log("already registered");
        			 }
        		}
        	});
			 return done(null, profile);
          
        });

    }));
 
    function ensureAuthenticated(req, res, next) {
  	  if (req.isAuthenticated()) { return next(); }
  	 
  	  res.redirect('/tms/home.html');
  	  } 
       

    	router.get('/account', ensureAuthenticated, function(req, res){
    		 var sesn=req.session;
			   sesn.first_name=req.user.name.givenName;
			   sesn.last_name=req.user.name.familyName;
			   sesn.email=req.user.emails[0].value;
			   res.redirect('/tms/home.html');
    	});

    	router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));


    	router.get('/auth/facebook/callback',
    	  passport.authenticate('facebook', { successRedirect : '/tms/account', failureRedirect: '/tms/login.html' }));

    	/*router.get('/logout', function(req, res){
    	  req.logout();
    	  res.redirect('/');
    	});*/


    	   
}

module.exports = FACEBOOK_LOGIN;
