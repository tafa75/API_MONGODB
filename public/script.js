

//Este evento me busca las paginas de la API
let pelis = document.getElementById("Buscar");
pelis.addEventListener("click", () => {
  let inputPelis = document.getElementById("Titulos").value;
  
  let urlNueva = "/movies/" + inputPelis
  
  location.replace(urlNueva)
})

function redireccionar() {
  let peli = document.getElementById("peticion");
  console.log(peli.value);
  location.replace("/film/" + peli.value);
}
if (document.getElementById("boton") != null)
  document.getElementById("boton").addEventListener("click", redireccionar);

function redireccionar2() {
  location.replace("/formulario");
}
if (document.getElementById("boton2") != null)
  document.getElementById("boton2").addEventListener("click", redireccionar2);



// Este funcion te REDIRIGE para que vayas a los detalles
function detalleMovie(Titulo) {
  let urlDetalle = `/films/detalle/${Titulo}`
  location.replace(urlDetalle);
  
}

//Esta función te BORRA un documento de la BD. Utilizando un POST "falso"
function borrarMovie(Titulo) {
  borrarPeli = {
    "Titulo": Titulo,
  }

  fetch('/films/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(borrarPeli)
  })
    .then((respuesta) => {
      console.log("Se ha borrado con éxito")
      console.log(respuesta)
      location.replace("/")
    })
    .catch((e) => {
      console.log("error" + e)
    });

}


// ESTE evento te REDIRIGE a la pagina de EDITAR. 
function editarMovies(Titulo) {
  let urlDetalle = `/films/edit/${Titulo}`
  location.replace(urlDetalle);
}
