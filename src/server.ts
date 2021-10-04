import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const port = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(cors())

app.use(routes)

if (process.env.NODE_ENV !== 'test')
  app.listen(port, () => console.log(`🚀 server runnin on port: ${port}`))

export { app }