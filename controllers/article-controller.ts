import type { Response, Request, NextFunction } from 'express'
import type { QueryParams } from '../types/custom-request'
import articleService from '../service/article-service'
import BaseController from './page-controller'
import categoryService from '../service/category-service'

class ArticleController extends BaseController {
  async list(req: Request, res: Response, next: NextFunction) {
    const queryParams = req.query as QueryParams
    const articles = await articleService.list(queryParams)
    const categories = await categoryService.list()
    const count = await articleService.count(queryParams)
    res.setHeader('X-Total', count)
    res.json({ articles, categories })
  }

  async one(req: Request, res: Response, next: NextFunction) {
    const { slug } = req.params as Record<string, string>
    const articles = await articleService.findBySlug(slug)
    res.json(articles)
  }
}

export default new ArticleController()
