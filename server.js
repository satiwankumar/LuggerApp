const express = require('express')
const path = require('path')
const app = express();
const connectDB= require('./config/db')
require('dotenv').config()

//connect Database
connectDB()
//Init middleware

app.use(express.json({limit: '50mb'}))

const Users = require('./routes/users');
const Auth = require('./routes/auth')
const Lugger = require('./routes/lugger')
const Contact = require('./routes/contact')
const Request = require('./routes/requests')
const Review = require('./routes/review')

app.use('/api/users',Users)
app.use('/api/auth',Auth)
app.use('/api/lugger',Lugger)
app.use('/api/request',Request)
app.use('/api/contact',Contact)
app.use('/api/review',Review)





app.get("/uploads/images/:name", (req, res) => {
    console.log(req.params.name)
    res.sendFile(path.join(__dirname, `./uploads/images/${req.params.name}`));
  });



app.get('/',(req,res)=>{
    res.send('api runnning')
})

const PORT =  process.env.PORT || 5000

app.listen(PORT,()=> console.log(`server started on port ${PORT}`))