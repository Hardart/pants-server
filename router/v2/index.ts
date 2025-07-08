import { Router } from 'express'

import programRouter from './programs'
const router = Router()

programRouter(router)

export default router
