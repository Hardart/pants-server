import type { Router } from 'express'
import { asyncErrorHandler } from '../../handlers/error-handler'
import trackController from '../../controllers/track-controller'

export default function trackRouter(router: Router) {
  router.get('/track-list', asyncErrorHandler(trackController.list))
  router.get('/track-archive', asyncErrorHandler(trackController.archive))
}
