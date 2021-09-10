import {
  setCatalog,
  getCatalogs,
  removeCatalog,
  renameCatalog,
  changeLockStatus
} from '@/api/catalog'

const state = {}

const mutations = {}

const actions = {
  async setCatalog(ctx, data) {
    const res = await setCatalog(data)
    return res
  },

  async getCatalogs() {
    const res = await getCatalogs()
    return res
  },

  async removeCatalog(ctx, data) {
    const res = await removeCatalog(data)
    return res
  },

  async renameCatalog(ctx, data) {
    const res = await renameCatalog(data)
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
