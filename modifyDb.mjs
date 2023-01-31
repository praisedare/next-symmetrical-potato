import db from './db.json' assert {type: 'json'};
import fs from 'fs';

while (1) {
    await new Promise(r => setTimeout(() => r(), 5e3));
    db.products[0].price += 10;
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 4));
    console.log('modified price...');
}

