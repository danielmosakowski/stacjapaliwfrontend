<template>
  <div>
    <!-- Sekcja tła z dużym zdjęciem -->
    <div class="hero-section">
      <div class="hero-text">
        <h1>Oszczędzajmy</h1>
        <h1>więcej.</h1>
        <h1>Razem!</h1>
        <!-- Przycisk "Nasza misja" z czarnym tłem i białym napisem -->
        <router-link to="/about#bottom" class="btn btn-black">Nasza misja</router-link>
      </div>
    </div>

    <!-- Sekcja Aktualności -->
    <div class="news-section">
      <h2>Aktualności</h2>

      <!-- Kontenery z tytułami i przyciskami -->
      <div class="news-container">
        <div v-for="(item, index) in newsItems" :key="index" class="news-card">
          <p class="date">{{ item.date }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <a :href="item.url" target="_blank" class="btn btn-secondary">Więcej</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsItems: [
        {
          title: 'Strategia Orlen 2035',
          description: 'Zapewniamy bezpieczne dostawy energii, wspierając rozwój gospodarek krajów Europy Środkowej. Współtworzymy zintegrowany system energetyczny...',
          url: 'https://www.orlen.pl/pl/o-firmie/strategia',
          date: '2 stycznia 2025'
        },
        {
          title: 'Sporty motorowe',
          description: 'Dowiedz się więcej o naszym zaangażowaniu w sporty motorowe i o tym, jak nasza współpraca z innymi zespołami pomaga nam opracowywać paliwa i środki smarne dla kierowców na całym świecie...',
          url: 'https://www.shell.pl/klienci/paliwa-oleje-i-plyny-do-chlodnic/sporty-motorowe.html',
          date: '6 stycznia 2025'
        },
        {
          title: 'Wild Bean Cafe',
          description: 'Do kolekcji Alpejskich hot dogów stworzonych przez samego Roberta Makłowicza dochodzi smakowita wege nowość! Zdajemy sobie sprawę z tego, że nasi Klienci są często mocno zapracowani i mają mało czasu. Oferujemy więc...',
          url: 'https://www.bp.com/pl_pl/poland/home/produkty_uslugi/wild_bean_cafe.html',
          date: '12 stycznia 2025'
        },
        {
          title: 'Wypożyczalnia przyczep',
          description: 'Potrzebujesz bezpiecznie załadować i przewieźć potrzebne rzeczy w dowolne miejsce? Skorzystaj z atrakcyjnej oferty naszej wypożyczalni przyczep! U nas zawsze możesz szybko, tanio i bez...',
          url: 'https://amicenergy.pl/pl/produkty-i-uslugi/wypozyczalnia-przyczep',
          date: '17 stycznia 2025'
        }
      ]
    };
  }
};
</script>


<style scoped>
/* Sekcja tła */
.hero-section {
  background-image: url('@/assets/tło3.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10%;
  text-align: right;
  position: relative;
}

.hero-text {
  position: absolute;
  top: 50%; /* Ustawienie napisu na odpowiedniej wysokości */
  left: 57%; /* Pozycjonowanie napisu w środku */
  transform: translateX(-50%); /* Przesunięcie napisu w lewo o połowę */
}

.hero-text h1 {
  color: white;
  font-size: 4rem;
  margin: 0;
  line-height: 1.2;
}

.hero-text .btn-black {
  background-color: black;
  color: white;
  padding: 10px 20px;
  font-size: 1.2rem;
  margin-top: 30px;
  text-decoration: none;
}


/* Sekcja Aktualności */
.news-section {
  padding: 50px 20px;
  background-color: #f8f9fa;
  text-align: center;
}

.news-section h2 {
  font-size: 2rem;
  margin-bottom: 30px;
}

/* Kontenery z aktualnościami */
.news-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;
}

.news-card {
  background-color: white;
  padding: 20px;
  width: 250px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.news-card .date {
  font-size: 1rem;
  color: #888;
}

.news-card h3 {
  font-size: 1.5rem;
  margin: 10px 0;
}

.news-card p {
  font-size: 1rem;
  color: #333;
  margin: 10px 0;
}

.news-card .btn {
  margin-top: 10px;
  font-size: 1rem;
  padding: 5px 15px;
  text-decoration: none;
}
</style>
