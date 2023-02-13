import type { SidebarRoute } from '@/types'

export const SidebarRoutes: SidebarRoute[] = [
  {
    routeName: 'Dashboard',
    title: 'داشبورد',
    iconName: 'home'
  },
  {
    routeMeta: 'shop',
    title: 'محصولات',
    iconName: 'shopping-bag',
    hasSub: true,
    subs: [
      {
        title: 'لیست محصولات',
        routeName: 'ProductList'
      },
      {
        title: 'محصول جدید',
        routeName: 'ProductUpdate'
      },
      {
        title: 'دسته بندی ها',
        routeName: 'ProductCategoryList'
      },
      {
        title: 'برچسب ها',
        routeName: 'ProductTagList'
      }
    ]
  },
]
