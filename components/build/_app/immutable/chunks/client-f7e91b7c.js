let s;try{s=window.location.origin}catch{s="http://127.0.0.1:5000"}try{const t=new XMLHttpRequest;if(t.open("GET",`${s}/api/ping`),t.send(),t.response().status!==200)throw"verify failed"}catch{s="http://127.0.0.1:5000"}const n=s;async function d(t,e,o,a){return await(await fetch(`${n}/api/candles/${t}/${e}/${o}/${a}`)).json()}async function u(t){return await(await fetch(`${n}/api/peers/${t}`)).json()}async function f(t){return await(await fetch(`${n}/api/recommendation/trends/${t}`)).json()}async function y(t){await fetch(`${n}/api/notes`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,content:""})})}async function r(t){t=encodeURI(t);const e=await fetch(`${n}/api/notes/${t}`);if(e.status!==200)throw"note doesn't exists";return await e.json()}async function h(t){try{return await r(t),!0}catch{return!1}}async function l(t,e){t=encodeURI(t),await fetch(`${n}/api/notes/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:e})})}const c=["1","60","D","M"],w=[...c.map(t=>({value:t,name:t}))];function $(t){return"dashboard-"+t.sort().join("-")}export{y as a,f as b,d as c,r as g,h as n,u as p,w as r,$ as s,l as u};