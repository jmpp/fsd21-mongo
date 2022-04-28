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

// 04.

const newBooks = [
    { title : "Python & SQL"}, // Programmation & SQL
    { title : "JS SQL ou NoSQL" }, // programmation
    { title : "Pandas & SQL & NoSQL"}, // SQL, NoSQL et Programmation
    { title : "Modélisation des données"} // aucune catégorie
];

db.books.insertOne({ title: newBooks[0].title, category_id: [prog._id, sql._id] });
db.books.insertOne({ title: newBooks[1].title, category_id: prog._id });
db.books.insertOne({ title: newBooks[2].title, category_id: [prog._id, sql._id, nosql._id] });
db.books.insertOne({ title: newBooks[3].title });

// 05.

db.books.find({
    $or: [
        { category_id: { $exists: false } },
        { category_id: { $in: [null, '', 0] } }
    ]
});


// ==

/*
[
  { _id: 'Books'        , parent: null },
  { _id: 'Programming'  , parent: 'Books' },
  { _id: 'Database'     , parent: 'Programming' },
  { _id: 'MongoDB'      , parent: 'Database' }
]


[
  { _id: 'Books'        , parent: null          , ancestors: null },
  { _id: 'Programming'  , parent: 'Books'       , ancestors: ['Books'] },
  { _id: 'Database'     , parent: 'Programming' , ancestors: ['Programming', 'Books'] },
  { _id: 'MongoDB'      , parent: 'Database'    , ancestors: ['Database', 'Programming', 'Books'] }
]

*/

function addParents(original_id, doc_to_proceed) {
    // regarder si la ppté 'parent' est null ou non
    // modifier le document courant pour ajouter au tableau 'ancestors' la valeur du parent direct
    // répéter la même opération pour le document correspondant au 'parent' (récursivité) :
    //   addParents( original_id, <document_correspondant_au_parent_direct> )
}

db.categoriestree.find().forEach(doc => {
    addParents(doc._id, doc);
});