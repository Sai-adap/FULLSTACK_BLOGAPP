const express = require('express');
const Blog = require("./modals/Blog")
const mongoose = require('mongoose');
const userModel = require('./modals/user');
const {checkExistingUser, generatePasswordHash} = require("./utility");
const jwt = require('jsonwebtoken');
const multer = require("multer")();
const bcrypt = require("bcryptjs");
const salt=10;
const cors = require('cors')
const app =express();
require('dotenv').config();
app.use(multer.array());

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));



  

mongoose.connect("mongodb+srv://adapasai:adapasai@cluster0.0menc.mongodb.net/BlogApp?retryWrites=true&w=majority",()=>{
    console.log('connected to DB')
}),
    (err)=>console.log(err)


    app.listen(3005,(err)=>{
        if(!err){
            console.log('server started at 3005')
        }
      })

    app.post("/", (req, res)=> {
        userModel.find({email: req.body.email}).then((userData)=> {
            
            if(userData.length) {
                bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                    if(val) {
                        const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                        res.status(200).send({authToken});
                    } else {
                        console.log("Invalid Password")
                        res.status(400).send("Invalid Password");
                    }
                })
            } else {
                res.status(400).send("Unauthorized user");
            }
        })
    });

    app.post("/signup", async (req, res)=> {
        if(await checkExistingUser(req.body.email)) {
            res.status(400).send("email exist. Please try with different email");
        } else {
            generatePasswordHash(req.body.password).then((passwordHash)=> {
                userModel.create({email: req.body.email,password: passwordHash})
                                .then(()=> { 
                                    res.status(200).send(`${req.body.email} added successfully`); 
                                }).catch((err)=> {
                                    res.status(400).send(err.message)
                })
            });
        }
        
    });

    app.get("/blogs",async (req, res, next) => {
        let books;
        try {
          books = await Blog.find();
        } catch (err) {
          console.log(err);
        }
      
        if (!books) {
          return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).json({ books });
      });
    app.get("/blogs/:id", async (req, res, next) => {
        const id = req.params.id;
        let book;
        try {
          book = await Blog.findById(id);
        } catch (err) {
          console.log(err);
        }
        if (!book) {
          return res.status(404).json({ message: "No Book found" });
        }
        return res.status(200).json({ book });
      });
    
      app.post("/blogs",async (req, res, next) => {
    
        const { tittle,image,description } = req.body;
        let book;
        try {
          book = new Blog({
            tittle,
            image,
            description
          });
          await book.save();
        } catch (err) {
          console.log(err);
        }
      
        if (!book) {
          return res.status(500).json({ message: "Unable To Add" });
        }
        return res.status(201).json({ book });
      });
    
    app.put("/blogs/:id",async (req, res, next) => {
        const id = req.params.id;
        const { tittle,image,description } = req.body;
        let book;
        try {
          book = await Blog.findByIdAndUpdate(id, {
            tittle,
            image,
            description
          });
          book = await book.save();
        } catch (err) {
          console.log(err);
        }
        if (!book) {
          return res.status(404).json({ message: "Unable To Update By this ID" });
        }
        return res.status(200).json({ book });
      });
    
    app.delete("/blogs/:id",async (req, res, next) => {
        const id = req.params.id;
        let book;
        try {
          book = await Blog.findByIdAndRemove(id);
        } catch (err) {
          console.log(err);
        }
        if (!book) {
          return res.status(404).json({ message: "Unable To Delete By this ID" });
        }
        return res.status(200).json({ message: "Product Successfully Deleted" });
      })
    