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

router.put('/incproblemsolved', requireLogin, (req,res)=>{
  User.findByIdAndUpdate(
    req.user._id,
    {$inc: {problemSolved:1}},
    {new : true}
  )
  .then(updateUser=>{
    res.json({updateUser})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.put('/incproblemadded', requireLogin, (req,res)=>{
  User.findByIdAndUpdate(
    req.user._id,
    {$inc: {problemAdded:1}},
    {new : true}
  )
  .then(updateUser=>{
    res.json({updateUser})
  })
  .catch(err=>{
    console.log(err)
  })
})
module.exports= router