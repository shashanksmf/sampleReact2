import React from 'react';
import ReactDOM from 'react-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, location } from 'react-router';
import config from './../Translations/translations';


var confignew = {
            apiKey: config.appId,
            authDomain: config.authDomain,
            databaseURL: config.databaseURL,
            storageBucket: config.storageBucket,
          };
		  
var secondaryApp = firebase.initializeApp(confignew,"secondry");
class AddCompanies extends React.Component {
	constructor(){
		//console.log("addComapniesdfs  asdasconstructor");
		super();
		
		this.state ={companyNameInput:'',companyInputValue:'',companyName:''};
		this.addCompanyContainerStyle= {"display":"block !important"}
	}
	companyNameValue(event){
           this.state.companyNameInput = event.target.value;
           this.setState({companyInputValue:this.state.companyNameInput});
         }
	addCompanytoList(){
		this.firebaseRef=firebase.database().ref('/'+config.databaseRoot+'/');
	//	console.log("this firebaseRef ",this.firebaseRef);
		this.cmpyCustObj ={"companyName":this.state.companyInputValue};
        this.firebaseRef.child(this.state.companyInputValue).set(this.cmpyCustObj,function(){
		//alert("Comapnies Created Created added ");
        }); 
		
		
	}
	componentWillMount(){
		$(document).ready(function(){
			$('#enableDisableComponentId').hide();
			$('#customerListComponentId').hide();
		});
	}
	saveCompanyData(data){
		this.setState({companyName:data});
	}
	showEnableDisableCompanies(){
		$('#enableDisableComponentId').show();
		$('#customerListComponentId').hide();
	}
	
	render(){
		return (
		<ContentWrapper>
		<div className="addCompaniesWrapper">
		<div className="addCompanyContainer" style={this.addCompanyContainerStyle}>
						<div className="addComapnyInput">
							<input type="text" className="form-control" onChange={this.companyNameValue.bind(this)} value={this.state.companyNameInput} placeholder="CompanyName"/>
							<button onClick={this.addCompanytoList.bind(this)} className="addComapny btn btn-info">addCompany</button>
						</div>
			</div>
			<CompaniesList getCompanyUserByName={this.saveCompanyData.bind(this)}/>
			<div className="container">
				<button onClick={this.showEnableDisableCompanies.bind(this)} className="btn btn-info">Enable Companies</button>
			</div>
			<CustomerList getCompanyName={this.state.companyName}/>
			<EnableDisableCompany/>
			</div>
		
			</ContentWrapper>
			)
	}
	
}

class CompaniesList extends  React.Component{
	constructor(){
		super();
		this.state ={companiesListArr:[],selectedCompany:''};
	}
	getSelectedCompany (event){
			this.state.selectedCompany = event.target.value;
			this.props.getCompanyUserByName(this.state.selectedCompany);
			$('#enableDisableComponentId').hide();
			$('#customerListComponentId').show();
		}
	componentWillMount(){
		var companiesListArrVar =[];
		this.firebaseRef=firebase.database().ref('/'+config.databaseRoot);
		this.firebaseRef.on('value',function(snapshot){
		companiesListArrVar =[]
		var that = this;	
	    snapshot.forEach(function(items,index){
			//console.log("items: ",items.key);
					companiesListArrVar.push(items.key);
						  
				});
			  that.state.companiesListArr = companiesListArrVar;
			  that.setState({companiesListArr:companiesListArrVar});
		}.bind(this));	
			
	
	
		
	}
	render(){
		return(<div className="select-style">
					  <div className="form-group" >
						<div className="selectContainer ">View Customer
							<select name="language" onChange={this.getSelectedCompany.bind(this)} className="form-control">
							{this.state.companiesListArr.map(function(company){
								return (<option value={company}>{company}</option>)	
							})}
							</select>
						</div>
					</div>
							
					</div>);
		
	}
}

