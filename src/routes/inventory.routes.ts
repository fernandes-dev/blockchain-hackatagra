import { Router } from 'express'
import { InventoryController } from '../controllers/InventoryController'

const inventoryRoutes = Router()

const inventoryController = new InventoryController()

inventoryRoutes.get('/:address', inventoryController.show)

export { inventoryRoutes }