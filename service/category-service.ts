import { Category } from '../models/Category'

class CategoryService {
  async list() {
    return await Category.find({ isPublished: true }).select('title slug')
  }

  async oneWithArticles(slug: string) {
    return await Category.aggregate([
      {
        $match: { slug }
      },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'articles'
        }
      },
      {
        $unwind: '$articles'
      },
      {
        $match: { 'articles.isPublished': true }
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          slug: { $first: '$slug' },
          image: { $first: '$image' },
          createdAt: { $first: '$createdAt' },
          articles: {
            $push: {
              title: '$articles.title',
              slug: '$articles.slug',
              image: '$articles.image',
              createdAt: '$articles.createdAt',
              to: { $concat: ['/', '$slug', '/', '$articles.slug'] }
            }
          }
        }
      },
    ])
  }
}

export default new CategoryService()
