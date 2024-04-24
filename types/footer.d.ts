export type Contact = {
  label: string
} & (
  {
    type: 'phone'
    phone: string
  } 
  |
  {
    type: 'mail'
    mail: string
  }
  |
  {
    type: 'link'
    href: string
    text: string
  }
)

interface IFooterInfoItem {
  iconValue: string | number
  text: string
}

export type FooterMeta =  {
  smsInfo: IFooterInfoItem
  licenseInfo: IFooterInfoItem
  contacts: Contact[]
}