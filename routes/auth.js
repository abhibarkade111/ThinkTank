const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../config/keys")

router.post('/signup', (req,res)=>{
  const {name, email, password, pic, problemSolved, problemAdded} = req.body
  if(!email || !password || !name){
    return res.status(422).json({err:'Please add all of the feilds'})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
    if(savedUser){
      return res.status(422).json({err:'User already exists with that email'})
    }
    bcrypt.hash(password,12)
    .then(hashedPassword=>{
      const user = new User({
        email,
        name,
        password: hashedPassword,
        problemSolved,
        problemAdded,
        pic
      })

      user.save()
      .then(user=>{
        res.json({message: "Sign Up Successfully"})
      })
      .catch(err=>{
        console.log(err)
      })
    })
  })
  .catch(err=>{
    console.log(err)
  })
})


router.post('/signin', (req,res)=>{
  const {email, password} = req.body.formData
  // console.log("API: ", email, password, req.body)
  if(!email || !password){
    return res.status(422).json({err: 'Please add email or password'})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
    if(!savedUser){
      return res.status(422).json({err:'Invalid email or password'})
    }
    bcrypt.compare(password, savedUser.password)
    .then((doMatch)=>{
      if(doMatch){
        const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
        const {_id, name, email, pic} = savedUser
        res.json({token,user:{_id,name,email,pic}})
      }
      else{
        return res.status(422).json({err: 'Invalid email or password'})
      }
    })
    .catch(err=>{
      console.log(err)
    })
  })
})

module.exports= router