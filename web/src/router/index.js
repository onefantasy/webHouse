import { createRouter, createWebHistory } from 'vue-router'

// change history record from hash mode to history mode
const routerHistory = createWebHistory()

export const constantRouter = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/page',
    name: 'page',
    component: () => import('@/views/page/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/page'
  }
]

// create router
const router = createRouter({
  history: routerHistory,
  routes: constantRouter
})

export default router
