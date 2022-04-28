// 1. On aimerait maintenant avoir tous les noms et id des restaurants par type de cuisine et quartier. Limitez l'affichage à deux résultats.

db.restaurants.aggregate([
    { $group: {
        _id: {
            cuisine: '$cuisine',
            borough: '$borough'
        },
        restaurants: {
            $push: {
                name: '$name',
                restaurant_id: '$restaurant_id'
            }
        }
    } },

    { $limit: 2 }
]);

// 2. Affichez maintenant tous les noms de restaurant Italiens par quartier.

db.restaurants.aggregate([
    { $match: {
        cuisine: 'Italian'
    } },

    { $group: {
        _id: { borough: '$borough' },
        restaurants: { $push: { name: '$name' } }
    } }
]);

// 3. Affichez également, pour chaque restaurant, la moyenne de ses scores. Et ordonnez vos résultats par ordre de moyenne décroissante.
// Vous pouvez également le faire par type de restaurant et par quartier.
//  { $unwind : "$grades" } ,

db.restaurants.aggregate([
    { $unwind: '$grades' },
    
    { $match: {
        cuisine: 'Italian'
    } },
    
    { $group: {
        _id: { borough: '$borough', name: '$name' },
        avg_by_restaurant: { $avg: '$grades.score' }
    } },

    { $sort: {
        avg_by_restaurant: -1
    } }
]);

// ou éventuellement, on calcule d'abord la moyenne indépendamment sur chaque restau, et on fait une moyenne générale à partir des sous-moyennes de chaque restau.
// (bonus, non demandé dans l'énoncé)
db.restaurants.aggregate([
    { $match: {
        cuisine: 'Italian'
    } },

    { $project: {
        _id: 0,
        name: 1,
        borough: 1,
        avgGrade: { $avg: '$grades.score' }
    } },

    { $group: {
        _id: { borough: '$borough', name: '$name' },
        avg_by_restaurant: { $avg: '$avgGrade' }
    } },
]);

// 4. Faites une requête qui récupère les 5 premiers restaurants Italiens les mieux notés et placez cette recherche dans une collection nommée top5.
// { $out : "top5" }

db.restaurants.aggregate([
    { $match: {
        cuisine: 'Italian'
    } },

    { $project: {
        name: 1,
        cuisine: 1,
        borough: 1,
        address: 1,
        avgGrade: { $avg: '$grades.score' }
    } },

    { $sort: { avgGrade : -1 } },

    { $limit: 5 },

    { $out: "top5" }
]);

// 5. Récupérez le nombre de restaurants par quartier ainsi que leur type de cuisine qui contiennent AU MOINS un score supérieur ou égal à 30. Ordonnez le résultat par ordre décroissant de nombre de restaurant.

db.restaurants.aggregate([
    { $match: {
        'grades.score': { $gte: 30 }
    } },

    { $group: {
        _id: {
            borough: '$borough',
            cuisine: '$cuisine'
        },
        nbRestaurants: { $count: {} }
    } },

    { $sort: { nbRestaurants: -1 } }
]);

// 6. Cherchez les meilleurs restaurants en proposant une requête de votre choix, faites le par quartier. Puis donnez la moyenne des scores de ces restaurants.

db.restaurants.aggregate([

    { $project: {
        name: 1,
        cuisine: 1,
        borough: 1,
        address: 1,
        avgGrade: { $avg: '$grades.score' }
    } },

    { $sort: { avgGrade : -1 } },

    { $group: {
        _id: '$borough',
        restaurants: {
            $push: {
                name: '$name',
                avgGrade: '$avgGrade'
            }
        }
    } },

    { $project: {
        _id: 1,
        restaurants: { $slice: ['$restaurants', 5] }
    } }

]);
