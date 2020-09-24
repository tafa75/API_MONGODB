const express = require("express");
const bodyParser = require("body-parser");
const movies = require("./modules/movies");
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set("views", "./views");
app.set('view engine', 'pug');


// RUTAS DEL PUG PARA MOSTRAR - GET.
app.get("/", movies.getHome);
app.get("/movies/:titulo", movies.getFilmAPI);
app.get("/movies/edit/:titulo", movies.getFilmAPI);
app.get("/movies/detalle/:titulo", movies.getDetails);
app.get("/formulario", movies.getForm)

// SON RUTAS POST
app.post("/api/movies", movies.saveFave);

app.post("/movies/editar/:id", movies.edit);
app.post("/movies/borrar/:id", movies.deleteMovie);




app.listen(3000, function () {
  console.log('Estoy conectado al Server en el puerto 3000!')
})