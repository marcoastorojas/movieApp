const Serie = require("../models/Serie")



const createSerie = async (req, res) => {
    try {
        const { categoriesId, actorsId } = req.body
        const newSerie = await Serie.create({ ...req.body, createdAd: Date.now() })
        await newSerie.addCategories(categoriesId)
        await newSerie.addActors(actorsId)
        res.status(201).json({ ok: true, created: newSerie })
    } catch (error) {
        await Serie.destroy({ where: { title: req.body.title } })
        res.status(400).json({ ok: false, error: error.message })
    }
}


const modifySerie = async (req, res) => {
    const serie = await Serie.findByPk(req.params.id)
    serie.set(req.body)
    await serie.save()
    res.status(200).json({ ok: true, serieModified: serie })
}

const deleteSerie = async (req, res) => {
    const serie = await Serie.findByPk(req.params.id)
    await serie.destroy()
    res.status(200).json({ ok: true, serieDeleted: serie })
}

module.exports = {
    createSerie,
    modifySerie,
    deleteSerie
}