var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;

  console.log("Database created!");
  var dbo = db.db("movies");
  dbo.createCollection("favorites", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  var myobj = [
    { title: "John", director: "Highway 71" },
    { title: "Peter", director: "Lowstreet 4" },
    { title: "Amy", director: "Apple st 652" },
    { title: "Hannah", director: "Mountain 21" },
    { title: "Michael", director: "Valley 345" },
    { title: "Sandy", director: "Ocean blvd 2" },
    { title: "Betty", director: "Green Grass 1" },
    { title: "Richard", director: "Sky st 331" },
    { title: "Susan", director: "One way 98" },
    { title: "Vicky", director: "Yellow Garden 2" },
    { title: "Ben", director: "Park Lane 38" },
    { title: "William", director: "Central st 954" },
    { title: "Chuck", director: "Main Road 989" },
    { title: "Viola", director: "Sideway 1633" },
  ];
  dbo.collection("favorites").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
