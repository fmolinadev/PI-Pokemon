const axios = require("axios");
const { Pokemon, Types } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const URL_TYPES = "https://pokeapi.co/api/v2/type";

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
          image: pokemonSaved.data.sprites.other.home.front_default,
          types: pokemonSaved.data.types.map((e) => e.type.name),
          attack: pokemonSaved.data.stats[1].base_stat,
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
      include: [
        {
          model: Types,
          as: "types",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      through: { attributes: ["name"] },
      attributes: ["id", "name", "image", "attack"],
    });

    if (dbInfo)
      return dbInfo.map((pokemon) => {
        const typesArrayStr = pokemon.dataValues.types.map((p) => p.name);
        return {
          ...pokemon.dataValues,
          types: typesArrayStr,
        };
      });
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
    if (!totalPokemonInfo) {
      return "No hay pokemones para mostrar.";
    }
    return totalPokemonInfo;
  } catch (error) {
    return error;
  }
};

//Buscar por nombre:

const searchByName = async (name) => {
  try {
    // console.log("--FLAG SEARCH NOMBRE--");
    let findNamePokemon = await Pokemon.findOne({
      where: {
        name: name.toLowerCase(),
      },
      include: [
        {
          model: Types,
          as: "types",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      through: { attributes: ["name"] },
      attributes: ["id", "name", "image", "attack"],
    });
    // console.log("--FLAG SEARCH NAME DB--");
    if (findNamePokemon) {
      let { dataValues } = findNamePokemon;
      dataValues.types = dataValues.types.map((t) => t.name);
      return dataValues;
    } else {
      // console.log("--FLAG SEARCH NAME API--");

      let pokeNameAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      let nameAPIPokemon = {
        id: pokeNameAPI.data.id,
        image: pokeNameAPI.data.sprites.other.home.front_default,
        name: pokeNameAPI.data.name,
        types: pokeNameAPI.data.types.map((t) => t.type.name),
        attack: pokeNameAPI.data.stats[1].base_stat,
      };
      // console.log(nameAPIPokemon);

      return nameAPIPokemon;
    }
  } catch (error) {
    return res.send({ alert: `"No se encuentra el Pokémon llamado ${name}` });
  }
};

//Entrego la info por ID:

const allPokeId = async (id) => {
  //Primero hago la petision a la API con ese id:

  if (!id) {
    res.send("Error: Falta el número de ID para buscar. ¡Intenta de nuevo!");
  } else if (id.length > 4) {
    res.send(`Error: El ID debe ser más corto.`);
  }
  try {
    if (id > 1125) {
      try {
        let dbPokemonById = await Pokemon.findByPk(id, {
          include: [
            {
              model: Types,
              as: "types",
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],

          through: { attributes: ["name"] },
          attributes: [
            "id",
            "name",
            "image",
            "life",
            "attack",
            "defense",
            "speed",
            "height",
            "weight",
          ],
        });
        // console.log(dbPokemonById);
        //Mi types es: [[types][types]] WTF!
        const { dataValues } = dbPokemonById;
        // console.log(dataValues)
        dataValues.types = dataValues.types.map((t) => t.name);
        if (dbPokemonById) return dataValues;
      } catch (error) {
        console.log(error);
      }
    } else {
      let pokeId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let onePokemon = {
        id: pokeId.data.id,
        image: pokeId.data.sprites.other.home.front_default,
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
    }
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ msg: `No se encontró un Pokemon para el id: ${id}` });
  }
};

//   Funcion que trae los tipos de Pokemones  //

const getAllTypes = async (req, res) => {
  try {
    const getUrlType = await axios.get(URL_TYPES);
    //Llamado a la ruta Types de la API.
    allTypes = getUrlType.data.results;

    allTypes.forEach((e) => {
      Types.findOrCreate({
        //Busca el type y si no encuentra, lo crea.
        where: { name: e.name },
      });
    });

    //Traigo el resto de los Types
    const allPokemonDbTypes = await Types.findAll();
    return allPokemonDbTypes;
  } catch (error) {
    return { error: "Ouch! Ocurrio un error en el servidor." };
  }
};

module.exports = {
  allPokemon,
  searchByName,
  allPokeId,
  getAllTypes,
};
