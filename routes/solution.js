const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Solution  = mongoose.model('Solution')
const { JWT_SECRET } = require("../config/keys")

router.post('/submitsolution', requireLogin, (req,res)=>{
  console.log("req.body", req.body)
  console.log("req.body.problem", req.body.problem)
  const {answer,additional_comment} = req.body.formData
  if(!answer){
    return res.status(422).json({error: "Please add all the feilds"})
  }
  req.user.password = undefined
  const solution = new Solution( {
    answer,
    additional_comment,
    postedBy: req.body.user,
    problem: req.body.problem
  })
  solution.save().then(result=>{
    res.json({solution: result})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.post('/usersolutions', requireLogin, (req,res)=>{
  // console.log("req=",req)
  // console.log("req=",req.body.User._id)
  Solution.find({postedBy: req.body._id})
  .sort({'_id':-1})
  .populate("postedBy", "_id name")
  .populate("problem", "_id statement tech")
  .then(solutions=>{
    res.json({solutions})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.post('/problemsolutions', requireLogin, (req,res)=>{
  console.log("req=",req)
  // console.log("req=",req.body.User._id)
  Solution.find({problem: req.body._id})
  .sort({'_id':-1})
  .populate("postedBy", "_id name")
  .populate("problem", "_id statement tech")
  .then(solutions=>{
    res.json({solutions})
  })
  .catch(err=>{
    console.log(err)
  })
})

module.exports= router