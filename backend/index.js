//Creating Port Connection
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
//Database Connection required Fields
require('./config/mongo')
//Required Routes Module
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies"); 
const listRoute = require("./routes/lists")
app.use(express.json());

//CRUD ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies",movieRoute);
app.use("/api/lists",listRoute);
//PORT LISTEN
app.listen(port,()=>{
    console.log(`Backend On Duty, ${port}`);
})
