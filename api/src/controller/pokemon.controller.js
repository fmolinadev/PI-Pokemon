const { allPokemon, allPokeId } = require("../utils/utils");
const { Pokemon, Types } = require("../db");

////////////////////GET POR NOMBRE O TODOS LOS POKEMONES///////////////////////

const getPokemon = async (req, res) => {
  try {
    const { name } = req.query; //Si recibo name, lo busco.
    //Lo busco en todos los pokemones concatenados desde mi UTILS. Se de donde viene por la propiedad "createPokemon".
    let infoPokemon = await allPokemon();
    if (name) {
      let pokemonName = await infoPokemon.filter(
        (e) => e.name.toLowerCase() === name.toLowerCase()
      );
      if (pokemonName.length === 0) {
        res.status(404).send("No se encontro ningun Pokemon con ese nombre");
      } else {
        return res.status(200).json(pokemonName);
      }
    } else {
      //Si no recibo nombre, devuelvo todos los pokemones.
      return res.status(200).json(infoPokemon);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
/////////////////////////////GET X ID ///////////////////////////////7///

//Si el GET es de un personaje por el ID que lo recibo por Params o Query:
async function getByID(req, res) {
  const { id } = req.params;
  try {
    let infoPokemon = await allPokeId(id);
    res.status(200).json(infoPokemon);
  } catch (error) {
    res.status(404).send(error);
  }
}
//////////////////////////////POST/////////////////////////////////////

const postPokemon = async (req, res) => {
  const { name, life, image, attack, defense, speed, height, weight, types } =
    req.body;
  //Valido todo:
  if (!Object.keys(req.body).length)
    return res
      .status(400)
      .send({ msg: "Error. No se recibio información para agregar" });
  //Valido solamente name(es required en mi DB)
  if (!name) {
    return res
      .status(404)
      .send({ msg: "Error. No se inserto el nombre del Pokemon." });
  }
  //Podia usar el findOrCreate pero lo separo para manerar el error por separado.
  try {
    let findOnePokemon = await Pokemon.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });
    //Primero verifico que el nombre este disponible.
    if (findOnePokemon)
      return res.json({ msg: "El Pokemon ya existe. Intenta crear otro." });

    let newPokemon = await Pokemon.create({
      name: name.toLowerCase(),
      image: image,
      life: life,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
      types,
    });
    //Tipo de PK:
    let pokemonTypeBD = await Types.findAll({
      where: {
        name: types,
      },
    });
    //Le paso el Types:
    await newPokemon.setTypes(pokemonTypeBD);
    return res
      .status(201)
      .send({ msg: `El Pokemon ${newPokemon.name} fue creado con éxito!.` });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};
module.exports = {
  getPokemon,
  getByID,
  postPokemon,
};
