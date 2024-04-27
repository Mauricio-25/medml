
// ! COLOCAR LAS CLASES A LAS ETIQUETAS

const tags = document.querySelectorAll("body *");

for(let tag of tags) {
    let classTag = tag.className;
    let tagFather;

    if (classTag.includes("&")) {

        let nameClassFather = tag.parentNode.className;
        tagFather = tag;

        // * BLOQUES

        while (nameClassFather.includes("__") || nameClassFather == "") {
            tagFather = tagFather.parentNode;
            nameClassFather = tagFather.parentNode.className;
        }

        classTag = classTag.replace(/&/g, nameClassFather);

        // * ELEMENTOS
    }

    if (classTag.includes("$")) {
        tagFather = tag.parentNode;
        let nameClassSibling;


        for (let i=0; i<tagFather.children.length; i++) {
            
            if(!tagFather.children[i].className.includes('$')) {
                nameClassSibling = getElement(tagFather.children[i].className);
                break;
            }
            
            
        }

        classTag = classTag.replace(/\$/g, nameClassSibling);

    }
    tag.setAttribute("class", classTag);
}



function getElement(cadena) {
    // Buscar la posición del doble guion bajo
    const indiceDobleGuionBajo = cadena.indexOf("__");

    // Si se encuentra "__", devolver la parte después de eso, de lo contrario, devolver la cadena original
    return indiceDobleGuionBajo !== -1 ? cadena.substring(indiceDobleGuionBajo + 2) : cadena;
}






// ! INITIALIZATION OF AOS

AOS.init();

window.addEventListener('scroll', function() {
    // Verificar si elemento usuario está desplazándose hacia arriba
    if (this.oldScroll > this.scrollY) {
      // Restablecer la animación
      document.querySelectorAll('[data-aos]').forEach(function(elemento) {
        elemento.setAttribute('data-aos', elemento.getAttribute('data-aos'));
        elemento.setAttribute('data-aos-duration', '400');
      });
    }
    this.oldScroll = this.scrollY;
});






// ! HEADER


const headerLanguage = document.querySelector(".header__language");

headerLanguage.addEventListener("click", ()=>{
    // Abrir el combobox y cerrarlo cuando seleccione una opcion
    headerLanguage.children[1].classList.toggle("header__collapse--open")
})

document.addEventListener("click", (event) => {
    // Verificar si el clic fue fuera del combobox
    if (!headerLanguage.contains(event.target)) {
        // Cerrar el combobox
        headerLanguage.children[1].classList.remove("header__collapse--open");
    }
});



//! CARRUSEL CUSTOMERS 2

document.addEventListener( 'DOMContentLoaded', function() {
    let splide2 = new Splide( '.customers2 .splide', {
      type   : 'loop',
      perPage: 3,
      perMove: 3,
      omitEnd: false,
      classes: {
        pagination: 'splide__pagination',
        page      : 'splide__pagination__page',
      },
    } );
    
    splide2.mount();


} );


    
// ! MODIFICAR EL EMENNTO SIGUIENTE Y ANTERIOR CUANDO SE HACE HOVER

document.addEventListener( 'DOMContentLoaded', function() {
const slides = document.querySelectorAll('.splide__slide');

slides.forEach(function(slide) {
    slide.addEventListener('mouseover', function() {
        highlightSiblings(this);
    });

    slide.addEventListener('mouseout', function() {
        removeHighlight();
    });
});

function highlightSiblings(element) {
    let siblings = document.querySelectorAll('.splide__slide');
    let currentIndex = Array.prototype.indexOf.call(siblings, element);
        
    if (currentIndex > 0) {
        siblings[currentIndex - 1].classList.add('highlight');
    }
        
    if (currentIndex < siblings.length - 1) {
        siblings[currentIndex + 1].classList.add('highlight');
    }
}

function removeHighlight() {
    let siblings = document.querySelectorAll('.splide__slide');
        
    siblings.forEach(function(sibling) {
        sibling.classList.remove('highlight');
    });
}

})