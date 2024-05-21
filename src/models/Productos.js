const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "productos",
    { //Nuevamente, el ID con Primary Key no hace falta ponerlo ya que se crea automáticamente.
            Descripción: {
              type: DataTypes.STRING,
            },
            Precio: {
              type: DataTypes.INTEGER,
            },
            imagenURL: {
                type: DataTypes.STRING,
            },
            Nombre:{
                type: DataTypes.STRING
            },
        },

            {
                timestamps: false,
              }
        

  )
}