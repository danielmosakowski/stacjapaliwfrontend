<template>
  <div>
    <h1>Lista użytkowników</h1>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Imię</th>
        <th>Email</th>
        <th>Rola</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.is_admin ? 'Admin' : 'Użytkownik' }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },

  mounted() {
    this.fetchUsers();
  },

  methods: {
    fetchUsers() {
      axios.get('http://localhost:8000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>

<style scoped>
/* Możesz dodać style dla tabeli */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>