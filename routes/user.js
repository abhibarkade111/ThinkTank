const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const User  = mongoose.model('User')
const { JWT_SECRET } = require("../config/keys")

router.get('/allusers', requireLogin, (req,res)=>{
  User.find({},{name:1, email:2, problemSolved:3, problemAdded:4, pic:5})
  .then(users=>{
    res.json({users})
  })
  .catch(err=>{
    console.log(err)
  })
})

module.exports= router