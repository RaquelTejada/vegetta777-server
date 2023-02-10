
const { isAuthenticated } = require('../middleware/jwt.middleware')

module.exports = app => {

  const authRoutes = require('./auth.routes')
  app.use('/api/auth', authRoutes)

  const videogameRoutes = require('./videogame.routes')
  app.use('/api/videogame', videogameRoutes)

}