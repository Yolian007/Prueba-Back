const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  maxChefs: { type: Number, required: true },
  chefs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chef" }],
  scores: { type: Map, of: Number },
}, { 
  versionKey: false,
  timestamps: true 

});

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;