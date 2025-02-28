const fs = require('fs');

fs.readFile('cars.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Errore nella lettura del file:", err);
        return;
    }

    const cars = JSON.parse(data);
    console.log(`Numero di auto nel file cars.json: ${cars.length}`);
});