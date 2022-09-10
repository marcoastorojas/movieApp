const { Router } = require("express")
// const { addNewUser, verifyUser, revalidToken } = require("../controllers/authControllers")
// const { validateNEwUser } = require("../middlewares/validateNewUser")
const authRouter = Router()
authRouter.get("/", (req, res) => {
    res.send("hola mundo")
})

// authRouter.post("/", verifyUser)
// authRouter.post("/new",validateNEwUser, addNewUser)
// authRouter.get("/renew",revalidToken)
module.exports = authRouter