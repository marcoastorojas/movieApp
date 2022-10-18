const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Category = db.define("category", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    image: {
        type: DataTypes.STRING,
    },
    color:{
        type: DataTypes.STRING,
    }
})
module.exports = Category