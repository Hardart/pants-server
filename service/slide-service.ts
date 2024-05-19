import { Slide } from '../models/Slide'

class SlideService {
  async findOne(id: string) {
    return await Slide.findById(id)
  }

  async save(slideData: Slide) {
    return await Slide.create(slideData)
  }

  async list() {
    return await Slide.find().select('-updatedAt')
  }
}

export default new SlideService()
