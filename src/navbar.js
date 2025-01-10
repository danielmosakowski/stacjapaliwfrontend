// navbar.js

export function navbarAnimation() {
    const navbarItems = document.querySelectorAll('#navbarSupportedContent ul li');
    const horiSelector = document.querySelector('.hori-selector');

    // Jeśli elementy istnieją
    if (navbarItems.length && horiSelector) {
        const activeItem = document.querySelector('#navbarSupportedContent .active');
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
        navbarToggler.addEventListener('click', () => {
            // Toggle the collapse class on click
            navbarCollapse.classList.toggle('show');
            setTimeout(() => {
                navbarAnimation();
            }, 300);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    navbarAnimation(); // Wywołanie animacji po załadowaniu strony
    navbarToggle(); // Aktywacja toggle menu
});

window.addEventListener('resize', () => {
    // Przebudowanie animacji przy zmianie rozmiaru okna
    setTimeout(() => {
        navbarAnimation();
    }, 500);
});
