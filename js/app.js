// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Trigger when click 'Add to cart'
     listaCursos.addEventListener('click', agregarCurso);

     //Delete item from cart
     carrito.addEventListener('click', eliminarCurso);

     // To empty cart
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




// Functions
// Add item to cart
function agregarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Read data for course selected
          leerDatosCurso(curso);
     }
}

function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     carritoHTML();
}

// Delete course from cart
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          const cursoId = e.target.getAttribute('data-id')
          
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Show courses in the cart
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}

function vaciarCarrito() {

     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}
