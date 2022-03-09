const mongoose = require('mongoose');
require('dotenv').config();

const dburl = process.env.DBURL;

mongoose.connect(dburl)
.then(()=>{
    console.log("Netflix Connected");
})
.catch((err)=>{
    console.log("Oops! Netflix Disconnected",err);
})