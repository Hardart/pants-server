import { Contact } from '../models/Contact'

class ContactService {
  async contacts(section: 'footer' | 'contacts' | 'commersial') {
    const contact = await Contact.findOne({ section }).select('-section -phones._id -emails._id')
    if (!contact) throw new Error('Cant get footer contacts from DB')
    const phones = contact.phones.map(({ label, description, id }) => ({ label, description, number: id }))
    const emails = contact.emails.map(({ label, description, id }) => ({ label, description, address: id }))
    const addresses = contact.addresses.map(({ label, description, id }) => ({ label, description, info: id }))
    return { phones, emails, addresses }
  }
}

export default new ContactService()
