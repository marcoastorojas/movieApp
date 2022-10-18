const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()
require("./Favorite")
require("./Season")
require("./Chapter")    
const { connectPostgres } = require("../config/db.js")

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
        this.app.use(morgan("dev"))
    }
    routes() {
        this.app.use("/auth", require("../routes/authRoutes.js"))
        this.app.use("/movie", require("../routes/movieRoutes.js"))
        this.app.use("/serie", require("../routes/serieRoutes.js"))
        this.app.use("/category", require("../routes/categoryRoutes.js"))
        this.app.use("/actor", require("../routes/actorRoutes.js"))
        this.app.use("/season", require("../routes/seasonRoutes.js"))
        this.app.use("/chapter", require("../routes/chapterRoutes.js"))
        this.app.use("/user", require("../routes/clientRoutes.js"))
    }

}

module.exports = Server