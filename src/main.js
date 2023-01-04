import {createApp} from 'vue'
import App from './App.vue'
import router from "./router"
import './assets/scss/style.scss'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.scss'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


createApp(App).component('Loading', Loading).use(ElementPlus).use(router).mount('#app')
