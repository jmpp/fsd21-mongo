
// 01. 
let qtyTotal = 0;
db.inventory.find({ type: 'journal' }).forEach(element => {
    qtyTotal = qtyTotal + element.qty;
    console.log(element.society);
});

console.log('Quantité totale :', qtyTotal); // 159.

// 02.
db.inventory.find({
    year: { $gte: 2018 }
}, { _id:0 , society: 1, qty: 1 });

// 03.
db.inventory.find({
    society: /^A/
}, {_id: 0, type: 1, society: 1 });

// 04.
db.inventory.find({
    qty: { $gt: 45 }
}, { _id: 0, society: 1 });

// 05.
db.inventory.find({
    $and: [
        { qty: { $gt: 45 } },
        { qty: { $lt: 90 } }
    ]
}, { _id: 0, society: 1, qty: 1 });

// 06.
db.inventory.find({
    $or: [
        { status: 'A' },
        { type: 'journal' }
    ]
}, { _id: 0, society: 1, status: 1, type: 1 });

// 07.
db.inventory.find({
    $or: [
        { status: 'A' },
        { type: 'journal' }
    ],
    qty: { $lt: 100 }
}, { _id: 0, qty: 1, society: 1, status: 1, type: 1 });

// 08.
db.inventory.find({
    $and: [
        { $or: [
            { price: 0.99 },
            { price: 1.99 }
        ] },
        { $or: [
            { sale: true },
            { qty: { $lt: 45 } }
        ] }
    ]
});

// version plus concise :
db.inventory.find({
    price: { $in: [0.99, 1.99] },
    $or: [
        { sale: true },
        { qty: { $lt: 45 } }
    ]
});

// 09.
db.inventory.find({
    tags: { $exists: true }
}, { _id: 0, society: 1, tags: 1 });

// 10.
db.inventory.find({
    tags: 'blank'
});