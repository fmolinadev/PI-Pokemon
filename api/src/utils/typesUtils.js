const axios = require("axios");
const { Types } = require("../db");
const URLTYPE = "https://pokeapi.co/api/v2/type";

const getTypes = async () => {
  const type = await axios.get(URLTYPE);
  type.data.forEach((e) => {
    Types.findOrCreate({
      where: {
        name: e.name,
      },
    });
  });

  const allPokemonTypes = await Types.findAll();
  return allPokemonTypes;
};

module.export = getTypes;
