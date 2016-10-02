import React from 'react';
import ReactDOM from 'react-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import DatatableRun from './Datatable.run';
import TableExtendedRun from './TableExtended.run';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, location } from 'react-router';
import isAdmin from '../AdminAuth/isAdminComponent';
import config from './../Translations/translations'

  var ColumnTypeMapping =["input","checkbox","dropdown"];
class EditSaveBox extends React.Component{
    constructor(props,context){
        super(props,context);
      //  console.log("props edit save table ",props);
        if(props.showHideClassName!=undefined){
            this.getEditBoxStyleBool = props.showHideClassName== true ? 'active':'inactive';      
        }
        this.state= {inputValue:this.props.inputValue!=undefined ? this.props.inputValue :'' ,inputChangeValue:this.props.inputChangeValue,objectKey:this.props.objectKey,objectIndex:this.props.objectIndex};

       
    }
    componentWillReceiveProps(props){
        //console.log("edit save props ",props);
       this.getEditBoxStyleBool = props.showHideClassName== true ? 'active':'inactive'; this.setState({inputValue:props.inputValue,inputChangeValue:props.inputChangeValue,objectKey:props.objectKey,objectIndex:props.objectIndex,showHideEditBox:this.getEditBoxStyleBool});
        setTimeout(function(){
             $('td > .popover').each(function(items){ 
             var divwidth = $(this).width();
             var tdwidth =  $(this).parent().width();
              var left =(((tdwidth-divwidth)/tdwidth)*100)/2;
           // console.log("left",left)
            $(this).css('left',left+'%');
            })
        })
       
    }
    componentWillMount(){
        this.setState({showHideEditBox:this.getEditBoxStyleBool==undefined?'inactive':this.getEditBoxStyleBool})
    }

    inputChangeValue(event){
        this.state.inputValue = event.target.value;
        this.setState({inputValue:this.state.inputValue});
    }

    setParentState(){
       
        this.props.saveRecord(this.state.inputValue,this.state.objectKey,this.state.objectIndex);
        var _this = this;
        setTimeout(function(){
            _this.setState({showHideEditBox:'inactive'});
            console.log("save sadds record:  ", _this.state.showHideEditBox);
        },500);
       
    }
    closeEditSavePopUp(){
        this.setState({showHideEditBox:'inactive'});
    }

    render(){
       
        return(
          
            <div  key={['editinputBoxSpanrecipient', this.state.objectIndex,this.state. objectKey].join('_')} className={"popover fade top in editable-container editable-popup "+ this.state.showHideEditBox} role="tooltip">
                <div className="arrow">
                </div>
                <div className="popover-content"> 
                    <div><div className="editableform-loading"></div>
                    <div className="form-inline editableform" >
                        <div className="control-group form-group">
                            <div>
                                <div className="editable-input" >
                                    <input classnName={this.props.showHideClassName} key={['inputrecipientt', this.state.objectIndex,this.state. objectKey].join('_')}   type="text" 
                                className={"form-control input-sm "+this.props.editInputClassName} onChange={this.inputChangeValue.bind(this)} value={this.state.inputValue}/>
                               
                                </div>
                                <div className="editable-buttons">
                                    <button key={['btnokreciepient', this.state.objectIndex,this.state. objectKey].join('_')}  onClick={this.setParentState.bind(this)} className={"btn btn-primary btn-sm editable-submit "} type="button"><i className="fa fa-fw fa-check"></i></button>
                                    <button type="button" onClick={this.closeEditSavePopUp.bind(this)} key={['btnremoverecipient', this.state.objectIndex,this.state. objectKey].join('_')} className={"btn btn-default btn-sm editable-cancel "} ><i className="fa fa-fw fa-times"></i></button>
                                </div>
                            </div>
                            <div className="editable-error-block help-block" ></div>
                        </div>
                        </div>
                </div>
                </div>
            </div>
            
            
            
               
        );
    }
}
class CustomColumnsEditSaveBox extends React.Component{
    constructor(props,context){
        super(props,context);
        console.log("customColumns edit save table ",props);
        if(props.showHideClassName!=undefined){
            this.getEditBoxStyleBool = props.showHideClassName== true ? 'active':'inactive';      
        }
        this.state= {inputValue:this.props.inputValue!=undefined ? this.props.inputValue :'' ,inputChangeValue:this.props.inputChangeValue,objectIndex:this.props.objectIndex,showHideEditBox:this.getEditBoxStyleBool};

       
    }
    componentWillReceiveProps(props){
        console.log("edit save props ",props);
      if(props.showHideClassName!=undefined){
            this.getEditBoxStyleBool = props.showHideClassName== true ? 'active':'inactive';      
        } this.setState({inputValue:props.inputValue,inputChangeValue:props.inputChangeValue,objectIndex:props.objectIndex,showHideEditBox:this.getEditBoxStyleBool});
    }
    componentDidMount(){
        this.setState({showHideEditBox:this.getEditBoxStyleBool==undefined?'inactive':this.getEditBoxStyleBool})
    }
    componentWillMount(){
        this.setState({showHideEditBox:this.getEditBoxStyleBool==undefined?'inactive':this.getEditBoxStyleBool})
    }
    inputChangeValue(event){
        this.state.inputValue = event.target.value;
        this.setState({inputValue:this.state.inputValue});
    }

