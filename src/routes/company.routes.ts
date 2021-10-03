import { Router } from 'express'
import { CompanyController } from '../controllers/CompanyController'

const companyRoutes = Router()

const companyController = new CompanyController()

companyRoutes.get('/:address', companyController.show)

export { companyRoutes }