// Checks every external <a href> in the built site (run after npm run build)
import fs from 'fs'; import path from 'path';
const urls=new Map();
(function walk(d){for(const f of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,f.name);
  if(f.isDirectory()) walk(p); else if(f.name.endsWith('.html')){
    const h=fs.readFileSync(p,'utf8');
    for(const m of h.matchAll(/<a [^>]*href=["']?(https?:\/\/[^"'\s>]+)/g)){const u=m[1].replace(/&amp;/g,'&'); if(!urls.has(u)) urls.set(u,p.replace('build/',''));}
  }}})('build');
const list=[...urls.keys()]; console.log('external links:',list.length);
const bad=[]; let i=0;
async function chk(u, attempt = 1){
  const status = await chkOnce(u);
  // One retry: external sites occasionally time out or rate-limit
  if (status && attempt < 2) { await new Promise(r=>setTimeout(r,1500)); return chk(u, attempt + 1); }
  return status;
}
async function chkOnce(u){
  for(const method of ['HEAD','GET']){
    try{const r=await fetch(u,{method,redirect:'follow',signal:AbortSignal.timeout(15000),headers:{'user-agent':'Mozilla/5.0 link-check'}});
      if(r.status<400) return null;
      // Some sites reject automated requests; a 403/429 there is not a dead link
      if([403,429,999].includes(r.status) && /(^|\.)(medium\.com|linkedin\.com|x\.com|twitter\.com)$/.test(new URL(u).hostname)) return null; if(method==='GET') return r.status;}catch(e){if(method==='GET') return 'ERR '+e.message.slice(0,40);}
  }}
await Promise.all(Array.from({length:8},async()=>{while(i<list.length){const u=list[i++];const s=await chk(u); if(s) bad.push([s,u,urls.get(u)]);}}));
console.log(JSON.stringify(bad,null,1));
if (bad.length) process.exit(1);
