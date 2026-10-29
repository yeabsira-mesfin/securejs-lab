/** Example HTTP client: explicit timeout, content validation, safe error exposure. */
export async function requestJson<T>(url:string,token:string,timeoutMs=5000):Promise<T>{
  if(!url.startsWith('/')||url.startsWith('//'))throw Error('Only same-origin relative URLs are permitted');
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),timeoutMs);
  try{
    const response=await fetch(url,{method:'GET',signal:controller.signal,headers:{Accept:'application/json',...(token?{Authorization:'Bearer '+token}:{})},credentials:'omit'});
    if(!response.ok)throw Error('Request failed with status '+response.status);
    if(!response.headers.get('content-type')?.includes('application/json'))throw Error('Unexpected response type');
    return await response.json() as T;
  }catch(error){
    if(error instanceof Error&&error.name==='AbortError')throw new Error('Request timed out');
    throw error;
  }finally{clearTimeout(timer);}
}
