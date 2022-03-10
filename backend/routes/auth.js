const express = require('express');
const router = express();
const CryptoJS = require("crypto-js");
const User = require('../models/Users');
const jwt = require("jsonwebtoken");
require('dotenv').config();

//Login And Registration Module
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).send("Netflix Account Successfully ");
  } catch (err) {
    res.status(401).send("Oops!Got an error",err);
  }
});

router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).send("Wrong Credentials");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
       
        originalPassword !== req.body.password &&
        res.status(401).send("Wrong password or username!");
        
        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        ); 
        const{ ...info } = user._doc;
        res.status(201).json({ ...info,accessToken });

    } catch (error) {
        res.status(400).send("Oops!You are doing something wrong");
    }
})
    

module.exports = router;