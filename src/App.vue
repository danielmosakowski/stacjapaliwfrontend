<template>
  <div>
    <!-- Navbar -->
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <RouterLink class="navbar-brand" to="/">wacha.pl</RouterLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/">Strona Główna</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/list-of-stations">Lista Stacji</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/search">Wyszukiwarka</RouterLink>
              </li>
              <li class="nav-item" v-if="!isAuthenticated">
                <RouterLink class="nav-link" to="/login">Logowanie</RouterLink>
              </li>
              <li class="nav-item" v-if="!isAuthenticated">
                <RouterLink class="nav-link" to="/register">Rejestracja</RouterLink>
              </li>
              <li class="nav-item" v-if="isAuthenticated">
                <RouterLink class="nav-link" to="/dashboard">Tablica</RouterLink>
              </li>
              <li class="nav-item" v-if="isAuthenticated && isAdmin">
                <RouterLink class="nav-link" to="/admin">Admin</RouterLink>
              </li>
              <li class="nav-item" v-if="isAuthenticated">
                <a class="nav-link" @click="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Content View -->
    <RouterView />

    <!-- Footer -->
    <footer class="footer text-center py-3">
      <div class="footer-left">
        <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://youtube.com" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
      </div>
      <div class="footer-center">
        <img src="@/assets/wacha.png" alt="Wacha Logo" />
        <p>Wacha &copy;2025 No Money, No Gas</p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "@/axios.js";

export default {
  mounted() {
    this.$store.dispatch("checkUserAuthenticationStatus");
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
  },
  methods: {
    logout() {
      axios
        .post("http://localhost:8000/api/logout")
        .then(() => {
          this.$store.dispatch("logout");
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    },
  },
};
</script>

<style scoped>
/* General Styles */
body {
  font-family: "Arial", sans-serif;
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
  border-radius: 5px;
}

/* Footer Styles */
footer {
  background-color: #343a40;
  color: #fff;
}

footer .footer-left a {
  margin: 0 10px;
  color: #fff;
  font-size: 1.2rem;
}

footer .footer-left a:hover {
  color: #ddd;
}

footer .footer-center {
  margin-top: 15px;
}

footer p {
  margin: 5px 0;
}
</style>
