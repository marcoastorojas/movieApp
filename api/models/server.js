const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectPostgres = require("../config/db.js")

class Server {

    constructor() {
        this.PORT = process.env.PORT
        this.app = express()
        this.middlewares()
        this.routes()
    }

    async start() {
        try {
            await connectPostgres
            this.app.listen(this.PORT, () => {
                console.log(`servidor corriendo en el puerto ${this.PORT}`)
            })
        } catch (error) {
            console.log(error)
        }
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
    }
    routes() {
        this.app.use("/auth", require("../routes/authRoutes.js"))
        this.app.use("/user", require("../routes/userRoutes.js"))
        this.app.use("/movie", require("../routes/movieRoutes.js"))
    }

}

module.exports = Server