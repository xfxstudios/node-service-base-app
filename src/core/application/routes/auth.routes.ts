import { AuthMiddleware } from '../../infrastructure/middleware/auth.middleware'

require('express-group-routes')

export const authRoutes = (prefix, app) => {
  // [ Grupo de Rutas ]
  app.group(`${prefix}/auth`, (router) => {
    // [ Middleware exclusivo para el grupo de rutas ]
    router.use(AuthMiddleware)

    // [ Rutas del grupo ]
    router.post('/login', (req, res) => {
      res.json({ error: false, message: 'Login endpoint' })
    })
    router.post('/register', (req, res) => {
      res.json({ error: false, message: 'Register endpoint' })
    })
    router.post('/forgot-password', (req, res) => {
      res.json({ error: false, message: 'Forgot password endpoint' })
    })
  })
}
