export default () => {

    if (!$.fn.dataTable) return;

    //
    // Zero configuration
    //
	try{
		if ($.fn.DataTable.isDataTable( '#datatable1') ) {
			$("#datatable1").dataTable().fnDestroy();
		}
	 }catch(ex){
		 console.log(ex);
	 }
        try{

    if ( ! $.fn.DataTable.isDataTable( '#datatable1' ) ) { 
    var datatable1 = $('#datatable1').dataTable({
       
        // Text translation options
        // Note the required keywords between underscores (e.g _MENU_)
        oLanguage: {
            sSearch: 'Search all columns:',
            sLengthMenu: '_MENU_ records per page',
            info: 'Showing page _PAGE_ of _PAGES_',
            zeroRecords: 'Nothing found - sorry',
            infoEmpty: 'No records available',
            infoFiltered: '(filtered from _MAX_ total records)'
			},fixedColumns: {
                leftColumns:0,
				rightColumns: 2
    },
        scrollY: false,
        scrollX: true,
        scrollCollapse: false,
		 'paging': true, // Table pagination
        'ordering': true, // Column ordering
        'info': true,
		bSort: false,


})
		   
			    $('#datatable1').on('click','#datatable1', function () {
				  console.log("clicked datatable1 datatable run");setTimeout(function(){
					  datatable1.fnAdjustColumnSizing();					  
				  },1000)
			  });
				$('.user_products').on('click','.user_products',function(){
					setTimeout(function(){
					  datatable1.fnAdjustColumnSizing();					  
				  },1000)
				})  
			
			  
				
	}
		}catch(ex){
        console.log("ex",ex)
    } 

    
  
  
  var modal = document.getElementById('myModal');
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
  
  

    $(document).ready(function(){


    $('.user_products').on('click','.UpdateExtLinkbtn',function(){
      //  console.log($(this));
	
        $(this).hide();
        $(this).siblings().find(".saveExtLinkBtn").show();
        $(this).siblings().find(".JeditExternalLink").show()
        $(this).parent().siblings().find(".external_link_span").hide();
        $(this).siblings().find(".removeBtn").show();
			datatable1.fnAdjustColumnSizing();

    });
    $('.user_products').on('click','.saveExtLinkBtn',function(){
        $(this).hide();
		
        $(this).siblings(".UpdateExtLinkbtn").show();
        $(this).siblings().find(".JeditExternalLink").hide();
        $(this).parent().siblings(".external_link_span").show();
        $(this).siblings().find(".removeBtn").hide();
			datatable1.fnAdjustColumnSizing();
    });

    $('.user_products').on('click','.UpdateMinPriceBtn',function(){
     //   console.log('this',$(this));
        $(this).hide();
        $(this).siblings().find(".saveMinpriceBtn").show();
        $(this).siblings().find(".JEditminPriceInput").show();
       // $(this).parent().siblings().find(".minPrice_span").hide();
        $(this).siblings().find(".removeBtn").show();
			datatable1.fnAdjustColumnSizing();

    });
    $('.user_products').on('click','.saveMinpriceBtn',function(){
     //   console.log("save min price",$(this));
        $(this).hide();
        $(this).siblings().find(".UpdateMinPriceBtn").show();
        $(this).siblings(".JEditminPriceInput").hide();
        $(this).parent().siblings(".minPrice_span").show();
        $(this).siblings(".removeBtn").hide();
			datatable1.fnAdjustColumnSizing();
    });
    $('.user_products').on('click','.removeBtn',function(){
       // console.log("remove button clicked i clicked");
        $(this).hide();
        console.log( $(this).parent().siblings(".external_link_span"))
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
			datatable1.fnAdjustColumnSizing();
    });
    });

}