// logging
let test1 = 0;
console.log(`hello ${test1 + 2} world`);
//variables

let b = 2;
const c = 'abc';
console.log(typeof c);

//array

let x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log(x[8]);

// objects
let human = {
  name: 'john',
  age: 20,
  course: 'BSIT',
  spouse: {
    name: 'Mary',
    age: 19,
    course: 'BSCS',
  },
  subjects: ['english', 'math', 'History'],
};

console.log(human.name);

//functions
function sum(num1, num2) {
  return num1 + num2;
}
console.log(sum(7, 8));

// arrow function

let fun = (num1, num2) => num1 + num2;
console.log(fun(5, 3));
