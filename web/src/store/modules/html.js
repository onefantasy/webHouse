import {
  exportHtml,
  importHtml
} from '@/api/html'

const state = {}

const mutations = {}

const actions = {
  async exportHtml() {
    const res = await exportHtml()
    return res
  },

  async importHtml(ctx, data) {
    const res = await importHtml(data)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
