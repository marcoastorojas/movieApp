const Actor = require("../models/Actor")
const Category = require("../models/Category")
const Movie = require("../models/Movie")

const getMovie = async (req, res) => {
    const movie = await Movie.findByPk(req.params.id, { include: [Category, Actor] })
    if (!movie) return res.status(400).json({ ok: false, message: `there has not a movie with the id ${req.body.id}` })
    res.status(200).json({ ok: true, movie })
}

const createMovie = async (req, res) => {
    try {
        const { categoriesId, actorsId } = req.body
        const newMovie = await Movie.create({ ...req.body, createdAd: Date.now() })
        await newMovie.addCategories(categoriesId)
        await newMovie.addActors(actorsId)
        res.status(201).json({ ok: true, created: newMovie })
    } catch (error) {
        await Movie.destroy({ where: { title: req.body.title } })
        res.status(400).json({ ok: false, error: error.message })
    }
}
//todo : hacer una ruto para modificar actores y otra para modificar categorias  

const modifyMovie = async (req, res) => {
    const movie = await Movie.findByPk(req.params.id)
    movie.set(req.body)
    await movie.save()
    res.status(200).json({ ok: true, movieModified: movie })
}

const deleteMovie = async (req, res) => {
    const movie = await Movie.findByPk(req.params.id)
    await movie.destroy()
    res.status(200).json({ ok: true, moviedeleted: movie })
}

module.exports = {
    getMovie,
    createMovie,
    modifyMovie,
    deleteMovie
}
