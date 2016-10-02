 
import React from 'react';
class EditSaveBox extends React.Component{
  
    constructor(){
        super();
        this.state= {inputValue:this.props.inputValue,inputChangeValue:this.props.inputChangeValue,objectKey:this.props.objectKey,objectIndex:this.props.objectIndex}
    }
    
    inputChangeValue(event){
        this.state.inputValue = event.target.value;

        this.setState({inputValue:this.state.inputValue});
    }
    
    setParentState(){
       this.props.saveRecord(this.state.inputValue,this.state.objectKey,this.state.objectIndex);
    }
    
    render(){
        return(
            <span>
        <input className={this.props.editInputClassName} type="text" onChange={this.inputChangeValue.bind(this)} value={this.state.inputValue}/>
        <button onClick={this.setParentState.bind(this)} className={"glyphicon glyphicon-ok btn-primary "+ this.props.okbtnClassName}></button>
        <button className={"glyphicon glyphicon-remove "+ this.props.removeBtnClassName}></button>
        <button type="button" className={"btn btn-warning "+ this.props.editBtnClassName}>Edit</button>
        </span>
        );
    }
}


class AddColumn extends React.Component{

    constructor () {
        super();
      this.state= {columnName:'',isShowAddColumn:false,columnType:''}
    }
        addInputType (index) {
            console.log('index addinput',index);
            this.state.columnType = ColumnTypeMapping[index-1];
        this.state.isShowAddColumn =true;
        this.setState({isShowAddColumn:this.state.isShowAddColumn});
    }
    getColumnName (event) {
        this.state.columnName = event.target.value;
        this.setState({columnName:this.state.columnName});
    }
    saveColumnName () {
        this.state.isShowAddColumn =false;
        this.setState({isShowAddColumn:this.state.isShowAddColumn});
        this.props.addColumnClick(this.state.columnName,this.state.columnType);
    }
   
    render () {
        var showAddCoumnDom;
        if(this.state.isShowAddColumn){
           var showAddColumnDom = <div className="addColumnName">Add ColumnName : <input type="text" value={this.state.columnName} onChange={this.getColumnName.bind(this)} /><button className="btn btn-default" onClick={this.saveColumnName}>Save Column</button></div>;
        }
        else{
            var showAddColumnDom='';
        }
        return(<div className="addColumnContainer">
                <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Add Column
                    <span className="caret"></span></button>
                <ul className="dropdown-menu">
                    <li onClick={this.addInputType.bind(this,1)}><a href="#">Input</a></li>
                    <li onClick={this.addInputType.bind(this,2)}><a href="#">CheckBox</a></li>
                    <li onClick={this.addInputType.bind(this,3)}><a href="#">DropDown</a></li>
                </ul>
                </div>
                {showAddColumnDom}

            </div>)
    }
}


 
class AdminTable extends React.Component{
  
