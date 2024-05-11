// JavaScript para manejar el evento de clic en el botón del menú
document.getElementById('toggle-menu').addEventListener('click', function() {
    var navbarSearch = document.getElementById('navbar-search');
    if (navbarSearch.style.display === 'block') {
        navbarSearch.style.display = 'none';
    } else {
        navbarSearch.style.display = 'block';
    }
});




