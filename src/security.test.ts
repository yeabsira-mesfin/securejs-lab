import {describe,it,expect} from 'vitest';
import {safeMerge,safeLookup,validateAttendee,canRead,canWrite,sanitizeForLog,safeDomText,publicConfig} from './security';
describe('prototype pollution mitigation',()=>{
 it('rejects dangerous keys, including parsed JSON payloads',()=>{
  const payload=JSON.parse('{"__proto__":{"isAdmin":true}}');
  expect(()=>safeMerge({},payload)).toThrow(/Unsafe object key/);
  expect(({} as Record<string,unknown>).isAdmin).toBeUndefined();
  expect(()=>safeMerge({},JSON.parse('{"constructor":{}}'))).toThrow();
 });
 it('does not traverse inherited properties',()=>{expect(safeLookup({},'toString')).toBeUndefined();expect(safeLookup({x:1},'x')).toBe(1);});
});
describe('input validation and authorization',()=>{
 it('normalizes valid attendee data',()=>{expect(validateAttendee({name:' Demo User ',email:'DEMO@EXAMPLE.TEST'})).toEqual({name:'Demo User',email:'demo@example.test'});});
 it('rejects invalid records',()=>{expect(()=>validateAttendee({name:'A',email:'bad'})).toThrow();});
 it('blocks cross-user reads and writes',()=>{
  const target={id:'doc',ownerId:'victim',classification:'private' as const};
  expect(canRead({id:'attacker',role:'viewer'},target)).toBe(false);
  expect(canWrite({id:'attacker',role:'maintainer'},target)).toBe(false);
  expect(canRead({id:'victim',role:'viewer'},target)).toBe(true);
  expect(canWrite({id:'admin',role:'admin'},target)).toBe(true);
 });
 it('redacts sensitive fields in logs',()=>{expect(sanitizeForLog({token:'abc',email:'test@example.com',reason:'ok'})).toEqual({token:'[REDACTED]',email:'[REDACTED]',reason:'ok'});});
 it('blocks absolute API URLs',()=>{expect(()=>publicConfig({VITE_API_BASE:'https://evil.test'})).toThrow();});
 it('uses textContent rather than interpreting HTML',()=>{
  const node={textContent:''} as unknown as HTMLElement;
  safeDomText(node,'<img src=x onerror=alert(1)>');
  expect(node.textContent).toBe('<img src=x onerror=alert(1)>');
 });
});
