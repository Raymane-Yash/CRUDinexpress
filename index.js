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

app.get('/home', async(req,res)=>{
    const  User_info = await newContact.find()
    // res.json(User_info)
 res.render('home',{User_info})
})

// add user
app.get('/add-user', (req,res)=>{
    res.render('add-user')
})

app.post('/add-user', async(req,res)=>{
    await newContact.create(req.body)
    res.redirect('/')
})

// app.post('/add-user', async(req,res)=>{
//    try{
//      const {fname,lname,email,phno,address}=req.body
//     const new_contact= newContact({fname,lname,email,phno,address})
//      await new_contact.save()
//     res.render('home')
//    }
//    catch(err){
//     console.error(err),
//     res.status(500).send('Error saving contact');
//    }
// })

// update usre

app.get('/update-user/:id', async(req,res)=>{
    const oneUserData = await newContact.findById(req.params.id)
    res.render('update-user',{oneUserData})
})

app.post('/update-user/:id', async(req,res)=>{
    await newContact.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/')

})

//show-user page

app.get('/show-user/:id', async(req,res)=>{
    const oneUserData =await newContact.findOne({_id:req.params.id})
    res.render('show-user',{oneUserData})
})

// app.post('/show-user', (req,res)=>{

// })

// Delete 

app.get('/delete-user/:id',async(req,res)=>{
    await newContact.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


//server

app.listen(3000,()=>{
    console.log('Connected succesfully to server 3000');
    
})
