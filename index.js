const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://amanraj06a:amanraj100@cluster0.ulpgyhx.mongodb.net/");

const User = mongoose.model('User', { name: String,email: String, password: String});




app.post("/signup",async function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;


  const existingUser = await User.finOne({email:username});
  if(existingUser){
    return res.status(400).send("User already exists");
  }
 
  const user = new User({
    name: name, 
    email: username,
    password:password});

  user.save();
  res.json({
    "msg" : "user created successfully"
  })
});


