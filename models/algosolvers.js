const mongoose = require("mongoose");

const algosolversSchema = new mongoose.Schema({
	email : String,
})

module.exports = mongoose.model("Algosolvers",algosolversSchema)