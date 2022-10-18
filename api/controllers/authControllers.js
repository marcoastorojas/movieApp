const { request, response } = require("express");
const Client = require("../models/Client");

const getAllClients = async (req = request, res = response) => {
    const clients = await Client.findAll()
    res.status(200).json({ ok: true, data: clients })
}

const getClientById = async (req = request, res = response) => {
    try {
        const client = await Client.findByPk(req.params.id, { where: { countActive: true } })
        res.status(200).json({ ok: true, data: client })
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message })
    }
}

const createClient = async (req = request, res = response) => {
    try {
        const client = req.body
        const newClient = await Client.create(client)
        const token = newClient.generateToken()
        res.status(201).json({ ok: true, data: newClient, token })
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message })
    }
}

const login = async (req = request, res = response) => {
    const { email, password } = req.body
    const originalClient = await Client.findOne({ where: { email } })
    //|| !originalClient?.countActive
    if (!originalClient) {
        return res.status(400).json({ ok: false, message: `does not exist a valid user for the email ${email}` })
    }
    if (!originalClient.validatePassword(password)) {
        return res.status(400).json({ ok: false, message: `password ${password} is not correct` })
    }
    const token = originalClient.generateToken()
    res.status(200).json({ ok: true, data: originalClient, token })
}

const renewToken = async (req = request, res = response) => {
    const { token } = req.headers
    try {
        const { userId } = await Client.isValidJwt(token)
        const user = await Client.findByPk(userId)
        const newToken = user.generateToken()
        res.status(200).json({ ok: true, data: user, token: newToken })
    } catch (error) {
        res.status(401).json({ ok: false, message: error.message })
    }
}

const activateCount = async (req = request, res = response) => {
    const { id: clientId } = req.params
    try {
        const client = await Client.findByPk(clientId)
        if (!client) return res.status(400).json({ ok: false, message: `does not have a client for id ${clientId}` })
        if (client.countActive) return res.status(201).json({ ok: false, message: "email is already verified" })
        client.countActive = true
        await client.save()
        res.status(200).json({ ok: true, data: client })
    } catch (error) {
        res.status(400).json({ ok: false, message: error })
    }
}


const updateClient = async (req = request, res = response) => {
    const { id } = req.params
    const { pass, countActive, ...rest } = req.body
    const clientModified = await Client.findByPk(id)
    clientModified.set(rest)
    await clientModified.save()

    res.status(201).json({ ok: true, clientModified })
}

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    login,
    renewToken,
    activateCount,
    updateClient
}