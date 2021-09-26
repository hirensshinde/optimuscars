const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// load User model
const User = require('../model/user');

module.exports = function(passport) {
    passport.use(
        new localStrategy({ usernameField: 'email' }, ( email, password, done ) => {
            // Match User
            User.findOne({ email: email })
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: 'That email is not registered'});
                    }
                    // Match password
                    // bcrypt.compare(user password input, password saved in database )
                    bcrypt.compare(password, user.password, (err, isMatched) => {
                        if (err) throw err;
                        if (isMatched) {
                            done(null, user)
                        } else {
                            return done(null, false, { message: "Password incorrect"})
                        }
                    } )
                    
                })
                .catch( err => console.log(err));
        })
    )

    passport.serializeUser( (user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
    });
}