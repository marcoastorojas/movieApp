const { Router } = require("express")
const { check, param } = require("express-validator")
const { Op } = require("sequelize")
const { createMovie, modifyMovie, deleteMovie, getMovie } = require("../controllers/movieControllers")
const { validateResult } = require("../helpers/validateResults")
const Actor = require("../models/Actor")
const Category = require("../models/Category")
const Movie = require("../models/Movie")

const movieRouter = Router()

movieRouter.get("/", async (req, res) => {
    const { name, categoryId, actorId, exactname } = req.query
    let greatCondition = { where: {}, include: [], order: [], }
    if (!!exactname) {
        greatCondition.where.title = exactname
    }
    if (!!name) {
        greatCondition.where.title = { [Op.iLike]: `%${name}%` }
    }
    if (!!categoryId) {
        greatCondition.include
            .push({ model: Category, where: { id: categoryId }, through: { attributes: [] } })
    }
    if (!!actorId) {
        greatCondition.include
            .push({ model: Actor, where: { id: actorId }, through: { attributes: [] } })
    }


    const movies = await Movie.findAll(greatCondition)
    res.status(200).json({ ok: true, results: movies })
})

movieRouter.get("/:id", getMovie)

movieRouter.post(
    "/",
    [
        check('title')
            .notEmpty()
            .withMessage("the title cannot have empty value")
            .custom(async (value) => { if (await Movie.findMovieByTitle(value)) { throw new Error("name is already use") } }),
        check('overview')
            .notEmpty(),
        check('image')
            .notEmpty(),
        check('categoriesId').notEmpty(),
        check('actorsId').notEmpty(),
        validateResult
    ],
    createMovie
)

movieRouter.put(
    "/:id",
    [
        param("id")
            .isUUID().withMessage("id must be a valid uuid")
            .custom(async value => { if (!await Movie.findByPk(value)) throw new Error("there is no movie with the entered id") }),
        validateResult
    ],
    modifyMovie
)


movieRouter.delete(
    "/:id",
    [
        param("id")
            .isUUID().withMessage("id must be a valid uuid")
            .custom(async value => { if (!await Movie.findByPk(value)) throw new Error("there is no movie with the entered id") }),
        validateResult
    ],
    deleteMovie
)
module.exports = movieRouter