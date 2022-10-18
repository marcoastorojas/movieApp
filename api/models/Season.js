const { DataTypes } = require("sequelize");
const { db } = require("../config/db");
const Chapter = require("./Chapter");
const Serie = require("./Serie");


const Season = db.define("season", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    season_number: {
        type: DataTypes.INTEGER,
    },
    overview: {
        type: DataTypes.TEXT
    },
    poster_path: {
        type: DataTypes.TEXT
    }
})

Serie.hasMany(Season)
Season.belongsTo(Serie)

Season.hasMany(Chapter)
Chapter.belongsTo(Season)



module.exports = Season