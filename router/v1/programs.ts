import type { Router } from 'express'
import { asyncErrorHandler } from '../../handlers/error-handler'
import programController from '../../controllers/program-controller'

function programRouter(router: Router) {
  router.get('/programs', asyncErrorHandler(programController.list))
  router.get('/programs/:slug', asyncErrorHandler(programController.oneBySlug))
  router.get('/schedule', asyncErrorHandler(programController.schedule))
}

export default programRouter
