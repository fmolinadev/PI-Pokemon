const axios = require("axios");
const { Types } = require("../db");
const URLTYPE = "https://pokeapi.co/api/v2/type";

const getTypes = async () => {
  const type = await axios.get(URLTYPE);
  console.log(type);
  try {
    const pokemonTypes = type.data.map((e) =>
      e.type ? e.type : "Esta informacion no esta disponible"
    );
    //crea nuevo arreglo con todos los elementos del sub-array concatenados recursivamente y devuelvo un unico valor por cada uno (no me repite los temperamentos)
    pokemonTypes.forEach((e) => {
      Types.findOrCreate({
        //Busca y si no encuentra, lo crea.
        where: { name: e },
      });
    });

    const allPokemonTypes = await Types.findAll();
    res.status(200).send(allPokemonTypes);
  } catch (error) {
    res.status(404).send({ error: "Ouch! We have an error server." });
  }
};

module.export = getTypes;
