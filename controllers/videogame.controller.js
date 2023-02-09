const router = require("express").Router()

const { response } = require("express")
const Videogame = require('../models/Videogame.model')
const User = require('../models/User.model')

const getAllVideogames = (req, res, next) => {

    Videogame
        .find()
        .then(response => res.json(response.sort((a, b) => b.votes.length - a.votes.length)))
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

    const { name } = req.query

    Videogame
        .find({ 'name': { $regex: `(?i)${name}` } })
        .then(response => { res.json(response) })
        .catch(err => next(err))
}

const getOneVideogame = (req, res, next) => {

    const { videogame_id } = req.params

    Videogame
        .findById(videogame_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getVideogamesSorted = (req, res, next) => {

    const { votes, name } = req.query;

    const filter = [];

    if (votes) {
        filter.push(['votes', votes])
    }

    if (name) {
        filter.push(['name', name])
    }

    Videogame
        .find()
        .sort(filter)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const addVideogameVote = (req, res, next) => {

    const user_id = req.payload._id
    const { videogame_id } = req.params


    User.findById(user_id).then(user => {
        if (user.votes < 5) {
            console.log({ user })
            console.log({ videogame_id })
            console.log({ user_id })
            Videogame
                .findByIdAndUpdate(videogame_id, { $addToSet: { votes: user_id } }, { new: true })
                .then(response => {
                    console.log('perdona??')
                    User.findByIdAndUpdate(user_id, { $inc: { votes: 1 } }).then(() => { res.json(response) })
                })
        }

    })
}

module.exports = {
    getAllVideogames,
    editVideogame,
    deleteVideogame,
    saveVideogame,
    filteredVideogame,
    getOneVideogame,
    getVideogamesSorted,
    addVideogameVote
}