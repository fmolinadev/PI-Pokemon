// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
const { Router } = require("express");
const pokemonRoute = require("./pokemon.routes");
const typesRoute = require("./types.routes");

const router = Router();

router.use("/pokemon", pokemonRoute);
router.use("/types", typesRoute);

module.exports = router;
