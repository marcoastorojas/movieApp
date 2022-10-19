const { Router } = require("express")
const { body, param, validationResult, query } = require("express-validator")
const { Op } = require("sequelize")
const { validateResult } = require("../helpers/validateResults")
const Actor = require("../models/Actor")
const Movie = require("../models/Movie")

const actorRouter = Router()
actorRouter.post("/", [body('name').exists(), validateResult], async (req, res) => {
    const actor = await Actor.create(req.body)
    res.status(201).json({ ok: true, newActor: actor })
})

// no protected route
actorRouter.get(
    "/:id", 
    [param("id").isUUID(), validateResult],
     async (req, res) => {
    const actor = await Actor.findByPk(req.params.id,{include:Movie})
    if (!actor) return res.status(404).json({ ok: false, message: `has no a valid actor with the id: ${req.param.id}` })
    res.status(200).json({ ok: true, actor })
})

// no protected route
actorRouter.get("/", async (req, res) => {
    const { name = "" } = req.query

    const actors = await Actor.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } })
    res.status(200).json({ ok: true, results: actors })
})

actorRouter.delete("/:id", [param("id").isUUID(), validationResult], async (req, res) => {
    const actorToDelete = await Actor.findByPk(req.params.id)
    await actorToDelete.destroy()
    res.status(200).json({ ok: true, deleteActor: actorToDelete })
})
module.exports = actorRouter