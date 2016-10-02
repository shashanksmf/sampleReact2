import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, location } from 'react-router';

class Login extends React.Component {
    constructor(props){
        super(props);
        //console.log("login props",props);
        this.state={emailId:'',password:'',isAdmin:false};
    }
    onEmailIdInputChange(event){
    this.setState({emailId:event.target.value});
    }
    onPasswordInputChange(event){
    this.setState({password:event.target.value});
    }
    submitLogin(emailId,password,event){
        console.log(emailId,password,event);
       // [START authwithemail]
       firebase.auth().signInWithEmailAndPassword(emailId,password).then(function(success){
             firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
       
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
		  localStorage.setItem('userEmailId',user.email);
          console.log("user",user.uid)
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE silent]
        
        
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
			browserHistory.push('table-datatable');
			
            
          }.bind(this),
          error: function(xhr, status, err) {
          console.log("login error",xhr, status, err);
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
    
    console.log("submit login",event);
      ;
    }

    render() {
        return (
            <div dir="rtl" className="block-center mt-xl wd-xl">
                { /* START panel */ }
                <div className="panel panel-dark panel-flat customclass">
                    <div className="panel-heading text-center">
                        <a href="#">
                            <img src="img/logo-r4z.png" alt="Image" className="block-center img-rounded" />
                        </a>
                    </div>
                    <div className="panel-body">
                            <div className="line-scale-pulse-out-rapid panel-centered">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        <p className="text-center pv">התחבר כדי להמשיך.</p>
                       
                            <div className="form-group has-feedback">
                                <input dir="ltr" id="exampleInputEmail1" type="email" placeholder="דואר אלקטרוני" autoComplete="off" required="required" className="form-control" value={this.state.emailId} onChange={this.onEmailIdInputChange.bind(this)} />
                                <span className="fa fa-envelope form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input dir="ltr" id="exampleInputPassword1" type="password" placeholder="סיסמא" required="required" className="form-control" value={this.state.password} onChange={this.onPasswordInputChange.bind(this)}/>
                                <span className="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
                            <div className="clearfix">
                                <div dir="ltr" className="checkbox c-checkbox pull-right mt0">
                                    <label>
                                        <input type="checkbox" value="" name="remember" />
                                        <em className="fa fa-check"></em>?זכור אותי</label>
                                </div>
                                <div className="pull-left"><a href="/recover" className="text-muted">שחזור סיסמא</a>
                                </div>
                            </div>
                            <button type="submit" onClick={this.submitLogin.bind(this,this.state.emailId,this.state.password)} className="btn btn-block btn-primary mt-lg">התחבר</button>
                      
                    </div>
                </div>
                { /* END panel */ }
            </div>
            );
    }

}

export default Login;


