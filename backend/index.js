//Creating Port Connection
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
//Database Connection required Fields
require('./config/mongo')
//Required auth Module
const authRoute = require("./routes/auth");

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(port,()=>{
    console.log(`Backend On Duty, ${port}`);
})
