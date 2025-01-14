<template>
<<<<<<< HEAD
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="card">
          <div class="card-header">
            Dashboard
          </div>
          <div class="card-body">
            <p v-if="user" class="card-text">You are logged in! {{user.data.name}}</p>
          </div>
        </div>
      </div>
=======
  <div v-if="isAuthenticated !== null">
    <h1>Dashboard</h1>

    <div v-if="isAuthenticated">
      <p>Status: Zalogowany</p>
      <p>Admin: {{ isAdmin ? 'Tak' : 'Nie' }}</p>
    </div>

    <div v-else>
      <p>Status: Niezalogowany</p>
>>>>>>> dominikBranch
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
  import axios from "axios";

  export default {
    data() {
      return {
        user: null,
      };
    },

    mounted() {
      this.getUserDetails();
    },

    methods: {
      getUserDetails(){
        axios.get('http://localhost:8000/api/userprofile')
            .then(response =>{
              //console.log(response.data)
              this.user = response.data
        })
            .catch(error =>{

        })
      }
    },
  }

=======
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
>>>>>>> dominikBranch
</script>