<template>
  <div class="admin">
    <div class="content-wrapper">
      <h1 style="text-align: center;">Panel administratora</h1>
      <div class="button-container centered">
        <button @click="goToBrands">Zarządzaj markami stacji</button>
        <button @click="goToStations">Zarządzaj stacjami paliwowymi</button>
        <button @click="gotoAllUsers">Zarządzaj użytkownikami</button>
      </div>
      <h1>Lista zgłoszeń</h1><br>
      <p>Zaakceptowane zgłoszenia: {{ approvedCount }}</p>
      <p>Odrzucone zgłoszenia: {{ rejectedCount }}</p>
      <div class="table-wrapper">
        <table class="table responsive-table">
          <thead>
          <tr>
            <th scope="col">ID Zgłoszenia</th>
            <th scope="col">Nazwa użytkownika</th>
            <th scope="col">Cena sugerowana</th>
            <th scope="col">Nazwa Stacji</th>
            <th scope="col">Adres Stacji</th>
            <th scope="col">Rodzaj Paliwa</th>
            <th scope="col">Zdjęcie</th>
            <th scope="col">Data</th>
            <th scope="col">Status zatwierdzenia</th>
            <th scope="col">Akcja</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="suggestion in suggestions" :key="suggestion.id">
            <td>{{ suggestion.id }}</td>
            <td>{{ suggestion.user ? suggestion.user.name : 'Brak danych' }}</td>
            <td>{{ suggestion.suggested_price }}</td>
            <td>{{ suggestion.station_name || 'Ładowanie...' }}</td>
            <td style="min-width: 300px;">{{ suggestion.station_address || 'Ładowanie...' }}</td>
            <td>{{ suggestion.fuel_type_name || 'Ładowanie...' }}</td>
            <td>
              <a v-if="suggestion.photo_path" :href="`http://localhost:8000/storage/${suggestion.photo_path}`" target="_blank">
                <img :src="`http://localhost:8000/storage/${suggestion.photo_path}`" alt="Zdjęcie" class="thumbnail">
              </a>
              <span v-else>Brak zdjęcia</span>
            </td>
            <td>{{ suggestion.price_date }}</td>
            <td>{{ suggestion.approved ? 'Zatwierdzone' : 'Oczekuje' }}</td>
            <td>
              <button v-if="!suggestion.approved" @click="approveSuggestion(suggestion.id)">
                Zatwierdź
              </button>
              <button v-if="!suggestion.approved" class="reject" @click="rejectSuggestion(suggestion.id)">
                Odrzuć
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      suggestions: [],
      approvedCount: 0,
      rejectedCount: 0,
    };
  },

  mounted() {
    this.fetchSuggestions();
  },

  methods: {
    goToBrands() {
      this.$router.push("/admin/brands");
    },
    goToStations() {
      this.$router.push("/admin/stations");
    },
    gotoAllUsers() {
      this.$router.push("/admin/all-users");
    },
    fetchSuggestions() {
      axios
          .get("http://localhost:8000/api/fuel-price-suggestions", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            this.suggestions = response.data;
            this.approvedCount = this.suggestions.filter(s => s.approved === 1).length;
            this.rejectedCount = this.suggestions.filter(s => s.approved === 0 && s.rejected).length;

            this.suggestions.forEach((suggestion) => {
              if (suggestion.station_fuel_type_id) {
                this.fetchStationFuelTypeDetails(suggestion);
              }
            });
          })
          .catch((error) => {
            console.error("Błąd pobierania zgłoszeń:", error);
          });
    },
    approveSuggestion(suggestionId) {
      axios
          .put(
              `http://localhost:8000/api/fuel-price-suggestions/${suggestionId}`,
              { approved: 1 },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
          )
          .then(() => {
            this.fetchSuggestions();
            this.approvedCount++;
          })
          .catch((error) => {
            console.error("Błąd przy zatwierdzaniu propozycji:", error.response);
          });
    },
    rejectSuggestion(suggestionId) {
      axios
          .delete(`http://localhost:8000/api/fuel-price-suggestions/${suggestionId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            this.suggestions = this.suggestions.filter(
                (suggestion) => suggestion.id !== suggestionId
            );
            this.rejectedCount++;
          })
          .catch((error) => {
            console.error("Błąd przy odrzucaniu propozycji:", error.response);
          });
    },
    fetchStationFuelTypeDetails(suggestion) {
      axios
          .get(`http://localhost:8000/api/station-fuel-types/${suggestion.station_fuel_type_id}`)
          .then((response) => {
            const { station_id, fuel_type_id } = response.data;
            this.fetchStationDetails(station_id, fuel_type_id, suggestion);
          })
          .catch((error) => {
            console.error("Błąd pobierania danych Station Fuel Type:", error);
          });
    },
    fetchStationDetails(station_id, fuel_type_id, suggestion) {
      axios
          .get(`http://localhost:8000/api/stations/${station_id}`)
          .then((response) => {
            suggestion.station_name = response.data.name;
            suggestion.station_address = response.data.address;
          })
          .catch((error) => {
            console.error("Błąd pobierania danych stacji:", error);
          });

      axios
          .get(`http://localhost:8000/api/fuel-types/${fuel_type_id}`)
          .then((response) => {
            suggestion.fuel_type_name = response.data.name;
          })
          .catch((error) => {
            console.error("Błąd pobierania danych rodzaju paliwa:", error);
          });
    },
  },
};
</script>

<style scoped>
.admin {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/tło10.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

.content-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 1600px;
  width: 95%;
}

.button-container.centered {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: 20px;
}

.table.responsive-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

.table th,
.table td {
  padding: 8px;
  border: 1px solid #ddd;
  word-wrap: break-word;
  white-space: nowrap;
  text-align: center;
}

.table th {
  background-color: #f4f4f4;
}

.thumbnail {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
}

button {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;
}

button.reject {
  background-color: red;
}
</style>
