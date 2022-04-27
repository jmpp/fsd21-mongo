db.restaurants.aggregate([
  
    { $match: {
      cuisine: 'American',
      'grades.grade': 'A'
    } },
  
    { $project: {
      _id: 0,
      fullName: { $concat: [ '$name', ' (', { $toUpper: '$borough' }, ')' ] },
      fullAddress: { $concat: [ '$address.building', ' ', '$address.street', ', ', '$address.zipcode' ] },
      cuisine: 1,
      'grades.grade': 1
    } }
  
  ]);