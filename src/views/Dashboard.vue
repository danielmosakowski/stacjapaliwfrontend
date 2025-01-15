<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="card">
          <div class="card-header">
            Dashboard
          </div>
          <div class="card-body">
            <p v-if="user" class="card-text">You are logged in! {{ user.data.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isAuthenticated !== null">
      <h1>Dashboard</h1>

      <div v-if="isAuthenticated">
        <p>Status: Zalogowany</p>
        <p>Admin: {{ isAdmin ? 'Tak' : 'Nie' }}</p>
      </div>

      <div v-else>
        <p>Status: Niezalogowany</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
    };
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
    getUserDetails() {
      axios
        .get("http://localhost:8000/api/userprofile")
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.getUserDetails();
    } else {
      this.$store.dispatch("checkUserAuthenticationStatus");
    }
  },
};
</script>
