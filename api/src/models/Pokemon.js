const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Pokemon", {
    id: {
      type: DataTypes.UUID,
      DefaultValue: UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.TEXT,
      validate: { isUrl: true },
      allowNull: true,
      // defaultValue: "https://i.imgur.com/Saga2pd.jpg?1",
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
    createdPokemon: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