    setParentState(){
       
        this.props.saveRecord();
        var _this = this;
        setTimeout(function(){
            _this.setState({showHideEditBox:'inactive'});
            console.log("save sadds record:  ", _this.state.showHideEditBox);
        },500);
       
    }
    closeEditSavePopUp(){
        this.setState({showHideEditBox:'inactive'});
    }

    render(){
       
        return(
            <div  key={['editinputBoxSpanrecipient', this.state.objectIndex].join('_')} className={"popover fade top in editable-container editable-popup "+ this.state.showHideEditBox} role="tooltip">
                <div className="arrow">
                </div>
                <div className="popover-content"> 
                    <div><div className="editableform-loading"></div>
                    <div className="form-inline editableform" >
                        <div className="control-group form-group">
                            <div>
                                <div className="editable-input" >
                                    <input classnName={this.props.showHideClassName} key={['inputrecipientt', this.state.objectIndex].join('_')}   type="text" 
                                className={"form-control input-sm "+this.props.editInputClassName} onChange={this.inputChangeValue.bind(this)} value={this.state.inputValue}/>
                               
                                </div>
                                <div className="editable-buttons">
                                    <button key={['btnokreciepient', this.state.objectIndex].join('_')}  onClick={this.setParentState.bind(this)} className={"btn btn-primary btn-sm editable-submit "} type="button"><i className="fa fa-fw fa-check"></i></button>
                                    <button type="button" onClick={this.closeEditSavePopUp.bind(this)} key={['btnremoverecipient', this.state.objectIndex].join('_')} className={"btn btn-default btn-sm editable-cancel "} ><i className="fa fa-fw fa-times"></i></button>
                                </div>
                            </div>
                            <div className="editable-error-block help-block" ></div>
                        </div>
                        </div>
                </div>
                </div>
            </div>
        );
    }
}


    class Modal extends React.Component{
		constructor(props){
			super(props);
			//console.log("props",props);
			this.classDropDown = ['default','primary','success','info','warning','danger','link'];
			this.state={dropDownName:[],customColumnNameInput:'',columnClass:''};
		}
        closeMyModal(){
           // console.log("close modal called")
            $('#myModal').hide();
        }
		componentWillReceiveProps(nextprops){
		//	console.log("nextprops",nextprops);
			this.setState({dropDownName:nextprops});
		}
        componentWillMount(){
			var that = this;
		//	console.log("that.props.columnsArr will mount",that.state.dropDownName==undefined?[]:that.state.dropDownName);
			setTimeout(function(){
					autoCompleteColumns(that.state.dropDownName);
			},3000);
        }
        componentWillUpdate(){
         var that= this;
		//	console.log("that.props.columnsArr will update",that.state.dropDownName==undefined?[]:that.state.dropDownName);
			setTimeout(function(){
					autoCompleteColumns(that.state.dropDownName);
			},3000);        
        }
		customColumnNameInputChange(event){
			this.setState({customColumnNameInput:event.target.value});
		}
		getLogicColumnDetails(){
			var columnName = this.state.customColumnNameInput;
			var logic = $('#tags').val();
			var Text = $('#modalText').val();
			//console.log("columnName : ",columnName,"Logic : ",logic,'addText':Text);
			var logicData ={'columnName':columnName,'logic':logic,'columnClass':this.state.columnClass,'addText':Text};
			this.props.sendLogicToAddColumn(logicData);
		}
		getSelectedClass (event){
			//console.log("selected calss",event.target.value);
			this.state.columnClass = event.target.value;
		}
        render(){
        	return (
              <div id="myModal" className="custommodal">
                    <div className="custommodal-content"  >
					<div className="custommodalheader">
					  <span className="customclose" onClick={this.closeMyModal.bind(this)}>x</span>
					</div>
					
					<div className="modalBody">
					<div className="modalCustomColumnNameInput">
					 <input type="text" className="form-control" id="modalColumnName" placeholder="ColumnName" onChange={this.customColumnNameInputChange.bind(this)} value={this.state.customColumnNameInput}/>
					</div>
					
					<div className="ui-widget">
						 
						<input className="form-control" placeholder="Add Logic Here" type="text" id="tags"/>
					</div>
					<div className="modalCustomColumnNameInput">
						<input className="form-control" placeholder="Text" type="text" id="modalText"/>
					</div>
					<div className="select-style">
					  <div className="form-group">
						<div className="selectContainer ">
							<select name="language" onChange={this.getSelectedClass.bind(this)} className="form-control">
							{this.classDropDown.map(function(classItem){
								return (<option  value={classItem}>{classItem}</option>)
								
							})}
							</select>
						</div>
					</div>
					</div>
					<button className="btn btn-info saveLogic" onClick={this.getLogicColumnDetails.bind(this)}>save Logic</button>
                  
                        <p>eg. minPrice, +20+, price...</p>
						</div>
                      </div>
              </div>
            )
        }
        
    }


   




