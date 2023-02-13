import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },

  // Not Found
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/layouts/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
