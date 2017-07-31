function SHEET_BEAN(){

	        var id;
	        var projects;
		    var emp_email;
			var date;
			var time;
			var title;
			var timestmp;
	
			Object.defineProperty(this,"timestmp",{
				get:function(){
				return timestmp;	
				},
				set:function(value){
				timestmp=value;
				}
			 });
			
			Object.defineProperty(this,"emp_email",{
				get:function(){
				return emp_email;	
				},
				set:function(value){
				emp_email=value;
				}
			 });	
			
			Object.defineProperty(this,"date",{
				get:function(){
				return date;	
				},
				set:function(value){
				date=value;
				}
			 });
			
			Object.defineProperty(this,"time",{
				get:function(){
				return time;	
				},
				set:function(value){
				time=value;
				}
			 });
			
			Object.defineProperty(this,"title",{
				get:function(){
				return title;	
				},
				set:function(value){
				title=value;
				}
			 });
			
			
			Object.defineProperty(this,"projects",{
				get:function(){
				return projects;	
				},
				set:function(value){
					projects=value;
				}
			 });
			
			Object.defineProperty(this,"id",{
				get:function(){
				console.log("get id"+id);	
				return id;	
				},
				set:function(value){
					id=value;
					console.log("set id"+value);
				}
			 });
			
}

module.exports.SHEET_BEAN=SHEET_BEAN;