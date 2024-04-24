import type { Router } from 'express'
import categoryController from '../../controllers/category-controller'
import { asyncErrorHandler } from '../../handlers/error-handler'

function categoryRouter(router: Router) {
  router.get('/categories', asyncErrorHandler(categoryController.list))
  router.get('/categories/:slug', asyncErrorHandler(categoryController.one))
}

export default categoryRouter
