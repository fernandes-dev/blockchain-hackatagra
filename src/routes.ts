import { Router } from "express";
import { companyRoutes } from "./routes/company.routes";
import { inventoryRoutes } from "./routes/inventory.routes";
import { movesRoutes } from "./routes/move.routes";
import { suppliesRoutes } from "./routes/supplies.routes";

const routes = Router()

routes.use('/company', companyRoutes)
routes.use('/inventory', inventoryRoutes)
routes.use('/supplies', suppliesRoutes)
routes.use('/moves', movesRoutes)

export { routes }