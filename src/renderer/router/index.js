import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const mainRoutes = [
  {
    path: '/home',
    name: 'home',
    icon: 'ios-book',
    component: () => import('../views/Home'),
    title: '打包'
  },
  {
    path: '/mv',
    name: 'mv',
    icon: 'ios-browsers',
    component: () => import('../views/Move'),
    title: '移动dll'
  },
  {
    path: '/logs',
    name: 'logs',
    icon: 'md-folder',
    component: () => import('../views/Logs'),
    title: '日志'
  }
]

const routes = [
  {
    path: '/',
    redirect: '/logs',
    component: () => import('../components/layout/main'),
    children: mainRoutes
  },
  {
    path: '/mini',
    name: 'mini',
    component: () => import('../views/Mini')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
