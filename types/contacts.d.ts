import { Mail } from '../models/Mail'
import { Phone } from '../models/Phone'

export type Contacts = {
  phones: Phone[]
  emails: Mail[]
}
