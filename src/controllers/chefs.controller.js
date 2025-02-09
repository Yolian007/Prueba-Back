const { chefs } = require("../models/chef.model");

const registerChef = (req, res) => {
  const { name, specialty, experienceYears } = req.body;

  if (!name || !specialty || experienceYears === undefined) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  if (typeof experienceYears !== "number" || experienceYears < 0) {
    return res.status(400).json({ message: "El campo 'experienceYears' debe ser un número positivo" });
  }

  const newChef = { id: `c${chefs.length + 1}`, name, specialty, experienceYears };
  chefs.push(newChef);

  return res.status(201).json({ message: "Chef registrado exitosamente", chef: newChef });
};

const getChefs = (req, res) => {
  res.status(200).json({ chefs });
};



module.exports = {
  registerChef,
  getChefs
};
