db.inventory.updateMany(
    // find 
    { tags: { $exists: true } } ,

    // pipeline d'aggregation (tableau)
    [
        // stage 1
        {   
            // opérateur $set (aggregation)
            $set: {
                // Le champs que l'on va modifier est le champs 'label'
                label: {
                    $switch: {
                        branches: [
                            { case: { $gt: [ { $size: "$tags" }, 3 ] }, then: 'AA' },
                            { case: { $gt: [ { $size: "$tags" }, 1 ] }, then: 'A' },
                        ],
                        default: 'B'
                    }
                }
            }
        }
    ]
)

// EXPRESSION = { $gt: [ { $size: "$tags" }, 1 ] }