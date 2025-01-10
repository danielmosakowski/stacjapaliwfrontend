import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importowanie funkcji z navbar.js
import { navbarAnimation, navbarToggle } from './navbar'

const app = createApp(App);

// Inicjalizowanie animacji navbaru
navbarAnimation();
navbarToggle();

app.use(router);
app.mount('#app');
