// What you have
const fruits = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Pineapple' },
  { id: 3, name: 'Cranberries' },
  { id: 4, name: 'Bananas' }
];

console.log(typeof fruits) // object

// Expected output:
// [ 'Apple', 'Pineapple', 'Cranberries', 'Bananas' ]
/**
 * .forEach() => does not return value of previous iteration
 */

 // ES5 - .forEach()
 function getFruits3() {
  const fruitNames = [];

  fruits.forEach(fruit => {
    fruitNames.push(fruit.name)
  })
  console.log(`ES5+ .forEach():`, fruitNames); // => ES5+ .forEach(): [ 'Apple', 'Pineapple', 'Cranberries', 'Bananas' ]
}

getFruits3();

// ES6 - .forEach()
getFruits4 = () => {
  const fruitNames = [];

  fruits.forEach(fruit => {
    fruitNames.push(fruit.name)
  })
  console.log(`ES6 .forEach():`, fruitNames); // => ES6 .forEach(): [ 'Apple', 'Pineapple', 'Cranberries', 'Bananas' ]
}

getFruits4();
