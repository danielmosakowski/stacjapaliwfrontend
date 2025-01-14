export function navbarAnimation() {
    const navbarItems = document.querySelectorAll('.navbar-collapse .navbar-nav li');
    const horiSelector = document.querySelector('.hori-selector');

    if (navbarItems.length && horiSelector) {
        const activeItem = document.querySelector('.navbar-collapse .active');
        if (activeItem) {
            const activeWidth = activeItem.offsetWidth;
            const activeHeight = activeItem.offsetHeight;
            const itemPos = activeItem.getBoundingClientRect();

            // Ustawienia pozycji i rozmiaru dla animacji
            horiSelector.style.top = `${itemPos.top}px`;
            horiSelector.style.left = `${itemPos.left}px`;
            horiSelector.style.height = `${activeHeight}px`;
            horiSelector.style.width = `${activeWidth}px`;
        }
    }
}

export function navbarToggle() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        // Kliknięcie przycisku hamburgera
        navbarToggler.addEventListener('click', (e) => {
            navbarCollapse.classList.toggle('show');
            setTimeout(() => {
                navbarAnimation();
            }, 300);

            // Zatrzymaj propagację zdarzenia kliknięcia
            e.stopPropagation();
        });

        // Kliknięcie poza menu zamyka rozwiniętą listę
        document.addEventListener('click', (e) => {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });

        // Kliknięcie wewnątrz menu nie zamyka listy
        navbarCollapse.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Funkcja aktywująca klasę 'active' na klikniętym elemencie menu
export function activateLink() {
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Usuń klasę 'active' ze wszystkich elementów
            navLinks.forEach(link => link.classList.remove('active'));
            // Dodaj klasę 'active' do klikniętego linku
            this.classList.add('active');
        });
    });
}

// Wywołania funkcji na odpowiednich zdarzeniach
document.addEventListener('DOMContentLoaded', () => {
    navbarAnimation(); // Wywołanie animacji po załadowaniu strony
    navbarToggle(); // Aktywacja toggle menu
    activateLink(); // Aktywacja linków w rozwijanym menu
});

window.addEventListener('resize', () => {
    // Przebudowanie animacji przy zmianie rozmiaru okna
    setTimeout(() => {
        navbarAnimation();
    }, 500);
});
