import type { _Icon } from './_Icon'

export type SidebarRoute = {
  routeMeta?: string
  routeName?: string
  title: string
  iconName?: _Icon | string
  hasSub?: boolean
  subs?: SidebarRoute[]
}
