const express = require('express');
const app = express();
app.use(express.json());
require('./config/mongo')
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Backend On Duty, ${port}`);
})
