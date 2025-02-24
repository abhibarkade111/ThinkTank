const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Problem  = mongoose.model('Problem')
const { JWT_SECRET } = require("../config/keys")

router.post('/submitproblem', requireLogin, (req,res)=>{
  const {statement,description,tech,additional_comment} = req.body.formData
  // console.log("req.body", req.body)
  if(!statement || !description){
    return res.status(422).json({error: "Please add all the feilds"})
  }
  req.user.password = undefined
  const problem = new Problem( {
    statement,
    description,
    additional_comment,
    tech,
    postedBy: req.user
  })
  problem.save().then(result=>{
    res.json({problem: result})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.get('/allproblems', requireLogin, (req,res)=>{
  Problem.find()
  .sort({'_id':-1})
  .then(problems=>{
    res.json({problems})
  })
  .catch(err=>{
    console.log(err)
  })
})

module.exports= router