const { tournaments } = require("../models/tournament.model");
const { chefs } = require("../models/chef.model");

const createTournament = (req, res) => {
  const { name, location, maxChefs } = req.body;

  if (!name || !location || !maxChefs) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  if (typeof maxChefs !== "number" || maxChefs <= 0) {
    return res.status(400).json({ message: "El campo 'maxChefs' debe ser un número mayor a 0" });
  }

  const newTournament = { id: `t${tournaments.length + 1}`, name, location, maxChefs, chefs: [], scores: {} };
  tournaments.push(newTournament);

  return res.status(201).json({ message: "Torneo creado exitosamente", tournament: newTournament });
};

const registerChefInTournament = (req, res) => {
    const { id } = req.params;
    const { chefId } = req.body;
  
    const tournament = tournaments.find(t => t.id === id);
    const chef = chefs.find(c => c.id === chefId);
  
    if (!tournament) return res.status(404).json({ message: "Torneo no encontrado" });
    if (!chef) return res.status(404).json({ message: "Chef no encontrado" });
  
    if (tournament.chefs.length >= tournament.maxChefs) {
      return res.status(400).json({ message: "El torneo ya alcanzó su límite de participantes" });
    }
  
    if (tournament.chefs.includes(chefId)) {
      return res.status(400).json({ message: "El chef ya está registrado en este torneo" });
    }
  
    tournament.chefs.push(chefId);
    return res.status(200).json({ message: "Chef registrado en el torneo exitosamente", tournament });
  };

  const submitResult = (req, res) => {
    const { id } = req.params;
    const { chefId, score } = req.body;
  
    const tournament = tournaments.find(t => t.id === id);
    if (!tournament) return res.status(404).json({ message: "Torneo no encontrado" });
  
    if (!tournament.chefs.includes(chefId)) {
      return res.status(400).json({ message: "El chef no está inscrito en este torneo" });
    }

    if (typeof score !== "number" || score < 0 || score > 100) {
      return res.status(400).json({ message: "El puntaje debe estar entre 0 y 100" });
    }
  
    tournament.scores[chefId] = score;
    return res.status(200).json({ message: "Resultado registrado exitosamente", tournament });
  };

  const getTournamentRanking = (req, res) => {
    const { id } = req.params;
  
    const tournament = tournaments.find(t => t.id === id);
    if (!tournament) return res.status(404).json({ message: "Torneo no encontrado" });
  
    const ranking = Object.entries(tournament.scores)
      .map(([chefId, score]) => {
        const chef = chefs.find(c => c.id === chefId);
        return { chef: chef.name, score };
      })
      .sort((a, b) => b.score - a.score);
  
    return res.status(200).json({
      tournament: tournament.name,
      location: tournament.location,
      ranking,
    });
  };

  console.log("Torneos registrados actualmente:", tournaments);


  module.exports = {
    createTournament,
    registerChefInTournament,
    submitResult,
    getTournamentRanking,
  };
