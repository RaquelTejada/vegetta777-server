const router = require('express').Router()

const {
    getAllVideogames, editVideogame, deleteVideogame, saveVideogame, filteredVideogame, getOneVideogame, addVideogameVote, getVideogameVote
}
    = require('../controllers/videogame.controller')

const { isAuthenticated } = require('./../middleware/jwt.middleware')


router.get('/getAllVideogames', getAllVideogames)

router.put('/edit/:videogame_id', isAuthenticated, editVideogame)

router.delete('/delete/:videogame_id', isAuthenticated, deleteVideogame)

router.post('/saveVideogame', isAuthenticated, saveVideogame)

router.get('/filteredVideogame', filteredVideogame)

router.get('/getOneVideogame/:videogame_id', isAuthenticated, getOneVideogame)

// router.put('/addVideogameVote', isAuthenticated, addVideogameVote)

// router.get('/getVideogameVote', isAuthenticated, getVideogameVote)


module.exports = router