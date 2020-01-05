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
 * for(...) loop
 */

// ES5+ for-loop
function getFruits5() {
  const fruitNames = [];

  for (let i = 0; i < fruits.length; i++) {
    fruitNames.push(fruits[i].name)
  }
  console.log(`ES5+ for-loop:`, fruitNames) // => ES5+ for-loop: [ 'Apple', 'Pineapple', 'Cranberries', 'Bananas' ]
}

getFruits5();

// ES6 for-loop
getFruits6 = () => {
  const fruitNames = [];

  for (let i = 0; i < fruits.length; i++) {
    fruitNames.push(fruits[i].name)
  }
  console.log(`ES6 for-loop:`, fruitNames); // => ES6 for-loop: [ 'Apple', 'Pineapple', 'Cranberries', 'Bananas' ]
}

getFruits6();
