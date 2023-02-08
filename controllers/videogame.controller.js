const router = require("express").Router()

const { response } = require("express")
const Videogame = require('../models/Videogame.model')
const User = require('./../models/User.model')

const getAllVideogames = (req, res, next) => {

    Videogame
        .find()
        // .select()
        .then(response => res.json(response))
        .catch(err => next(err))
}

const editVideogame = (req, res, next) => {

    const { videogame_id } = req.params

    const { image, name, category, votes } = req.body

    Videogame
        .findByIdAndUpdate(videogame_id, { image, name, category, votes }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteVideogame = (req, res, next) => {

    const { videogame_id } = req.params

    Videogame
        .findByIdAndDelete(videogame_id)
        .then(() => res.status(200).json({ message: "OK" }))
        .catch(err => next(err))
}

const saveVideogame = (req, res, next) => {

    const { image, name, category, votes } = req.body
    const { _id: owner } = req.payload

    Videogame
        .create({ image, name, category, votes, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const filteredVideogame = (req, res, next) => {

    Videogame
        .find({ ...req.query })
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    getAllVideogames,
    editVideogame,
    deleteVideogame,
    saveVideogame,
    filteredVideogame
}