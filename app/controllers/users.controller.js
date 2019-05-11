const Users = require('../models/users.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.full_name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

    // Create a User
    const user = new Users({
        full_name: req.body.full_name || "Untitled User", 
        email: req.body.email,
        phone: req.body.phone
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};


// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Users.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Retrieve and return all users with notes from the database.
exports.findAllUsersWithNotes = (req, res) => {
    Users.find()
    .populate('notes', ['title', 'content'])
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};


exports.login = (req, res) => {

    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }

    // Validate request
    if(!req.body.phone) {
        return res.status(400).send({
            message: "User phone can not be empty"
        });
    }


    Users.findOne({ email: req.body.email, phone:req.body.phone })
    .then(users => {
        if(!users) {
            return res.status(404).send({
                message: "User not found with email " + req.body.email + " and mobile number number " + req.body.email
            });            
        }

  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(5,randomNumber.length);
    res.cookie('cookieName',randomNumber);
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 

        res.status(200).json({
            error: false,
            message: 'success',
            otp: randomNumber,
            result: users
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });


};