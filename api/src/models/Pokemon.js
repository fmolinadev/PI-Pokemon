const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Pokemon", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
      index: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: { isUrl: true },
      defaultValue: "https://i.imgur.com/fOOL1IV.gif",
    },
    life: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 100,
      },
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 100,
      },
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 100,
      },
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 100,
      },
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 50, //El pokemon más alto es Eternatus (20m)
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 1000, //El pokemon más pesado es Cosmoem con 999kg.
      },
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdPokemon: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
