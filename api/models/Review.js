const { DataTypes } = require("sequelize");
const { db } = require("../config/db");
const Client = require("./Client");
const Movie = require("./Movie");


const Review = db.define("review", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    rating:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    description:{
        type:DataTypes.TEXT
    }
})

Movie.belongsToMany(Client,{through:Review})
Client.belongsToMany(Movie,{through:Review})

module.exports = Review