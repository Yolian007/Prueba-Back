const Tournament = require("../models/tournament.model");
const Chef = require("../models/chef.model");

const createTournament = async (req, res) => {
  try {
    const { name, location, maxChefs } = req.body;

    if (!name || !location || !maxChefs) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (typeof maxChefs !== "number" || maxChefs <= 0) {
      return res.status(400).json({ message: "El campo 'maxChefs' debe ser un número mayor a 0" });
    }

    const newTournament = new Tournament({
      name,
      location,
      maxChefs,
      chefs: [],
      scores: {}
    });

    await newTournament.save();

    return res.status(201).json({ message: "Torneo creado exitosamente", tournament: newTournament });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear torneo", error });
  }
};

const registerChefInTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { chefId } = req.body;

    const tournament = await Tournament.findById(id);
    const chef = await Chef.findById(chefId);

    if (!tournament) return res.status(404).json({ message: "Torneo no encontrado" });
    if (!chef) return res.status(404).json({ message: "Chef no encontrado" });

    if (tournament.chefs.length >= tournament.maxChefs) {
      return res.status(400).json({ message: "El torneo ya alcanzó su límite de participantes" });
    }

    if (tournament.chefs.includes(chefId)) {
      return res.status(400).json({ message: "El chef ya está registrado en este torneo" });
    }

    tournament.chefs.push(chefId);
    await tournament.save();

    return res.status(200).json({ message: "Chef registrado en el torneo exitosamente", tournament });
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar chef en el torneo", error });
  }
};

const submitResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { chefId, score } = req.body;

    const tournament = await Tournament.findById(id);
    if (!tournament) return res.status(404).json({ message: "Torneo no encontrado" });

    if (!tournament.chefs.includes(chefId)) {
      return res.status(400).json({ message: "El chef no está inscrito en este torneo" });
    }

    if (typeof score !== "number" || score < 0 || score > 100) {
      return res.status(400).json({ message: "El puntaje debe estar entre 0 y 100" });
    }

    tournament.scores.set(chefId, score);
    await tournament.save();

    return res.status(200).json({ message: "Resultado registrado exitosamente", tournament });
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar resultado", error });
  }
};

const getTournamentRanking = async (req, res) => {
  try {
    const { id } = req.params;

    const tournament = await Tournament.findById(id).populate("chefs");
    if (!tournament) return res.status(404).json({ message: "Torneo no encontrado" });

    const ranking = Array.from(tournament.scores.entries())
      .map(([chefId, score]) => {
        const chef = tournament.chefs.find(c => c._id.toString() === chefId);
        return { chef: chef.name, score };
      })
      .sort((a, b) => b.score - a.score);

    return res.status(200).json({
      tournament: tournament.name,
      location: tournament.location,
      ranking,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener ranking", error });
  }
};

const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("chefs");

    return res.status(200).json({ tournaments });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los torneos", error });
  }
};


module.exports = {
  createTournament,
  registerChefInTournament,
  submitResult,
  getTournamentRanking,
  getAllTournaments
};