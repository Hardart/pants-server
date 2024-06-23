import { QueryParams } from '../types/custom-request'
import { MenuItem } from '../types/menu'
import articleService from './article-service'
import contactService from './contact-service'

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

  async footerData() {
    const { licenseInfo, smsInfo } = this._footerInfo()
    const { emails, phones, addresses } = await contactService.contacts('footer')
    return { emails, phones, addresses, licenseInfo, smsInfo }
  }

  private _footerInfo() {
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

  async index(query: QueryParams) {
    const pageData = {
      news: await articleService.list(query),
      hosts: await this.hosts(),
      footer: await this.footerData()
    }
    return pageData
  }
}

export default new PageService()
