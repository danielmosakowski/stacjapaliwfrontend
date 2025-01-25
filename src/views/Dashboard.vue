<template>
  <div v-if="isAuthenticated !== null" class="container">
    <!-- Pionowy pasek boczny -->
    <div class="sidebar">
      <div class="profile-info text-center">
        <img
            src="@/assets/Dominik.jpg"
            alt="Avatar"
            class="avatar img-fluid rounded-circle fadeIn">
        <h4 class="username mt-4 fw-bold fadeIn">{{ user ? user.data.name : 'Ładowanie...' }}</h4>
      </div>
      <hr class="sidebar-divider w-75 my-4">
      <nav class="sidebar-nav w-100">
        <ul class="nav flex-column w-100">
          <li class="nav-item mb-3">
            <a class="nav-link fadeIn" href="#suggestions">
              <i class="fas fa-lightbulb me-3"></i><span>Moje Sugestie Cen</span>
            </a>
          </li>
          <li class="nav-item mb-3">
            <a class="nav-link fadeIn" href="#points">
              <i class="fas fa-coins me-3"></i><span>Punkty</span>
            </a>
          </li>
          <li class="nav-item mb-3">
            <a class="nav-link fadeIn" href="#favorites">
              <i class="fas fa-star me-3"></i><span>Ulubione stacje</span>
            </a>
          </li>
          <li class="nav-item mb-3">
            <a class="nav-link fadeIn" href="#history">
              <i class="fas fa-history me-3"></i><span>Historia</span>
            </a>
          </li>
          <li class="nav-item mb-3">
            <a class="nav-link fadeIn" href="#userdata">
              <i class="fas fa-user me-3"></i><span>Moje dane</span>
            </a>
          </li>
          <li class="nav-item mb-3">
            <a class="nav-link fadeIn" href="#settings">
              <i class="fas fa-cog me-3"></i><span>Ustawienia</span>
            </a>
          </li>
          <li class="nav-item mb-3">
            <a class="nav-link fadeIn" href="#privacy">
              <i class="fas fa-shield-alt me-3"></i><span>Prywatność</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Główna zawartość strony -->
    <div class="main-content">
      <div v-if="isAuthenticated" class="row mt-3">
        <div class="col-12">
          <section id="suggestions" class="section mb-5 slideInUp">
          <div class="card mt-4" v-if="suggestions && suggestions.length > 0">
            <div class="card-header">
              <h3>Moje Sugestie Cen</h3>
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
                  <th scope="col">Zdjęcie</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="suggestion in suggestions" :key="suggestion.id">
                  <td>{{ suggestion.id }}</td>
                  <td>{{ suggestion.suggested_price }} zł</td>
                  <td>{{ suggestion.station_name }}</td>
                  <td>{{ suggestion.station_address }}</td>
                  <td>{{ suggestion.fuel_type_name }}</td>
                  <td>
                      <button
                          class="button-outline-primary"
                          @click="openModal(suggestion.photo_path)"
                      >
                        Pokaż zdjęcie
                      </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <!-- Modal do podglądu zdjęcia -->
            <div v-if="showModal" class="modal" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Podgląd Zdjęcia</h5>
                    <button type="button" class="close" @click="closeModal">&times;</button>
                  </div>
                  <div class="modal-body text-center">
                    <img :src="getImageUrl(currentPhotoPath)" alt="Zdjęcie zgłoszenia" class="img-fluid" />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Zamknij</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>
          <section id="points" class="section mb-5 slideInUp">
            <h3>Punkty</h3>
            <p>Liczba twoich punktów to: {{ user ? user.data.points_total : 0 }}!</p>
          </section>

          <section id="favorites" class="section mb-5 slideInUp">
            <h3>Ulubione stacje</h3>
            <p><strong>Stacja Paliw Falcon Legnica - Falcon Paliwa Sp. z o.o.</strong></p><br>
            <p>
              <strong>Godziny otwarcia:</strong><br><br>
              niedziela 06:00–22:00<br>
              poniedziałek 06:00–22:00<br>
              wtorek 06:00–22:00<br>
              środa 06:00–22:00<br>
              czwartek 06:00–22:00<br>
              piątek 06:00–22:00<br>
              sobota 06:00–22:00
            </p><br><br>
            <p><strong>Stacja Paliw Falcon Legnica - Falcon Paliwa Sp. z o.o.</strong></p><br>
            <p>
              <strong>Godziny otwarcia:</strong><br><br>
              niedziela 06:00–22:00<br>
              poniedziałek 06:00–22:00<br>
              wtorek 06:00–22:00<br>
              środa 06:00–22:00<br>
              czwartek 06:00–22:00<br>
              piątek 06:00–22:00<br>
              sobota 06:00–22:00
            </p>
          </section>

          <section id="history" class="section mb-5 slideInUp">
            <h3>Historia</h3>
            <p>12.12.2024 - Zaproponowanie Ceny dla stacji Falcon Legnica - Falcon Paliwa Sp. z o.o: Benzyna, 5 zł</p>
            <p>16.12.2024 - Zaproponowanie Ceny dla stacji Falcon Legnica - Falcon Paliwa Sp. z o.o: Gaz, 3 zł</p>
            <p>19.12.2024 - Zaproponowanie Ceny dla stacji Falcon Legnica - Falcon Paliwa Sp. z o.o: Benzyna, 4.9 zł</p>
            <p>24.12.2024 - Zaproponowanie Ceny dla stacji Falcon Legnica - Falcon Paliwa Sp. z o.o: Benzyna, 4.95  zł</p>
            <p>01.01.2024 - Zaproponowanie Ceny dla stacji Falcon Legnica - Falcon Paliwa Sp. z o.o: Benzyna, 5 zł</p>
            <p>11.01.2024 - Zaproponowanie Ceny dla stacji Falcon Legnica - Falcon Paliwa Sp. z o.o: Benzyna, 4.95  zł</p>
            <p>13.01.2024 - Zaproponowanie Ceny dla stacji Falcon Legnica - Falcon Paliwa Sp. z o.o: Benzyna, 5.1 zł</p>
          </section>

          <section id="userdata" class="section mb-5 slideInUp">
            <h3>Moje dane</h3>
            <table class="table table-bordered" v-if="user">
              <thead class="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Login</th>
                <th scope="col">Email</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{ user.data.id }}</td>
                <td>{{ user.data.name }}</td>
                <td>{{ user.data.email }}</td>
              </tr>
              </tbody>
            </table>
          </section>

          <section id="settings" class="section mb-5 slideInUp">
            <h3>Ustawienia</h3>
            <label for="notifications">Powiadomienia  </label>
            <select id="notifications" class="form-select">
              <option value="" selected>Wybierz</option>
              <option value="on">Włącz</option>
              <option value="off">Wyłącz</option>
            </select>
            <br>
            <label for="language" class="mt-4">Wybierz język  </label>
            <select id="language" class="form-select">
              <option value="" selected>Wybierz</option>
              <option value="pl">Polski</option>
              <option value="en">Angielski</option>
            </select>
          </section>

          <section id="privacy" class="section mb-5 slideInUp">
            <h3>Prywatność</h3>
            <p><input type="checkbox"> Akceptuję regulamin</p>
            <p><input type="checkbox"> Chcę otrzymywać informacje marketingowe</p>
            <p><input type="checkbox"> Zgadzam się na personalizowane reklamy </p>
          </section>
        </div>
      </div>

      <div v-else>
        <p>Proszę się zalogować, aby zobaczyć swoje dane.</p>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
      suggestions: [],
      showModal: false,
      currentPhotoPath: null,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  mounted() {
    if (this.isAuthenticated === null) {
      this.$store.dispatch("checkUserAuthenticationStatus");
    }
    this.getUserDetails();
    this.fetchSuggestions(); // Pobranie zgłoszeń przy załadowaniu komponentu
  },
  methods: {
    openModal(photoPath) {
      this.currentPhotoPath = photoPath;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentPhotoPath = null;
    },
    getImageUrl(photoPath) {
      // Generowanie pełnej ścieżki do zdjęcia
      return `http://localhost:8000/storage/${photoPath}`;
    },
    viewPhoto(photoPath) {
      // Otwieranie zdjęcia w nowym oknie
      const imageUrl = this.getImageUrl(photoPath);
      window.open(imageUrl, "_blank");
    },
    getUserDetails() {
      axios
          .get("http://localhost:8000/api/userprofile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            this.user = response.data;
            this.fetchSuggestions();
          })
          .catch((error) => {
            console.error("Błąd pobierania danych użytkownika:", error);
          });
    },
    // Pobieranie listy zgłoszeń
    fetchSuggestions() {
      axios
          .get("http://localhost:8000/api/fuel-price-suggestions", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            this.suggestions = response.data; // Zapisanie zgłoszeń
            console.log("Sugestie cen:", this.suggestions);

            // Ustawienie liczby zaakceptowanych zgłoszeń
            this.approvedCount = this.suggestions.filter(
                (suggestion) => suggestion.approved === 1
            ).length;
            this.rejectedCount = this.suggestions.filter(
                (suggestion) => suggestion.approved === 0 && suggestion.rejected
            ).length;

            // Pobieranie szczegółów stacji i paliw
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
    // Pobieranie szczegółów użytkownika po user_id
    fetchUserDetails(suggestion) {
      axios
          .get(`http://localhost:8000/api/users/${suggestion.user_id}`)
          .then((response) => {
            console.log("Dane użytkownika:", response.data);  // Logowanie odpowiedzi API
            this.$set(suggestion, 'user', response.data);  // Zapewnia reaktywność
          })
          .catch((error) => {
            console.error("Błąd pobierania danych użytkownika:", error);
          });
    },

    // Pobieranie szczegółów Station Fuel Type
    fetchStationFuelTypeDetails(suggestion) {
      axios
          .get(`http://localhost:8000/api/station-fuel-types/${suggestion.station_fuel_type_id}`)
          .then((response) => {
            console.log("Station Fuel Type details:", response.data);
            const { station_id, fuel_type_id } = response.data;

            // Pobieranie danych stacji i rodzaju paliwa
            this.fetchStationDetails(station_id, fuel_type_id, suggestion);
          })
          .catch((error) => {
            console.error("Błąd pobierania danych Station Fuel Type:", error);
          });
    },

    // Pobieranie szczegółów stacji i rodzaju paliwa
    fetchStationDetails(station_id, fuel_type_id, suggestion) {
      // Pobranie danych stacji
      axios
          .get(`http://localhost:8000/api/stations/${station_id}`)
          .then((response) => {
            suggestion.station_name = response.data.name; // Zapisanie nazwy stacji
            suggestion.station_address = response.data.address; // Zapisanie adresu stacji
          })
          .catch((error) => {
            console.error("Błąd pobierania danych stacji:", error);
          });

      // Pobranie danych rodzaju paliwa
      axios
          .get(`http://localhost:8000/api/fuel-types/${fuel_type_id}`)
          .then((response) => {
            suggestion.fuel_type_name = response.data.name; // Zapisanie nazwy paliwa
          })
          .catch((error) => {
            console.error("Błąd pobierania danych rodzaju paliwa:", error);
          });
    },


  },
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.container {
  display: flex;
  min-height: 100vh;
  flex-direction: row;
}

.sidebar {
  background-color: #808000;
  color: #ecf0f1;
  position: sticky;
  top: 0;
  height: 116vh;
  padding-top: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sidebar:hover {
  transform: scale(1);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
}

.profile-info {
  margin-bottom: 30px;
  opacity: 0;
  animation: fadeIn 1s forwards;
}

.profile-info .avatar {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #ecf0f1;
  transition: transform 0.3s ease;
}

.profile-info .avatar:hover {
  transform: scale(1.1);
}

.profile-info .username {
  margin-top: 15px;
  font-size: 1.5rem;
  text-align: center;
  transition: color 0.3s ease;
}

.profile-info .username:hover {
  color: #f39c12;
}

.sidebar-divider {
  margin-bottom: 2rem;
  border-color: rgba(236, 240, 241, 0.5);
}

.sidebar-nav .nav-link {
  margin-top: 2rem;
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.sidebar-nav .nav-link:hover {
  background-color: rgba(35, 34, 34, 0.65);
  transform: translateX(5px);
}

.main-content {
  padding: 20px;
  flex-grow: 1;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadeIn 1s 0.5s forwards;
}

.section {
  margin-top: 2rem;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #808000;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.section:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.section h3 {
  font-size: 1.8rem;
  color: #34495e;
  font-weight: bold;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.section p,
.section table {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #7f8c8d;
}

.section strong {
  color: #2c3e50;
}

.table-bordered {
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.table tbody td,
.table thead th {
  padding: 15px;
  border: 1px solid #ddd;
}

.table tbody tr:last-child td {
  border-bottom: 1px solid #ddd;
}

.table-dark {
  background-color: #808000;
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.table tbody td,
.table thead th {
  border-radius: 8px;
}

.table tbody tr:last-child td {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.form-select {
  width: 200px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.form-select:hover {
  background-color: #f0f0f0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7); /* Dark background */
  z-index: 1050;
}

.modal-dialog {
  max-width: 600px;
  width: 90%;
}

.modal-content {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.modal-body img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.modal-title {
  font-size: 1.25rem;
  color: #333;
}

.close {
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.modal-footer button {
  background-color: #808000;
  border: none;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.modal-footer button:hover {
  background-color: #6c6e00;
}
.button-outline-primary {
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #6c6e00;
  background-color: transparent;
  border: 2px solid #6c6e00;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.button-outline-primary:hover {
  background-color: #6c6e00;
  color: #fff;
  border-color: #6c6e00;
  transform: scale(1.05);
}

.button-outline-primary:focus {
  outline: none;
}
</style>

