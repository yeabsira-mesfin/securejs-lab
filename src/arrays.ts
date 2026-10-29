/** Typed, reusable counterparts to the original ArrayOperators exercises. */
export interface Person {name:string;age:number;country:string}
export function names(people:ReadonlyArray<Person>):string[]{return people.map(p=>p.name);}
export function fromCountry(people:ReadonlyArray<Person>,country:string):Person[]{return people.filter(p=>p.country===country);}
export function firstFromCountry(people:ReadonlyArray<Person>,country:string):Person|undefined{return people.find(p=>p.country===country);}
export function indexFromCountry(people:ReadonlyArray<Person>,country:string):number{return people.findIndex(p=>p.country===country);}
export function areAllAdults(people:ReadonlyArray<Person>):boolean{return people.every(p=>p.age>=18);}
export function hasMinor(people:ReadonlyArray<Person>):boolean{return people.some(p=>p.age<18);}
export function includesName(people:ReadonlyArray<Person>,name:string):boolean{return names(people).includes(name);}
export function findIndexByName(people:ReadonlyArray<Person>,name:string):number{return names(people).indexOf(name);}