    constructor(){
        super();
        var ColumnTypeMapping =["input","checkbox","dropdown"];
        var ComponentUpdatedCount =0;
        var rootFirebaseRef=firebase.database().ref('/');

        this.state ={
            product:window.todos==undefined ? []:window.todos
        };
    }
    componentDidMount(){
        this.isTableDataReady =false;
    }
    componentWillMount(){
    console.log("will mount Mount ");
    var tempPlay =true;
      
    var companyName = JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyAlrJQN1j24PDIUDgQT5bvV0uRe55yzN44:[DEFAULT]')).displayName;  
      
    if(tempPlay){
    this.firebaseEnableCompanyRef=firebase.database().ref('/comapnies/'+companyName+'/enable');
    console.log("this.firebaseEnableCompanyRef  : ",this.firebaseEnableCompanyRef);
        
        
        this.firebaseRef=firebase.database().ref('/comapnies/'+companyName+'/rows');
       // console.log("  this.firebaseRef",  this.firebaseRef)
        // this.customerId =nextProps.customerId;
        var WillMountThis =this;
         window.todos=[];
        //var userQuery = this.firebaseRef.limit(50);
        WillMountThis.firebaseRef.limitToFirst(50).once('value',function(snapshot){
         console.log("snapshot component will",snapshot.val());
          snapshot.forEach(function(items,index){
               console.log("items.val()",items.val())
              if(!items.val().hasOwnProperty("external_link")){
                  items.val().external_link = ''
              }
              if(!items.val().hasOwnProperty("minPrice")){
                  items.val().minPrice = '';
              }
              if(items.val().hasOwnProperty("customCoulmns")==false){
                  items.val().customCoulmns =[];
              }
              window.todos.push(items.val());
          });

         // getMaxKeysInArrays =findMaxObjIndexInArray(window.todos);
          //console.log("getMaxKeysInArrays",getMaxKeysInArrays);
          console.log("todos",window.todos);
            WillMountThis.isTableDataReady = true;
          WillMountThis.setState({product:window.todos});

        })

    }    
       WillMountThis.firebaseRef.on('child_changed', function(childSnapshot, prevChildKey) {
            console.log("snapshot : ",childSnapshot.val(),prevChildKey);
            var productID = childSnapshot.val().productID;
            WillMountThis.state.product.forEach(function (productTtem,productIndex) {
                if(productTtem.productID == productID)
                {
                    WillMountThis.state.product[productIndex] = childSnapshot.val();
                    WillMountThis.setState({product:WillMountThis.state.product});
                }
            })
         //   hideBtnAFterMounting();
        });
        
        
        
    }
    componentDidUpdate(){
        console.log(" ComponentUpdatedCount ",ComponentUpdatedCount,this.isTableDataReady);
        if(this.isTableDataReady && ComponentUpdatedCount==0) {
            hideBtnAFterMounting();
            ComponentUpdatedCount++;
        }
    }


