
// 1. Affichez la liste des restaurants dont le nom commence et se termine par une voyelle.
db.restaurants.find({
    name: /^[aeiouy].*[aeiouy]$/i
}, { _id: 0, name: 1 });

// Méthode programmatique
const vowels = 'aeiouy'.split('');
db.restaurants.find({}).forEach((el) => {
    let name = el.name.toLowerCase();

    let first = name[0];
    let last = name[name.length - 1];

    if (
        vowels.includes(first) &&
        vowels.includes(last)
    ) {
        console.log('Restaurant:', el.name);
    }
});

// 2. Affichez la liste des restaurants dont le nom commence et se termine par une même lettre.
db.restaurants.find({
    name: /^([a-z]).*\1$/i
}, { _id: 0, name: 1 });

// Méthode programmatique
db.restaurants.find({}).forEach((el) => {
    let name = el.name.toLowerCase();

    let first = name[0];
    let last = name[name.length - 1];

    if (first === last && isLowerLetter(first) && name.length > 1) {
        console.log('Restaurant:', el.name);
    }
});

function isLowerLetter(chr) {
    return chr.codePointAt(0) >= 97 && chr.codePointAt(0) <= 122;
}