import type { FilterQueryValue } from './FilterQueryValue'

export type FilterQuery = {
  propName: string
  title: string
  type: 'select' | 'date'
  values?: FilterQueryValue[]
  selected: string | number
}
