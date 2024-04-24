import type { Response, Request, NextFunction } from 'express'
import tagService from '../service/tag-service'

class TagController {
  async list(req: Request, res: Response, next: NextFunction) {
    const news = await tagService.list()
     res.json(news)
  }
}

export default new TagController()
