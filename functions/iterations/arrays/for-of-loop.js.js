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
 * for(...of) loop
 */

// ES5+ for-of-loop
function getFruits7() {
  const fruitNames = [];

  for (let i of fruits) {
    fruitNames.push(i.name);
  }
  console.log(`ES5+ for-of-loop:`, fruitNames); // => ES5+ for-of-loop: [ 'Apple', 'Pineapple', 'Cranberries', 'Bananas' ]
}

getFruits7();

// ES6 for-of-loop
getFruits8 = () => {
  const fruitNames = [];

  for (let i of fruits) {
    //console.log(`i`, i.name)
    fruitNames.push(i.name);
  }
  console.log(`ES6 for-of-loop:`, fruitNames)
}

getFruits8(); // => ES6 for-of-loop: [ 'Apple', 'Pineapple', 'Cranberries', 'Bananas' ]


