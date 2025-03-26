const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required: true,
    },
});


const Users = mongoose.model('xUsers',userSchema);
module.exports.Users = Users;