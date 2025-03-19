const personArray = [
  { name: "Yeab", age: 45, country: "USA" },
  { name: "Zeru", age: 25, country: "Ethiopia" },
  { name: "Annie", age: 30, country: "Canada" },
  { name: "Emu", age: 15, country: "Germany" },
  { name: "Baety", age: 20, country: "France" },
  { name: "Semi", age: 20, country: "France" },
];

let getAllNames = personArray.map((person, index) => {
  return `Persons name is ${person.name} and is ${person.age} years old`;
});
console.log(getAllNames);
