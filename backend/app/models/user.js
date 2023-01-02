const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Username is mandatory']
    },
    email : {
        type : String,
        required : [true, 'Email is mandatory'],
        validate : {
            validator : function (value){
                return isEmail(value)
            },
            message: function(){
                return('invalid email or password')
            }
        },
        unique : true
    },
    password : {
        type : String,
        required : [true, 'password is mandatory'],
        unique : true,
        minLength : 8,
        maxLength : 120 
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        required : true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User