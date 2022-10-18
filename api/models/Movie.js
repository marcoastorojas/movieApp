const { DataTypes } = require("sequelize");
const { db } = require("../config/db");
const Category = require("./Category");


const Movie = db.define("movie", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    overview: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAd: {
        type: DataTypes.DATE,
        allowNull: false
    }  
})
Movie.findMovieByTitle = async function (title = "") {
    return await Movie.findOne({ where: { title } })
}

Category.belongsToMany(Movie, { through: "categorymovie" })
Movie.belongsToMany(Category, { through: "categorymovie" })


module.exports = Movie