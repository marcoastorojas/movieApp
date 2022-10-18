const { Router } = require("express")
const { check, param } = require("express-validator")
const { Op } = require("sequelize")
const { createSerie, modifySerie, deleteSerie } = require("../controllers/serieControllers")
const { validateResult } = require("../helpers/validateResults")
const Actor = require("../models/Actor")
const Category = require("../models/Category")
const Chapter = require("../models/Chapter")
const Season = require("../models/Season")
const Serie = require("../models/Serie")
const serieRouter = Router()

serieRouter.get("/", async (req, res) => {
    const { name, exactname } = req.query
    let greatCondition = { where: {}, include: [], order: [], }
    if (!!name) {
        greatCondition.where.title = { [Op.iLike]: `%${name}%` }
    }
    if (!!exactname) {
        greatCondition.where.title = exactname
    }
    const series = await Serie.findAll(greatCondition)
    res.status(200).json({ ok: true, results: series })
})
serieRouter.post(
    "/",
    [
        check('title')
            .notEmpty()
            .withMessage("the title cannot have empty value")
            .custom(async (value) => { if (await Serie.findSerieByTitle(value)) { throw new Error("name is already use") } }),
        check('overview').notEmpty(),
        check('image').notEmpty(),
        check('categoriesId').notEmpty(),
        check('actorsId').notEmpty(),
        validateResult
    ],
    createSerie
)

serieRouter.put(
    "/:id",
    [
        param("id")
            .isUUID().withMessage("id must be a valid uuid")
            .custom(async value => { if (!await Serie.findByPk(value)) throw new Error("there is no serie with the entered id") }),
        validateResult
    ],
    modifySerie
)


serieRouter.delete(
    "/:id",
    [
        param("id")
            .isUUID().withMessage("id must be a valid uuid")
            .custom(async value => { if (!await Serie.findByPk(value)) throw new Error("there is no serie with the entered id") }),
        validateResult
    ],
    deleteSerie
)

serieRouter.get("/:id", async (req, res) => {
    try {
        const serie = await Serie.findByPk(req.params.id, { include: [{ model: Season, include: Chapter }, { model: Actor }, { model: Category }] })
        res.status(200).json({ ok: true, serie })
    } catch (error) {

    }
})

module.exports = serieRouter