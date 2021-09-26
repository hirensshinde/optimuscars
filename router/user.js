const express = require('express');
const UserModel = require('../model/user');
const router = express.Router();

// load Controller files
const { registerController } = require('../controllers/registerController');
const { loginController } = require('../controllers/loginController');

router.get('/register', (req, res) => {
    // register get request
    res.status(200).render('register');
});

router.get('/login', (req, res) => {

    res.status(200).render('login'  );
})

router.post("/register", registerController);

router.post('/login', loginController)


router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('login');
})


module.exports = router;