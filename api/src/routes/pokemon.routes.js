// //Exporto todas las funcionalidades del controlador del cual se encarga index.
const { Router } = require("express");
const router = Router();
const {
  getPokemon,
  getByID,
  createPokemon,
} = require("../controller/pokemon.controller");
router.get("/", getPokemon);
router.get("/:id", getByID);
router.post("/create", createPokemon);

module.exports = router;
