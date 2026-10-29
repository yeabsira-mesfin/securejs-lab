import {useState} from 'react';
import {safeMerge,validateAttendee,canRead,canWrite,sanitizeForLog} from './security';
import {names,fromCountry,areAllAdults,Person} from './arrays';

type Lab='validation'|'prototype'|'xss'|'access'|'logging'|'es6';
const labs:{id:Lab;title:string;category:string;description:string;icon:string}[]=[
{id:'validation',title:'Input validation',category:'OWASP INJECTION',description:'Reject malformed, unexpected or oversized fields.',icon:'▤'},
{id:'prototype',title:'Prototype pollution',category:'OBJECT SECURITY',description:'Block dangerous object keys before merging data.',icon:'◈'},
{id:'xss',title:'DOM XSS',category:'BROWSER SECURITY',description:'Display untrusted content as text, not executable markup.',icon:'◇'},
{id:'access',title:'Object authorization',category:'ACCESS CONTROL',description:'Protect records with least-privilege ownership checks.',icon:'◎'},
{id:'logging',title:'Safe logging',category:'DATA PROTECTION',description:'Keep secrets and personal data out of diagnostic logs.',icon:'▣'},
{id:'es6',title:'ES6 array operations',category:'LANGUAGE FUNDAMENTALS',description:'Test map, filter, every and related array methods.',icon:'⌘'}
];
const samplePeople:Person[]=[{name:'Ava',age:25,country:'USA'},{name:'Noah',age:16,country:'Canada'},{name:'Mia',age:32,country:'USA'}];
export default function App(){
 const [active,setActive]=useState<Lab>('validation'),[text,setText]=useState('{"name":"Demo Attendee","email":"demo@example.test"}');
 const [result,setResult]=useState('Select Run safe example to view validated output.');
 const [role,setRole]=useState<'admin'|'maintainer'|'viewer'>('viewer');
 const [owner,setOwner]=useState(false);
 const [tab,setTab]=useState<'labs'|'curriculum'>('labs');
 const current=labs.find(l=>l.id===active)!;
 function selectLab(id:Lab){setActive(id);setResult('Select Run safe example to view validated output.');setText(id==='prototype'?'{"__proto__":{"isAdmin":true}}':id==='xss'?'<img src=x onerror=alert(1)>':id==='logging'?'{"email":"demo@example.test","token":"synthetic-secret","action":"read"}':id==='validation'?'{"name":"Demo Attendee","email":"demo@example.test"}':'');}
 function run(){
  try{
   let output:unknown;
   switch(active){
    case 'validation':output=validateAttendee(JSON.parse(text));break;
    case 'prototype':output=safeMerge({},JSON.parse(text));break;
    case 'xss':output={renderedAsPlainText:text,executedAsMarkup:false};break;
    case 'access':{
     const principal={id:owner?'owner':'other',role};
     const record={id:'record-17',ownerId:'owner',classification:'private' as const};
     output={canRead:canRead(principal,record),canWrite:canWrite(principal,record),reason:'Server-side checks are required in real applications.'};break;
    }
    case 'logging':output=sanitizeForLog(JSON.parse(text));break;
    case 'es6':output={names:names(samplePeople),fromUSA:fromCountry(samplePeople,'USA').map(p=>p.name),allAdults:areAllAdults(samplePeople)};break;
   }
   setResult(JSON.stringify(output,null,2));
  }catch(e){setResult('Rejected safely: '+(e instanceof Error?e.message:'Invalid input'));}
 }
 const vulnerable={
  validation:'const name = req.body.name; // trust unvalidated input',
  prototype:'Object.assign(target, JSON.parse(untrustedJson));',
  xss:'element.innerHTML = userInput; // executes untrusted HTML',
  access:'return database.findById(recordId); // no ownership check',
  logging:'console.log("request", req.body); // may expose secrets',
  es6:'people.filter(p => p.country === "USA"); // existing ES6 exercise'
 } as const;
 const corrected={
  validation:'validateAttendee(input); // typed, bounded, normalized',
  prototype:'safeMerge(target, source); // deny dangerous keys',
  xss:'node.textContent = userInput; // text, not HTML',
  access:'canRead(principal, record); // owner or admin',
  logging:'sanitizeForLog(request); // redact sensitive keys',
  es6:'fromCountry(people, "USA"); // reusable, typed helper'
 } as const;
 return <div className="app">
  <aside className="sidebar"><div className="brand"><span>⬡</span><div>SECUREJS <b>LAB</b><small>SECURE CODE, EXPLAINED</small></div></div><div className="nav-caption">LEARNING WORKSPACE</div><nav aria-label="Main sections"><button onClick={()=>setTab('labs')} className={tab==='labs'?'active':''}>▦ Interactive labs</button><button onClick={()=>setTab('curriculum')} className={tab==='curriculum'?'active':''}>▤ Curriculum</button></nav><div className="nav-caption">SECURITY MODULES</div><nav aria-label="Security modules">{labs.map(l=><button key={l.id} className={active===l.id&&tab==='labs'?'active':''} onClick={()=>{setTab('labs');selectLab(l.id);}}><span>{l.icon}</span>{l.title}</button>)}</nav><div className="side-note"><strong>ISOLATED DEMONSTRATIONS</strong><p>Examples compare code patterns without exposing vulnerable production endpoints.</p></div></aside>
  <div className="main"><header className="topbar"><span>Learn / <strong>{tab==='labs'?current.title:'Curriculum'}</strong></span><div className="top-badge"><span className="pulse"/> SAFE DEMO MODE</div></header><main className="content">
  {tab==='labs'&&<><div className="headline"><div><span className="eyebrow">JAVASCRIPT & TYPESCRIPT APPLICATION SECURITY</span><h1>Understand the flaw. <em>Build the fix.</em></h1><p>Hands-on security patterns with an isolated interactive playground and deterministic examples.</p></div><div className="shield">⬡</div></div><div className="summary"><div><small>SECURE CODING LABS</small><strong>06</strong><span>Practical exercises</span></div><div><small>ORIGINAL MODULES</small><strong>15</strong><span>ES6 source examples</span></div><div><small>TEST FRAMEWORK</small><strong>Vitest</strong><span>Automated validation</span></div></div>
   <section className="section-head"><div><span className="eyebrow">CHOOSE A MODULE</span><h2>Security challenges</h2></div></section><div className="lab-cards">{labs.map(l=><button key={l.id} className={'lab-card '+(active===l.id?'selected':'')} onClick={()=>selectLab(l.id)}><span className="lab-icon">{l.icon}</span><small>{l.category}</small><strong>{l.title}</strong><span>{l.description}</span></button>)}</div>
   <div className="editor-section"><section className="panel"><div className="panel-title"><div><span className="eyebrow">INTERACTIVE PLAYGROUND</span><h2>{current.title}</h2></div><span className="demo-chip">SAFE EXECUTION</span></div><p>{current.description}</p>{['validation','prototype','xss','logging'].includes(active)&&<label className="input-label">{active==='xss'?'Untrusted content':'JSON input'}<textarea rows={5} spellCheck={false} value={text} onChange={e=>setText(e.target.value)}/></label>}{active==='access'&&<div className="form-controls"><label>Acting role<select value={role} onChange={e=>setRole(e.target.value as typeof role)}><option value="viewer">Viewer</option><option value="maintainer">Maintainer</option><option value="admin">Admin</option></select></label><label className="check-label"><input type="checkbox" checked={owner} onChange={e=>setOwner(e.target.checked)}/> Acting user owns record</label></div>}{active==='es6'&&<div className="people">{samplePeople.map(p=><span key={p.name}>{p.name} · {p.age} · {p.country}</span>)}</div>}<button className="primary" onClick={run}>▷ Run safe example</button><div className="output-title">OUTPUT <span>Read-only result</span></div><pre className="output" role="status">{result}</pre></section><section className="panel compare"><div className="panel-title"><div><span className="eyebrow">CODE COMPARISON</span><h2>From risky to resilient</h2></div></div><div className="code-label bad">✕ Risky pattern (display only)</div><pre>{vulnerable[active]}</pre><div className="code-label good">✓ Safer implementation</div><pre>{corrected[active]}</pre><div className="explanation"><strong>Why this matters</strong><p>{active==='access'?'Client checks are not a security boundary. Apply the same policy on every backend read and write.':active==='xss'?'Never inject untrusted HTML directly into the DOM. React escapes rendered text by default.':active==='prototype'?'Objects parsed from untrusted input can contain keys that affect prototypes. Validate and block these keys before merging.':active==='logging'?'Logs are often long-lived and widely accessible. Remove credentials, tokens and unnecessary personal data.':active==='validation'?'Validation rejects bad shape, length and format before data reaches business logic.':'Original array exercises are preserved while typed helpers are tested for correctness.'}</p></div></section></div>
  </>}
  {tab==='curriculum'&&<><div className="headline"><div><span className="eyebrow">STRUCTURED LEARNING PATH</span><h1>ES6 to secure engineering</h1><p>Preserved fundamentals, type-safe modules, practical AppSec patterns, and a reproducible test suite.</p></div></div><div className="curriculum">{[['01','ES6 foundations','Destructuring, rest/spread, defaults, template literals, short-circuiting and ternaries.'],['02','Array operations','Map, filter, find, findIndex, every, some, includes and indexOf.'],['03','Input and object safety','Validation, prototype pollution prevention, safe configuration and safe DOM rendering.'],['04','Identity and safe operations','Record ownership, RBAC decisions, logging redaction and reliable async HTTP.'],['05','Verification and delivery','Vitest unit tests, coverage reports, TypeScript checks, dependency scanning and CI.']].map(([num,title,description])=><div className="curriculum-item" key={num}><span>{num}</span><div><h2>{title}</h2><p>{description}</p></div></div>)}</div><div className="panel"><h2>Verify locally</h2><pre className="output">npm install{'\n'}npm run check{'\n'}npm test{'\n'}npm run coverage{'\n'}npm run build{'\n'}npm run audit</pre><p>Test, build and scan results are recorded in the GitHub Actions workflow.</p></div></>}
 </main></div></div>;
}
