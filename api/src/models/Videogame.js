const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
     },
     rating:{
       type: DataTypes.INTEGER,
     },
     platform:{
        type: DataTypes.ARRAY(DataTypes.STRING),  // ARRAY DE STRING
        allowNull: false,
     },
     background_image:{
        type: DataTypes.STRING,
      },
      createdInDb:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
  });
};