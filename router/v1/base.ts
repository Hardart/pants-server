import type { Router } from 'express'

import { asyncErrorHandler } from '../../handlers/error-handler'
import PageController from '../../controllers/page-controller'
import { decodeQuery } from '../../middlewear/query-middlwear'

function baseRouter(router: Router) {
  router.get('/base', decodeQuery, asyncErrorHandler(PageController.main))
  router.get('/meta', decodeQuery, asyncErrorHandler(PageController.meta))
  router.get('/programs', asyncErrorHandler(PageController.programs))
  router.get('/contacts', asyncErrorHandler(PageController.contacts))
}

export default baseRouter
