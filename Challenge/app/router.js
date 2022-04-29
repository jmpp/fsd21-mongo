const express = require('express');
const router = new express.Router();

const { getDBObject } = require('./database.js');

/**
 * Déclaration des routes de l'app
 */

router.get("/", getHome);
router.get("/stats", getStats);
router.get("/example-form", getExampleForm);
router.get("/restos", getRestos);
router.get("/explore", getExplore);

/**
 * Déclaration des controlleurs de l'app
 */

/**
 * GET /
 * Page d'accueil
 */
async function getHome(req, res) {
  const db = getDBObject();

  const boroughsGroup = await db
    .collection("restaurants")
    .aggregate([
      { $group: {
        _id: '$borough',
        totalRestaurants: { $sum: 1 }
      } }
    ])
    .toArray();

  const cuisines = await db.collection('restaurants').distinct('cuisine');

  res.render('index.pug', {
    boroughsGroup: boroughsGroup,
    cuisines: cuisines
  });
}

/**
 * GET /stats
 * Page d'affichage de statistiques
 */
async function getStats(req, res) {
  const db = getDBObject();

  const restaurants = await db.collection('restaurants');

  const nbRestaurants = await restaurants.countDocuments();
  // const nbRestaurants = await restaurants.find().count();

  const boroughs = await restaurants.distinct('borough');
  const cuisines = await restaurants.distinct('cuisine');

  const bestRestaurants = await restaurants.aggregate([

    { $project: {
      name: 1,
      avg: { $avg: '$grades.score' }
    } },

    { $sort: { avg: -1 } },

    { $limit: 10 }

  ]).toArray();

  res.render('stats', {
    nbRestaurants,
    boroughs,
    cuisines,
    bestRestaurants
  });
}

/**
 * GET /example-form
 * Page d'exemple pour voir comment récupérer les données d'un formulaire avec Node
 */

async function getExampleForm(req, res) {
  const pseudo = req.query.pseudo;
  const gender = req.query.gender;

  if (pseudo && gender) {
    console.log('Le client envoie les données GET :', pseudo, gender);

    res.render('exemple-form', { pseudo, gender });
    return;
  }

  res.render('exemple-form');
}

/**
 * GET /restos
 * Page permettant de rechercher un restaurant
 */
async function getRestos (req, res) {
  const db = getDBObject();

  // Récupérer les données de la QueryString
  const { searchString } = req.query;

  if (searchString) {
    // Récupère l'objet Collection 'restaurants' de la base Mongo
    const restaurants = await db.collection("restaurants");

    const results = await restaurants.find({
      name: new RegExp(searchString, 'ig'),
      // name: /variableJS/ig
    }).sort({ name: 1 }).limit(20).toArray();

    res.render("restos", { results, searchString });
    return;
  }

  res.render("restos");
}

/**
 * GET /explore
 * Page permettant d'explorer les restaurants par cuisine/quartier
 */
async function getExplore (req, res) {
  const db = getDBObject();

  // Récupère l'objet Collection 'restaurants' de la base Mongo
  const restaurants = await db.collection("restaurants");

  // Parallèlisation des promesses pour un gain de temps
  const [boroughs, cuisines] = await Promise.all([
    restaurants.distinct("borough"),
    restaurants.distinct("cuisine")
  ]);

  // Récupération des éléments de la Query String
  const {
    borough: selectedBorough,
    cuisine: selectedCuisine
  } = req.query;
  
  if (selectedBorough && selectedCuisine) {
    const results = await restaurants.find({
      borough: selectedBorough,
      cuisine: selectedCuisine,
    }).toArray();

    res.render("explore", {
      boroughs,
      cuisines,
      results,
      selectedBorough,
      selectedCuisine
    });
    return;
  }

  res.render("explore", { boroughs, cuisines });
}

// Exporte le routeur pour le fichier principal
module.exports = router;