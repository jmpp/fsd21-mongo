const coordinates = [-73.961704, 40.662942];

const METERS_PER_MILE = 1609.34; // 1 mile en mètres

db.restaurants
  .find(
    {
      // GeoJSON Point [ longitude, latitude ]
      "address.coord": {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates,
          },
          $maxDistance: 5 * METERS_PER_MILE,
        },
      },
    },
    { _id: 0, name: 1, borough: 1, "address.coord": 1 }
  )
  .forEach(
    ({
      name,
      borough,
      address: {
        coord: [longitude, latitude],
      },
    }) => {
      console.log(`${name} (${borough}) : ${longitude},${latitude}`);
    }
  );
