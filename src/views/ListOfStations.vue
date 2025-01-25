<template>
  <div class="app-container">
    <h1>Lista Stacji</h1>

    <input
        type="text"
        v-model="searchQuery"
        placeholder="Wyszukaj stację po nazwie lub adresie"
        class="search-input"
    />

    <table class="stations-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nazwa</th>
        <th>Adres</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="station in filteredStations" :key="station.id">
        <td>{{ station.id }}</td>
        <td>{{ station.name }}</td>
        <td>{{ station.address }}</td>
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
      stations: [],
      searchQuery: "", // Tekst do wyszukiwania
      newStation: {
        brand_id: null,
        name: "",
        address: "",
        longitude: "",
        latitude: "",
      },
    };
  },
  mounted() {
    this.fetchBrands();
    this.fetchStations();
  },
  computed: {
    filteredStations() {
      const query = this.searchQuery.toLowerCase();
      return this.stations.filter(
          (station) =>
              station.name.toLowerCase().includes(query) ||
              station.address.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    sanitizeCoordinates() {
      this.newStation.longitude = this.newStation.longitude.replace(',', '.');
      this.newStation.latitude = this.newStation.latitude.replace(',', '.');
    },
    fetchBrands() {
      axios
          .get("http://localhost:8000/api/brands", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            this.brands = response.data;
          })
          .catch((error) => {
            console.error("Błąd przy pobieraniu marek:", error);
          });
    },
    fetchStations() {
      axios
          .get("http://localhost:8000/api/stations", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            this.stations = response.data;
          })
          .catch((error) => {
            console.error("Błąd przy pobieraniu stacji:", error);
          });
    },
    updateName() {
      const selectedBrand = this.brands.find(
          (brand) => brand.id === this.newStation.brand_id
      );
      if (selectedBrand) {
        this.newStation.name = selectedBrand.name;
      }
    },
    addStation() {
      this.sanitizeCoordinates();
      axios
          .post(
              "http://localhost:8000/api/stations",
              this.newStation,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
          )
          .then((response) => {
            this.stations.push(response.data);
            alert("Stacja została dodana!");
            this.newStation = {
              brand_id: null,
              name: "",
              address: "",
              longitude: "",
              latitude: "",
            };
          })
          .catch((error) => {
            console.error("Błąd podczas dodawania stacji:", error);
            alert("Dodawanie stacji nie powiodło się. Sprawdź dane wejściowe.");
          });
    },
    deleteStation(stationId) {
      axios
          .delete(`http://localhost:8000/api/stations/${stationId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            this.stations = this.stations.filter(
                (station) => station.id !== stationId
            );
            alert("Stacja została usunięta.");
          })
          .catch((error) => {
            console.error("Błąd podczas usuwania stacji:", error);
          });
    },
  },
};
</script>

<style scoped>
.app-container {
  background: url('@/assets/tło9.jpg') no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
  min-height: 100vh;
  color: #333;
}

h1 {
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
}

.search-input {
  display: block;
  margin: 0 auto 20px auto;
  padding: 10px;
  width: 50%;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.stations-table {
  background-color: rgba(255, 255, 255, 0.8); /* 80% przezroczystości */
  border-radius: 8px;
  overflow: hidden;
}

form {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select, button {
  margin-bottom: 15px;
  padding: 8px;
  width: 100%;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>
