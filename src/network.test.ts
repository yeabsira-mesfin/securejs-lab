import {describe,it,expect,vi,afterEach} from 'vitest';
import {requestJson} from './network';
afterEach(()=>vi.unstubAllGlobals());
describe('secure asynchronous API handling',()=>{
 it('rejects requests to external URLs',async()=>{await expect(requestJson('https://example.com','')).rejects.toThrow(/relative/);});
 it('validates content type and parses JSON',async()=>{
  const mock=vi.fn().mockResolvedValue({ok:true,headers:{get:()=> 'application/json'},json:async()=>({status:'ok'})});
  vi.stubGlobal('fetch',mock);
  await expect(requestJson('/api/status','token')).resolves.toEqual({status:'ok'});
  expect(mock).toHaveBeenCalledTimes(1);
 });
 it('does not echo arbitrary backend error bodies',async()=>{
  vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:false,status:500}));
  await expect(requestJson('/api/health','')).rejects.toThrow('Request failed with status 500');
 });
});
