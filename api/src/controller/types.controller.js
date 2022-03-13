const { getTypes } = require("../utils/typesUtils");

const getAllTypes = async (req, res) => {
  try {
    let pokemonType = await getTypes();
    res.json(pokemonType);
  } catch (error) {
    res.status(404).send(error);
  }
};
module.exports = getAllTypes;
