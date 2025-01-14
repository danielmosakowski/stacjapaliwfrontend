<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-custom navbar-mainbg">
        <RouterLink class="navbar-brand navbar-logo" to="/">
          <img src="@/assets/wacha.png" alt="Wacha Logo" class="navbar-logo-img" />
        </RouterLink>
        <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars text-white"></i>
        </button>
        <!-- Wyskakujące menu -->
        <div class="navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/" active-class="active-link"><i class="fas fa-home"></i>Strona Główna</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/list-of-stations" active-class="active-link"><i class="fas fa-building"></i>Lista Stacji</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/login" active-class="active-link"><i class="fas fa-sign-in-alt"></i>Logowanie</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/register" active-class="active-link"><i class="fas fa-user-plus"></i>Rejestracja</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/contact" active-class="active-link"><i class="fas fa-phone"></i>Kontakt</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about" active-class="active-link"><i class="fas fa-info-circle"></i>O nas</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />

  <!-- Stopka -->
  <footer class="footer">
    <div class="footer-left">
      <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
      <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="https://youtube.com" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
    </div>
    <div class="footer-center">
      <img src="@/assets/wacha.png" alt="Wacha Logo" />
    </div>
    <div class="footer-right">
      <div>Wacha</div>
      <div>©2025 Wacha</div>
      <div>No Money, No Gas</div>
    </div>
  </footer>

</template>