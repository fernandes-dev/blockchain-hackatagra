import { Router } from 'express'
import { MovesController } from '../controllers/MovesController'

const movesRoutes = Router()

const movesController = new MovesController()

movesRoutes.get('/:address', movesController.show)

export { movesRoutes }