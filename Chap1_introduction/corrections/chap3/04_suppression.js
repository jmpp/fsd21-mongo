
// Vérification
db.inventory.find({ level: { $exists: true } });

// Suppression
db.inventory.updateMany(
  { level: { $exists: true } },
  {
    $unset: { level: "" },
  }
);
