const express = require('express');
const app = express();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/mabase";
var ObjectId = require("mongodb").ObjectId;

//Create DDBB
const connect = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
      console.log(err);
    })
  return client;
}

// Esta está duplicada. Ya creas la BD abajo. // CREATE CLIENT
// exports.createMovie = async (peli) => {
//   client = await connect();
//   const result = await result
//     .db("mabase")
//     .collection("Pelis")
//     .insertOne(movie)
//   console.log(result);
//   console.log(`${result} was added to the database!`);
//   // return result;


// CREATE COLLECTION 
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
      Poster: datos.Poster}
  const result = await client
  .db("films")
  .collection("Pelis")
  .insertOne(Pelis);
  console.log(`New listing created with the following id: ${result.insertedId}`);
  return result;
}

exports.getMovie = async (nombre) => {
  const client = await connect();
  result = await client
    .db("movies")
    .collection("Pelis")
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

// Esto debe leerse en la Home
exports.getFilmsDetail = async () => {
  const client = await connect();
  result = await client
  .db("movies")
  .collection("favorites")
  .find().toArray();
  
  if (result) {
    return result;
  } else {
    return null;
  }
};

//Metodo para leer desde la BD 
exports.readMovie = async () => {
  const client = await connect();
  result = await client
      .db("films")
      .collection("Pelis")
      .find()
      .toArray();
  if(result) {
     
      return result
  } else { 
      
      return null
  }
}

//Update


//Metodo para editar en la base de datos. Este metodo va en los POST

exports.setMovie = async (id, film) => {
  console.log("+++++++");
  console.log(film);
  console.log(id);
  const client = await connect();
  result = await client
    .db("movies")
    .collection("favorites")
    .updateOne(
      { _id: ObjectId(id) },

      {
        $set: {
          Title: film.Title,
          Year: film.Year,
          Director: film.Director,
          Actors: film.Actors,
          Genre: film.Genre,
          Awards: film.Awards,
          Runtime: film.Runtime,
          Poster: film.Poster,
        },
      }
    );
  if (result) {
    //console.log("cambios: " + result.nModified);
    return result;
  } else {
    return null;
  }
};
//Delete

exports.deleteMovie = async (peli) =>{
  client = await connect();
  const result = await client
  .db("mabase")
  .collection("Pelis")
  .deleteOne({Title: nameOfListing});

  return result;
}



