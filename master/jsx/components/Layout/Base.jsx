import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header'
import Sidebar from './Sidebar'
import Offsidebar from './Offsidebar'
import Footer from './Footer'
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, location } from 'react-router';
import isAdmin from '../AdminAuth/isAdminComponent'

class Base extends React.Component {
	
    constructor(){
	    super();
	 	var that= this;
		that.startActiveInterval=null;
	   var isEvent = false;
	    $(document).on('click',document,function(){
			isEvent = true;		
			console.log("document onclick");
			clearInterval(that.startActiveInterval);
			that.startActiveInterval = setInterval(checkIsUserActive,1000*60*60);
		});    

		that.startActiveInterval = setInterval(checkIsUserActive,1000*60*60); 
		
	function checkIsUserActive(){
			if(isEvent == false){
						console.log("setintervalif");
						isEvent = false;
						firebase.auth().signOut().then(function() {
							console.log('Signed Out t');
							localStorage.setItem('isLoggenIn','');
							localStorage.setItem('timeStamp','');
							 browserHistory.push('lock');
							   clearInterval(startActiveInterval);
							}, function(error) {
							  console.error('Sign Out Error', error);
							});
					}
					else{
						isEvent = false;	
						//console.log("setinterval else");				
					}
	}
		
		
   } 
   componentDidMount(){
	     updateTimeStamp();
	    function updateTimeStamp(){
			console.log("updatetimes tampo  called");
			var isLoggenIn = localStorage.getItem('isLoggenIn');
				if(isLoggenIn != undefined && isLoggenIn.length > 0 ){
					$.ajax({
				  url: 'http://localhost:3099/validateToken',
				 
				  data:{'isLoggenIn':isLoggenIn ,'currentTime':new Date().toISOString(),'timeStamp':localStorage.getItem('timeStamp')},
				  type: 'POST',
				  cache: false,
				  success: function(isSuccess) {
					  console.log("isSuccess",isSuccess);
					if(isSuccess == 'false'){
						localStorage.setItem('timeStamp','')
						//browserHistory.push('lock');		
					}else if(isSuccess == 'true'){
						     $.ajax({
								  url: 'http://localhost:3099/getNewTimeStampToken',
								  //dataType: "json",
								  data:{'timeStamp':new Date().toISOString()},
								  type: 'POST',
								  cache: false,
								  
								  success: function(timeStampData) {
									  console.log("new time stamp",timeStampData);
									localStorage.setItem('timeStamp',timeStampData);
										setTimeout(function(){
											updateTimeStamp();
										},1000*60*60*3);
								  }.bind(this),
								  error: function(xhr, status, err) {
								  
								  }.bind(this)
							});
					}
				       
				  }.bind(this),
				  error: function(xhr, status, err) {
				   console.log("errro base",xhr,status,err);
				  }.bind(this)
				});        
			  }
	
	 }   
   }
    render() {

        // Animations supported
        //      'rag-fadeIn'
        //      'rag-fadeInUp'
        //      'rag-fadeInDown'
        //      'rag-fadeInRight'
        //      'rag-fadeInLeft'
        //      'rag-fadeInUpBig'
        //      'rag-fadeInDownBig'
        //      'rag-fadeInRightBig'
        //      'rag-fadeInLeftBig'
        //      'rag-zoomBackDown'

        const animationName = 'rag-fadeIn'

        return (
            <div className="wrapper">
                <Header />

                <Sidebar/>

                <Offsidebar />

                <ReactCSSTransitionGroup
                  component="section"
                  transitionName={animationName}
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {React.cloneElement(this.props.children, {
                    key: Math.random()
                  })}
                </ReactCSSTransitionGroup>

                <Footer />
            </div>
        );
    }

}

export default Base;