class AddColumn extends React.Component{

    constructor () {
        super();
        this.state= {columnName:'',isShowAddColumn:false,columnType:'',view: {showModal: false},column:[]}    
        }  
    addInputType (index) {
    if(index==4){
		this.handleShowModal();
		var that = this;
		that.state.columns =[];
              for (var key in that.props.getColumnName) {
             if(Object.prototype.toString.call(that.props.getColumnName[key]) === '[object Array]'){
                that.props.getColumnName[key].forEach(function(items){
                     that.state.columns.push(items.columnName);
					 });
            }
            else{
                that.state.columns.push(key);
            }
        }
      //  console.log("columnArray",that.state.columns);
		that.setState({columns:that.state.columns}); 
        
    }
    else{
      //  console.log('index addinput',index);
        this.state.columnType = ColumnTypeMapping[index-1];
        this.state.isShowAddColumn =true;
        this.setState({isShowAddColumn:this.state.isShowAddColumn});
    }
    
    }
    getColumnName (event) {
        this.state.columnName = event.target.value;
        this.setState({columnName:this.state.columnName});
    }
    saveColumnName (event) {
        this.setState({isShowAddColumn:false});
        this.props.addColumnClick(this.state.columnName,this.state.columnType);
    }  
    
	sendLogicToDataTable(logicData,event){
		//console.log("logicData in AddColujmns",logicData,event);	
		var that = this
		that.props.saveLogicToDataTable(logicData,'sdsad');
	}
   
        handleHideModal(){
        	this.setState({view: {showModal: false}})
        }
        handleShowModal(){
      //  console.log("showmodalcalled");
        	$('#myModal').show();
        }

    render () {
        var showAddCoumnDom;        
        if(this.state.isShowAddColumn){
            var showAddColumnDom = <div className="addColumnName">Add ColumnName : <input key={showAddCoumnDom+'_'+999} type="text" value={this.state.columnName} onChange={this.getColumnName.bind(this)} /><button className="btn btn-default" onClick={this.saveColumnName.bind(this)}>Save Column</button></div>;
        }
        else{
            var showAddColumnDom='';
        }
        return(
        
          <div className="addColumnContainer">
               <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Add Column
                    <span className="caret"></span></button>
                <ul className="dropdown-menu">
                    <li onClick={this.addInputType.bind(this,1)}><a href="#">Input</a></li>
                    <li onClick={this.addInputType.bind(this,2)}><a href="#">CheckBox</a></li>
                    <li onClick={this.addInputType.bind(this,3)}><a href="#">DropDown</a></li>
                    <li onClick={this.addInputType.bind(this,4)}><a href="#">Logic</a></li>
                </ul>
            </div>
            {showAddColumnDom}
            
         <Modal sendLogicToAddColumn={this.props.saveLogicToDataTable} columnsArr={this.state.columns}/>
        </div>)
    }
}

class Datatable extends React.Component {
    constructor(props){
        super(props);
		//console.log("datatable props",props);		
		this.promise = isAdmin();			
		//console.log("constructor called");
		
			editableColumns();
        this.ComponentUpdatedCount =0;
        var rootFirebaseRef=firebase.database().ref('/');
		
        this.state ={
        product:window.todos==undefined ? []:window.todos,isAdmin:false,isCompanyEnabled:'',showExtLinkUpdatePopUp:{id:null,style:false,customItemId:null}
        };
        this.hardCodeKeys = {extLink:'ExtLink',minPrice:'minPrice'};
        this.tdPositionRelative={position: 'relative',}
        
    }
    componentDidMount(){
		setTimeout(function(){
			DatatableRun();			
		},2000)
		//DatatableRunDatatableRun();
		//console.log("component did Mount",this.ComponentUpdatedCount);
        this.isTableDataReady =false;
		if(this.ComponentUpdatedCount  >=0){
			 setTimeout(function(){
          //   DatatableRun();	

				hideBtnAFterMounting();				 
		},2000)
		 
		}  
         
    }
    componentWillUpdate(){
		//console.log("component Update");
		setTimeout(function(){
			hideBtnAFterMounting();
			editableColumns();	
					
		},1000)
		
	
    }
    componentWillMount(){
		 var companyName = JSON.parse(localStorage.getItem(config.localStorageUserApiKey)).displayName;
        var tempPlay =true;
		 var WillMountThis =this;
        if(tempPlay){
         var firebaseEnableCompanyRef = firebase.database().ref('/comapnies/'+companyName+'/enable');
		 firebaseEnableCompanyRef.once('value',function(snap){
			 WillMountThis.state.isCompanyEnabled = snap.val();	
			});
            WillMountThis.firebaseRef=firebase.database().ref('/comapnies/'+companyName+'/rows');
            
            window.todos=[];
			WillMountThis.promise.then(function(isAdmin){
			WillMountThis.state.isAdmin=isAdmin;
			WillMountThis.setState({isAdmin:isAdmin});
	      WillMountThis.firebaseRef.limitToFirst(50).once('value',function(snapshot){
                snapshot.forEach(function(items,index){
                     if(!items.val().hasOwnProperty("external_link")){
                        items.val().external_link = ''
                    }
                    if(!items.val().hasOwnProperty("minPrice")){
                        items.val().minPrice = '';
                    }
                    if(items.val().hasOwnProperty("customCoulmns")==false){
                        items.val().customCoulmns =[];
                    }
                    else{
                         items.val().customCoulmns.forEach(function(columnItems){
                             if(columnItems.hasOwnProperty('edit')){
                                 if(columnItems.edit ==false){
                                     columnItems.edit =true;
                                 }
                             }
                         })
                    }
                    window.todos.push(items.val());
                });  
                WillMountThis.isTableDataReady = true;
                WillMountThis.setState({product:window.todos,isAdmin:isAdmin});
            })
			})
        }
        WillMountThis.firebaseRef.on('child_changed', function(childSnapshot, prevChildKey) {
             var productID = childSnapshot.val().productID;
            WillMountThis.state.product.forEach(function (productTtem,productIndex) {
                if(productTtem.productID == productID)
                {
                    WillMountThis.state.product[productIndex] = childSnapshot.val();
                    WillMountThis.setState({product:WillMountThis.state.product});
                }
            })
        });



    }
    componentDidUpdate(){
		editableColumns();
	
        if(this.isTableDataReady && this.ComponentUpdatedCount==0) {
            hideBtnAFterMounting();	
             // TableExtendedRun();	
            
            this.ComponentUpdatedCount++;
        }	
		 
    }


