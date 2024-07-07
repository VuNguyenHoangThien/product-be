const Express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
var cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const product = require('./router/data.route');
var http = require('http');

// const io = require('./websocket/socket_server');


var ObjectID = require('mongodb').ObjectID;
var port = process.env.PORT || 3000;
var app = Express();
app.use(cors({ credentials: true, origin: 'http://localhost:4200'}));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
// const CONNECTION_URL = "mongodb+srv://vuNHT:PHIhung@123@cluster0-vwx6r.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "vu-data";
// let dev_db_url = "mongodb+srv://thienvu96:PHIhung@123@cluster0-vwx6r.mongodb.net/" + DATABASE_NAME + "?retryWrites=true&w=majority";
let dev_db_url = "mongodb+srv://thienvu96:PHIhung@123@cluster0.fbexxvl.mongodb.net/" + DATABASE_NAME + "?retryWrites=true&w=majority";

let mongoDB = dev_db_url;
const config = {
  autoIndex: false,
  useNewUrlParser: true,
};
mongoose.connect(mongoDB, config, (err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to `" + DATABASE_NAME + "`!");
  }
});

mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const uri = "mongodb+srv://thienvu96:PHIhung@123@cluster0.fbexxvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db("vu-data");
//   // const collection = db.collection('login');

//   return 'done !!!';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => {
//     app.listen(port, () => {
//       console.log('port: ', port);
//      app.use('/', product);
//     })
//   });

  app.listen(port, () => {
    console.log('port: ', port);
   app.use('/', product);
  })

module.exports = app;