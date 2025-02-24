const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const problemSchema = new mongoose.Schema({
  statement:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  tech:{
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
  }
},{timestamps:true})

mongoose.model("Problem", problemSchema)
