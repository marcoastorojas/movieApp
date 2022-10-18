const { DataTypes } = require("sequelize");
const { db } = require("../config/db");
const Movie = require("./Movie");
const Serie = require("./Serie");

const Actor = db.define("actor", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    weight: {
        type: DataTypes.STRING,
    },
    history: {
        type: DataTypes.STRING,
    }
})

Movie.belongsToMany(Actor, { through: "actormovie" })
Actor.belongsToMany(Movie, { through: "actormovie" })

Serie.belongsToMany(Actor, { through: "actorserie" })
Actor.belongsToMany(Serie, { through: "actorserie" })

module.exports = Actor