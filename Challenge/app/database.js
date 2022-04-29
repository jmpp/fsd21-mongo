const MongoClient = require('mongodb').MongoClient;

// Connection String à la BDD Mongo :
const CONNECTION_STRING = "mongodb://root:example@mongo:27017"; // DOCKER !
                       // "mongodb://localhost:27017"; // Install locale de Mongo 

// Instanciation d'un objet 'MongoClient'
const client = new MongoClient(CONNECTION_STRING);

let db = null;

exports.open = function openDatabase(dbName) {
  // On ouvre une connexion à la BDD avec .connect()
  return client.connect().then(() => {
    console.log('Connexion à MongoDB initialisée …');
    db = client.db(dbName);
  });
};

exports.getDBObject = function getDB() {
  return db;
};