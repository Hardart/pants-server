import type { Request } from 'express'
const filterKeys = ['tags', 'categoryId', 'publishAt', 'isPublished'] as const
export type Filter = (typeof filterKeys)[number]
export type FilterQuery = Partial<Record<Filter, string | string[] | object>>
export type Sort = 'createdAt' | 'updatedAt'
export type SortQuery = Partial<Record<Sort, SortOrder>>

export type QueryParams = {
  sort: SortQuery
  filter: FilterQuery[]
  page: string
  limit: string
}

// export type CustomRequest = Request & { filterParams: QueryParams }
