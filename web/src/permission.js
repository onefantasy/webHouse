import router from './router'
import { getToken } from '@/utils/auth'

router.beforeEach(async(to, from, next) => {
  console.log('=======>')
  console.log('router change start!')
  if (!getToken() && to.path !== '/login') {
    next('/login')
  }
  next()
})

router.afterEach(async() => {
  console.log('router change end!')
  console.log('<======')
})
