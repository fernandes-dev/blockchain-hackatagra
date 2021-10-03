import { Router } from 'express'
import { SuppliesController } from '../controllers/SuppliesController'

const suppliesRoutes = Router()

const suppliesController = new SuppliesController()

suppliesRoutes.get('/:address', suppliesController.show)

export { suppliesRoutes }