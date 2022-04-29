const express = require('express');
const router = new express.Router();

const { getDBObject } = require('./database.js');

/**
 * Déclaration des routes de l'app
 */

router.get("/", getHome);
router.get("/stats", getStats);
router.get("/example-form", getExampleForm);

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

// Exporte le routeur pour le fichier principal
module.exports = router;