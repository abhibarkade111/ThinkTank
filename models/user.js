const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userScheme = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  problemSolved:{
    type: Number,
    required:true
  },
  problemAdded:{
    type: Number,
    required:true
  },
  resetToken:String,
  expiredToken:Date,
  pic:{
    type:String,
    required:true
  }
})

mongoose.model("User", userScheme)