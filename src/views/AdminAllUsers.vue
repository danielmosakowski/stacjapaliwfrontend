<template>
    <div>
      <h1>Zarządzaj użytkownikami</h1>
      <table>
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
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        users: [], // Lista użytkowników
      };
    },
    mounted() {
      this.fetchUsers(); // Pobieranie użytkowników po załadowaniu komponentu
    },
    methods: {
      fetchUsers() {
        axios
          .get("http://localhost:8000/api/users", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            this.users = response.data; // Zapisanie listy użytkowników
          })
          .catch((error) => {
            console.error("Błąd pobierania użytkowników:", error);
          });
      },
      deleteUser(userId) {
        if (confirm("Czy na pewno chcesz usunąć tego użytkownika?")) {
          axios
            .delete(`http://localhost:8000/api/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              // Usuń użytkownika z listy po udanym usunięciu
              this.users = this.users.filter((user) => user.id !== userId);
            })
            .catch((error) => {
              console.error("Błąd przy usuwaniu użytkownika:", error);
            });
        }
      },
    },
  };
  </script>
  
  <style scoped>
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
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: darkred;
  }
  </style>
  