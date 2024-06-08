import { Contact } from '../models/Contact'
import { QueryParams } from '../types/custom-request'
import { FooterMeta } from '../types/footer'
import { MenuItem } from '../types/menu'
import articleService from './article-service'

const AGE_RATE = 12
const CONTACTS = {
  address: 'Пензенская обл., Бессоновский район, село Чемодановка',
  index: 442761,
  street: 'ул. Средняя',
  houseNumber: 12
}

const team = [
  {
    fullName: 'Ella Ward',
    position: 'DJ',
    avatar: '/images/team/01.webp'
  },

  {
    fullName: 'Cedric Wilson',
    position: 'DJ',
    avatar: '/images/team/02.webp'
  },

  {
    fullName: 'Sandra Kim',
    position: 'DJ',
    avatar: '/images/team/03.webp'
  },

  {
    fullName: 'Edie Sheffield',
    position: 'DJ',
    avatar: '/images/team/04.webp'
  },

  {
    fullName: 'Miriam Weber',
    position: 'Host',
    avatar: '/images/team/05.webp'
  },

  {
    fullName: 'Amber Rosso',
    position: 'Host',
    avatar: '/images/team/06.webp'
  },

  {
    fullName: 'Alison Hart',
    position: 'Press',
    avatar: '/images/team/07.webp'
  },

  {
    fullName: 'Shelley Wyatt',
    position: 'Press',
    avatar: '/images/team/08.webp'
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
      { slug: 'team', label: 'Команда' }
    ]
  }
]

const contacts = {
  title: 'Федеральная редакция',
  phones: [
    { label: 'Офис/Реклама', phone: { number: '+7 (495) 128-43-94' }, type: 'phone' },
    { label: 'Эфир', phone: { number: '+7 (495) 128-43-25' }, type: 'phone' },
    { label: 'WhatsApp и SMS', phone: { number: '+7 (937) 434-33-73' }, type: 'phone' }
  ],
  address: `${CONTACTS.index}, ${CONTACTS.address}, ${CONTACTS.street}, д. ${CONTACTS.houseNumber}`,
  emails: [
    { label: 'Служба информации', mail: { title: 'info@radioshtani.ru' }, type: 'mail' },
    { label: 'Пресс-релизы', mail: { title: 'press-rel@radioshtani.ru' }, type: 'mail' },
    { label: 'Редакция радиоканала', mail: { title: 'edition@radioshtani.ru' }, type: 'mail' },
    { label: 'Музыкальная редакция', mail: { title: 'songs@radioshtani.ru' }, type: 'mail' },
    { label: 'Прямой эфир', mail: { title: 'onair@radioshtani.ru' }, type: 'mail' }
  ]
}

const commercial = {
  title: 'Рекламная служба «Радио ШТАНЫ»',
  description: 'По всем вопросам размещения рекламы на «Радио ШТАНЫ» в регионах сейлз-хаус медиахолдинга «LOLAMEDIA»',
  phones: [{ label: 'Офис/Реклама', phone: { number: '+7 (495) 128-43-94' }, type: 'phone' }],
  emails: [{ label: '', mail: { title: 'adv@elarin.ru' }, type: 'mail' }]
}

class PageService {
  async hosts() {
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
    return await Contact.find()
      .populate({ path: 'phoneId', select: 'number -_id' })
      .populate({ path: 'mailId', select: 'title -_id' })
      .select('-updatedAt -createdAt -_id')
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
    return { contacts, commercial }
  }
}

export default new PageService()
