require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Verificar si se está cargando correctamente
console.log("Rutas cargadas en Express:", app._router.stack.map(r => r.route && r.route.path));