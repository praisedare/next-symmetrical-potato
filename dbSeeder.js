const { faker } = require('@faker-js/faker');

const products = [];

const fakeProducts = faker.commerce;
for (let i = 1; i <= 15; ++i) {
	const product = {
		id: i,
		name: fakeProducts.productName(),
		description: fakeProducts.productDescription(),
		category: fakeProducts.department().toLowerCase(),
		price: fakeProducts.price(),
	};
	products.push(product);
}

const db = {
	products,
};

const fs = require('node:fs');
fs.writeFileSync(
	__dirname + '/db.json',
	JSON.stringify(db, null, 2)
);

