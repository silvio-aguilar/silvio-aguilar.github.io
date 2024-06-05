// JavaScript para manejar el evento de clic en el botón del menú
document.getElementById('toggle-menu').addEventListener('click', function() {
    var navbarSearch = document.getElementById('navbar-search');
    if (navbarSearch.style.display === 'block') {
        navbarSearch.style.display = 'none';
    } else {
        navbarSearch.style.display = 'block';
    }
});




// Script para manejar el cambio de tema
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Cambiar los iconos dependiendo del tema actual
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', () => {
  // Alternar iconos
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  // Si el modo oscuro está activado, desactívalo, de lo contrario, actívalo
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
});