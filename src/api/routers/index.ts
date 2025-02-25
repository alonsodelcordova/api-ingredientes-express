import { Router } from 'express'
import ingredientsRouter from './ingredients'

const apiRouter = Router()

apiRouter.use('/ingredients', ingredientsRouter)

export default apiRouter

