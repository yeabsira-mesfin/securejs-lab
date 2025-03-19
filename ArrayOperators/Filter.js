const personArray = [
    { name: "Yeab", age: 45, country: "USA" },
    { name: "Zeru", age: 25, country: "USA" },
    { name: "Annie", age: 30, country: "Canada" },
    { name: "Emu", age: 15, country: "Germany" },
    { name: "Baety", age: 20, country: "France" },
    { name: "Semi", age: 20, country: "France" },
  ];

    const person = personArray.filter((person) => person.country === "USA");
    console.log(person); 