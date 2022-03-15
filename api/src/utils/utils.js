const axios = require("axios");
const { Pokemon, Types } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon/";

//Traigo la info de la API:
let apiPokemon = async () => {
  try {
    let pokemonSaved = [];
    //Me pide que solo me guarde 40 pokemones:
    for (let i = 1; i <= 40; i++) {
      pokemonSaved.push(axios.get(URL + i));
    }
    return await Promise.all(pokemonSaved).then((res) => {
      const pokemonApi = res.map((pokemonSaved) => {
        return (p = {
          name: pokemonSaved.data.name,
          id: pokemonSaved.data.id,
          image: pokemonSaved.data.sprites.other.dream_world.front_default,
          types: pokemonSaved.data.types.map((e) => e.type.name),
          life: pokemonSaved.data.stats[0].base_stat,
          attack: pokemonSaved.data.stats[1].base_stat,
          defense: pokemonSaved.data.stats[2].base_stat,
          speed: pokemonSaved.data.stats[5].base_stat,
          height: pokemonSaved.data.height,
          weight: pokemonSaved.data.weight,
        });
      });
      return pokemonApi;
    });
  } catch (err) {
    console.log(err);
  }
};

//Traigo la info de la base de datos:

const dbPokemon = async () => {
  try {
    const dbInfo = await Pokemon.findAll({
      attributes: [
        "id",
        "image",
        "name",
        "types",
        "createdPokemon",
        "life",
        "attack",
        "defense",
        "speed",
        "weight",
        "height",
      ],
      include: { model: Types },
      through: {
        attributes: [],
      },
    });
    const pokemonFromDB = dbInfo.map((e) => {
      return {
        id: e.dataValues.id,
        name: e.dataValues.name,
        life: e.dataValues.life,
        attack: e.dataValues.attack,
        defense: e.dataValues.defense,
        speed: e.dataValues.speed,
        weight: e.dataValues.weight,
        height: e.dataValues.height,
        image: e.dataValues.image,
        types: e.dataValues.types,
        createdPokemon: true,
      };
    });
    return pokemonFromDB;
  } catch (error) {
    console.log(error);
  }
};

//Concateno todos los pokemones:
const allPokemon = async () => {
  try {
    let apiPokemonInfo = await apiPokemon();
    let dbPokemonInfo = await dbPokemon();
    let totalPokemonInfo = [...apiPokemonInfo, ...dbPokemonInfo];
    return totalPokemonInfo;
  } catch (error) {
    return error;
  }
};

//Entrego la info por ID:

const allPokeId = async (id) => {
  //Primero hago la petision a la API con ese id:
  try {
    if (!id.includes("-")) {
      //Si tiene un id UUID salta a buscar a la base de datos.
      //Busco en ID de la API:
      let pokeId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let onePokemon = {
        id: pokeId.data.id,
        image: pokeId.data.sprites.other.dream_world.front_default,
        name: pokeId.data.name,
        types: pokeId.data.types.map((t) => t.type.name),
        life: pokeId.data.stats[0].base_stat,
        attack: pokeId.data.stats[1].base_stat,
        defense: pokeId.data.stats[2].base_stat,
        speed: pokeId.data.stats[5].base_stat,
        height: pokeId.data.height,
        weight: pokeId.data.weight,
      };
      return onePokemon;
    } else {
      //Si salta por el tipo de id, hago la busqueda en la Base de Datos:
      let dbPokemonById = await Pokemon.findOne({
        where: { id: id },
        include: {
          model: Types,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      let pokemonIdDb = {
        id: dbPokemonById.id,
        image: dbPokemonById.id,
        name: dbPokemonById.name,
        types: dbPokemonById.types.map((t) => t.type.name),
        life: dbPokemonById.life,
        attack: dbPokemonById.attack,
        defense: dbPokemonById.defense,
        speed: dbPokemonById.speed,
        height: dbPokemonById.height,
        weight: dbPokemonById.weight,
      };
      return res.send(pokemonIdDb);
    }
  } catch (error) {
    res
      .status(404)
      .json({ msg: `No se encontró un Pokemon para el id: ${id}` });
    console.log(error);
  }
};

module.exports = {
  allPokemon,
  allPokeId,
};
