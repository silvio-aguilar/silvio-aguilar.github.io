const body = document.querySelector("body");
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".menu-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    menuBtn.onclick = ()=>{
      navbar.classList.add("show");
      menuBtn.classList.add("hide");
      body.classList.add("disabled");
    }
    cancelBtn.onclick = ()=>{
      body.classList.remove("disabled");
      navbar.classList.remove("show");
      menuBtn.classList.remove("hide");
    }
    window.onscroll = ()=>{
      this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
    }

    function incalculatorArchivo() {
      // Ruta del archivo que deseamos descargar
      var archivoURL = "./aplicaciones/incalculator.apk";
    
      // Crear un objeto URL
      var url = window.URL.createObjectURL(new Blob([archivoURL]));
    
      // Crear un enlace oculto
      var link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Incalculator.apk");
    
      // Hacer clic en el enlace oculto
      link.click();
    }

    function descargarArchivo() {
      // Ruta del archivo que deseamos descargar
      var archivoURL = "./aplicaciones/incalculator.apk";
    
      // Crear un objeto URL
      var url = window.URL.createObjectURL(new Blob([archivoURL]));
    
      // Crear un enlace oculto
      var link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Incalculator.apk");
    
      // Hacer clic en el enlace oculto
      link.click();
    }
    