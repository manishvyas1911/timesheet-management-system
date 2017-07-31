function ATTENDANCE_BEAN(){

	        var id;
	        var emp_email;
			var sign_date;
			var sign_time;
			var sign_timestamp;
			var sign_status;
			
			Object.defineProperty(this,"sign_status",{
				get:function(){
				return sign_status;	
				},
				set:function(value){
					sign_status=value;
				} 
			 });
	
			Object.defineProperty(this,"sign_timestamp",{
				get:function(){
				return sign_timestamp;	
				},
				set:function(value){
				sign_timestamp=value;
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
			
			Object.defineProperty(this,"sign_date",{
				get:function(){
				return sign_date;	
				},
				set:function(value){
				sign_date=value;
				}
			 });
			
			Object.defineProperty(this,"sign_time",{
				get:function(){
				return sign_time;	
				},
				set:function(value){
				sign_time=value;
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

module.exports.ATTENDANCE_BEAN=ATTENDANCE_BEAN;