    saveExtLink(inputValue,objectKey,index){

       // console.log("update external link",inputValue,objectKey,index,this.state);

        this.state.product[index][objectKey] = inputValue;
        //     console.log("in dex",index,"e",index);
        //   console.log("index",this.state.product[index]);
        this.setState({product:this.state.product});
       // var firebaseRefSaveExternalLink = firebase.database().ref('/user1/rows');
        this.firebaseRef.child(index).update({external_link:this.state.product[index].external_link},function(){
          //  console.log("updated");
            //  that.onChildChangedListerner();
            hideBtnAFterMounting();
        });


    }

    updateMinPriceText(index,e){
        //console.log("update min price ",index,e)
        this.state.product[index].minPrice = event.target.value;
        this.setState({product:this.state.product})
    }

    saveMinPrice(inputValue,objectKey,index){
      // console.log("index",index,this.state.product[index]);
        this.state.product[index][objectKey] = inputValue;
        this.setState({product:this.state.product});
      //  var firebaseRefsSaveMinPrice = firebase.database().ref('/user1/rows');
        this.firebaseRef.child(index).update({minPrice:this.state.product[index].minPrice},function(){
            console.log("updated minPrice");
        });
        
        //  this.onChildChangedListerner();
        hideBtnAFterMounting();
    }

    removeItem(key) {
        var firebaseRef = firebase.database().ref('todoApp/items');
        firebaseRef.child(key).remove();
    }

