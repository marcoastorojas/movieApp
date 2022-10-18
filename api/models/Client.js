const { DataTypes } = require("sequelize");
const { db } = require("../config/db");
const jwt = require("jsonwebtoken")
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const Movie = require("./Movie");
const Favorite = require("./Favorite");


const Client = db.define("client", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING(60),
    image: DataTypes.STRING(60),
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            isEmail: { msg: "must be a valid email" },
            notEmpty: { msg: "cannot be a null state" }
        },
        unique: {
            args: true,
            msg: "email already exists"
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "password is required" }
        }
    },
    countActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    hooks: {
        beforeCreate(client) {
            client.password = hashSync(client.password, genSaltSync(10));
        },

    }
})

// Static method Client 
Client.isValidJwt = function (token) {
    return new Promise((resolve, reject) => {
        try {
            const isverify = jwt.verify(token, "privateWord123")
            resolve(isverify)
        } catch (error) {
            reject({ message: "is not a valid token" })
        }
    })
}
Client.findByEmail = async function (email) {
    return await Client.findOne({ where: { email } })
}

// Methods for client
Client.prototype.validatePassword = function (password) {
    return compareSync(password, this.password)
}
Client.prototype.generateToken = function () {
    return jwt.sign({ userId: this.id }, "privateWord123")
}

Client.belongsToMany(Movie, { through: Favorite, as: "favorites" })
Movie.belongsToMany(Client, { through: Favorite, as: "favorites" })


module.exports = Client