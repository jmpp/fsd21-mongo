
// 01. Augmentez de 50% la quantité de chaque document qui a un status C ou D.

db.inventory.updateMany(
    {
        status: { $in: ['C', 'D'] }
    },
    {
        $mul: { qty: 1.5 }
    }
);

// Augmentez maintenant de 150% les documents ayant un status A ou B et au moins 3 blanks dans leurs tag.
// (Consigne ambigue)

db.inventory.updateMany(
    {
        $or: [
            { status: 'A' },
            { status: 'B' }
        ],
        $and: [
            { tags: { $size: 3 } },
            { tags: 'blank' }
        ]
    },
    {
        $mul: { qty: 2.5 }
    }
);