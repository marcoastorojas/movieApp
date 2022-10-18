const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Chapter = db.define("chapter", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chapter_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    overview: {
        type: DataTypes.STRING,
    }
})



module.exports = Chapter