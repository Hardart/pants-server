import { Tag } from '../models/Tag'

class TagService {
  async list() {
    const tags = await Tag.find().select('title')
    return tags.map(tag => tag.title)
  }
}

export default new TagService()
