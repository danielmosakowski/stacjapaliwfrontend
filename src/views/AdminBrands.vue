<template>
  <div class="brand-management">
    <h1>Zarządzanie markami stacji</h1>
    <div class="input-section">
      <input v-model="newBrand" placeholder="Dodaj nową markę" />
      <buttons @click="addBrand">Dodaj</buttons>
    </div>
    <table class="brand-table">
      <thead>
      <tr>
        <th>Marka</th>
        <th>Akcje</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="brand in brands" :key="brand.id">
        <td>{{ brand.name }}</td>
        <td><button @click="deleteBrand(brand.id)">Usuń</button></td>
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
      brands: [],
      newBrand: "",
    };
  },
  mounted() {
    this.fetchBrands();
  },
  methods: {
    fetchBrands() {
      axios
          .get("http://localhost:8000/api/brands", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then((response) => {
            this.brands = response.data;
          })
          .catch((error) => {
            console.error("Błąd podczas pobierania marek:", error);
          });
    },
    addBrand() {
      if (this.newBrand.trim()) {
        axios
            .post(
                "http://localhost:8000/api/brands",
                { name: this.newBrand },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            )
            .then(() => {
              this.fetchBrands();
              this.newBrand = "";
            })
            .catch((error) => {
              console.error("Błąd podczas dodawania marki:", error);
            });
      }
    },
    deleteBrand(brandId) {
      axios
          .delete(`http://localhost:8000/api/brands/${brandId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then(() => {
            this.fetchBrands();
          })
          .catch((error) => {
            console.error("Błąd podczas usuwania marki:", error);
          });
    },
  },
};
</script>

<style scoped>
.brand-management {
  background: url('@/assets/tło12.jpg') no-repeat center center;
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

.input-section {
  margin-bottom: 20px;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
  margin-right: 10px;
}

buttons {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
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

buttons:hover {
  background-color: #2f6c25;
}

.brand-table {
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  overflow: hidden;
}

.brand-table th,
.brand-table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: center;
  color: white;
}

.brand-table th {
  background-color: #343a40;
}

.brand-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.1);
}

.brand-table tr:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
