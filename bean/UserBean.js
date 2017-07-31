function USER_BEAN(){
	var id;
	var first_name;
	var last_name;
	var designation;
	var email;
	var password;
	
	Object.defineProperty(this,"id",{
		get:function(){
		return id;	
		},
		set:function(value){
		id=value;
		}
	 });
	Object.defineProperty(this,"first_name",{
		get:function(){
		return first_name;	
		},
		set:function(value){
		first_name=value;
		}
	 });
	Object.defineProperty(this,"last_name",{
		get:function(){
		return last_name;	
		},
		set:function(value){
		last_name=value;
		}
	 });
	Object.defineProperty(this,"designation",{
		get:function(){
		return designation;	
		},
		set:function(value){
		designation=value;
		}
	 });
	Object.defineProperty(this,"email",{
		get:function(){
		return email;	
		},
		set:function(value){
		email=value;
		}
	 });
	Object.defineProperty(this,"password",{
		get:function(){
		return password;	
		},
		set:function(value){
		password=value;
		}
	 });
	
}

module.exports.USER_BEAN=USER_BEAN;