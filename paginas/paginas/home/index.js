function showModal(cardId) {
  var modal = document.getElementById("myModal");
  var modalText = document.getElementById("modalText");
  modal.style.display = "block";
  switch(cardId) {
      case 'trilogia':
          modalText.innerHTML = "<h2>La Trilogía de Build Up</h2><p>En el vibrante mundo de la música, donde los sonidos se convierten en emociones y las melodías en historias, surge una combinación única de tradición y vanguardia...</p>";
          break;
      case 'objetivo':
          modalText.innerHTML = "<h2>Nuestro objetivo</h2><p>Nuestro objetivo como hogar es acompañarte en nuestra comunidad para que sepas aprovechar al máximo tanto tus capacidades personales, como las oportunidades que te brinda el exterior...</p>";
          break;
      case 'desarrollo':
          modalText.innerHTML = "<h2>Desarrollo</h2><p>Hemos desarrollado una combinación única, ofreciendo varios espacios de crecimiento y visibilidad en constante expansión y con oportunidad de implantar mejoras fácilmente, donde lo fusionamos todo...</p>";
          break;
      case 'programas':
          modalText.innerHTML = "<h2>Programas educativos</h2><p>Desarrollamos también programas educativos diseñados con nuestro propio método pedagógico para todas las edades y niveles de habilidad...</p>";
          break;
      case 'equipo':
          modalText.innerHTML = "<h2>Equipo</h2><p>Respaldados por un equipo de profesionales altamente cualificados y una infraestructura moderna, equipada y configurada con la última tecnología...</p>";
          break;
      default:
          modalText.innerHTML = "";
  }
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
