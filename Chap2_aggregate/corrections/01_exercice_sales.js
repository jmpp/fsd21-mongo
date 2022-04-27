db.sales.aggregate([

    // 1. A partir des données ci-dessus calculer le total des prix des restaurants par agence.
    { $group: {
      _id: '$agency',
      totalPrice: { $sum: '$price'}
    } },
  
    // 2. Quelles sont les totaux dans ce regroupement qui sont supérieurs ou égaux à 950000 ?
    { $match: {
      totalPrice: { $gte: 950_000 }
    } }
  
  ]);
  