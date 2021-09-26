const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    mobile: { type: Number },
    dateofbirth: { type: String, required: true, trim: true }, 
    token: { type: String }

})

const User = mongoose.model('User', userSchema);

module.exports = User;