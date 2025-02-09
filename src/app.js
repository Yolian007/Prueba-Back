const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");

const app = express();
app.use(express.json());
app.use(logger);

app.use("/api/chefs", require("./routes/chefs.routes"));
app.use("/api/tournaments", require("./routes/tournaments.routes"));

// Middleware para manejo de errores
app.use(errorHandler);

module.exports = app;
