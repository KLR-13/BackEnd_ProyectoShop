const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "orden",
    { // ID con Primary Key no hace falta ponerlo ya que se crea automáticamente.
            Fecha: {
              type: DataTypes.INTEGER,
            },
            Catalogo: {
              type: DataTypes.STRING,
            },

            Estado: {
                type: DataTypes.ENUM ("En proceso", "Completado", "Cancelado") //Enumera los posibles valores que 
                //puede tener.
            },

            MetodoPago: {
                type: DataTypes.ENUM ("Tarjeta de crédito", "Efectivo", "Débito")
            }

        },

            {
                timestamps: false,
              }
        

  )
}