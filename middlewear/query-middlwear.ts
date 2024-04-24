import { Response, NextFunction, Request } from 'express'

type QueryFilter = {publishAt: {$lte: string}} | {isPublished: string} | {tags: string} | {categoryId: string}

const BASE_FILTER = () => [{ publishAt: { $lte: new Date().toISOString() } }, { isPublished: '1' }]

const BASE_QUERY = {
  page: '0',
  limit: '12',
  sort: { createdAt: 'desc' },
}

export function decodeQuery(req: Request, _: Response, next: NextFunction) {
  const query = req.query
  if (Object.keys(query).length == 0) {
    req.query = BASE_QUERY
    req.query.filter = BASE_FILTER()
    return next()
  }

  const limit = query.limit || BASE_QUERY.limit
  const page = query.page && typeof query.page === 'string' ? `${parseInt(query.page) - 1}` : BASE_QUERY.page
  const sort = BASE_QUERY.sort
  const filter: QueryFilter[] = BASE_FILTER()

  

  if ('tags' in  query && typeof query.tags === 'string' && query.tags.trim() !== '') {
    filter.push({tags: query.tags})
  }

  if ('categoryId' in  query && typeof query.categoryId === 'string') {
    filter.push({categoryId: query.categoryId})
  }

  req.query = {
    limit,
    page,
    sort,
    filter
  }
  
  next()
}

// function isSortOrder(value: any): value is SortOrder {
//   return value == 'desc' || value == 'asc'
// }
