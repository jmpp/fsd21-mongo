// 01.

const prog = db.categories.findOne({ name: 'Programmation' });
const sql = db.categories.findOne({ name: 'SQL' });
const nosql = db.categories.findOne({ name: 'NoSQL' });

// Livres dans la catégories Programmation :
db.books.updateMany(
    { title: {
        $in: ['Python', 'JS']
    } },

    { $set: {
        category_id: prog._id
    } }
);

// Livres dans la catégories SQL :
db.books.updateMany(
    { title: {
        $in: ['PosgreSQL', 'MySQL']
    } },

    { $set: {
        category_id: sql._id
    } }
);

// Livres dans la catégories SQL :
db.books.updateMany(
    { title: {
        $in: ['MongoDB']
    } },

    { $set: {
        category_id: nosql._id
    } }
);

// ===== ou avec un pipeline d'aggregation

const mapBooksToCategories = [
    {
        _id: ObjectId("626a98f780dff566843c245a"),
        values: ['Python', 'JS']
    },
    {
        _id: ObjectId("626a98f780dff566843c245b"),
        values: ['PosgreSQL', 'MySQL']
    },
    {
        _id: ObjectId("626a98f780dff566843c245c"),
        values: ['MongoDB']
    },
];

const branches = mapBooksToCategories.map(item => {
    return {
        case: { $in: ['$title', item.values] },
        then: item._id
    }
});

db.books.updateMany({}, [
    { $set: {
        category_id: {
            $switch: { branches }
        }
    } }
]);

// 02. 

db.books.find({
    category_id: prog._id
});

// 03.

db.books.find({
    category_id: nosql._id
}).count();