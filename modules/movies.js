const fetch = require('node-fetch');
const mabase = require('./mabase')

// Llamar a la API pero no se muestra en el PUG
exports.getTitle = (req, res) => {
    console.log(req.params)
    let title = req.params.title;
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=8f00377f&t=${title}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            res.send(` ${data.Title}, ${data.Director}. The film was released in ${data.Year} and received a rating of ${data.Ratings[0].Value}.`)
            // res.end()
        });
};

//Este metodo me muestra el HOME.pug 
exports.getHome = (req, res) => {
    mabase.readMovie()
        .then((data) => {
            console.log(data)
            res.render('home',
                {
                    message: 'Search for a film by title:',
                    pelis: data
                });
        })
        .catch(e => console.log(e))

}

//Este metodo te muestra el formulario.
exports.getForm = (req, res) => {
    res.render("formulario", { "title": "Example", ruta: "/api/movies" })
}

//module to display in details.pug
exports.getDetails = (req, res) => {
    var peli = req.params.titulo;
    bbdd
      .getMovie(peli)
      .then((datos) => {
        res.render("movie.pug", {
          Title: datos.Title,
          Year: datos.Year,
          Director: datos.Director,
          Actors: datos.Actors,
          Genre: datos.Genre,
          Awards: datos.Awards,
          Runtime: datos.Runtime,
          Poster: datos.Poster,
        });
      })
      .catch((e) => console.log(e));
  };
  
//Este metodo coge por el titulo la peli y te la muestra
exports.getFilmAPI = (req, res) => {
    //API fetch

    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=8f00377f&t=${req.params.titulo}`)
        .then(function (response) { //returns a JSON of requested film
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            res.render('film', {  //render film.pug with this data from API
                tituloPeli: data.Title,
                epocaPeli: data.Year,
                released: data.Released,
                director: data.Director,
                Poster: data.Poster,
                genre: data.Genre,
                actors: data.Actors,
                rated: data.Rated
            });
        }).catch(console.log("getFilmApi error"))
}


exports.getMovie = async (nombre) => {
    const client = await connect();
    result = await client
        .db("movies")
        .collection("favorites")
        .findOne({ Title: nombre });
    console.log(result);
    if (result) {
        console.log(`Found a listing in the collection with the name '${nombre}':`);
        return result;
    } else {
        console.log(`No listings found with the name '${nombre}'`);
        return null;
    }
};

exports.edit = (req, res) => {
    var peli = req.params.titulo;
    bbdd
      .getMovie(peli)
      .then((datos) => {
        res.render("formulario", {
          rutaPost: "/edit",
          id: datos._id,
          Title: datos.Title,
          Year: datos.Year,
          Director: datos.Director,
          Actors: datos.Actors,
          Genre: datos.Genre,
          Awards: datos.Awards,
          Runtime: datos.Runtime,
          Poster: datos.Poster,
        });
      })
      .catch((e) => console.log(e));
  };
  

//ESTO ES UN POST. ENVIA ELEMENTOS Y CREA DOCUMENTOS EN LA BD
exports.saveFave = (req, res) => {
    let movie = req.body;
        
    console.log(req.body)
    mabase.createMovie(movie)
        .then()
        .catch()
    // res.json(req.body)
    // res.json({dato:"hola"})
}

exports.deleteMovie = async (peli) => {
    client = await connect();
    const result = await client
        .db("mabase")
        .collection("Pelis")
        .deleteOne(peli)

    return result;
}

