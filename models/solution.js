const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const solutionSchema = new mongoose.Schema({
  answer:{
    type:String,
    required:true
  },
  additional_comment:{
    type:String,
    required:false
  },
  postedBy:{
    type:ObjectId,
    ref:"User"
  },
  problem:{
    type:ObjectId,
    ref:"Problem"
  }
},{timestamps:true})

mongoose.model("Solution", solutionSchema)
