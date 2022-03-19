const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Types",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        index: true,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: "This data was not found.",
      },
    },
    { timestamps: false }
  );
  {
  }
};