    saveExtLink(inputValue,objectKey,index){

        console.log("update external link",inputValue,objectKey,index);
        var that = this;
        that.state.product[index][objectKey] = inputValue;
        //     console.log("in dex",index,"e",index);
        //   console.log("index",this.state.product[index]);
        that.setState({product:that.state.product});
        var firebaseRefSaveExternalLink = firebase.database().ref('/user1/rows');
        firebaseRefSaveExternalLink.child(index).update({external_link:that.state.product[index].external_link},function(){
            console.log("updated");
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
     //   console.log("index",index,e,this.state.product[index]);
        this.state.product[index][objectKey] = inputValue;
        var firebaseRefsSaveMinPrice = firebase.database().ref('/user1/rows');
        firebaseRefsSaveMinPrice.child(index).update({minPrice:this.state.product[index].minPrice},function(){
            console.log("updated minPrice");
        });
        this.setState({product:this.state.product});
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
      //  console.log("addchildchanged lsitener",this.customerId);
       // var firebaseRefListerner=firebase.database().ref('/'+this.customerId+'/rows');
       
    }
    addColumnParent (columnName,type) {
        console.log("admin add column",columnName,type);
        this.state.product.forEach(function(productItem,productItemIndex){
            if(!productItem.hasOwnProperty("customCoulmns")){
                productItem.customCoulmns=[];
                if(type=='input'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,columnText:'',edit:false});
                }
                else if(type=='checkbox'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,isChecked:false,edit:false});
                }
                else if(type=='dropdown'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,addItem:'',columnDropDown:[],edit:false});
                }
                //productItem.customCoulmns.push({'columnName':columnName,'type':type,columnIndex:1,columnText:'',edit:false});
            }
            else{
                if(type=='input'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,columnText:'',edit:false});
                }
                else if(type=='checkbox'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,isChecked:false,edit:false});
                }
                else if(type=='dropdown'){
                    productItem.customCoulmns.unshift({'columnName':columnName,'type':type,columnIndex:1,addItem:'',columnDropDown:[],edit:false});
                }
            }
        });
        this.firebaseRef.set(this.state.product,function(){
           console.log("Column added");
           });
        console.log("updated state",this.state.product);
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
        console.log(parentindex,index,isEdit,isSave)
        this.state.product[parentindex].customCoulmns[index].edit = !isEdit;
        if(isSave=='true'){
           this.firebaseRef.child(parentindex).update({customCoulmns:this.state.product[parentindex].customCoulmns},function(){
            console.log("updated");
            });
         }
         this.setState({product:this.state.product});
    }
    saveCustomCheckBox (parentindex,index,isChecked) {
     //   console.log("parentindex",parentindex,"index",index,"isChecked",isChecked);
            this.state.product[parentindex].customCoulmns[index].isChecked = !isChecked;
            this.setState({product:this.state.product});
            this.firebaseRef.child(parentindex).update({customCoulmns:this.state.product[parentindex].customCoulmns},function(){
                console.log("updated checkbox");
            });

    }
    addDropDownItemTextChange (index,parentindex,event) {

        if(this.state.product[parentindex].customCoulmns[index].type =='dropdown'){
            this.state.product[parentindex].customCoulmns[index].addItem =event.target.value;
        }
        this.setState({product:this.state.product});
    }
    addCustomDropText (parentindex,index,addItemText,isSave) {
     //   console.log("parentindex",parentindex,"index",index,"additem text",addItemText,isSave,this.state.product[parentindex].customCoulmns[index]);
        if(!this.state.product[parentindex].customCoulmns[index].hasOwnProperty("columnDropDown")){
            this.state.product[parentindex].customCoulmns[index].columnDropDown=[];
        }
        this.state.product[parentindex].customCoulmns[index].columnDropDown.push(addItemText);
        this.setState({product:this.state.product});
        this.firebaseRef.child(parentindex).update({customCoulmns:this.state.product[parentindex].customCoulmns},function(){
            console.log("updated checkbox");

        });
    }
    lockedCheckBox (index,isCdecked,e) {
       // console.log(index,isCdecked,e);
        this.state.product[index].Locked = !isCdecked;
        this.setState({product:this.state.product});
    }
     setInputValueInState(inputValue,objectKey,objectIndex){
        this.state.product[objectIndex].objectKey= inputValue;
    }
    render(){
        var parentThis=this;
        
        var customColumnArr=[];
        this.state.product.forEach(function (productItems) {
           if(!productItems.hasOwnProperty('customCoulmns')){
               productItems.customCoulmns=[];
           }
        })
        return (
            <div><span>Hello Admin</span>
                <div className="CustomerAddoptions">
                   {/*<AddCustomer/>*/} 
                    <AddColumn addColumnClick={parentThis.addColumnParent}/>
                   
                </div>    
            <div className="customer_table">
                    
                    <table className="table user_products" id="user_products">

                         {parentThis.state.product.map(function(items,idx){ 
                            if(idx >0){
                                return;
                            }
                        return(
                            <thead>
                        <tr>
                            {parentThis.state.product[0].customCoulmns.map(function (columnhead) {
                                return <th key={columnhead.columnName}>{columnhead.columnName}</th>;
                            })
                            }
                            <th>locked</th>
                            <th>error_status</th>
                            <th>errorStatus</th>
                            <th>external_link</th>
                            <th>last_changed</th>
                            <th>minPrice</th>
                            <th>price</th>
                            <th>manufacturer</th>
                            <th>category</th>
                            <th>name</th>
                            <th>productID</th>

                           </tr>
                        </thead>)
                        })}
                        <tbody>

                      {parentThis.state.product.map(function(items,idx){
                              return(
                                  <tr className="products">
                                      {items.customCoulmns.map(function(customItems,customItemsIndex,currentValue){

                                          if(customItems.hasOwnProperty("type")){
                                              if(customItems.type == 'input'){
                                                  return <td>{customItems.edit == true ? <div className="customInputBorder" onClick={parentThis.saveCustomInputText.bind(parentThis,idx,customItemsIndex,customItems.edit,'false')}> <span>{customItems.columnText}</span></div>: <span><input type="text" onChange={parentThis.customInputChange.bind(parentThis,customItemsIndex,idx)} value={customItems.columnText}/><button onClick={parentThis.saveCustomInputText.bind(parentThis,idx,customItemsIndex,customItems.edit,'true')} className="glyphicon glyphicon-ok btn-primary">  </button><button className="glyphicon glyphicon-remove" onClick={parentThis.saveCustomInputText.bind(parentThis,idx,customItemsIndex,customItems.edit,'false')}></button> </span>}</td>
                                              }
                                              else if(customItems.type == 'checkbox'){
                                                  return <td><input type="checkbox" checked={customItems.isChecked} onClick={parentThis.saveCustomCheckBox.bind(parentThis,idx,customItemsIndex,customItems.isChecked)}/> </td>
                                              }
                                              else if(customItems.type == 'dropdown'){
                                                  return <td><input type="text" value={customItems.addItem} onChange={parentThis.addDropDownItemTextChange.bind(parentThis,customItemsIndex,idx)}/>
                                                      <button onClick={parentThis.addCustomDropText.bind(parentThis,idx,customItemsIndex,customItems.addItem,'true')} className="glyphicon glyphicon-ok btn-primary">  </button>
                                                      <select>
                                                          {customItems.columnDropDown !=undefined ? customItems.columnDropDown.map(function (dropdownItem) {
                                                              return <option value={dropdownItem}>{dropdownItem}</option>
                                                          }):[]}
                                                      </select> </td>
                                              }
                                          }
                                      })}
                                    <td><span><input type="checkbox" checked={items.Locked} onClick={parentThis.lockedCheckBox.bind(this,idx,items.Locked)} /> </span></td>
                                      <td>{items.errorStatus}</td>
                                      <td>{items.errorReported}</td>
                                    <td><span className="external_link_span">{items.external_link != undefined ?items.external_link:''} </span>
                                        <EditSaveBox editBtnClassName="UpdateExtLinkbtn" removeBtnClassName="removeBtn" okbtnClassName="saveExtLinkBtn" editInputClassName="JeditExternalLink" inputValue={items.external_link != undefined ?items.external_link:''} objectKey="external_link" objectIndex={idx} saveRecord={parentThis.saveExtLink}></EditSaveBox>


                                    </td>
                                    <td>{items.last_changed}</td>
                                    <td><span className="minPrice_span">{items.minPrice}</span>
                                        <EditSaveBox editBtnClassName="UpdateMinPriceBtn" removeBtnClassName="removeBtn" okbtnClassName="saveMinpriceBtn" editInputClassName="JEditminPriceInput" inputValue={items.minPrice != undefined ?items.minPrice:''} objectKey="minPrice" objectIndex={idx} saveRecord={parentThis.saveMinPrice}/>
                                    </td>
                                      <td>{items.price}</td>

                                    <td>{items.manufacturer}</td>
                                    <td>{items.category}</td>
                                    <td>{items.name}</td>
                                    <td>{items.productID}</td>

                                  </tr>);

            }.bind(parentThis))
                        }
                        </tbody>
                    </table>
                </div>
                </div>);
    }
}



export default AdminTable;


  

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
$(document).ready(function() {
    $("#btnExport").click(function(e) {
        //getting values of current time for generating the file name
        var dt = new Date();
        var day = dt.getDate();
        var month = dt.getMonth() + 1;
        var year = dt.getFullYear();
        var hour = dt.getHours();
        var mins = dt.getMinutes();
        var postfix = day + "." + month + "." + year + "_" + hour + "." + mins;
        //creating a temporary HTML link element (they support setting file names)
        var a = document.createElement('a');
        //getting data from our div that contains the HTML table
        var data_type = 'data:application/vnd.ms-excel';
        var table_div = document.getElementById('btnExport');
        var table_html = table_div.outerHTML.replace(/ /g, '%20');
        a.href = data_type + ', ' + table_html;
        //setting the file name
        a.download = 'exported_table_' + postfix + '.xls';
        //triggering the function
        a.click();
        //just in case, prevent default behaviour
        e.preventDefault();
    });
});


   