    updateText(idx,event){
        this.state.product[idx].external_link = event.target.value;
        this.setState({product:this.state.product})
    }
    onChildChangedListerner () {
        var that = this;
     
    }
    addColumnParent (columnName,type) {
     //   console.log("admin add column",columnName,type);
        this.state.product.forEach(function(productItem,productItemIndex){
            if(!productItem.hasOwnProperty("customCoulmns")){
                productItem.customCoulmns=[];
                if(type=='input'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,columnText:'',edit:false,columnClass:'',addText:''});
                }
                else if(type=='checkbox'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,isChecked:false,edit:false,columnClass:'',addText:'',addText:''});
                }
                else if(type=='dropdown'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,addItem:'',columnDropDown:[],edit:false,columnClass:'',addText:''});
                }
                //productItem.customCoulmns.push({'columnName':columnName,'type':type,columnIndex:1,columnText:'',edit:false});
            }
            else{
                if(type=='input'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,columnText:'',edit:false,columnClass:'',addText:''});
                }
                else if(type=='checkbox'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,isChecked:false,edit:false,columnClass:'',addText:''});
                }
                else if(type=='dropdown'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,addItem:'',columnDropDown:[],edit:false,columnClass:'',addText:''});
                }
            }
        });
        this.firebaseRef.set(this.state.product,function(){
         //   console.log("Column added");
        });
     //   console.log("updated state",this.state.product);
        this.setState({product:this.state.product});
    }

    customInputChange (index,parentindex,event) {
      console.log("index",index,parentindex,event);

        if(this.state.product[parentindex].customCoulmns[index].type =='input'){
            this.state.product[parentindex].customCoulmns[index].columnText =event.target.value;
        }
        this.setState({product:this.state.product});
    }
    saveCustomInputText (parentindex,index,isEdit,isSave) {
        console.log(parentindex,index,isEdit,isSave);   
        this.state.product[parentindex].customCoulmns[index].edit = !isEdit;
        if(isSave=='true'){
            this.firebaseRef.child(parentindex).update({customCoulmns:this.state.product[parentindex].customCoulmns},function(){
             //   console.log(" updated");
            });
        }
           this.setState({product:this.state.product});

           setTimeout(function(){
             $('td >span> .popover').each(function(items){ 
             var divwidth = $(this).width();
             var tdwidth =  $(this).parent().parent().width();
              var left =(((divwidth-tdwidth)/tdwidth)*100)/2;
           // console.log("left",left)
            $(this).css('left',-left+'% !important');
            })
        },10)
        
    }
    saveCustomCheckBox (parentindex,index,isChecked) {
        //   console.log("parentindex",parentindex,"index",index,"isChecked",isChecked);
        
        
        this.state.product[parentindex].customCoulmns[index].isChecked = !isChecked;
        this.setState({product:this.state.product});
        this.firebaseRef.child(parentindex).update({customCoulmns:this.state.product[parentindex].customCoulmns},function(){
         //   console.log("updated checkbox");
        });

    }
    addDropDownItemTextChange (index,parentindex,event) {

        if(this.state.product[parentindex].customCoulmns[index].type =='dropdown'){
            this.state.product[parentindex].customCoulmns[index].addItem =event.target.value;
        }
        this.setState({product:this.state.product});
    }
    addCustomDropText (parentindex,index,addItemText,isSave) {
       
        if(!this.state.product[parentindex].customCoulmns[index].hasOwnProperty("columnDropDown")){
            this.state.product[parentindex].customCoulmns[index].columnDropDown=[];
        }
        this.state.product[parentindex].customCoulmns[index].columnDropDown.push(addItemText);
        this.setState({product:this.state.product});
        this.firebaseRef.child(parentindex).update({customCoulmns:this.state.product[parentindex].customCoulmns},function(){
          //  console.log("updated checkbox");

        });
    }
    lockedCheckBox (index,isCdecked,productid,e) {
        console.log(index,isCdecked,productid,e);
		var that = this;
		var companyName = JSON.parse(localStorage.getItem(config.localStorageUserApiKey)).displayName;
		  this.firebaseRef.child(index).update({Locked:!isCdecked},function(){
           console.log("updated checkbox");
        });
		that.state.product.forEach(function (productItem,productIndex) {
                if(productItem.productID == productid)
                {
                    that.state.product[productIndex].Locked = !isCdecked;
                    that.setState({product:that.state.product});
                }
            })
        
		
		
		   
		
    }
    setInputValueInState(inputValue,objectKey,objectIndex){
        this.state.product[objectIndex].objectKey= inputValue;
    }

    openExtLink(externalLink,productName,event){
     //   console.log("open external link",externalLink,productName);
        if(externalLink != undefined){
            if(externalLink.length>1){
                window.open(externalLink,'_blank')
            }
            else{
                externalLink =  'https://anon.click/?http://www.zap.co.il/search.aspx?keyword='+productName;
                window.open(externalLink,'_blank')
            }
        }
        else if(externalLink == undefined){
            externalLink =  'https://anon.click/?http://www.zap.co.il/search.aspx?keyword='+productName;
            window.open(externalLink,'_blank')
        }

    }
	saveLogic(logicData,event){
		//console.log("logic Data",event);
	 	this.state.product.forEach(function(productItem,productItemIndex){
            if(!productItem.hasOwnProperty("customCoulmns")){
                productItem.customCoulmns=[];
			}
			productItem.customCoulmns.unshift({"columnName":logicData.columnName,"type":"logic","columnIndex":1,"columnText":'',"logic":logicData.logic,'columnClass':logicData.columnClass,'addText':logicData.addText});
		});
		   this.firebaseRef.set(this.state.product,function(){
           // console.log("Column added");
        });
		this.setState({product:this.state.product});
		
	}
    showEditSavePopup(parentIndex,objKey){
      //  console.log("setstate for showExtLinkUpdatePopUp",parentIndex,objKey);
        this.state.showExtLinkUpdatePopUp.id = parentIndex;
        this.setState({showExtLinkUpdatePopUp:{'id':parentIndex,objectKey:objKey}});
        //console.log("set style",this.state.showExtLinkUpdatePopUp.id,this.state.showExtLinkUpdatePopUp.style);
    }

    render() {
        var parentThis=this;

        var customColumnArr=[];
        this.state.product.forEach(function (productItems,productIndex) {
           if(!productItems.hasOwnProperty("minPrice")){
							console.log("minPrice creatred");
							productItems.minPrice=0;
			}
            if(!productItems.hasOwnProperty("price")){
							console.log("minPrice creatred");
							productItems.price=0;
			}
            if(!productItems.hasOwnProperty('customCoulmns')){
                productItems.customCoulmns=[];
            }
			else{
				if(productItems.customCoulmns.length >0){
					productItems.customCoulmns.forEach(function(customItems,index){
						
						if(customItems.type == 'logic'){
							var logicItemValues=[];	
							var logic = customItems.logic;
							var logicSplit = logic.split(",");
							logicSplit.forEach(function(logicItem,logicItemsIndex){
								var isItemFound =false;
							for (var key in productItems) {
								 if(Object.prototype.toString.call(productItems[key]) === '[object Array]'){
									productItems[key].forEach(function(items){
									if(items.columnName == logicItem.trim()){
										logicItemValues.push(customItems.columnText == undefined ? 0 : customItems.columnText );
										isItemFound =true;
									}
								 });
								}
								else {
									if(key == logicItem.trim()){
										//console.log("productItems[key]",productItems[key],"key",key);
										logicItemValues.push((productItems[key]==undefined || productItems[key] =="") ? 0:productItems[key] );
										isItemFound =true
									}
								}
							  }
							  if(!isItemFound){
								  logicItemValues.push(logicItem);
							  }
							})	
							try{
								var addText = customItems.addText ==undefined ? '' : customItems.addText
						//		console.log("join:,",logicItemValues.join(""));
							customItems.columnText= eval(logicItemValues.join("")) +' '+ addText;		
								}
								catch(ex){
									console.log(ex);
									customItems.columnText=  addText;
								}
							}					
					})
				}	
			}
        });
        return (
            <ContentWrapper>
                <div className="CustomerAddoptions">
                
                    {parentThis.state.isAdmin==true ?  
                    <AddColumn key="addCoulmn" saveLogicToDataTable={parentThis.saveLogic.bind(parentThis)} addColumnClick={parentThis.addColumnParent.bind(parentThis)} getColumnName={parentThis.state.product[0]}/>:<span></span>
                    }
                </div>
                <h3>Data Tables
                    <small>Tables, one step forward.</small>
                </h3>
                {parentThis.state.isCompanyEnabled != true ? 'Your Company is Temporarily Locked' : 
                <Grid fluid>
                    { /* START DATATABLE 1  */ }
                    <Row>
                        <Col lg={ 12 }>
						<div className="dataTable1Wrapper" key="tablewrapperdiv"> 
                            <Panel header="Data Tables | Zero Configuration" key="panelheader">
							
                                <Table id="datatable1" key={"datatableKey"} className="user_products dataTable" responsive striped hover>
                                    {parentThis.state.product.map(function(items,idx){
                                        if(idx >0){
                                            return;
                                        }
                                        return(
                                            <thead key="datatableTbody">
                                            <tr key="trdatatable1">
                                                {parentThis.state.product[0].customCoulmns.map(function (columnhead,columnheadIndex) {
													//console.log("columnhea : ",columnhead);
													return <th key={columnhead.columnName+columnheadIndex}>{columnhead.columnName}</th>;
                                                })
                                                }
                                                <th key="lockeddatatable1">locked</th>
                                             
                                                <th key="externaLinkdatatable1">external_link</th>
                                                <th key="lastChangeddatatable1">last_changed</th>
                                                <th key="minPricedatatable1">minPrice</th>
                                                <th key="pricedatatable1">price</th>
                                                <th key="manufacturerdatatable1">manufacturer</th>
                                                <th key="categorydatatabgvle1">category</th>
                                                <th key="productnamedatatable1" className="sort-alpha productNameFixedColumn">name</th>
                                                <th key="productIddatatable2" className="productIdFixedColumn">productID</th>
                                            </tr>
                                            </thead >
                                        )
                                    })}
                                    <tbody key="tbodydatatable1">
                                    {parentThis.state.product.map(function(items,idx){
                                          return(
                                            <tr className="products gradeX " key={"parentLoop"+idx + 999}>
                                                {items.customCoulmns.map(function(customItems,customItemsIndex,currentValue){

                                                    if(customItems.hasOwnProperty("type")){
                                                        if(customItems.type == 'input'){
                                                            return <td style={parentThis.tdPositionRelative} key={"custosInputkey"+customItemsIndex+idx+1}>{customItems.edit == true ? <div key={"custosDivWrapper_"+idx+customItemsIndex+2} className="customInputBorder glyphicon glyphicon-pencil" onClick={parentThis.saveCustomInputText.bind(parentThis,idx,customItemsIndex,customItems.edit,'false')}> <span key={"customInputkeySpanTextIfEditTrue"+idx+customItemsIndex+3}>{customItems.columnText}</span></div>: <span key={"custosInputkeySpanTextIfEditFalse"+idx+customItemsIndex+4}>
                                                              <div  key={['editinputBoxSpanrecipient', idx].join('_')} className={"popover fade top in editable-container editable-popup active"} role="tooltip">
                                                            <div className="arrow">
                                                            </div>
                                                            <div className="popover-content"> 
                                                                <div><div className="editableform-loading"></div>
                                                                <div className="form-inline editableform" >
                                                                    <div className="control-group form-group">
                                                                        <div>
                                                                            <div className="editable-input" >
                                                                                <input className="form-control" key={"customInputtextField"+parentThis.customItemsIndex+"_"+idx+customItemsIndex+5} type="text" onChange={parentThis.customInputChange.bind(parentThis,customItemsIndex,idx)} value={customItems.columnText}/>
                                                                         
                                                                            </div>
                                                                            <div className="editable-buttons">
                                                                                <button type="button" key={"custosInputkeySpanTextIfEditFalseBtnOk"+idx+customItemsIndex+6} onClick={parentThis.saveCustomInputText.bind(parentThis,idx,customItemsIndex,customItems.edit,'true')} className="btn btn-primary btn-sm editable-submit"> <i className="fa fa-fw fa-check"></i> </button><button type="button"  key={"custosInputkeySpanTextIfEditFalsebtnRemove"+idx+customItemsIndex+7} className="btn btn-default btn-sm editable-cancel " onClick={parentThis.saveCustomInputText.bind(parentThis,idx,customItemsIndex,customItems.edit,'false')}><i className="fa fa-fw fa-times"></i></button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="editable-error-block help-block " ></div>
                                                                    </div>
                                                                    </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                            </span>}
                                                            </td>
                                                        }
                                                        else if(customItems.type == 'checkbox'){
                                                            return <td key={"custoscheckboxkey"+customItemsIndex+idx}><input key={"checkboxDatatable"+customItemsIndex+idx} type="checkbox" checked={customItems.isChecked} onChange={parentThis.saveCustomCheckBox.bind(parentThis,idx,customItemsIndex,customItems.isChecked)}/> </td>
                                                        }
                                                        else if(customItems.type == 'dropdown1'){
                                                            return <td key={"custosDropdownkey"+idx+customItemsIndex}><input key={"dropdowndatatable"+customItemsIndex+idx} type="text" value={customItems.addItem} onChange={parentThis.addDropDownItemTextChange.bind(parentThis,customItemsIndex,idx)}/>
                                                                <button key={"custosdropDownbtnOk"+customItemsIndex+idx+customItemsIndex} onClick={parentThis.addCustomDropText.bind(parentThis,idx,customItemsIndex,customItems.addItem,'true')} className="glyphicon glyphicon-ok btn-primary">  </button>
                                                                <select key={"custosDropDownSelect"+customItemsIndex+idx}>
                                                                    {customItems.columnDropDown !=undefined ? customItems.columnDropDown.map(function (dropdownItem) {
                                                                        return <option key={"custosDropDownOption"+customItemsIndex+idx} value={dropdownItem}>{dropdownItem}</option>
                                                                    }):[]}
                                                                </select> </td>
                                                        }
														else if(customItems.type == 'logic'){
                                                        return (<td key={"custosLogictd"+idx+customItemsIndex+789} className={customItems.columnClass}>{customItems.columnText}</td>)
														}
														
                                                    }
                                                })}
                                                <td key={"lockswitchTd"+idx}>
                                                    <label key={"lockSwitch_"+idx} className="switch">
                                                        <input key={"switch"+idx} type="checkbox" checked={items.Locked} onChange={parentThis.lockedCheckBox.bind(this,idx,items.Locked,items.productID)} />
                                                        <em></em>
                                                    </label>
                                                </td>
                                              
                                                <td style={this.tdPositionRelative} key={"ExternalLinkTd"+idx}  className="extLinkCell"><span onClick={parentThis.showEditSavePopup.bind(parentThis,idx,parentThis.hardCodeKeys.extLink)} className=" glyphicon glyphicon-pencil ">{items.external_link != undefined ?items.external_link:''} </span>
                                                    <EditSaveBox key={'externaLink'+idx} showHideClassName={(this.state.showExtLinkUpdatePopUp.id == idx && parentThis.hardCodeKeys.extLink == this.state.showExtLinkUpdatePopUp.objectKey) ? true:false} editBtnClassName="UpdateExtLinkbtn" removeBtnClassName="removeBtn" okbtnClassName="saveExtLinkBtn" dataid={this.state.showExtLinkUpdatePopUp.id} editInputClassName="JeditExternalLink" inputValue={items.external_link != undefined ?items.external_link:''} objectKey="external_link" objectIndex={idx} saveRecord={parentThis.saveExtLink.bind(parentThis)}></EditSaveBox>
                                                    <input key={"ExternalLinkNavBtn"+idx} className="btn btn-info extLinkNavBtn" target="_blank" type="button" value={(items.external_link != undefined && items.external_link.length >0)  ? "Open" : "Search"} onClick={parentThis.openExtLink.bind(this,items.external_link,items.name) }/>

                                                </td>
                                                <td key={"lastChanged"+idx}>{items.last_changed}</td>
                                                <td style={this.tdPositionRelative} key={"minPrice"+idx} className="minPriceCell"><span onClick={parentThis.showEditSavePopup.bind(parentThis,idx,parentThis.hardCodeKeys.minPrice)} className=" glyphicon glyphicon-pencil">{items.minPrice}</span>
                                                    <EditSaveBox showHideClassName={(this.state.showExtLinkUpdatePopUp.id == idx && parentThis.hardCodeKeys.minPrice == this.state.showExtLinkUpdatePopUp.objectKey) ? true:false} key={'minPriceCell'+idx} editBtnClassName="UpdateMinPriceBtn" removeBtnClassName="removeBtn" okbtnClassName="saveMinpriceBtn" editInputClassName="JEditminPriceInput" inputValue={items.minPrice != undefined ?items.minPrice:''} objectKey="minPrice" objectIndex={idx} saveRecord={parentThis.saveMinPrice.bind(parentThis)}/>
                                                </td>
                                                <td key={"price"+idx}>{items.price}</td>

                                                <td key={"manufacturer"+idx}>{items.manufacturer}</td>
                                                <td key={"category"+idx}>{items.category}</td>
                                                <td key={"productNamefixed"+idx} className="productNameFixedColumn">{items.name}</td>
                                                <td key={"productIdfixed_"+idx} className="productIdFixedColumn">{items.productID}</td>

                                            </tr>);

                                    }.bind(parentThis))
                                    }

                                    </tbody>
                                </Table>
							
                            </Panel>
								</div>
                        </Col>
                    </Row>
                    { /* END DATATABLE 1  */ }
                    { /* START DATATABLE 2  */ }
                
                </Grid>
                }
            </ContentWrapper>
        );
    }



}

