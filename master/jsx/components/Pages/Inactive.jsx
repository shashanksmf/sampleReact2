import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

class Inactive extends React.Component {
	constructor(){
			 super();
			this.state={emailId:''};
	}

	onEmailIdInputChange(event){
    this.setState({emailId:event.target.value});
    }
	recoverPassword(){
		 firebase.auth().sendPasswordResetEmail(this.state.emailId).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        swal({
            title: "Email Sent!",
            text: "Please check your email and reset Password !",
            type: "success"
        });
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        swal({
            title: "Warning!",
            text: "If a user exists then the email would be send",
            type: "success"
        });
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
                            <button type="button" onClick={this.recoverPassword.bind(this,this.state.password,this.state.password)} className="btn btn-danger btn-block">Reset</button>
                      
                    </div>
                </div>
                { /* END panel */ }
            </div>
            );
    }

}

export default Inactive;

