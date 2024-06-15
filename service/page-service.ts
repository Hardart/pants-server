import { Contact } from '../models/Contact'
import { QueryParams } from '../types/custom-request'
import { FooterMeta } from '../types/footer'
import { MenuItem } from '../types/menu'
import articleService from './article-service'

const AGE_RATE = 12

const hosts = [
  {
    fullName: 'Ella Ward',
    position: ['host', 'press'],
    avatar: '/images/team/01.webp'
  },
  {
    fullName: 'Cedric Wilson',
    position: ['dj'],
    avatar: '/images/team/02.webp'
  },
  {
    fullName: 'Sandra Kim',
    position: ['dj'],
    avatar: '/images/team/03.webp'
  },
  {
    fullName: 'Edie Sheffield',
    position: ['dj'],
    avatar: '/images/team/04.webp'
  },
  {
    fullName: 'Miriam Weber',
    position: ['host', 'dj'],
    avatar: '/images/team/05.webp'
  },
  {
    fullName: 'Amber Rosso',
    position: ['host'],
    avatar: '/images/team/06.webp'
  },
  {
    fullName: 'Alison Hart',
    position: ['dj', 'press'],
    avatar: '/images/team/07.webp'
  },
  {
    fullName: 'Shelley Wyatt',
    position: ['press'],
    avatar: '/images/team/08.webp'
  }
]

const team = [
  {
    fullName: 'Евгений Ларин',
    position: ['Генеральный директор', 'Главный редактор'],
    avatar: '/images/team/01.webp'
  },
  {
    fullName: 'Александр Целуйко',
    position: ['Программный директор'],
    avatar: '/images/team/02.webp'
  },
  {
    fullName: 'Артем Шакиров',
    position: ['Руководитель технического отдела'],
    avatar: '/images/team/03.webp'
  },
  {
    fullName: 'Александр Домнин',
    position: ['Бренд–войс'],
    avatar: '/images/team/04.webp'
  }
]

const mainMenu: MenuItem[] = [
  {
    slug: '',
    label: 'Радио',
    childrens: [
      { slug: 'schedule', label: 'Сетка вещания' },
      { slug: 'playlist', label: 'Плейлист' },
      { slug: 'hosts', label: 'Ведущие' },
      { slug: 'podcasts', label: 'Подкасты' },
      { slug: 'live', label: 'Прямой эфир' },
      { slug: 'news', label: 'Новости' }
    ]
  },
  {
    slug: 'programs',
    label: 'Программы'
  },
  {
    slug: 'promo',
    label: 'Конкурсы',
    childrens: [
      { slug: 'how-get-prize', label: 'Как получить приз' },
      { slug: 'model-regulations', label: 'Правила участия в играх' }
    ]
  },
  {
    slug: 'contacts',
    label: 'Контакты',
    childrens: [
      { slug: 'about', label: 'О радиостанции' },
      { slug: 'team', label: 'Команда' },
      { slug: 'regional-evolution', label: 'Региональное развитие' }
    ]
  }
]

class PageService {
  async hosts() {
    return hosts
  }

  async team() {
    return team
  }

  async mainMenu() {
    return mainMenu
  }

  async footerData(): Promise<FooterMeta> {
    const { licenseInfo, smsInfo } = this.footerInfo()
    return { contacts: await this.footerContacts(), licenseInfo, smsInfo }
  }

  footerInfo() {
    return {
      smsInfo: {
        iconValue: 'i',
        text: '<p>*Стоимость SMS-сообщения согласно тарифу Вашего сотового оператора. Сервис предоставлен ПАО «МЕГАФОН».</p>'
      },
      licenseInfo: {
        iconValue: AGE_RATE,
        text: '<p>Средство массовой информации «RADIOSHTANI.RU» зарегистрировано 29 марта 2021 г. в форме распространения «Сетевое издание». Свидетельство Эл № ФС77-80691 от 29.03.2021 выдано Федеральной службой по надзору в сфере связи, информационных технологий имассовых коммуникаций (Роскомнадзор). Для детей старше 12 лет.</p><p>Средство массовой информации «Радио ШТАНЫ» зарегистрировано 12 октября 2021 г. в форме распространения «Радиоканал». Свидетельство Эл № ФС77-82055 от 12.10.2021 выдано Федеральной службой по надзору в сфере связи, информационных технологий и массовых коммуникаций (Роскомнадзор). Для детей старше 12 лет.</p>'
      }
    }
  }

  async footerContacts() {
    return await Contact.find({ showTo: 'footer' })
      .populate({ path: 'phoneId', transform: (doc) => (doc === null ? null : doc.number) })
      .populate({ path: 'mailId', transform: (doc) => (doc === null ? null : doc.title) })
      .populate({ path: 'addressId', select: '-_id' })
      .select('-_id')
  }

  async index(query: QueryParams) {
    const pageData = {
      news: await articleService.list(query),
      hosts: await this.hosts(),
      footer: await this.footerData()
    }
    return pageData
  }

  async contacts() {
    const data = await Contact.aggregate([
      {
        $unwind: '$showTo'
      },
      {
        $match: { $or: [{ showTo: 'contacts' }, { showTo: 'commersial' }] }
      },
      {
        $lookup: {
          from: 'phones',
          localField: 'phoneId',
          foreignField: '_id',
          as: 'phone'
        }
      },
      {
        $unwind: { path: '$phone', preserveNullAndEmptyArrays: true }
      },
      {
        $set: {
          phone: '$phone.number'
        }
      },
      {
        $lookup: {
          from: 'mails',
          localField: 'mailId',
          foreignField: '_id',
          as: 'mail'
        }
      },
      {
        $unwind: { path: '$mail', preserveNullAndEmptyArrays: true }
      },
      {
        $set: {
          mail: '$mail.title'
        }
      },
      {
        $lookup: {
          from: 'addresses',
          localField: 'addressId',
          foreignField: '_id',
          as: 'address'
        }
      },
      {
        $unwind: { path: '$address', preserveNullAndEmptyArrays: true }
      },
      {
        $group: {
          _id: '$showTo',
          phones: {
            $push: {
              $cond: {
                if: { $ifNull: ['$phone', null] },
                then: { phone: '$phone', label: '$label' },
                else: undefined
              }
            }
          },
          mails: {
            $push: {
              $cond: {
                if: { $ifNull: ['$mail', null] },
                then: { mail: '$mail', label: '$label' },
                else: undefined
              }
            }
          },
          addresses: {
            $push: {
              $cond: {
                if: { $ifNull: ['$address', null] },
                then: { address: '$address', label: '$label' },
                else: undefined
              }
            }
          }
        }
      }
    ])

    return data.reduce((acc, curr) => {
      if (typeof acc[curr._id] === 'undefined') acc[curr._id] = {}
      acc[curr._id].phones = curr.phones.filter((p: unknown) => p !== null)
      acc[curr._id].addresses = curr.addresses.filter((a: unknown) => a !== null)
      acc[curr._id].mails = curr.mails.filter((m: unknown) => m !== null)

      return acc
    }, {})
  }
}

export default new PageService()
