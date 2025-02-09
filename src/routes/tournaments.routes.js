const express = require("express");
const { createTournament } = require("../controllers/tournaments.controller");
const { registerChefInTournament } = require("../controllers/tournaments.controller");
const { submitResult } = require("../controllers/tournaments.controller");
const { getTournamentRanking } = require("../controllers/tournaments.controller");




const router = express.Router();

router.post("/", createTournament);
router.post("/:id/register", registerChefInTournament);
router.post("/:id/submit", submitResult);
router.get("/:id/ranking", getTournamentRanking);




module.exports = router;
