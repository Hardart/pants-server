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
    position: 'Dental Assistant',
    avatar: '/images/team/01.webp'
  },

  {
    fullName: 'Cedric Wilson',
    position: 'Dental Assistant',
    avatar: '/images/team/02.webp'
  },

  {
    fullName: 'Sandra Kim',
    position: 'Dental Assistant',
    avatar: '/images/team/03.webp'
  },

  {
    fullName: 'Edie Sheffield',
    position: 'Dental Assistant',
    avatar: '/images/team/04.webp'
  },

  {
    fullName: 'Miriam Weber',
    position: 'Office Management',
    avatar: '/images/team/05.webp'
  },

  {
    fullName: 'Amber Rosso',
    position: 'Office Management',
    avatar: '/images/team/06.webp'
  },

  {
    fullName: 'Alison Hart',
    position: 'Front Desk',
    avatar: '/images/team/07.webp'
  },

  {
    fullName: 'Shelley Wyatt',
    position: 'Front Desk',
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

// const schedule = [
//   {
//     weekdayTitle: 'Понедельник',
//     weekdayId: 1,
//     programs: [
//       { start: '07:00', end: '10:00', title: 'Тапки ШОУ', replay: false, avatar: '/logo.svg' },
//       { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, avatar: '/logo.svg' },
//       {
//         start: '16:00',
//         end: '18:00',
//         title: 'TOP Chart 20 – Лучшие треки недели',
//         replay: true,
//         avatar: '/images/programs/top-chart.webp'
//       },
//       { start: '18:00', end: '21:00', title: 'Вечерний отрыв', replay: false, avatar: '/logo.svg' }
//     ]
//   },
//   {
//     weekdayTitle: 'Вторник',
//     weekdayId: 2,
//     programs: [
//       { start: '07:00', end: '10:00', title: 'Тапки ШОУ', replay: false, avatar: '/logo.svg' },
//       { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, avatar: '/logo.svg' },
//       { start: '18:00', end: '21:00', title: 'Вечерний отрыв', replay: false, avatar: '/logo.svg' }
//     ]
//   },
//   {
//     weekdayTitle: 'Среда',
//     weekdayId: 3,
//     programs: [
//       { start: '07:00', end: '10:00', title: 'Тапки ШОУ', replay: false, avatar: '/logo.svg' },
//       { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, avatar: '/logo.svg' },
//       { start: '16:00', end: '18:00', title: 'TOP Chart 20 – Итоги недели', replay: true, avatar: '/logo.svg' },
//       { start: '18:00', end: '21:00', title: 'Вечерний отрыв', replay: false, avatar: '/logo.svg' }
//     ]
//   },
//   {
//     weekdayTitle: 'Четверг',
//     weekdayId: 4,
//     programs: [
//       { start: '07:00', end: '10:00', title: 'Тапки ШОУ', replay: false, avatar: '/logo.svg' },
//       { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, avatar: '/logo.svg' },
//       { start: '18:00', end: '21:00', title: 'Вечерний отрыв', replay: false, avatar: '/logo.svg' }
//     ]
//   },
//   {
//     weekdayTitle: 'Пятница',
//     weekdayId: 5,
//     programs: [
//       { start: '07:00', end: '10:00', title: 'Тапки ШОУ', replay: false, avatar: '/logo.svg' },
//       { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, avatar: '/logo.svg' },
//       { start: '18:00', end: '21:00', title: 'Вечерний отрыв', replay: false, avatar: '/logo.svg' },
//       { start: '21:00', end: '00:00', title: 'Атмосферные выходные', replay: false, avatar: '/logo.svg' }
//     ]
//   },
//   {
//     weekdayTitle: 'Суббота',
//     weekdayId: 6,
//     programs: [
//       { start: '10:00', end: '14:00', title: 'Атмосферные выходные', replay: false, avatar: '/logo.svg' },
//       { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, avatar: '/logo.svg' },
//       { start: '15:00', end: '18:00', title: 'Атмосферные выходные', replay: false, avatar: '/logo.svg' },
//       {
//         start: '18:00',
//         end: '19:00',
//         title: 'TOP Chart 20 – Лучшие треки недели',
//         replay: false,
//         avatar: '/images/programs/top-chart.webp'
//       }
//     ]
//   },
//   {
//     weekdayTitle: 'Воскресенье',
//     weekdayId: 0,
//     programs: [
//       { start: '10:00', end: '14:00', title: 'Атмосферные выходные', replay: false, avatar: '/logo.svg' },
//       { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, avatar: '/logo.svg' },
//       { start: '15:00', end: '18:00', title: 'Атмосферные выходные', replay: false, avatar: '/logo.svg' },
//       { start: '18:00', end: '19:00', title: 'TOP Chart 20 – Итоги недели', replay: false, avatar: '/logo.svg' }
//     ]
//   }
// ]

const contacts = {
  title: 'Федеральная редакция',
  phones: [
    { label: 'Офис/Реклама', phone: '+7 (495) 128-43-94', type: 'phone' },
    { label: 'Эфир', phone: '+7 (495) 128-43-25', type: 'phone' },
    { label: 'WhatsApp и SMS', phone: '+7 (937) 434-33-73', type: 'phone' }
  ],
  address: `${CONTACTS.index}, ${CONTACTS.address}, ${CONTACTS.street}, д. ${CONTACTS.houseNumber}`,
  emails: [
    { label: 'Служба информации', mail: 'info@radioshtani.ru', type: 'mail' },
    { label: 'Пресс-релизы', mail: 'press-rel@radioshtani.ru', type: 'mail' },
    { label: 'Редакция радиоканала', mail: 'edition@radioshtani.ru', type: 'mail' },
    { label: 'Музыкальная редакция', mail: 'songs@radioshtani.ru', type: 'mail' },
    { label: 'Прямой эфир', mail: 'onair@radioshtani.ru', type: 'mail' }
  ]
}

const commercial = {
  title: 'Рекламная служба «Радио ШТАНЫ»',
  description: 'По всем вопросам размещения рекламы на «Радио ШТАНЫ» в регионах сейлз-хаус медиахолдинга «LOLAMEDIA»',
  phones: [{ label: 'Офис/Реклама', phone: '+7 (495) 128-43-94', type: 'phone' }],
  emails: [{ label: '', mail: 'adv@elarin.ru', type: 'mail' }]
}

class PageService {
  async hosts() {
    return team
  }

  async mainMenu() {
    return mainMenu
  }

  // async programs() {
  //   return schedule
  // }

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
      .populate({ path: 'phoneId', select: 'number' })
      .populate({ path: 'mailId', select: 'title' })
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
