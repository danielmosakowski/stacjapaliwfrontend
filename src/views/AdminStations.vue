<template>
    <div>
      <h1>Zarządzanie stacjami paliwowymi</h1>
      <input v-model="newStationName" placeholder="Dodaj nazwę stacji" />
      <input v-model="newStationAddress" placeholder="Dodaj adres stacji" />
      <button @click="addStation">Dodaj</button>
      <ul>
        <li v-for="station in stations" :key="station.id">
          {{ station.name }} ({{ station.address }})
          <button @click="deleteStation(station.id)">Usuń</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        stations: [],
        newStationName: "",
        newStationAddress: "",
      };
    },
    mounted() {
      this.fetchStations();
    },
    methods: {
      fetchStations() {
        axios
          .get("http://localhost:8000/api/stations", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then((response) => {
            this.stations = response.data;
          })
          .catch((error) => {
            console.error("Błąd podczas pobierania stacji:", error);
          });
      },
      addStation() {
        if (this.newStationName.trim() && this.newStationAddress.trim()) {
          axios
            .post(
              "http://localhost:8000/api/stations",
              { name: this.newStationName, address: this.newStationAddress },
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            )
            .then(() => {
              this.fetchStations();
              this.newStationName = "";
              this.newStationAddress = "";
            })
            .catch((error) => {
              console.error("Błąd podczas dodawania stacji:", error);
            });
        }
      },
      deleteStation(stationId) {
        axios
          .delete(`http://localhost:8000/api/stations/${stationId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then(() => {
            this.fetchStations();
          })
          .catch((error) => {
            console.error("Błąd podczas usuwania stacji:", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    margin: 5px;
    padding: 5px 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #218838;
  }
  </style>
  