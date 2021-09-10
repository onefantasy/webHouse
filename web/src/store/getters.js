const getters = {
  i18n: state => state.app.i18n,
  currentFolder: state => state.app.currentFolder,
  languages: state => state.options.languages
}

export default getters
