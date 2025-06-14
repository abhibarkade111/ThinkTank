const express = require('express')
require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const {MONGOURL} = require('./config/keys')
const cors = require("cors");
app.use(cors());

mongoose.connect(MONGOURL)

mongoose.connection.on('connected', ()=>{
  console.log('Connected to mongodb atlas')
})

mongoose.connection.on('error',(err)=>{
  console.log('error connecting', err)
})
// const cors = require("cors");
// app.use(cors());
require('./models/user')
require('./models/solution')
require('./models/problem')
app.use(express.json())
const auth = require('./routes/auth') 
app.use(auth)
const solutionRouter = require('./routes/solution') 
app.use(solutionRouter)
const userRoute = require('./routes/user') 
app.use(userRoute)
const problemRouter = require('./routes/problem') 
app.use(problemRouter)
const chatRouter = require('./routes/chatsupport') 
app.use(chatRouter)
const compilerRouter = require('./routes/compiler') 
app.use(compilerRouter)

if(process.env.NODE_ENV ==="production"){
  app.use(express.static('client/dist'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
  })
}

app.listen(PORT, ()=>{
  console.log('server is running on', PORT)
})