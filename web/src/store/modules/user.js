import {
  register,
  login,
  logout
} from '@/api/user'
import { setToken, removeToken } from '@/utils/auth.js'

const state = {
  username: '',
  password: ''
}

const mutations = {}

const actions = {
  async register(ctx, data) {
    const res = await register(data)
    return res
  },

  async resetToken() {
    return new Promise(resolve => {
      removeToken()
      resolve()
    })
  },

  async login(ctx, data) {
    const { username, password } = data
    const params = { username: username.trim() }
    password && (params.password = password.trim())
    return new Promise((resolve, reject) => {
      login(params).then(res => {
        const token = res.data
        setToken(token)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  async logout() {
    const res = await logout()
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
