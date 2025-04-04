const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         required: true,
//         unique : true
//     },
//     password:{
//         type: String,
//         required: true,
//     },
// });
const userSchema = new mongoose.Schema({
        email:{
            type: String,
            required: true,
            unique : true
        },
        name:{
            type: String,
            required: true,
            unique : true
        },
        role:{
            type: String,
            unique : true
        },
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
    // Create a method inside the model to be called
    userSchema.methods.isMatch = async function (password) {
        return await bcrypt.compare(password, this.password);
    };


const Users = mongoose.model('xUsers',userSchema);
module.exports.Users = Users;