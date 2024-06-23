import type { Response, Request, NextFunction } from 'express'
import articleService from '../service/article-service'
import { QueryParams } from '../types/custom-request'
import pageService from '../service/page-service'
import tagService from '../service/tag-service'
import programService from '../service/program-service'
import slideService from '../service/slide-service'
import contactService from '../service/contact-service'

interface IMenuItem {
  slug: string
  label: string
  childrens?: IMenuItem[]
}

export default class PageController {
  static async main(req: Request, res: Response, next: NextFunction) {
    const q = req.query as QueryParams
    const articles = await articleService.list(q)
    const hosts = await pageService.hosts()
    const slides = await slideService.list()
    res.json({ articles, hosts, slides })
  }

  static async meta(req: Request, res: Response, next: NextFunction) {
    const mainMenu = await pageService.mainMenu()
    const programs = await programService.menuList()

    mainMenu.forEach((item) => {
      if (item.slug === 'programs') item.childrens = programs.map((p) => ({ label: p.title, slug: p.slug }))
    })
    const menuWithLink = addLinkToMenuItem(mainMenu)
    const footerData = await pageService.footerData()
    const tagList = await tagService.list()
    res.json({ mainMenu: menuWithLink, tagList, footerData })
  }

  static async programs(req: Request, res: Response, next: NextFunction) {
    const programs = await programService.list()
    res.json({ programs })
  }

  static async contacts(req: Request, res: Response, next: NextFunction) {
    const contact = await contactService.contacts('contacts')
    res.json(contact)
  }

  static async team(req: Request, res: Response, next: NextFunction) {
    const team = await pageService.team()
    res.json({ team })
  }
}

const addLinkToMenuItem = (menuItems: IMenuItem[]) => menuItems.map(mapMenuItem())

function mapMenuItem(parentLink: string = '') {
  return function (item: IMenuItem): IMenuItem & { to: string } {
    const to = `${parentLink}/${item.slug}`.replace('//', '/')
    const childrens = item.childrens?.map(mapMenuItem(to))
    const itemWithLink = { ...item, childrens, to }
    return itemWithLink
  }
}
