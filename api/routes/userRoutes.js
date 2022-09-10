const { Router } = require("express")
// const { addNewUser, verifyUser, revalidToken } = require("../controllers/authControllers")
// const { validateNEwUser } = require("../middlewares/validateNewUser")
const userRouter = Router()
userRouter.get("/", (req, res) => {
    res.send("hola mundo")
})

// userRouter.post("/", verifyUser)
// userRouter.post("/new",validateNEwUser, addNewUser)
// userRouter.get("/renew",revalidToken)
module.exports = userRouter