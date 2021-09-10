import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'normalize.css/normalize.css'
// default theme
import 'element-plus/lib/theme-chalk/index.css'
// custom theme
// import '@/style/theme/index.css'

import i18n from '@/lang'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

// import global components
import SvgIcon from '@/components/SvgIcon'

// set router guards
import '@/permission'
// import svg icons
import '@/icons'

const app = createApp(App)
app
  .use(i18n)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app')

// register global components
app.component('SvgIcon', SvgIcon)
