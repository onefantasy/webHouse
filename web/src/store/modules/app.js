import { getLanguage, setLanguage } from '@/lang'

const state = {
  i18n: getLanguage(),
  currentFolder: ''
}

const mutations = {
  CHANGE_I18N: (state, language) => {
    state.i18n = language
  },
  CHANGE_CRREANT_FOLDER: (state, folder) => {
    state.currentFolder = folder
  },
  RESETCURRENTFOLDER: (state) => {
    state.currentFolder = ''
  }
}

const actions = {
  changeI18n({ commit }, language) {
    commit('CHANGE_I18N', language)
    setLanguage(language)
  },
  changeCurrentFolder({ commit }, folder) {
    commit('CHANGE_CRREANT_FOLDER', folder)
  },
  resetCurrentFolder({ commit }) {
    commit('RESETCURRENTFOLDER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
