const { Router } = require("express")
const { body } = require("express-validator")
const { validateResult } = require("../helpers/validateResults")
const Category = require("../models/Category")

const categoryRouter = Router()
categoryRouter.post("/", [body('name').exists(), validateResult], async (req, res) => {
    const category = await Category.create(req.body)
    res.status(201).json({ ok: true, newCategory: category })
})
categoryRouter.get("/", async (req, res) => {
    const categories = await Category.findAll()
    res.status(200).json({ ok: true, results: categories })
})
// categoryRouter.post("/")
// categoryRouter.put("/:id")
// categoryRouter.delete("/:id")


module.exports = categoryRouter