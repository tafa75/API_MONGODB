const fetch = require ("node-fetch");
const mabase = require("./modules/mabase.js");

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";


MongoClient.connect(url, function(err,db){

    let dbo = db.db("films");
    dbo.createCollection(myArgs, function(err, res){
        if(err) throw err;
        console.log("Colección creada");
        db.close;
    })
})

const connect =  async () => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => { console.log(err); })
    return client;
}   


// Método para llamar a la API 
exports.getapiFilms = (req, res) => {
    const titulo = req.params.titulo;
    fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=12267320`)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    res.json(data);
    })
    .catch((e)=>{
        console.log("error"+e)
    })
}


exports.getEditar = (req, res) => {
    mabase.detalleDocPeli(req.params.titulo)
    .then((datos)=> {
        console.log(datos)
        res.render("formulario", {
            ruta:"/film/edit",
            titulo1: "¿Qué película desea actualizar?",
            tituloEdit: datos.Titulo, 
            epocaEdit: datos.Epoca, 
            generoEdit: datos.Genero, 
            directorEdit: datos.Director, 
            actorsEdit: datos.Actores, 
            sinopsisEdit: datos.Sinopsis,
            idiomasEdit: datos.Idiomas,
            puntuacionEdit: datos.Puntuacion, 
            produccionEdit: datos.Produccion,
            imagenEdit: datos.Poster
        }) })
    .catch((e)=> console.log("ocurrió un error:"+e))

}


exports.getDetalle = (req, res) => {
    mabase.detalleDocPeli(req.params.titulo)
    .then((datos)=> {   
        res.render("film", {
            tituloPeli: datos.Titulo, 
            epocaPeli: datos.Epoca, 
            generoPeli: datos.Genero,
            peliDirector: datos.Director, 
            actorPeli: datos.Actores,
            sinopsisPeli: datos.Sinopsis,
            idiomasPeli: datos.Idiomas, 
            puntuacionPeli: datos.Puntuacion, 
            producterPeli: datos.Produccion,
            Poster: datos.Poster
        })

    })
    .catch((e)=> console.log("Ha ocurrido un problema:"+e))
}


exports.getForm = (req, res) => { 
    res.render("formulario", {titulo1: "¿Qué película desea guardar?.", ruta: "/api/films"})
    
}

// Método POST para crear un nuevo documento en la BBDD.

// Método para editar y actualizar los documentos del FORM. 





exports.createMovie = async (datos) => {
    const client = await connect ();
   
    const Pelis = {
        Titulo: datos.Titulo,
        Epoca: datos.Epoca,
        Genero: datos.Genero,
        Director: datos.Director,
        Actores: datos.Actores,
        Sinopsis: datos.Sinopsis,
        Idiomas: datos.Idiomas,
        Puntuacion: datos.Puntuacion,
        Produccion: datos.Produccion,
        Poster: datos.Poster}
    const result = await client
    .db("movies")
    .collection("Pelis")
    .insertOne(myFilm);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return result;
}

//Leer todas las películas

exports.readMovie = async () => {
    const client = await connect();
    result = await client
        .db("movies")
        .collection("Pelis")
        .find()
        .toArray();
    if(result) {
        console.log("Se han encontrado todos los documentos de la colección");
        return result
    } else { 
        console.log("No se han encontrado los documentos.")
        return null
    }
}

//Detalle

exports.updateMovie = async (datos)  => {
    const client = await connect();
    result = await client
        .db("movies")
        .collection("Pelis")
        .findOne({Titulo: datos});
    if (result) {
        console.log(`Se ha encontrado la pelicula con el título: '${datos}' en la colección`);
        return result;
    } else {
        console.log(`No se encuentra el título: '${datos.Titulo}'`);
        return null;
    }
}


//Update

/*
 Método para actualizar/editar un documento de la BBDD. 
*/
exports.updateMovie = async (Titulo, nuevoTitulo) => {
    const client = await connect();
    result = await client
        .db("movies")
        .collection("Pelis")
        .updateOne(
            { Titulo: Titulo }, 
            { $set: {Titulo: nuevoTitulo}},
            { upsert: true });

    console.log(`${result.matchedCount} documentos que coinciden con los criterios de consulta.`);
    if (result.upsertedCount > 0) {
        console.log(`Un documento insertado con el id: ${result.upsertedId._id}`);
        return result;
    } else {
        console.log(`No se ha podido modificar este ${result.modifiedCount} documento.`);
    }
}

// //Delete
exports.deleteMovie = async (datos) => {
    const client = await connect();
    result = await client
        .db("movies")
        .collection("Pelis")
        .deleteOne({Titulo: datos.Titulo});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    return result;
}
