import { Article } from '../models/Article'
import { Category } from '../models/Category'
import type { QueryParams } from '../types/custom-request'

class ArticleService {

  async list({ filter, sort, limit, page }: QueryParams) {
    const cats = await Category.find({ isPublished: true })
    const articles = await Article.find({ $and: [...filter, { categoryId: { $in: cats } }] })
      .select('title slug image createdAt')
      .populate({ path: 'categoryId', select: 'title slug' })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit))
      .sort(sort)
    return articles
  }

  async count({ filter }: QueryParams) {
    return await Article.find({ $and: filter }).countDocuments()
  }

  async countAll() {
    return await Article.countDocuments()
  }

  async findBySlug(slug: string) {
    return await Article.findOne({ slug }).select('title slug image tags content createdAt -_id').populate({ path: 'categoryId', select: 'title slug -_id' })
  }

  async findByCategoryId(id: string) {
    return await Article.find({ categoryId: id }).select('title slug image tags content createdAt -_id').populate({ path: 'categoryId', select: 'title slug -_id' })
  }

}

export default new ArticleService()
