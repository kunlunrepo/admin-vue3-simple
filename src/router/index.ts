import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes as routes1 } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => {
    console.log("🚀 自动路由 ", routes1)
    console.log("🚀 路由 ", routes)
    return setupLayouts(routes)
  }
})

export default router