class CustomerList extends React.Component{
	constructor(props){
		super(props);
		this.state={companyName:'',customerListArr:[]};
	}
	componentWillReceiveProps(nextProp){
			
		this.state.CompanyName = nextProp.getCompanyName;
		this.firebaseRef=firebase.database().ref('/'+config.databaseRoot+'/'+nextProp.getCompanyName+'/users');
	//	console.log("this.firebaseRef",this.firebaseRef);
		var that = this;	
		that.firebaseRef.on('value',function(snapshot){
		var customerArr=[];
		//console.log("snapshot: ",snapshot.val());
	    snapshot.forEach(function(items,index){
			//	console.log("items:",items.val());
				customerArr.push({'emailId':items.val().emailId});		  
				});
			that.setState({customerListArr:customerArr});
		}.bind(this));	
	}
	
	
	componentWillMount(){
			
	}
	
	render(){
		return(<div className="customerContainer" id="customerListComponentId">
		<AddCustomer companyName={this.state.CompanyName}/>
		<div className="container">
		<table className=" table .table-striped">
		<thead>
			<tr> 
				<th>#</th>
				<th>Email-Id</th>
			</tr>
		</thead>
		<tbody>
			{this.state.customerListArr.map(function(customer,customerIndex){
				return (<tr><td>{customerIndex}</td><td>{customer.emailId}</td></tr>)
				
			})}		
		</tbody>
		</table>
		</div>
		</div>)
		
	}	
}


class AddCustomer extends React.Component{
    constructor () {
		super();
      this.state= {isShowAddCustomer:false,customerEmailId:'',companyName:''};
    }
    
    addCustomerInputType (index) {
         //   console.log('index addinput',index);
       // this.props.addColumnClick();
        this.state.isShowAddCustomer =!this.state.isShowAddCustomer;
        this.setState({isShowAddCustomer:this.state.isShowAddCustomer});
    }

    getcompanyNameInput(event){
        this.state.companyName =event.target.value;
        this.setState({companyName:this.state.companyName}); 
    }
    getEmailIdInput(event){
         this.state.customerEmailId =event.target.value;
        this.setState({customerEmailId:this.state.customerEmailId}); 
    }
    componentWillReceiveProps(nextProp){
		//console.log("nextProp  add customer" ,nextProp.CompanyName);
		this.state.companyName = nextProp.companyName;
	}
    saveCustomerName () {
        //alert("save success");
      //  console.log("sadsad ",this.state,this.state.isShowAddCustomer);
        
        this.setState({isShowAddColumn:this.state.isShowAddCustomer});
		var RandomConfigKey = Math.random();
        var companyNameVar = this.state.companyName;
        var customerEmailIdVar = this.state.customerEmailId;
		
      $.ajax({
          url: 'http://localhost:3099/getRandomPass',
          dataType: "json",
          //contentType: 'application/json',
          data:{'emailId':customerEmailIdVar},
          type: 'POST',
          cache: false,
          success: function(isSuccess) {
            console.log("cleint recieved data",isSuccess,companyNameVar);
             
              if(isSuccess.data =='success'){
                  var tempPassword = isSuccess.tempPassword;
                  console.log(isSuccess.tempPassword,customerEmailIdVar);
                 secondaryApp.auth().createUserWithEmailAndPassword(customerEmailIdVar, tempPassword).then(function(data){
           console.log("data after create usernamewith email id password",data);
           //send temporary password by email
              secondaryApp.auth().currentUser.sendEmailVerification().then(function() {
                alert('Email Verification Sent!');
              });
            var userId = data.uid;
            var fireBaseAuthRef = secondaryApp.auth().currentUser;
            fireBaseAuthRef.updateProfile({
              displayName:companyNameVar,
              //photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(function(isSuccessData) {
             alert("Profile Saved  SuccessFully");  
              var companiesFirebaseRef= firebase.database().ref('/'+config.databaseRoot+'/'+companyNameVar+'/users');
              var cmpyCustObj ={"permissionType":"read/modify",emailId:customerEmailIdVar,"uid":userId,"tempPassword":tempPassword};
                companiesFirebaseRef.child(userId).set(cmpyCustObj,function(){
                alert("UserCreated added ");
                }); 
            }, function(error) {
              console.log("err",error);
            });
          
        }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                  console.log('The password is too weak.');
                } else {
                  console("errorMessage",errorMessage);
                }
      });
              }
              else{
               console.log("data",isSuccess);
                   this.state.isShowAddCustomer =false;
              }
          }.bind(this),
          error: function(xhr, status, err) {
         //  console.log(xhr,status,err);
          }.bind(this)
    });
      this.state.isShowAddCustomer =false;
    }
   
    render () {
        this.showAddCoumnDom;
        if(this.state.isShowAddCustomer){
           this.showAddColumnDom = <div className="addColumnName">
               
                
                Customer Email Id : <input type="text" name="emailid" value={this.state.customerEmailId} onChange={this.getEmailIdInput.bind(this)} />
                Company Name :<input type="text" name="companyname" value={this.state.companyName} onChange={this.getcompanyNameInput.bind(this)} />
                <button className="btn btn-default" onClick={this.saveCustomerName.bind(this)}>Save Customer</button></div>;
        }
        else{
           this.showAddColumnDom='';
        }
        return(<div className="addColumnContainer">
               
               <button className="btn btn-info" onClick={this.addCustomerInputType.bind(this)}>Add Customer</button>
                            
                {this.showAddColumnDom}
            </div>);
    }
}

