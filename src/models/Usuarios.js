const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "usuarios",
        {
            // El ID con Primary Key y demás lo hace el MySQL automáticamente. Se puede poner, pero es medio al pepe.
            Usuario: { // Ésto vendría a ser el Username, solo opté por ponerle Usuario como nombre
                type: DataTypes.STRING,
            },

        Email: {
        type: DataTypes.STRING,
    },

    Contrasena: {
        type: DataTypes.STRING,
    },

},
        {
            timestamps: false,
        }


  )
}