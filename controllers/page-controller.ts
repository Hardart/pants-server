import type { Response, Request, NextFunction } from 'express'
import articleService from '../service/article-service'
import { QueryParams } from '../types/custom-request'
import pageService from '../service/page-service'
import tagService from '../service/tag-service'
import programService from '../service/program-service'
import { MenuItem } from '../types/menu'
import { FooterMeta } from '../types/footer'
import slideService from '../service/slide-service'

interface IMenuItem {
  slug: string
  label: string
  childrens?: IMenuItem[]
}

let menu: MenuItem[] = []
let footerCache: FooterMeta
export default class PageController {
  static async main(req: Request, res: Response, next: NextFunction) {
    const q = req.query as QueryParams
    const articles = await articleService.list(q)
    const hosts = await pageService.hosts()
    const slides = await slideService.list()
    res.json({ articles, hosts, slides })
  }

  static async meta(req: Request, res: Response, next: NextFunction) {
    if (!menu.length) {
      const mainMenu = await pageService.mainMenu()
      const programs = await programService.menuList()

      mainMenu.forEach((item) => {
        if (item.slug === 'programs') item.childrens = programs.map((p) => ({ label: p.title, slug: p.slug }))
      })
      footerCache = await pageService.footer()
      menu = addLinkToMenuItem(mainMenu)
      console.log('build')
    }
    console.log('cache')
    const tagList = await tagService.list()
    res.json({ mainMenu: menu, tagList, footer: footerCache })
  }

  static async programs(req: Request, res: Response, next: NextFunction) {
    const programs = await programService.list()
    res.json({ programs })
  }

  static async contacts(req: Request, res: Response, next: NextFunction) {
    const contacts = await pageService.contacts()
    res.json(contacts)
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
