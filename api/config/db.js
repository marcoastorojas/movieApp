const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

// const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
const db = new Sequelize(`postgres://zvsqjith:mBLM75Wh-lQZrgyZmnUZA-LlOWPWAoZw@mouse.db.elephantsql.com/zvsqjith`, {
    logging: false,
    native: false,
    define: {
        timestamps: false
    }
});
const connectPostgres = new Promise((resolve, reject) => {
    db.sync({ force: true })
        .then(resolve)
        .catch(reject)
})
module.exports = {
    db,
    connectPostgres
}