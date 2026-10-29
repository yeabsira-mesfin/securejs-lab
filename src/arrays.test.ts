import {describe,it,expect} from 'vitest';
import {names,fromCountry,firstFromCountry,indexFromCountry,areAllAdults,hasMinor,includesName,findIndexByName,Person} from './arrays';
const people:Person[]=[{name:'A',age:24,country:'USA'},{name:'B',age:16,country:'Canada'},{name:'C',age:31,country:'USA'}];
describe('existing ES6 array exercise counterparts',()=>{
 it('maps names without mutation',()=>{expect(names(people)).toEqual(['A','B','C']);expect(people[0].name).toBe('A');});
 it('filters and finds',()=>{expect(fromCountry(people,'USA')).toHaveLength(2);expect(firstFromCountry(people,'Canada')?.name).toBe('B');expect(indexFromCountry(people,'Canada')).toBe(1);});
 it('checks predicates',()=>{expect(areAllAdults(people)).toBe(false);expect(hasMinor(people)).toBe(true);});
 it('supports includes and indexOf',()=>{expect(includesName(people,'A')).toBe(true);expect(findIndexByName(people,'missing')).toBe(-1);});
});
