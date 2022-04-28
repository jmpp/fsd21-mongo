// 01.

db.sportif.aggregate([
    { $group: {
        _id: { $toUpper: '$Sexe' },
        count: { $sum: 1 }
    } }
]);

// Pour vérifier
db.sportif.find({ Sexe: /f/i }).count()
db.sportif.find({ Sexe: /m/i }).count()

// 02.

db.sportif.aggregate([
    { $match : {
        Sports: { $exists: false }
    } },

    { $project: {
        _id: 0,
        fullName: { $concat: ['$Prenom', ' ', { $toUpper: '$Nom'}] }
    } }
]);

// 03.

db.sportif.aggregate([
    { $unwind: '$Sports.Jouer' },

    { $group: {
        _id: '$Sports.Jouer',
        nbPratiquants: { $sum: 1 }
    } }
]);

// 04.

db.gymnase.aggregate([
    { $group: { 
        _id: '$Ville',
        total: { $sum: 1 },
        gymnases: { $push: { name: '$NomGymnase' } } // bonus
    } }
]);

// ==================

// 02. nb status

db.orders.aggregate([
    { $match: {
        status: 'A'
    } },

    { $group: {
        _id: '$cust_id',
        count: { $sum: 1 }
    } }
]);

// 03. augmantation

db.orders.aggregate([
    { $match: {
        status: 'A'
    } },

    { $group: {
        _id: '$cust_id',
        count: { $sum: 1 }
    } },

    { $project: {
        count: 1,
        total: { $multiply: ['$count', 1.1] }
    } }
]);