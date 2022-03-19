const { allPokemon, allPokeId, searchByName } = require("../utils/utils");
const { Pokemon, Types } = require("../db");

//////////////////////GET NAME O TODOS/////////////////////////

const getPokemon = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    // console.log("--FLAG SIN NOMBRE--");
    let getAllPokemon = await allPokemon();
    res.status(200).json(getAllPokemon);
    //GET a todos Pokemon: OK
  } else {
    try {
      let infoNamePokemon = await searchByName(name);
      // console.log("--FLAG CON NOMBRE EN CONTROLER--");
      res.status(200).json(infoNamePokemon);
      // console.log(infoNamePokemon);
    } catch (error) {
      res
        .status(404)
        .send(`Error: No existe el pokemon llamado ${name}. ¡Intenta crearlo!`);
    }
  }
};

/////////////////////////////GET X ID ///////////////////////////////7///

const getID = async (req, res) => {
  const { id } = req.params;
  try {
    let infoPokemon = await allPokeId(id);
    res.status(200).json(infoPokemon);
  } catch (error) {
    res.status(404).send(error);
  }
};
//////////////////////////////POST/////////////////////////////////////

const postPokemon = async (req, res) => {
  const {
    name,
    life,
    image,
    attack,
    defense,
    speed,
    height,
    weight,
    typeA,
    typeB,
  } = req.body;
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
    });
    //Le paso el Types:
    if (typeA) {
      let pokemonType1BD = await Types.findAll({ where: { name: typeA } });
      await newPokemon.addTypes(pokemonType1BD);
    }
    if (typeB) {
      let pokemonType2BD = await Types.findAll({ where: { name: typeB } });
      await newPokemon.addTypes(pokemonType2BD);
    } else if (!typeA && !typeB) {
      return res.send(
        `El Pokemon ${newPokemon.name} debe tener al menos un tipo. Verifica los datos ingresados.`
      );
    }

    let pokeIdDb = await Pokemon.findOne({
      where: { id: newPokemon.id },
      include: Types,
    });
    pokeIdDb = pokeIdDb.toJSON();
    pokeIdDb.id = pokeIdDb.id + `db`;

    //CHECK del pokemos + iddb
    // console.log(pokeIdDb);

    return res
      .status(201)
      .send({ msg: `El Pokemon ${pokeIdDb.name} fue creado con éxito!.` });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};
module.exports = {
  getPokemon,
  getID,
  postPokemon,
};
