import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';

class Inactive extends React.Component {
	constructor(){
			 super();
			this.state={emailId:''};
	}

	onEmailIdInputChange(event){
    this.setState({password:event.target.value});
    }
	activateSession(password,event){
		
		var emailId =  localStorage.getItem('userEmailId');
		firebase.auth().signInWithEmailAndPassword(emailId,password).then(function(success){
             firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
       
        if (user) {
          // User is signed in.
        
		  localStorage.setItem('userEmailId',user.email);
          $.ajax({
          url: 'http://localhost:3099/createToken',
          //dataType: "json",
          data:{'isLoggedIn':true,'timeStamp':new Date().toISOString()},
          type: 'POST',
          cache: false,
		  
          success: function(timeStampData) {
          //  console.log("login timeStamp Data :",((timeStampData)));
			var timeStampEnData =timeStampData.split("split");
			//console.log("is loggen in ",timeStampEnData[0]);
			var isLoggenIn = timeStampEnData[0];
			var timeStampen = timeStampEnData[1]
            localStorage.setItem('isLoggenIn',isLoggenIn);
			localStorage.setItem('timeStamp',timeStampen);
			browserHistory.replace('table-datatable');
			
            
          }.bind(this),
          error: function(xhr, status, err) {
          console.log("loginerror",xhr, status, err);
          }.bind(this)
    });
        
        
        
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          
            console.log("else");
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
      
        // [END_EXCLUDE]
      });
       
      
                    
       }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          
          
            swal({
                title: "Wrong Email-Id and Password",
                text: errorMessage,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Forget Password!",
                closeOnConfirm: true,
                cancelButtonText: "Try Again"
            },
            function() {
               // swal("Deleted!", "Your imaginary file has been deleted.", "success");
				browserHistory.push('recover');
            })
          
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
	}
    render() {
		var emailId =  localStorage.getItem('userEmailId');
        return (
            <div className="block-center mt-xl wd-xl">
                { /* START panel */ }
                <div className="panel panel-dark panel-flat">
                    <div className="panel-heading text-center">
                        <a href="#">
                            <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
                        </a>
                    </div>
                    <div className="panel-body">
                        <p className="text-center pv">Resume Session</p>
                       
                            <p className="text-center"></p>
                            <div className="form-group has-feedback">
                                <label htmlFor="resetInputEmail1" className="text-muted">{emailId}</label>
                                <input id="resetInputEmail1" type="email" placeholder="Enter email" autoComplete="off" className="form-control"  onChange={this.onEmailIdInputChange.bind(this)} value={this.state.password}/>
                                <span className="fa fa-envelope form-control-feedback text-muted"></span>
                            </div>
                            <button type="button" onClick={this.activateSession.bind(this,this.state.password)} className="btn btn-danger btn-block">Reset</button>
                      
                    </div>
                </div>
                { /* END panel */ }
            </div>
            );
    }

}

export default Inactive;

