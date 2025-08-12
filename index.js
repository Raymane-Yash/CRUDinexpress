const express = require('express')
const app = new express()
const mongoose = require('mongoose')
const newContact= require('./model/newContact')

//Connecting to mongodb

mongoose.connect('mongodb://127.0.0.1:27017/PeopleManager')
.then(()=>{
    console.log('Connected to MongoDB')
})

//middlewar

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

//routes

app.get('/',(req,res)=>{
    res.redirect('/home')
})

app.get('/home', (req,res)=>{
  res.render('home')
})

app.get('/add-user', (req,res)=>{
    res.render('add-user')
})

app.post('/save', async(req,res)=>{
   try{
     const {fname,lname,email,phno,address}=req.body
    const new_contact= newContact({fname,lname,email,phno,address})
     await new_contact.save()
    res.render('home')
   }
   catch(err){
    console.error(err),
    res.status(500).send('Error saving contact');
   }
})


//server

app.listen(3000,()=>{
    console.log('Connected succesfully to server 3000');
    
})
