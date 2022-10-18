const { Router } = require("express");
const { check, header, param, body } = require("express-validator");
const {
    getAllClients,
    getClientById,
    createClient,
    renewToken,
    login,
    activateCount,
    updateClient } = require("../controllers/authControllers");
const { validateResult } = require("../helpers/validateResults");
const Client = require("../models/Client");

const authRouter = Router()

authRouter.get("/", getAllClients)
authRouter.get("/:id", getClientById)
authRouter.post(
    "/",
    [
        check('email')
            .notEmpty().withMessage('email is required')
            .isEmail().withMessage('must be a valid email')
            .custom(async(value) => { if (await Client.findByEmail(value)) throw new Error('email is already register') }),
        check('password').notEmpty().withMessage("password is required"),
        check('name').notEmpty().withMessage('name is required'),
        validateResult
    ],
    createClient)
authRouter.post("/login", login)
authRouter.post("/renew", renewToken)
authRouter.put(
    "/:id",
    [
        param("id").isUUID().withMessage("id must be a valid uuid"),
        header("token")
            .notEmpty().withMessage("el token es obligatorio")
            .custom(async (value = "", { req }) => {
                try {
                    const { id = "" } = req.params
                    const { userId } = await Client.isValidJwt(value)
                    if (id !== userId) throw new Error("the user is not allowed to modify another user")
                } catch (error) {
                    throw new Error(error.message)
                }
            }),
        validateResult
    ]
    , updateClient)
authRouter.put("/activate/:id", activateCount)

module.exports = authRouter