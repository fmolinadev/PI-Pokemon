const axios = require("axios");
const { Types } = require("../db.js");
const URLTYPE = "https://pokeapi.co/api/v2/type";

/////////////////////GET TYPES ///////////////////////////////////

const getAllTypes = async (req, res) => {
  try {
    const getUrlType = await axios.get(URLTYPE);
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
    res.status(200).send(allPokemonDbTypes);
  } catch (error) {
    res.status(404).send({ error: "Ouch! Ocurrio un error. " });
  }
};
module.exports = getAllTypes;
