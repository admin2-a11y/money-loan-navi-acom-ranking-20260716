import fs from "node:fs";
import path from "node:path";
const root=path.resolve(import.meta.dirname,"..");
const pages=["experienced.html","beginner.html","experienced-result.html","beginner-result.html"];
const js=fs.readFileSync(path.join(root,"js/site.js"),"utf8");
const expected=['{key:"acom"','{key:"mobit"','{key:"promise"','{key:"aiful"'];
let last=-1;for(const token of expected){const pos=js.indexOf(token);if(pos<0||pos<last)throw new Error(`bad lender order: ${token}`);last=pos}
for(const page of pages){const html=fs.readFileSync(path.join(root,page),"utf8");if(!html.includes("data-comparison")||!html.includes("data-cards")||!html.includes("data-final"))throw new Error(`${page}: missing required section`);if(!html.includes("redirect.html?item=acom"))throw new Error(`${page}: missing Acom final CTA`);const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);if(new Set(ids).size!==ids.length)throw new Error(`${page}: duplicate IDs`)}
const redirect=fs.readFileSync(path.join(root,"redirect.html"),"utf8");for(const sensitive of ["income","job","amount","current_loans","company_size","duration","priority"]){if(new RegExp(`allowed[^;]*${sensitive}`).test(redirect))throw new Error(`sensitive redirect key: ${sensitive}`)}
const refs=new Set();for(const file of fs.readdirSync(root).filter(f=>f.endsWith(".html"))){const html=fs.readFileSync(path.join(root,file),"utf8");for(const m of html.matchAll(/(?:src|href)="\.\/([^"?#]+)["?#]?/g)){if(!m[1].endsWith(".php"))refs.add(m[1])}}
for(const ref of refs){if(ref.includes("${"))continue;if(!fs.existsSync(path.join(root,ref)))throw new Error(`missing ref: ${ref}`)}
console.log(`contract ok: ${pages.length} ranked pages, ${refs.size} local refs`);
