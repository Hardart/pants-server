import { QueryParams } from '../types/custom-request'
import { MenuItem } from '../types/menu'
import articleService from './article-service'
import contactService from './contact-service'

const AGE_RATE = 12

const hosts = [
  {
    fullName: 'Евгений Богомолов',
    position: ['host'],
    avatar: '/images/team/no_image.webp',
    programs: ['Шоу "Без названия"']
  },
  {
    fullName: 'Павел Планов',
    position: ['host'],
    avatar: '/images/team/no_image.webp',
    programs: ['Шоу "Без названия"']
  }
]

const team = [
  {
    fullName: 'Евгений Ларин',
    position: ['Генеральный директор', 'Главный редактор'],
    avatar: '/images/team/larin.jpg'
  },
  {
    fullName: 'Артем Шакиров',
    position: ['Руководитель технического отдела'],
    avatar: '/images/team/no_image.webp'
  },
  {
    fullName: 'Александр Домнин',
    position: ['Бренд–войс'],
    avatar: '/images/team/no_image.webp'
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
  // {
  //   slug: 'promo',
  //   label: 'Конкурсы',
  //   childrens: [
  //     { slug: 'how-get-prize', label: 'Как получить приз' },
  //     { slug: 'model-regulations', label: 'Правила участия в играх' }
  //   ]
  // },
  {
    slug: 'contacts',
    label: 'Контакты',
    childrens: [
      { slug: 'about', label: 'О радиостанции' },
      { slug: 'team', label: 'Команда' }
      // { slug: 'regional-evolution', label: 'Региональное развитие' }
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
        text: `<p>Средство массовой информации «RADIOSHTANI.RU» зарегистрировано 29 марта 2021г. в форме распространения «Сетевое издание». Регистрационный номер СМИ Эл Nº ФС77-80691 от 29.03.2021г. выдано Федеральной службой по надзору в сфере связи, информационных технологий и массовых коммуникаций (Роскомнадзор). Для детей старше 12 лет. Учредитель (Главный редактор): Ларин Евгений Дмитриевич</p>`
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
