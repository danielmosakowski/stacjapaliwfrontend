import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from "axios";


// Importowanie funkcji z navbar.js
import { navbarAnimation, navbarToggle } from './navbar'

const app = createApp(App);

// Inicjalizowanie animacji navbaru
navbarAnimation();
navbarToggle();

window.axios = axios;

app.use(router);
app.use(store)

app.mount('#app');
