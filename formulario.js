// Seleccionamos el formulario por su id "form"
var formulario = document.querySelector("#form");

// Asignamos un manejador para el evento submit del formulario
formulario.onsubmit = function(e) {
  e.preventDefault(); // Evita que el formulario se envíe y recargue la página

  // Obtenemos los elementos del formulario por su atributo "name"
  var n = formulario.elements["name"];
  var edadInput = formulario.elements["age"];
  var na = formulario.elements["nationality"];

  // Guardamos los valores ingresados
  var nombre = n.value;
  var edad = parseInt(edadInput.value); // Convertimos a número entero
  var nacionalidad = na.options[na.selectedIndex].value;

  // Limpiamos clases de error anteriores para evitar que se acumulen
  n.classList.remove("error");
  edadInput.classList.remove("error");

  // Validamos que el nombre no esté vacío
  if (nombre.length === 0) {
    n.classList.add("error"); // Añadimos clase error si está vacío
  }
  // Validamos que la edad sea un número y esté en el rango 18-120
  if (isNaN(edad) || edad < 18 || edad > 120) {
    edadInput.classList.add("error"); // Añadimos clase error si la edad es inválida
  }

  // Si ambos campos son válidos, agregamos el invitado a la lista
  if (nombre.length > 0 && !isNaN(edad) && edad >= 18 && edad <= 120) {
    agregarInvitado(nombre, edad, nacionalidad);
    formulario.reset(); // Limpiamos el formulario para nuevos datos
  }
}

// Función que agrega un invitado a la lista en pantalla
function agregarInvitado(nombre, edad, nacionalidad) {
  // Diccionario para traducir el código de nacionalidad a texto completo
  var nacionalidadTexto = {
    ar: "Argentina",
    mx: "Mexicana",
    vnzl: "Venezolana",
    per: "Peruana"
  };

  // Seleccionamos el contenedor donde aparecerán los invitados
  var lista = document.getElementById("lista-de-invitados");

  // Creamos un div para agrupar los datos del invitado
  var elementoLista = document.createElement("div");
  elementoLista.classList.add("elemento-lista"); // Agregamos clase para estilo

  // Función auxiliar para crear label + input + salto de línea para cada dato
  function crearElemento(descripcion, valor) {
    var span = document.createElement("span"); // Label con texto (ej. "Nombre: ")
    var input = document.createElement("input"); // Input con valor editable
    var br = document.createElement("br"); // Salto de línea para separar

    span.textContent = descripcion + ": "; // Texto del label
    input.value = valor; // Valor dentro del input
    elementoLista.appendChild(span); // Agregar label al contenedor
    elementoLista.appendChild(input); // Agregar input al contenedor
    elementoLista.appendChild(br);   // Agregar salto de línea
  }

  // Usamos la función auxiliar para crear cada campo
  crearElemento("Nombre", nombre);
  crearElemento("Edad", edad);
  crearElemento("Nacionalidad", nacionalidadTexto[nacionalidad]);

  // Creamos un botón para eliminar este invitado de la lista
  var botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Eliminar invitado";

  // Evento para borrar el div completo cuando se clickea el botón
  botonBorrar.onclick = function() {
    elementoLista.remove();
  }

  // Agregamos el botón al contenedor del invitado
  elementoLista.appendChild(botonBorrar);
  // Finalmente agregamos el contenedor al listado visible en la página
  lista.appendChild(elementoLista);
}
