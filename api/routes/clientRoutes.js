const { Router } = require("express")
const { body, param } = require("express-validator")
const { validateResult } = require("../helpers/validateResults")
const Client = require("../models/Client")
const Favorite = require("../models/Favorite")
const Movie = require("../models/Movie")
const Serie = require("../models/Serie")

const clientRouter = Router()


clientRouter.get(
    "/:clientId/favorites",
    [
        param("clientId")
            .custom(async (value) => {
                if (!await Client.findByPk(value)) { throw new Error(`there is no client for the id : ${value}`) }
            }),
        validateResult
    ],
    async (req, res) => {
        const { clientId } = req.params
        const favorites = await Client.findOne({
            where: { id: clientId },
            attributes: [],
            include: [
                { model: Movie, as: "favorites" },
                { model: Serie, as: "favos" }
            ],
        })
        res.status(200).json({ ok: true, results: { movies: favorites.favorites, series: favorites.favos } })
    })
clientRouter.post(
    "/:clientId/deletefavorite",
    [
        param("clientId")
            .custom(async (value) => {
                if (!await Client.findByPk(value)) { throw new Error(`there is no client for the id : ${value}`) }
            }),
        validateResult
    ],
    async (req, res) => {
        try {
            const user = await Client.findByPk(req.params.clientId)
            await user.removeFavorite(req.body.movieId)
            res.status(200).json({ ok: true, message: "conexion deleted" })
        }
        catch (error) {
            res.status(400).json({ ok: false, error: error.message })
        }
    }
)
clientRouter.post(
    "/:clientId/addfavorite",
    [
        param("clientId")
            .custom(async (value) => {
                if (!await Client.findByPk(value)) { throw new Error(`there is no client for the id : ${value}`) }
            }),
        validateResult
    ],
    async (req, res) => {
        try {
            const user = await Client.findByPk(req.params.clientId)
            await user.addFavorite(req.body.movieId)
            res.status(201).json({ ok: true, message: "conexion created" })
        }
        catch (error) {
            res.status(400).json({ ok: false, error: error.message })
        }
    }
)

clientRouter.post(
    "/:clientId/deletefavoriteSerie",
    [
        param("clientId")
            .custom(async (value) => {
                if (!await Client.findByPk(value)) { throw new Error(`there is no client for the id : ${value}`) }
            }),
        validateResult
    ],
    async (req, res) => {
        try {
            const user = await Client.findByPk(req.params.clientId)
            await user.removeFavos(req.body.serieId)
            res.status(200).json({ ok: true, message: "conexion deleted" })
        }
        catch (error) {
            res.status(400).json({ ok: false, error: error.message })
        }
    }
)

clientRouter.post(
    "/:clientId/addfavoriteSerie",
    [
        param("clientId")
            .custom(async (value) => {
                if (!await Client.findByPk(value)) { throw new Error(`there is no client for the id : ${value}`) }
            }),
        validateResult
    ],
    async (req, res) => {
        try {
            const user = await Client.findByPk(req.params.clientId)
            await user.addFavos(req.body.serieId)
            res.status(201).json({ ok: true, message: "conexion created" })
        }
        catch (error) {
            res.status(400).json({ ok: false, error: error.message })
        }
    }
)

module.exports = clientRouter