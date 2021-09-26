const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")



const { MONGODB } = require('./config');

mongoose.connect(MONGODB)

//routes
const auth = require("./auth")
const packs = require("./packs");
const { runInNewContext } = require("vm");

var app = express()
app.use(bodyParser.json())

app.get("/", (req,res)=>{
    res.send("test")
})

app.use("/auth", auth.router)
app.use("/packs", packs)

app.get("/check_access", auth.verifyToken, (req,res)=>{
    res.status(200).send("if you can see this text, it means that you logged in")
})

app.listen(3030, ()=>{
    console.log("server is listenning at port 3030")
})