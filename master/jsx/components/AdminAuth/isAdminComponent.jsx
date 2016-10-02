import config from './../Translations/translations';

var isAdmin = function(){

		
		 var deferred = $.Deferred();
	    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            try{
            var companyName = JSON.parse(localStorage.getItem(config.localStorageUserApiKey)).displayName;
            }
            catch(ex){
                console.log("ex: ",ex);
            }
        var isAdminPresent ='';
		//	console.log("active is admin user");
			    var firebaseRef=firebase.database().ref('/comapnies/'+companyName+'/users');
				firebaseRef.once('value',function(snapshot){
					snapshot.forEach(function(items,index){
					//	console.log("items",items.val());
					var userEmailId = JSON.parse(localStorage.getItem(config.localStorageUserApiKey)).email; 
						//console.log("userEmailId",userEmailId,"firebaws emails",items.val().emailId);
						if(userEmailId == items.val().emailId){
							if(items.val().hasOwnProperty('role')){
								if(items.val().role == 'admin'){
									isAdminPresent =true;
									 deferred.resolve(isAdminPresent);
									return isAdminPresent;
									
								}
							}
							else{
								isAdminPresent =false;
								deferred.resolve(isAdminPresent);
								return isAdminPresent;
							}
						}
						
					})
					
				})
        } else {
		//	console.log("user not logged In");
				 isAdminPresent ='null'
				 deferred.resolve(isAdminPresent);
				 return isAdminPresent;
        }    
 })
     return deferred.promise();
}
module.exports = isAdmin;