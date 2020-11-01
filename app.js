const express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
flash = require("connect-flash");

// Importing database model

const subscribers = require("./models/subscribers")


mongoose.connect("mongodb://localhost/tech_club", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.use(bodyParser.urlencoded({extended : true }))
app.set("view engine" , "ejs");
app.use(flash());
app.use(express.static(__dirname+"/public"));


app.get("/",(req,res)=>{
	res.render("index")
})





app.listen("5000", ()=>{
	console.log("server started")
})
