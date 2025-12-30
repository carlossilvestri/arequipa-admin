import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import { createPinia } from 'pinia' // Import createPinia
import axiosPlugin from './plugins/axios'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const app = createApp(App)

app.use(router)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(VueApexCharts)
app.use(axiosPlugin)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
