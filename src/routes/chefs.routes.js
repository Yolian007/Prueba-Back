const express = require("express");
const { registerChef, getChefs } = require("../controllers/chefs.controller");

const router = express.Router();

router.post("/", registerChef);
router.get("/", getChefs); 

module.exports = router;
