/**
 * Preparation Data for fake Persons
 */
let firstnames = ["Max", "Robin", "Kate", "Sarah", "Winston", "Charles"];
let lastnames = ["Hunter", "Gates", "Kellerhan", "Sullivan", "Carlson"];
let streets = [
  "Nordstreet",
  "Outer Boulevard",
  "Canigan Road",
  "Fourway",
  "Commonstreet"
];
let cities = ["London", "Birningham", "Yorkshire", "Wireton"];
let images = [];

const testFolder = "./src/public/fake_images/personal";
const fs = require("fs");

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
    images.push(`static/fake_images/personal/${file}`);
  });
  console.dir(images);
});
exports.data = {
  firstnames,
  lastnames,
  streets,
  cities,
  images
};
