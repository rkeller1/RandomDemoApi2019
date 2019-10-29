var _helpers = require("./_helpers");
var personal = require("./fake_inputs/personal");
var product = require("./fake_inputs/product");

/**
 * function getFakeUsers
 *
 * Mixes up all preparation data to generate non repeating random users
 */
exports.getFakeUsers = function() {
  let names = _helpers.cartesian(
    personal.data.firstnames,
    personal.data.lastnames
  );
  let addresses = _helpers.cartesian(
    personal.data.streets,
    personal.data.cities
  );
  let users = [];
  for (let i in names) {
    let randomIndex = Math.floor(Math.random() * addresses.length);
    let randomImageIndex = Math.floor(
      Math.random() * personal.data.images.length
    );
    let selectedAddress = addresses[randomIndex];
    let user = {
      firstname: names[i][0],
      lastname: names[i][1],
      address: {
        street: selectedAddress[0],
        number: Math.floor(Math.random() * 11) + 1,
        city: selectedAddress[1]
      },
      birthday: _helpers.randomDate(new Date(1990, 0, 1), new Date(2000, 0, 1)),
      image: personal.data.images[randomImageIndex]
    };
    users.push(user);
  }
  return users;
};

exports.getFakeProducts = function(explicit) {
  console.log(explicit);
  let names = _helpers.cartesian(
    product.data.prefixes,
    explicit ? product.data.explicitPostfixes : product.data.postfixes
  );
  let products = [];
  for (let i in names) {
    let product = {
      name: `${names[i][0]} ${names[i][1]}`,
      price: Math.floor(Math.random() * 120) + 1 + ",00 €"
    };
    products.push(product);
  }
  return products;
};
