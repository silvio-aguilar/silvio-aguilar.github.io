const diorama = document.getElementById('diorama');
const moveableElement = document.getElementById('moveableElement');
const moveSpeed = 100; // Velocidad de movimiento

diorama.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    const dioramaWidth = diorama.offsetWidth;
    const dioramaHeight = diorama.offsetHeight;

    const centerX = dioramaWidth / 2;
    const centerY = dioramaHeight / 2;

    const moveX = (centerX - mouseX) * moveSpeed / dioramaWidth;
    const moveY = (centerY - mouseY) * moveSpeed / dioramaHeight;

    moveableElement.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
});


// MENÚ

// const menuToggle = document.getElementById('menuToggle');
// const menuItems = document.getElementById('menuItems');

// let menuOpen = false;

// menuToggle.addEventListener('click', () => {
//     menuOpen = !menuOpen;
//     if (menuOpen) {
//         menuItems.style.display = 'block';
//         menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Cambia el icono a X
//         arrangeMenuItems();
//     } else {
//         menuItems.style.display = 'none';
//         menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Cambia el icono a menú
//     }
// });

// function arrangeMenuItems() {
//     const menuItemElements = document.querySelectorAll('.menu-item');
//     const menuToggleRect = menuToggle.getBoundingClientRect();
//     const menuToggleCenterX = menuToggleRect.left + menuToggleRect.width / 2;
//     const menuToggleCenterY = menuToggleRect.top + menuToggleRect.height / 2;
//     const radius = 100; // Radio del círculo

//     let angleStep = (2 * Math.PI) / menuItemElements.length;
//     let angle = 0;

//     menuItemElements.forEach((menuItem) => {
//         const menuItemRect = menuItem.getBoundingClientRect();
//         const menuItemWidth = menuItemRect.width;
//         const menuItemHeight = menuItemRect.height;

//         const x = menuToggleCenterX + radius * Math.cos(angle) - menuItemWidth / 2;
//         const y = menuToggleCenterY + radius * Math.sin(angle) - menuItemHeight / 2;
        
//         menuItem.style.left = `${x}px`;
//         menuItem.style.top = `${y}px`;

//         angle += angleStep;
//     });
// }



