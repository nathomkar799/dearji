const mongoose = require("mongoose")
//some itmes are removed as there were some chang going on.
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        // required: true
    }, 
    username : {
        type : String,
        // required : true,
        // unique: true
    }, 
    addressOfShop : {
        type : String,
        // required: true
    }, 
    // photoOfShop : {
    //     type : String,
    //     required: true
    // }, 
    password : {
        type : String,
        // required : true
    }, 
    experience : {
        type : Number,
    }, 
    contact : {
        type : String,
        // required : true
    }
}, {timestamps : true})

const User = mongoose.model("user", userSchema);

module.exports = User;