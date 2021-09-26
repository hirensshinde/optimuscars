const User = require("../model/user");
const bcrypt = require('bcrypt');
const flash = require('connect-flash');


exports.registerController = (req, res) => {
    // register logic goes here
    const { firstname, lastname, email, mobile, dateofbirth, password, cpassword } = req.body;

    console.log(req.body);

    let errors = [];
    let messages = [];

    // CHECK VALIDATIONs

    // Check required fields
    if (!firstname || !lastname || !email || !mobile || !dateofbirth || !password || !cpassword ) {
        errors.push({ msg: "Please fill in all fields!"})
    }

    // Check if password match
    if (password !== cpassword) {
        errors.push({ msg: "Passwords do not match"})
    }

    // Check password length
    if ( password.length < 8) {
        errors.push({ msg: "Password should be at least 8 characters long"})
    }

    // If errors redirect back to register
    if ( errors.length > 0) {
        res.render('register', {
            errors,
            firstname,
            lastname, 
            email,
            mobile,
            dateofbirth,
            // password,
            // cpassword,
        })
    } else {
        User.findOne({ email: email })
            .then( user => {
                if( user ) {
                    errors.push({ msg: 'Email already registered'})
                    res.render('register', {
                        errors,
                        firstname,
                        lastname,
                        email,
                        mobile,
                        dateofbirth
                    })
                } else {
                    const newUser = new User({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        mobile: mobile,
                        dateofbirth: dateofbirth,
                        password: password
                    })
                    
                    bcrypt.genSalt(10, (err, salt) => {
                        if( err) throw err;
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    // console.log(messages);
                                    req.flash('success_msg', 'You have successfully created account');
                                    console.log(user);
                                    res.redirect('login');
                                })
                                .catch(err => console.log(err))
                        });
                    });
                    
                    
                }
            })
        }
        console.log(errors);
}
