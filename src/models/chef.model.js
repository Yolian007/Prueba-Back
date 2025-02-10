const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  category: { type: String, enum: ["Postres", "Platos principales", "Entradas"], required: true }
}, {
  versionKey: false,
  timestamps: true
});

const Chef = mongoose.model("Chef", chefSchema);
module.exports = Chef;