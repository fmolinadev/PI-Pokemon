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
    return await Pokemon.findAll({
      attributes: ["id", "image", "name", "createdPokemon"],
      include: { model: Types },
      through: {
        attributes: [],
      },
    }).then((p) =>
      p.map((e) => {
        return {
          id: e.id,
          name: e.name,
          image: e.image,
          createdPokemon: e.createdPokemon,
          types: e.types.map((t) => t.name),
          life: e.data.stats[0].base_stat,
          attack: e.data.stats[1].base_stat,
          defense: e.data.stats[2].base_stat,
          speed: e.data.stats[5].base_stat,
          height: e.data.height,
          weight: e.data.weight,
        };
      })
    );
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
      //Si no lo encuentra desde la API, hago la busqueda en la Base de Datos:
      let dbPokemonById = await Pokemon.findByPk(id, {
        include: { model: Types },
      });
      let pokemonIdDb = {
        id: dbPokemonById.id,
        image: dbPokemonById.id,
        name: dbPokemonById.name,
        types: dbPokemonById.types.map((t) => t.name),
        life: dbPokemonById.life,
        attack: dbPokemonById.attack,
        defense: dbPokemonById.defense,
        speed: dbPokemonById.speed,
        height: dbPokemonById.height,
        weight: dbPokemonById.weight,
      };
      return pokemonIdDb;
    }
  } catch (error) {
    return `No se encontró un Pokemon para el id: ${id}`;
  }
};

module.exports = {
  allPokemon,
  allPokeId,
};
