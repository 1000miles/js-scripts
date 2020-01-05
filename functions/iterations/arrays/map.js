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
 * .map() => returns value of previous iteration (modified value)
 */

// ES5 - .map()
function getFruits1() {
  const fruitNames = [];

  fruits.map(fruit => {
    fruitNames.push(fruit.name)
  })
  console.log(`ES5+ .map():`, fruitNames); // => ES5+ .map(): [ 'Apple', 'Pineapple', 'Cranberries', 'Bananas' ]
}

getFruits1();

// ES6 - .map()
getFruits2 = () => {
  const fruitNames = [];

  fruits.map(fruit => {
    fruitNames.push(fruit.name)
  })
  console.log(`ES6 .map():`, fruitNames); // => ES6 .map(): [ 'Apple', 'Pineapple', 'Cranberries', 'Bananas' ]
}

getFruits2();

// ES5 .map()
function getFruits3() {
  fruits.map(fruit => console.log(`ES5+ w/o newArr:`, fruit.name));
}

getFruits3();

// ES5+ w/o newArr: Apple
// ES5+ w/o newArr: Pineapple
// ES5+ w/o newArr: Cranberries
// ES5+ w/o newArr: Bananas

// ES6 .map()
getFruits4 = () => {
  fruits.map(fruit => console.log(`ES6 w/o newArr:`, fruit.name));
}

getFruits4();

// ES6 w/o newArr: Apple
// ES6 w/o newArr: Pineapple
// ES6 w/o newArr: Cranberries
// ES6 w/o newArr: Bananas

