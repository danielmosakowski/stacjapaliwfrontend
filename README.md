# Sklep Komputerowy

**Stacja paliw frontend** to aplikacja umożliwiająca użytkownikom przeglądanie listy oraz mapy stacji paliwowych z filtrami według m.in. marki, rodzaju paliwa i ceny. Użytkownicy mogą zgłaszać ceny paliw a administratorzy zarządzają użytkownikami, stacjami oraz zgłoszonymi cenami. Aplikacja umożliwia nagradzanie użytkowników dodatkowymi punktami.

---

## Wymagania

Aby uruchomić projekt lokalnie, potrzebujesz następujących programów i wersji:

- **Node.js**: 22.12.0  
  [Pobierz Node.js](https://nodejs.org/)

- **NPM**: 10.9.0 (zainstalowane razem z Node.js)

---

## Instalacja i uruchomienie

Wykonaj poniższe kroki, aby zainstalować i uruchomić projekt lokalnie:

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/danielmosakowski/stacjapaliwfrontend
cd stacjapaliwfrontend
```

### 2. Instalacja zależności frontendowych
```bash
npm install
```

### 3. Budowanie zasobów frontendowych

Dla środowiska developerskiego:
```bash
npm run dev
```

Lub dla środowiska produkcyjnego:
```bash
npm run build
```

Aplikacja będzie dostępna pod adresem:
```
http://localhost:5173/
```
