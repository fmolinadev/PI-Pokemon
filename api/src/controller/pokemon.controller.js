const { allPokemon, allPokeId } = require("../utils/pokemonUtils");

const getPokemon = async (req, res) => {
  const { name } = req.query;
  try {
    let infoPokemon = await allPokemon();
    if (name) {
      let pokemonName = await infoPokemon.filter(
        (e) => e.name.toLowerCase() === name.toLowerCase()
      );
      if (pokemonName.length === 0) {
        res.status(404).send("No se encontro ningun Pokemon con ese nombre");
      } else {
        res.status(200).send(pokemonName);
      }
    } else {
      res.status(200).json(infoPokemon);
    }
  } catch (error) {
    next(error);
  }
};

//Si el GET es de un personaje por el ID que lo recibo por Params o Query:
const getByID = async (req, res) => {
  const { id } = req.params;
  try {
    let infoPokemon = await allPokeId(id);
    res.status(200).json(infoPokemon);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createPokemon = async (req, res) => {
  const { name, life, image, attack, defense, speed, height, weight, types } =
    req.body;

  try {
    let findOnePokemon = await Pokemon.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });

    if (findOnePokemon)
      return res.json({ msg: "El Pokemon ya existe. Intenta crear otro." });

    let newPokemon = await Pokemon.create({
      name: name,
      image: image,
      life: life,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
    });

    let pokemonType = await Type.findAll({
      where: {
        name: types,
      },
    });

    await newPokemon.addType(pokemonType);
    res.status(200).json({ msg: "Pokemon creado con éxito." });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getPokemon,
  getByID,
  createPokemon,
};
