export type ApiResponsePagination<T> = {
  data: T
  current_page: number
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    active: boolean
    label: string
    url: string
  }[]
  next_page_url: string
  path: string
  per_page: string
  prev_page_url: string
  to: number
  total: number
}
