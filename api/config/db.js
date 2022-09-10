const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

const connectPostgres = new Promise((resolve, reject) => {
    const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
        logging: false,
        native: false,
    });
    db.sync({ force: true })
        .then(resolve)
        .catch(reject)
})
module.exports = connectPostgres