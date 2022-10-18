const { DataTypes } = require("sequelize");
const { db } = require("../config/db");
const Category = require("./Category");


const Serie = db.define("serie", {
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
Serie.findSerieByTitle = async function (title = "") {
    return await Serie.findOne({ where: { title } })
}

Category.belongsToMany(Serie, { through: "categoryserie" })
Serie.belongsToMany(Category, { through: "categoryserie" })


module.exports = Serie