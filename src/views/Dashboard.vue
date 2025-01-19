<template>
  <div v-if="isAuthenticated !== null">
    <div v-if="isAuthenticated">
      <div class="container">
        <div class="row">
          <div class="col-12 mt-5">
            <div class="card">
              <p v-if="user" class="card-text">Witaj, {{ user.data.name }}!</p>
              <div class="card-header">
                <h3>Twoje Dane</h3>
              </div>
              <div class="card-body">
                <!-- Tabela z danymi użytkownika -->
                <table class="table table-bordered" v-if="user">
                  <thead class="table-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Login</th>
                    <th scope="col">Email</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="user">
                    <td>{{ user.data.id }}</td>
                    <td>{{ user.data.name }}</td>
                    <td>{{ user.data.email }}</td>
                  </tr>
                  </tbody>
                </table>
                <p v-if="user" class="card-text">Liczba twoich punktów to: {{ user.data.points_total }}!</p>
              </div>
            </div>

            <!-- Tabela z nagrodami -->
            <div class="card mt-4" v-if="suggestions && suggestions.length > 0">
              <div class="card-header">
                <h3>Twoje Sugestie Cen</h3>
              </div>
              <div class="card-body">
                <table class="table table-bordered">
                  <thead class="table-dark">
                  <tr>
                    <th scope="col">ID Zgłoszenia</th>
                    <th scope="col">Cena sugerowana</th>
                    <th scope="col">Nazwa Stacji</th>
                    <th scope="col">Adres Stacji</th>
                    <th scope="col">Rodzaj Paliwa</th>
                    <th scope="col">Ścieżka zdjęcia</th>
                    <th scope="col">Data</th>
                    <th scope="col">Status zatwierdzenia</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="suggestion in suggestions" :key="suggestion.id">
                    <td>{{ suggestion.id }}</td>
                    <td>{{ suggestion.suggested_price }}</td>
                    <td>{{ suggestion.station_name || 'Ładowanie...' }}</td>
                    <td>{{ suggestion.station_address || 'Ładowanie...' }}</td>
                    <td>{{ suggestion.fuel_type_name || 'Ładowanie...' }}</td>
                    <td>{{ suggestion.photo_path }}</td>
                    <td>{{ suggestion.price_date }}</td>
                    <td>{{ suggestion.approved ? 'Zatwierdzone' : 'Oczekuje' }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Proszę się zalogować, aby zobaczyć swoje dane.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null, // Dane użytkownika
      suggestions: [], // Sugestie użytkownika
    };
  },

  computed: {
    // Sprawdzenie, czy użytkownik jest zalogowany
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },

  mounted() {
    if (this.isAuthenticated === null) {
      this.$store.dispatch("checkUserAuthenticationStatus"); // Wywołanie akcji sprawdzającej status logowania
    }
    this.getUserDetails(); // Pobranie danych użytkownika
  },

  methods: {
    // Funkcja do pobierania danych użytkownika
    getUserDetails() {
      axios
          .get("http://localhost:8000/api/userprofile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Dodanie tokenu autoryzacji
            },
          })
          .then((response) => {
            this.user = response.data; // Zapisanie danych użytkownika
            console.log("User details:", this.user);
            this.fetchSuggestions(); // Po załadowaniu użytkownika, pobierz jego sugestie
          })
          .catch((error) => {
            console.error("Błąd pobierania danych użytkownika:", error);
          });
    },

    // Funkcja do pobierania nagród użytkownika
    fetchSuggestions() {
      if (this.user && this.user.data.id) {
        const userId = this.user.data.id; // Pobranie ID użytkownika
        console.log("userId:", userId);
        axios
            .get(`http://localhost:8000/api/fuel-price-suggestions/user/${userId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Dodanie tokenu autoryzacji
              },
            })
            .then((response) => {
              console.log("Sugestie użytkownika:", response.data);
              this.suggestions = response.data;
              this.suggestions.forEach((suggestion) => {
                if (suggestion.station_fuel_type_id) {
                  this.fetchStationFuelTypeDetails(suggestion);
                }
              });
            })
            .catch((error) => {
              console.error("Błąd pobierania sugestii użytkownika:", error);
            });
      }
    },

    // Funkcja do pobierania szczegółów Station Fuel Type
    fetchStationFuelTypeDetails(suggestion) {
      axios
          .get(`http://localhost:8000/api/station-fuel-types/${suggestion.station_fuel_type_id}`)
          .then((response) => {
            console.log("Station Fuel Type details:", response.data);
            const { station_id, fuel_type_id } = response.data;

            // Pobranie danych stacji i rodzaju paliwa
            this.fetchStationDetails(station_id, fuel_type_id, suggestion);
          })
          .catch((error) => {
            console.error("Błąd pobierania danych Station Fuel Type:", error);
          });
    },

    // Pobieranie szczegółów stacji i rodzaju paliwa
    fetchStationDetails(station_id, fuel_type_id, suggestion) {
      // Pobranie danych stacji
      axios.get(`http://localhost:8000/api/stations/${station_id}`)
          .then(response => {
            suggestion.station_name = response.data.name; // Zapisanie nazwy stacji
            suggestion.station_address = response.data.address; // Zapisanie adresu stacji
          })
          .catch(error => {
            console.error("Błąd pobierania danych stacji:", error);
          });

      // Pobranie danych typu paliwa
      axios.get(`http://localhost:8000/api/fuel-types/${fuel_type_id}`)
          .then(response => {
            suggestion.fuel_type_name = response.data.name; // Zapisanie nazwy paliwa
          })
          .catch(error => {
            console.error("Błąd pobierania danych typu paliwa:", error);
          });
    },
  },
};
</script>
<style scoped>
.custom-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f1f1f1;
  border-radius: 8px 8px 0 0;
}

.card-body {
  padding: 20px;
}

.card-text {
  font-size: 16px;
  color: #555;
}
</style>