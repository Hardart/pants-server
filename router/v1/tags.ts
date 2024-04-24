import type { Router } from 'express'
import { asyncErrorHandler } from '../../handlers/error-handler'
import tagController from '../../controllers/tag-controller'

export default function tagRouter(router: Router) {
  router.get('/tags', asyncErrorHandler(tagController.list))
  
}
