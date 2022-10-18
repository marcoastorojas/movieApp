const { Router } = require("express")
const { body, param } = require("express-validator")
const { validateResult } = require("../helpers/validateResults")
const Season = require("../models/Season")
const Serie = require("../models/Serie")

const seasonRouter = Router()
seasonRouter.post(
    "/:serieId",
    [
        param('serieId')
            .notEmpty()
            .custom(async (value) => {
                if (!await Serie.findByPk(value)) { throw new Error(`Does not exist a Serie with id ${value}`) }
            }),
        validateResult,
        body('season_number')
            .notEmpty()
            .isNumeric().withMessage("must be a number")
            .custom(async (value, { req }) => {
                const seasonWithTheSameNumber = await Season.findOne({ where: { season_number: String(value), serieId: req.params.serieId } })
                if (seasonWithTheSameNumber) {
                    throw new Error(`Season number ${value} already exist`)
                }
            }),
        validateResult

    ],
    async (req, res) => {
        console.log(req.params)
        const newSeason = await Season.create({ ...req.body, serieId: req.params.serieId })
        res.status(201).json({ ok: true, newSeason })
    }
)

seasonRouter.get(
    "/:serieId",
    [
        param('serieId')
            .notEmpty()
            .custom(async (value) => {
                if (!await Serie.findByPk(value)) { throw new Error(`Does not exist a Serie with id ${value}`) }
            }),
        validateResult
    ],
    async (req, res) => {
        const seasons = await Season.findAll({ where: { serieId: req.params.serieId } })
        res.status(200).json({ ok: true, results: seasons })
    })

module.exports = seasonRouter