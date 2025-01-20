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
        <th scope="col">Akcja</th> <!-- Kolumna na przycisk -->
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.suggested_price }}</td>
        <td>{{ user.photo_path }}</td>
        <td>{{ user.price_date }}</td>
        <td>{{ user.approved ? 'Zatwierdzone' : 'Oczekuje' }}</td>
        <td>
          <!-- Przyciski tylko jeśli status to "Oczekuje" -->
          <button v-if="!user.approved" @click="approveSuggestion(user.id)">
            Zatwierdź
          </button>
        </td>
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
      axios.get('http://localhost:8000/api/fuel-price-suggestions', {
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

    // Funkcja do zatwierdzania propozycji
    approveSuggestion(userId) {
      axios.put(`http://localhost:8000/api/fuel-price-suggestions/${userId}`, {
        approved: 1, // Zmieniamy na 1
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        // Zaktualizowanie statusu zatwierdzenia w UI po udanej operacji
        const user = this.users.find(u => u.id === userId);
        if (user) {
          user.approved = 1;
        }
      })
      .catch((error) => {
        console.error("Błąd przy zatwierdzaniu propozycji:", error);
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

button {
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: darkgreen;
}
</style>
