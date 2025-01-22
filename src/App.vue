<template>
  <div>
    <header>
      <div class="wrapper">
        <nav class="navbar navbar-expand-custom navbar-mainbg">
          <RouterLink class="navbar-brand navbar-logo" to="/">
            <img src="@/assets/wacha.png" alt="Wacha Logo" class="navbar-logo-img" />
          </RouterLink>
          <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars text-white"></i>
          </button>
          <!-- Wyskakujące menu -->
          <div class="navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/" active-class="active-link"><i class="fas fa-home"></i>Strona Główna</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/list-of-stations" active-class="active-link"><i class="fas fa-building"></i>Lista Stacji</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/search" active-class="active-link"><i class="fas fa-search"></i>Wyszukiwarka</RouterLink>
              </li>
              <li class="nav-item" v-if="!isAuthenticated">
                <RouterLink class="nav-link" to="/login" active-class="active-link"><i class="fas fa-sign-in-alt"></i>Logowanie</RouterLink>
              </li>
              <li class="nav-item" v-if="!isAuthenticated">
                <RouterLink class="nav-link" to="/register" active-class="active-link"><i class="fas fa-user-plus"></i>Rejestracja</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/contact" active-class="active-link"><i class="fas fa-phone"></i>Kontakt</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/about" active-class="active-link"><i class="fas fa-info-circle"></i>O nas</RouterLink>
              </li>
              <li class="nav-item" v-if="isAuthenticated">
                <RouterLink class="nav-link" to="/dashboard" active-class="active-link"><i class="fas fa-columns"></i>Panel użytkownika</RouterLink>
              </li>
              <li class="nav-item" v-if="isAuthenticated && isAdmin">
                <RouterLink class="nav-link" to="/admin" active-class="active-link"><i class="fas fa-cogs"></i>Admin</RouterLink>
              </li>
              <li class="nav-item" v-if="isAuthenticated">
                <a class="nav-link" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>

    <!-- Przejścia między widokami -->
    <transition name="fade">
      <RouterView />
    </transition>

    <!-- Stopka -->
    <footer class="footer">
      <div class="footer-left">
        <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://youtube.com" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
      </div>
      <div class="footer-center">
        <img src="@/assets/wacha.png" alt="Wacha Logo" />
      </div>
      <div class="footer-right">
        <div>Wacha</div>
        <div>©2025 Wacha</div>
        <div>No Money, No Gas</div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from './axios.js'

export default {
  mounted() {
    this.$store.dispatch('checkUserAuthenticationStatus')
  },

  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    isAdmin() {
      return this.$store.state.isAdmin
    }
  },

  methods: {
    logout() {
      axios.post('http://localhost:8000/api/logout')
          .then(response => {
            this.$store.dispatch('logout')
            this.$router.push({name: 'login'})
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style>
/* Animacja fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
