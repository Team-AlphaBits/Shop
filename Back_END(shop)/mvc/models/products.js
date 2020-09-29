var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Database";
const prod = require("./Product_data.products");

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var Products =db.db("Products");
  var myobj = prod;
  dbo.collection("Product_data").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});