export default Datatable;

$( document ).ready(function() {
    $('.editCompaniesContainer').hide();
    $('.addCompanyContainer').hide();

    $(document).on('click','ul > li',function(){
        $('.editCompaniesContainer').show();
        $('.addCompanyContainer').hide();
    });

    $(document).on('click','.addCompaniesBtn > button',function(){
        $('.editCompaniesContainer').hide();
        $('.addCompanyContainer').show();
    })
    $(document).on('click','.customerListSection ul>li',function(){
        $('.editCompaniesContainer').hide();
        $('.addCompanyContainer').hide();
    })
});



function hideBtnAFterMounting(){
    $('.user_products .saveExtLinkBtn').hide();
    $('.user_products .JeditExternalLink').hide();
    $('.user_products .JEditminPriceInput').hide();
    $('.user_products .saveMinpriceBtn').hide();
    $('.user_products .removeBtn').hide();
}
function editableColumns(){


    $('.user_products').on('click','.UpdateExtLinkbtn',function(){
    //    console.log("update ext link",$(this));
        $(this).hide();
        $(this).siblings().find(".saveExtLinkBtn").show();
        $(this).siblings().find(".JeditExternalLink").show()
        $(this).parent().siblings().find(".external_link_span").hide();
        $(this).siblings().find(".removeBtn").show();

    });
    $('.user_products').on('click','.saveExtLinkBtn',function(){
        $(this).hide();
        $(this).siblings(".UpdateExtLinkbtn").show();
        $(this).siblings().find(".JeditExternalLink").hide();
        $(this).parent().siblings(".external_link_span").show();
        $(this).siblings().find(".removeBtn").hide();
    });

    $('.user_products').on('click','.UpdateMinPriceBtn',function(){
    //    console.log('this',$(this));
        $(this).hide();
        $(this).siblings().find(".saveMinpriceBtn").show();
        $(this).siblings().find(".JEditminPriceInput").show();
       // $(this).parent().siblings().find(".minPrice_span").hide();
        $(this).siblings().find(".removeBtn").show();

    });
    $('.user_products').on('click','.saveMinpriceBtn',function(){
        //console.log("save min price",$(this));
        $(this).hide();
        $(this).siblings().find(".UpdateMinPriceBtn").show();
        $(this).siblings(".JEditminPriceInput").hide();
        $(this).parent().siblings(".minPrice_span").show();
        $(this).siblings(".removeBtn").hide();
    });
    $('.user_products').on('click','.removeBtn',function(){
      //  console.log("remove button clicked i clicked");
        $(this).hide();
       // console.log( $(this).parent().siblings(".external_link_span"))
        $(this).parent().siblings(".external_link_span").show();
        $(this).parent().siblings(".minPrice_span").show();
        $(this).siblings(".saveExtLinkBtn").hide();
        $(this).siblings(".UpdateExtLinkbtn").show();
        $(this).siblings(".UpdateMinPriceBtn").show();
        $(this).siblings(".JEditminPriceInput").hide();
        $(this).siblings(".saveMinpriceBtn").hide();
        $(this).siblings(".JeditExternalLink").hide();
        // $(this).siblings(".minPrice_span").show();
        $(this).siblings(".UpdateExtLinkbtn").show()
    });

 }

function autoCompleteColumns(dropDownName) {
				 
                 //console.log("function calle",dropDownName.columnsArr);
	var availableTags = dropDownName.columnsArr;
    function split( val ) {
		 return val.split( /,\s*/ );
    }
    function extractLast( term ) {
		
      return split( term ).pop();
    }
 
    $( "#tags" )
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
		  //console.log("event",event);
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
		//	console.log("autocomplete",request,response);
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            availableTags, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
		//	console.log("select",event,ui);
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });
  }
  
  