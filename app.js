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

app.use((req,res,next)=>{
	res.locals.error = req.flash("error");
	res.locals.message = req.flash("success");
	next();
})

app.get("/",(req,res)=>{
	res.render("index")
})

app.post("/",(req,res)=>{
	console.log(req.body.info)
	if (req.body.info.answer == 165 ){
		
	
	Subscribers.create({email : req.body.info.email},(err,subscriber)=>{
		if (err){
			req.flash("error", "Something Went Wrong ")
			res.redirect("/")
		}
		else{
			req.flash("success", "We appreciate your consideration and welcome you to https://dsc-uni-gauhati.web.app/ :P ")
			res.redirect("https://dsc-uni-gauhati.web.app/")
		}
	})
		}
	else{ 
	req.flash("error", `Sorry ${req.body.info.email}! Thats not the right answer`)
	res.redirect("/")
		}
})




app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server started");
  }); 
