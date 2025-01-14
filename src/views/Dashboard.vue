<template>
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
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
  },

  mounted() {
    if (this.isAuthenticated === null) {
      this.$store.dispatch('checkUserAuthenticationStatus');  // Wywołanie akcji, która ustawi stan
    }
  },
};
</script>