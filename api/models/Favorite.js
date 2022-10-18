const { DataTypes } = require("sequelize");
const { db } = require("../config/db");


const Favorite = db.define("favorite", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
}, {

})


module.exports = Favorite