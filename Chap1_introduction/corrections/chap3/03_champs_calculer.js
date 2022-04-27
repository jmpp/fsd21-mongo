// 1

db.inventory.updateMany(
    { qty: { $gte: 200} },
    { $set: { scores: [19] } },
    { upsert: true }
)

// 2

db.inventory.updateMany(
    { society: /a/ig },
    {
        $push: {
            scores: 11
        }
    }
);

// 3

db.inventory.find({
    scores: 11
}, { _id: 0, society: 1, qty: 1, scores: 1 });

// 4

db.inventory.updateMany(
    { society: 'Alex' },
    { $set: { comment: 'Hello Alex' } }
);

// 5

db.inventory.find(
    { comment: { $exists: false }},
    { _id: 0 }
)