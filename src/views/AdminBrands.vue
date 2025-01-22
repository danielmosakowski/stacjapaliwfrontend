<template>
    <div>
      <h1>Zarządzanie markami stacji</h1>
      <input v-model="newBrand" placeholder="Dodaj nową markę" />
      <button @click="addBrand">Dodaj</button>
      <ul>
        <li v-for="brand in brands" :key="brand.id">
          {{ brand.name }}
          <button @click="deleteBrand(brand.id)">Usuń</button>
        </li>
      </ul>
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
  button {
    margin: 5px;
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #c82333;
  }
  </style>
  