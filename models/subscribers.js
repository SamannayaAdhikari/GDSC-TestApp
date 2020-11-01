const mongoose = require("mongoose");

const subscribersSchema = new mongoose.Schema({
	email : String
})

module.exports = mongoose.model("Subscribers",subscribersSchema)