class EnableDisableCompany extends React.Component{
	constructor(){
		super();
		this.state ={companiesListArr:[], showCompanies:false }
	}
	componentWillMount(){
		var companiesListArrVar =[];
		this.firebaseRef=firebase.database().ref('/'+config.databaseRoot);
		this.firebaseRef.on('value',function(snapshot){
		companiesListArrVar =[]
		var that = this;	
	    snapshot.forEach(function(items,index){
						  if(!items.val().hasOwnProperty("enable") || items.val().enable == undefined){
							//  console.log("enable not found");
								items.val().enable =false;					  
						  }
						companiesListArrVar.push({"companyName":items.key,"enable":items.val().enable});
						
				});
			  that.state.companiesListArr = companiesListArrVar;
			  that.setState({companiesListArr:companiesListArrVar});
		}.bind(this));	
			
	
	
		
	}
	toggleCompanies(){
		this.setState({showCompanies:!this.state.showCompanies})	
	}
	enableCompany(toggleEnable,companyIndex,companyName,event){
	//console.log("toggle",toggleE nable,companyIndex,companyName,event);
	if(toggleEnable == undefined){
		toggleEnable = true;
	}
	this.state.companiesListArr[companyIndex].enable = !toggleEnable;
	this.setState({companiesListArr:this.state.companiesListArr});
	this.firebaseCompanyNameRef=firebase.database().ref('/'+config.databaseRoot+'/'+companyName);
	//	console.log("thisfireba seRef",this.firebaseRef);
		this.cmpyCustObj ={"companyName ":this.state.companyInputValue};
        this.firebaseCompanyNameRef.child("enable").set(!toggleEnable,function(){
               // alert("lock u pdated");
        });  	
	}

	render(){
			var parentThis = this;
		
		return(<div className="enableDisableContainer" id="enableDisableComponentId">
			<div className="enableDisableCompanyBtn">
				
			</div>
					
				<table className="table table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>CompanyName</th>
						<th>Enable</th>
					</tr>
				</thead>
				<tbody>
				{parentThis.state.companiesListArr.map(function(company,companyIndex){
					return(<tr>
						<td>{companyIndex+1}</td>
						<td>{company.companyName}</td>
						<td><label className="switch ">
                              <input type="checkbox" checked={company.enable} onClick={parentThis.enableCompany.bind(parentThis,company.enable,companyIndex,company.companyName)} />
                              <em></em>
                             </label>
						</td>
					</tr>)
				}.bind(parentThis))}
				</tbody>
				</table>
		
		
		
		</div>)
		
	}
}
export default AddCompanies;	