const express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
flash = require("connect-flash");

// Importing database model

const Subscribers = require("./models/subscribers")

// local mongo

// mongoose.connect("mongodb://localhost/tech_club", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })

// cluster mongo 

mongoose.connect("mongodb+srv://deepjyotideka:hello@123@yelpcamp.zfidh.mongodb.net/tech_club?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.use(bodyParser.urlencoded({extended : true }))
app.set("view engine" , "ejs");
app.use(flash());
app.use(express.static(__dirname+"/public"));

app.use(require("express-session")({
	secret  			: "youtube vs tiktok",
	resave				: false,
	saveUninitialized 	: false
}))

app.use(function(req,res,next){
	res.locals.error = req.flash("error");
	res.locals.message = req.flash("success");
	next();
})

app.get("/",(req,res)=>{
	res.render("index")
})

app.post("/",(req,res)=>{
	Subscribers.create(req.body.info,function(err,subscriber){
		if (err){
			req.flash("error", "Something Went Wromg ")
			res.redirect("/")
		}
		else{
			console.log(req.body.info.email)
			req.flash("success", "We appreciate your consideration and welcome you to the Boss Club :P ")
			res.redirect("/")
		}
	})
})




app.listen("5000", ()=>{
	console.log("server started")
})
