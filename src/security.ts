/** Defensive client-side examples. Server-side validation remains mandatory. */
export type Role='admin'|'maintainer'|'viewer';
export interface Principal{id:string;role:Role}
export interface DocumentRecord{id:string;ownerId:string;classification:'public'|'private'}

const own=Object.prototype.hasOwnProperty;
const forbidden=new Set(['__proto__','prototype','constructor']);
export function safeMerge<T extends Record<string,unknown>>(target:T,source:Record<string,unknown>):T{
  const clean=Object.create(null) as Record<string,unknown>;
  for(const [key,value] of Object.entries(source)){
    if(forbidden.has(key))throw new Error('Unsafe object key rejected: '+key);
    clean[key]=value;
  }
  return Object.assign(Object.create(null),target,clean) as T;
}
export function safeLookup(record:Record<string,unknown>,key:string):unknown{
  if(forbidden.has(key)||!own.call(record,key))return undefined;
  return record[key];
}
export function validateAttendee(input:unknown):{name:string;email:string}{
  if(typeof input!=='object'||!input)throw new Error('Expected an object');
  const data=input as Record<string,unknown>;
  if(typeof data.name!=='string'||data.name.trim().length<2||data.name.length>120)throw new Error('Invalid attendee name');
  if(typeof data.email!=='string'||data.email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))throw new Error('Invalid attendee email');
  return {name:data.name.trim(),email:data.email.trim().toLowerCase()};
}
export function canRead(principal:Principal,record:DocumentRecord):boolean{
  return principal.role==='admin'||record.classification==='public'||record.ownerId===principal.id;
}
export function canWrite(principal:Principal,record:DocumentRecord):boolean{
  return principal.role==='admin'||(principal.role==='maintainer'&&record.ownerId===principal.id);
}
export function sanitizeForLog(payload:Record<string,unknown>):Record<string,unknown>{
  const secrets=new Set(['password','token','secret','authorization','apikey','api_key','email']);
  return Object.fromEntries(Object.entries(payload).map(([key,value])=>[key,secrets.has(key.toLowerCase())?'[REDACTED]':value]));
}
export function safeDomText(node:HTMLElement,userInput:string):void{
  node.textContent=userInput;
}
export function publicConfig(env:Record<string,string|undefined>):{apiBase:string}{
  const apiBase=env.VITE_API_BASE||'/api';
  if(!apiBase.startsWith('/')||apiBase.startsWith('//'))throw new Error('API base must be relative');
  return {apiBase};
}
