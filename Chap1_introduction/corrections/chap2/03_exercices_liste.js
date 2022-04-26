// 01. Combien y a t il de restaurants qui font de la cuisine italienne et qui ont eu un score de 10 au moins ?

db.restaurants.find({
    cuisine: 'Italian',
    'grades.score': 10
}).count(); // 378

// 02.03.

db.restaurants.find({
    'grades.grade': 'A',
    'grades.score': { $gte: 20 }
}, { _id: 0, name: 1 }).sort({ 'grades.score': -1 })
.count(); // 6312

// 04.

db.restaurants.distinct("borough");

// 05.

db.restaurants.distinct("cuisine", { borough: "Bronx" });

// 06.

db.restaurants.find({
    borough: 'Bronx',
    grades: { $size: 4 }
},
{ _id: 0, name: 1, grades: 1 });

// 07.

db.restaurants.find({
    borough: 'Bronx',
    $or: [
        { 'grades.grade': 'A' },
        { 'grades.grade': 'B' }
    ]
}, { _id: 0, name:1, borough: 1, 'grades.grade':1});

// Autre solution possible avec $in
db.restaurants.find({
    borough: 'Bronx',
    'grades.grade': { $in: ['A', 'B'] }
}, { _id: 0, name:1, borough: 1, 'grades.grade':1});

// 08.

db.restaurants.find({
    borough: 'Bronx',
    $or: [
        { 'grades.0.grade': 'A' },
        { 'grades.0.grade': 'B' }
    ]
}, { _id: 0, borough: 1, 'grades.grade':1});

// 09.

db.restaurants.find({
    name: /coffee/i,
    borough: 'Bronx'
}, { _id: 0, name: 1, borough: 1 }).count(); // 39

// 10.

db.restaurants.find({
    $or: [
        { name: /Restaurant/ },
        { name: /Coffee/ },
    ],
    name: { $not: /Starbucks/ }
}, { _id: 0, name: 1 });

db.restaurants.find({
    name: {
        $in: [/Coffee/, /Restaurant/],
        $nin: [/Starbucks/]
    }
}, { _id: 0, name: 1 });

// 11.

db.restaurants.find({
    name: /Coffee/,
    $or: [
        { borough: 'Bronx' },
        { borough: 'Brooklyn' }
    ],
    grades: { $size: 4 }
}, { _id: 0, name: 1, borough: 1, 'grades.score': 1 });

// 12.

db.restaurants.find({
    name: /Coffee/i,
    borough: { $in: ['Bronx', 'Brooklyn'] },
    grades: { $size: 4 }
}).forEach((element) => {

    const { name, grades } = element;

    const firstDate = grades[0].date;
    const lastDate = grades[grades.length - 1].date;

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }; // Intl.DateTimeFormat

    console.log('Name ', name.toUpperCase());
    console.log('Firstdate ', firstDate.toLocaleString('fr-FR', dateOptions));
    console.log('Lastdate ', lastDate.toLocaleString('fr-FR', dateOptions));
    console.log('-------------');
});