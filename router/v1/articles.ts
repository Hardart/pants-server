import type { Router } from 'express'
import articleController from '../../controllers/article-controller'
import { asyncErrorHandler } from '../../handlers/error-handler'
import { decodeQuery } from '../../middlewear/query-middlwear'

function articlesRouter(router: Router) {
  router.get('/articles/:slug', asyncErrorHandler(articleController.one))
  router.get('/articles', decodeQuery, asyncErrorHandler(articleController.list))
}

export default articlesRouter
