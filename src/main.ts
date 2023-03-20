// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import store from './store/index.js'
// import Util from '@/helpers/util'
import Util from './helpers/util'


// Vue.use(ElementUI)
// Vue.use(Util)

// Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

import {createApp} from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { router } from '@/router'
import { store } from '@/store'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(Util,{})

app.mount('#app')
