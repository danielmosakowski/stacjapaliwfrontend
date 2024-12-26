import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import axios from "axios";

const app = createApp(App)
//axios.defaults.baseURL = 'http://localhost:8000/api';
window.axios = axios;

app.use(router)
app.use(store)

app.mount('#app')
