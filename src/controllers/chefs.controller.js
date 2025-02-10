const Chef = require("../models/chef.model");

const registerChef = async (req, res) => {
  try {
    const { name, specialty, experienceYears, category } = req.body;

    // ✅ Corrección de la validación
    if (!name || !specialty || experienceYears === undefined || category === undefined) {
      return res.status(400).json({ message: "Todos los campos son obligatorios (name, specialty, experienceYears, category)" });
    }

    // ✅ Validar que la categoría sea una de las permitidas
    const validCategories = ["Postres", "Platos principales", "Entradas"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Categoría no válida. Debe ser 'Postres', 'Platos principales' o 'Entradas'." });
    }

    const chef = new Chef({ name, specialty, experienceYears, category });
    await chef.save();
    
    res.status(201).json({ message: "Chef registrado exitosamente", chef });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar chef", error });
  }
};

const getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json({ chefs });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener chefs", error });
  }
};

module.exports = { registerChef, getChefs };