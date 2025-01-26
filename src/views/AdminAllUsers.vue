<template>
  <div class="user-management">
    <h1>Zarządzaj użytkownikami</h1>
    <div class="table-wrapper">
      <table class="user-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Nazwa użytkownika</th>
          <th>Email</th>
          <th>Akcja</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="deleteUser(user.id)" class="reject">
              Usuń
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
      axios
          .get("http://localhost:8000/api/users", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.error("Błąd pobierania użytkowników:", error);
          });
    },
    deleteUser(userId) {
      axios
          .delete(`http://localhost:8000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then(() => {
            this.fetchUsers();
          })
          .catch((error) => {
            console.error("Błąd przy usuwaniu użytkownika:", error);
          });
    },
  },
};
</script>

<style scoped>
.user-management {
  background: url('@/assets/tło14.jpg') no-repeat center center;
  background-size: cover;
  padding: 20px;
  color: white;
  font-family: Arial, sans-serif;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-x: auto;
}

.user-table {
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  overflow: hidden;
}

.user-table th,
.user-table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: center;
  color: white;
}

.user-table th {
  background-color: #343a40;
}

.user-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-table tr:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

button {
  padding: 10px 15px;
  background-color: #e10f0f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #88212d;
}

@media (max-width: 768px) {
  .user-table {
    font-size: 0.9rem;
  }

  .user-table th,
  .user-table td {
    padding: 10px;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
