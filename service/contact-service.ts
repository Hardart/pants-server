import { Address } from '../models/Address'
import { Mail } from '../models/Mail'
import { Phone } from '../models/Phone'

class ContactService {
  async phonesList() {
    return await Phone.find()
  }

  async mailsList() {
    return await Mail.find()
  }

  async addressList() {
    return await Address.find()
  }
}

export default new ContactService()
