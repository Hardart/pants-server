import type { Router } from 'express'
import { asyncErrorHandler } from '../../handlers/error-handler'
import radioProgramController from '../../controllers/radio-program-controller'

function programRouter(router: Router) {
  router.get('/programs', asyncErrorHandler(radioProgramController.list))
  router.get('/schedule', asyncErrorHandler(radioProgramController.schedule))
  router.get('/programs/:slug', asyncErrorHandler(radioProgramController.oneBySlug))
}

export default programRouter
