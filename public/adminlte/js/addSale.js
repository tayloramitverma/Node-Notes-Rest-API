/**
 * File : addUser.js
 * 
 * This file contain the validation of add user form
 * 
 * Using validation plugin : jquery.validate.js
 * 
 * @author Kishor Mali
 */

$(document).ready(function(){
	
	var addUserForm = $("#addSale");
	
	var validator = addUserForm.validate({
		
		rules:{
			sale_type :{ required : true, selected : true },
			quantity : { required : true, digits : true },
			rate : { required : true, digits : true },
			cost : { required : true, digits : true },
			party_name : { required : true, selected : true},
			date_is : { required : true}
			
		},
		messages:{
			sale_type :{ required : "This field is required" },
			quantity : { required : "This field is required", digits : "Please enter numbers only" },
			rate : { required : "This field is required", digits : "Please enter numbers only" },
			cost : { required : "This field is required", digits : "Please enter numbers only" },
			party_name : { required : "This field is required", selected : "Please select atleast one option" },
			date_is : { required : "This field is required" }
		}
	});

	$("input[type='radio']").click(function(){
            var radioValue = $("input[name='sale_type']:checked").val();
            if(radioValue==2){
                $("#partyis").css('display', 'none');
            }else{
            	$("#partyis").css('display', 'block');
            }
    });


});
