const { Router } = require("express")
// const { addNewUser, verifyUser, revalidToken } = require("../controllers/authControllers")
// const { validateNEwUser } = require("../middlewares/validateNewUser")
const movieRouter = Router()
movieRouter.get("/", (req, res) => {
    res.send("hola mundo")
})

// movieRouter.post("/", verifyUser)
// movieRouter.post("/new",validateNEwUser, addNewUser)
// movieRouter.get("/renew",revalidToken)
module.exports = movieRouter