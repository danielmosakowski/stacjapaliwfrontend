<template>
  <div>
    <h1>Lista użytkowników</h1>
    <table>
      <thead>
      <tr>
        <th scope="col">ID Zgłoszenia</th>
        <th scope="col">Cena sugerowana</th>
        <th scope="col">Ścieżka zdjęcia</th>
        <th scope="col">Data</th>
        <th scope="col">Status zatwierdzenia</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.suggested_price }}</td>
        <td>{{ user.photo_path }}</td>
        <td>{{ user.price_date }}</td>
        <td>{{ user.approved ? 'Zatwierdzone' : 'Oczekuje' }}</td>
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
      axios.get('http://localhost:8000/api/fuel-price-suggestions/user/20', {
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