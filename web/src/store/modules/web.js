import {
  setWeb,
  getWebs,
  removeWeb,
  renameWeb,
  changeLockStatus
} from '@/api/web'

const state = {}

const mutations = {}

const actions = {
  async setWeb(ctx, data) {
    const res = await setWeb(data)
    return res
  },

  async getWebs(ctx, data) {
    const res = await getWebs(data)
    return res
  },

  async removeWeb(ctx, data) {
    const res = await removeWeb(data)
    return res
  },

  async renameWeb(ctx, data) {
    const res = await renameWeb(data)
    return res
  },

  async changeLockStatus(ctx, data) {
    const res = await changeLockStatus(data)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
