<template>
  <main class="about-us">
    <div class="container">
      <div class="about-container">
        <h1>O nas</h1>
        <p class="skreslony">Chcemy dostać 5 z projektu.</p>
        <p class="description">
          Jesteśmy pasjonatami nowych technologii i innowacji, tworzymy rozwiązania, które zmieniają sposób, w jaki ludzie korzystają z usług.
        </p>
        <p class="description_small"> Tak naprawde to chcemy dostać 5 i nie pisać egzaminu!</p>
        <hr class="divider">

        <div class="team-section">
          <h2 class="team-title">Nasz zespół</h2>
          <div class="team-members">
            <div class="team-member">
              <img src="@/assets/Andrzej.jpg" alt="Członek Zespołu" class="team-photo" />
              <h3>Andrzej Czabajski</h3>
              <p><b>Leader / Project Manager / Tester</b></p><br>
              <p>Pracownik Samorządowy na co dzień zatrudniony w Wydziale Aktywności Lokalnej i Promocji Miasta Legnicy.
                Absolwent Uniwersytetu Wrocławskiego na kierunku Administracja. W 2022 roku rozpoczął studia na Collegium Witelona
                na kierunku Informatyka, gdzie ma nadzieję obronić pracę inżynierską i spełnić swoje marzenie. Na co dzień pasjonat
                i instruktor jazdy na rolkach oraz łyżwach. Kocha gry wideo. Powiadają, że gdyby w latach 90 dokończył kurs html w pajączku
                to dzisiaj byłby guru tworzenia stron internetowych.
              </p>
            </div>
            <div class="team-member">
              <img src="@/assets/Daniel.jpg" alt="Członek Zespołu" class="team-photo" />
              <h3>Daniel Mosakowski</h3>
              <p><b>Frontend / Backend - Lead Developer</b></p><br>
              <p>Student informatyki interesujący się programowaniem aplikacji mobilnych. W wolnym czasie lubi biegać i jeździć na rowerze.</p>
            </div>
            <div class="team-member">
              <img src="@/assets/Dominik.jpg" alt="Członek Zespołu" class="team-photo" />
              <h3>Dominik Kamiński</h3>
              <p><b>Frontend</b></p><br>
              <p>Początkujący programista, który wciąż szuka swojego kierunku na ścieżce zawodowej, aktualnie student 3 roku w Collegium Witelona
                na kierunku informatycznym. W wolnym czasie pasjonat szachów, książek o tematyce samorozwoju i siłowni.</p>
            </div>
            <div class="team-member">
              <img src="@/assets/Przemek.jpg" alt="Członek Zespołu" class="team-photo" />
              <h3>Przemysław Typa</h3>
              <p><b>Backend</b></p><br>
              <p>Student informatyki z niewielkim, ale rosnącym doświadczeniem w programowaniu w języku Java oraz w pracy z systemem kontroli wersji Git/GitHub. Hobby: szachy i bieganie.
              </p>
            </div>
          </div>
        </div>

        <hr class="divider">

        <h2 class="team-title">Nasza misja</h2>
        <p>
          Naszym celem jest stworzenie porównywarki cen paliw. Aplikacji umożliwiającej użytkownikom przeglądanie listy oraz mapy stacji paliwowych z
          filtrami według m.in. marki, rodzaju paliwa i ceny. Użytkownicy mogą zgłaszać ceny paliw a administratorzy zarządzają użytkownikami, stacjami
          oraz zgłoszonymi cenami. Aplikacja umożliwia nagradzanie użytkowników dodatkowymi punktami.
        </p><br><br>

      </div>
    </div>
  </main>
</template>

<style scoped>
.about-us {
  padding: 20px;
  background-image: url('@/assets/tło2.jpg'); /* Zmienione tło na tło18.jpg */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.about-container {
  background-color: rgba(0, 0, 0, 0.5); /* Ciemne półprzezroczyste tło */
  padding: 40px;
  border-radius: 8px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  text-align: center;
  color: #fff;
}

.skreslony {
  text-decoration: line-through;
  color: red;
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
}

.description {
  font-size: 18px;
  text-align: center;
  margin: 20px 0;
  color: #fff;
}

.description_small {
  font-size: 8px;
  text-align: center;
  margin: 20px 0;
  color: #fff;
}

.divider {
  border: 0;
  border-top: 2px solid black;
  margin: 40px 0;
}

.team-section {
  margin-top: 40px;
}

.team-title {
  text-align: center;
  margin-bottom: 60px;
}

.team-members {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.team-member {
  text-align: center;
  flex: 1 1 calc(50% - 20px);
  max-width: calc(50% - 20px);
  margin-bottom: 40px;
}

.team-member h3 {
  color: #fff;
}

.team-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.mission-section {
  margin-top: 40px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.mission-section h2 {
  color: #333;
}

.mission-section p {
  color: #555;
}
</style>
