import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const mainRoutes = [
  {
    path: '/home',
    name: 'home',
    icon: 'md-folder',
    component: () => import('../views/Home'),
    title: '首页'
  }
]

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../components/layout/main'),
    children: mainRoutes
  }
]

const router = new VueRouter({
  routes
})

export default router
