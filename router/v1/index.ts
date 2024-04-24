import { Router } from 'express'
import articlesRouter from './articles'
import categoryRouter from './categories'
import trackRouter from './tracks'
import tagRouter from './tags'
import programRouter from './programs'
import baseRouter from './base'
const router = Router()

articlesRouter(router)
categoryRouter(router)
trackRouter(router)
tagRouter(router)
programRouter(router)
baseRouter(router)

export default router
