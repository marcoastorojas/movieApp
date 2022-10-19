const { Router } = require("express")
const { body } = require("express-validator")
const { validateResult } = require("../helpers/validateResults")
const Category = require("../models/Category")
const Movie = require("../models/Movie")
const Serie = require("../models/Serie")

const categoryRouter = Router()
categoryRouter.post("/", [body('name').exists(), validateResult], async (req, res) => {
    const category = await Category.create(req.body)
    res.status(201).json({ ok: true, newCategory: category })
})
categoryRouter.get("/", async (req, res) => {
    const categories = await Category.findAll()
    res.status(200).json({ ok: true, results: categories })
})
categoryRouter.get("/:id/movies", async (req, res) => {
    const category = await Category.findByPk(req.params.id,{include:Movie})
    res.status(200).json({ ok: true, results: category.movies })
})
categoryRouter.get("/:id/serie", async (req, res) => {
    const category = await Category.findByPk(req.params.id,{include:Serie})
    res.status(200).json({ ok: true, results: category.series })
})
// categoryRouter.post("/")
// categoryRouter.put("/:id")
// categoryRouter.delete("/:id")


module.exports = categoryRouter