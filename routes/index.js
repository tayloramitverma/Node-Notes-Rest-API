var express = require('express');
var router = express.Router();

var session_store;
/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/customers');
});
router.get('/login',function(req,res,next){
	res.render('main/login',{title:"Login Page"});
});
router.post('/login',function(req,res,next){
	session_store=req.session;
	req.assert('txtEmail', 'Please fill the Username').notEmpty();
	req.assert('txtEmail', 'Email not valid').isEmail();
	req.assert('txtPassword', 'Please fill the Password').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		req.getConnection(function(err,connection){
			v_pass = req.sanitize( 'txtPassword' ).escape().trim(); 
			v_email = req.sanitize( 'txtEmail' ).escape().trim();
			
			var query = connection.query('select * from user where email="'+v_email+'" and password=md5("'+v_pass+'")',function(err,rows)
			{
				if(err)
				{
					var errornya  = ("Error Selecting : %s ",err.code );  
					console.log(err.code);
					req.flash('msg_error', errornya); 
					res.redirect('/login'); 
				}else
				{
					if(rows.length <=0)
					{
						req.flash('msg_error', "Wrong email address or password. Try again."); 
						res.redirect('/login');
					}
					else
					{	
						session_store.is_login = true;
						session_store.u_name = rows[0].full_name;
						res.redirect('/customers');
					}
				}

			});
		});
	}
	else
	{
		errors_detail = "Sory there are error<ul>";
		for (i in errors) 
		{ 
			error = errors[i]; 
			errors_detail += '<li>'+error.msg+'</li>'; 
		} 
		errors_detail += "</ul>"; 
		console.log(errors_detail);
		req.flash('msg_error', errors_detail); 
		res.redirect('/login'); 
	}
});
router.get('/logout', function(req, res)
{
	req.session.destroy(function(err)
	{ 
		if(err)
		{ 
			console.log(err); 
		} 
		else 
		{ 
			res.redirect('/login'); 
		} 
	}); 
});

router.get('/forgetpassword', function(req, res, next) {
  res.render('main/forgetpassword',{title:"Forget Password Page"});
});

router.post('/forgetpassword',function(req,res,next){
	session_store=req.session;
	req.assert('txtEmail', 'Please fill the Username').notEmpty();
	req.assert('txtEmail', 'Email not valid').isEmail();

	var errors = req.validationErrors();
	if (!errors) {
		req.getConnection(function(err,connection){

			v_email = req.sanitize( 'txtEmail' ).escape().trim();
			
			var query = connection.query('select * from user where email="'+v_email+'"',function(err,rows)
			{
				if(err)
				{

					var errornya  = ("Error Selecting : %s ",err.code );  
					console.log(err.code);
					req.flash('msg_error', errornya); 
					res.redirect('/forgetpassword'); 
				}else
				{
					if(rows.length <=0)
					{

						req.flash('msg_error', "Wrong email address or password. Try again."); 
						res.redirect('/forgetpassword');
					}
					else
					{	
						req.flash('msg_success', "Password reset link sent in mail."); 
						res.redirect('/forgetpassword');
					}
				}

			});
		});
	}
	else
	{
		errors_detail = "Sory there are error<ul>";
		for (i in errors) 
		{ 
			error = errors[i]; 
			errors_detail += '<li>'+error.msg+'</li>'; 
		} 
		errors_detail += "</ul>"; 
		console.log(errors_detail);
		req.flash('msg_error', errors_detail); 
		res.redirect('/forgetpassword'); 
	}
			
});

router.get('/register', function(req, res, next) {
  res.render('main/register',{title:"User Register"});
});

router.post('/register',function(req,res,next){
	session_store=req.session;
	req.assert('txtName', 'Please fill the Name').notEmpty();
	req.assert('txtEmail', 'Please fill the Username').notEmpty();
	req.assert('txtEmail', 'Email not valid').isEmail();
	req.assert('txtPassword', 'Please fill the Password').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		req.getConnection(function(err,connection){
			v_pass = req.sanitize( 'txtPassword' ).escape().trim();
			v_name = req.sanitize( 'txtName' ).escape().trim();
			v_email = req.sanitize( 'txtEmail' ).escape().trim();
			var query = connection.query('select * from user where email="'+v_email+'" and password=md5("'+v_pass+'")',function(err,rows)
			{
				if(err)
				{

					var errornya  = ("Error Selecting : %s ",err.code );  
					console.log(err.code);
					req.flash('msg_error', errornya); 
					res.redirect('/register'); 
				}else
				{
					if(rows.length <=0)
					{
						
						//const userr = { email: v_email, password: v_pass };
						connection.query('INSERT INTO user SET email="'+v_email+'", password=md5("'+v_pass+'"), full_name="'+v_name+'"');
						req.flash('msg_success', "You have successfully regietr.");
						res.redirect('/register');
						
						
					}
					else
					{	
						
						req.flash('msg_error', "Email address or password already exist. Try again."); 
						res.redirect('/register');
					}
				}

			});
		});
	}
	else
	{
		errors_detail = "Sory there are error<ul>";
		for (i in errors) 
		{ 
			error = errors[i]; 
			errors_detail += '<li>'+error.msg+'</li>'; 
		} 
		errors_detail += "</ul>"; 
		console.log(errors_detail);
		req.flash('msg_error', errors_detail); 
		res.redirect('/register'); 
	}
});

module.exports = router;