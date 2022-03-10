const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const res = require('express/lib/response');
require("dotenv").config();
const UserSchema = new mongoose.Schema({
    username:{ type:String , required:true,unique:true },
    email: { type:String , required:true, unique:true },
    password:{ type:String , required:true ,unique:true }, 
    profilePic:{ type:String , default:" " },
    isAdmin:{ type:String , default:false }
},
    {timestamps:true}
);


module.exports = mongoose.model("User" ,UserSchema);