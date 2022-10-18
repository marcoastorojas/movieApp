const { Router } = require("express")
const { body, param } = require("express-validator")
const { validateResult } = require("../helpers/validateResults")
const Chapter = require("../models/Chapter")
const Season = require("../models/Season")

const chapterRouter = Router()

chapterRouter.post(
    "/:seasonId",
    [
        body('name')
            .exists(),
        body('chapter_number')
            .isNumeric(),
        validateResult,
        param('seasonId')
            .isUUID(),
        param('seasonId')
            .custom(async (value) => {
                console.log(value)
                if (!await Season.findByPk(value)) { throw new Error(`Does not exist a Season with id ${value}`) }
            }),
        body('chapter_number')
            .custom(async (value, { req }) => {
                if (await Chapter.findOne({
                    where: {
                        chapter_number: value,
                        seasonId: req.params.seasonId
                    }
                })) { throw new Error(`chapter number ${value} is already definded in this season`) }
            })
        ,
        validateResult
    ],
    async (req, res) => {
        try {
            const chapter = await Chapter.create(
                {
                    ...req.body,
                    seasonId: req.params.seasonId
                }
            )
            res.status(201).json({ ok: true, chapter })

        } catch (error) {
            res.status(500).json({ ok: false, error: error.message })
        }

    }
)

chapterRouter.get("/", async (req, res) => {
    const chapters = await Chapter.findAll()
    res.status(200).json({ ok: true, results: chapters })
})



module.exports = chapterRouter