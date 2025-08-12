const mongoose = require('mongoose')

const UserSchema= mongoose.Schema({
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    phno:{type:String},
    address:{type:String}
})

module.exports=mongoose.model('Contact', UserSchema)