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
	
	var addPartyForm = $("#addParty");
	
	var validator = addPartyForm.validate({
		
		rules:{
			party_name :{ required : true },
			period : { required : true, digits : true }
			
		},
		messages:{
			party_name :{ required : "This field is required" },
			period : { required : "This field is required", digits : "Please enter numbers only" }
		}
	});



});
