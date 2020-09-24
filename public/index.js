let arr2 = [];
document.getElementById("boton3").addEventListener("click", guardar);

function home() {
  location.replace("/");
}

document.getElementById("botonHome").addEventListener("click", home);
let nuevaPelicula2 = {
  Title: document.getElementsByTagName("h1")[0].innerText,
  Year: document.getElementsByTagName("h2")[0].innerText,
  Director: document.getElementsByTagName("h3")[0].innerText,
  Actors: document.getElementsByTagName("h4")[0].innerText,
  Awards: document.getElementsByTagName("h5")[0].innerText,
  Genre: document.getElementsByTagName("h6")[0].innerText,
  Runtime: document.getElementsByTagName("h7")[0].innerText,
  Poster: document.getElementById("Poster").src,
};
function guardar() {
  fetch("/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(nuevaPelicula2),
  })
    .then((datos) => {
      location.replace("/");
    })
    .catch((e) => console.log("Ocurrió un error:" + e))};