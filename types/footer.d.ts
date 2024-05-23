import { Contact } from '../models/Contact'

interface IFooterInfoItem {
  iconValue: string | number
  text: string
}

export type FooterMeta = {
  smsInfo: IFooterInfoItem
  licenseInfo: IFooterInfoItem
  contacts: Contact[]
}
