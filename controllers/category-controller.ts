import type { Response, Request } from 'express'
import categoryService from '../service/category-service'

class CategoryController  {
  async list(req: Request, res: Response) {
    const categories = await categoryService.list()
    res.status(200).json({ categories })
  }
  async one(req: Request, res: Response) {
    const category = await categoryService.oneWithArticles(req.params.slug)
    res.status(200).json(category[0])
  }
}

export default new CategoryController()
