<template>
  <div>
    <!-- Navbar -->
    <header>
      <div class="wrapper">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container">
            <RouterLink class="navbar-brand" to="/">wacha.pl</RouterLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/">Home</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/check">Wyszukiwarka</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/login">Logowanie</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/register">Rejestracja</RouterLink>
                </li>
              </ul>

              <!-- Login/Logout Section -->
              <form class="d-flex">
                <router-link v-if="isAuthenticated" to="/dashboard" class="btn btn-outline-success me-2">Dashboard</router-link>
                <router-link v-if="isAuthenticated && isAdmin" to="/admin" class="btn btn-outline-warning me-2">Admin</router-link>
                <a v-if="isAuthenticated" @click="logout" class="btn btn-outline-danger me-2">Logout</a>
                <router-link v-if="!isAuthenticated" to="/login" class="btn btn-outline-primary me-2">Login</router-link>
                <router-link v-if="!isAuthenticated" to="/register" class="btn btn-outline-primary">Register</router-link>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <!-- Content View -->
    <RouterView />

    <!-- Footer -->
    <footer class="bg-dark text-white mt-5 py-4">
      <div class="container text-center">
        <p>&copy; 2025 wacha.pl. All rights reserved.</p>
        <p>
          <RouterLink class="text-white" to="/privacy-policy">Privacy Policy</RouterLink> |
          <RouterLink class="text-white" to="/terms-of-service">Terms of Service</RouterLink>
        </p>
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
            this.$router.push({ name: 'login' })
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>
/* Global Styles */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
}

/* Navbar Styles */
.navbar {
  background-color: #343a40 !important;
}

.navbar .navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar-nav .nav-link {
  font-size: 1rem;
}

.navbar-nav .nav-link:hover {
  background-color: #495057;
}

/* Footer Styles */
footer {
  background-color: #343a40;
  color: #fff;
}

footer p {
  margin-bottom: 0;
}

footer a {
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
</style>