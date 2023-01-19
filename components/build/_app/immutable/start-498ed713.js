import{S as nt,i as at,s as rt,a as ot,e as F,c as it,b as z,g as de,t as B,d as pe,f as M,h as G,j as st,o as Oe,k as lt,l as ct,m as ft,n as ve,p as q,q as ut,r as dt,u as pt,v as W,w as Y,x as je,y as X,z as Z,A as ce}from"./chunks/index-bec66cf6.js";import{S as et,I as C,g as ze,f as He,a as Ee,b as fe,s as K,i as We,c as ue,P as Ye,d as ht,e as mt,h as _t}from"./chunks/singletons-674447c6.js";import{_ as V}from"./chunks/preload-helper-41c905a7.js";function gt(a,e){return a==="/"||e==="ignore"?a:e==="never"?a.endsWith("/")?a.slice(0,-1):a:e==="always"&&!a.endsWith("/")?a+"/":a}function yt(a){return a.split("%25").map(decodeURI).join("%25")}function wt(a){for(const e in a)a[e]=decodeURIComponent(a[e]);return a}const bt=["href","pathname","search","searchParams","toString","toJSON"];function vt(a,e){const n=new URL(a);for(const l of bt){let i=n[l];Object.defineProperty(n,l,{get(){return e(),i},enumerable:!0,configurable:!0})}return Et(n),n}function Et(a){Object.defineProperty(a,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const kt="/__data.json";function Rt(a){return a.replace(/\/$/,"")+kt}function St(a){let e=5381;if(typeof a=="string"){let n=a.length;for(;n;)e=e*33^a.charCodeAt(--n)}else if(ArrayBuffer.isView(a)){const n=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);let l=n.length;for(;l;)e=e*33^n[--l]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const he=window.fetch;window.fetch=(a,e)=>((a instanceof Request?a.method:(e==null?void 0:e.method)||"GET")!=="GET"&&te.delete(Ne(a)),he(a,e));const te=new Map;function Lt(a,e){const n=Ne(a,e),l=document.querySelector(n);if(l!=null&&l.textContent){const{body:i,...m}=JSON.parse(l.textContent),t=l.getAttribute("data-ttl");return t&&te.set(n,{body:i,init:m,ttl:1e3*Number(t)}),Promise.resolve(new Response(i,m))}return he(a,e)}function Ot(a,e,n){if(te.size>0){const l=Ne(a,n),i=te.get(l);if(i){if(performance.now()<i.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(i.body,i.init);te.delete(l)}}return he(e,n)}function Ne(a,e){let l=`script[data-sveltekit-fetched][data-url=${JSON.stringify(a instanceof Request?a.url:a)}]`;return e!=null&&e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&(l+=`[data-hash="${St(e.body)}"]`),l}const It=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function At(a){const e=[];return{pattern:a==="/"?/^\/$/:new RegExp(`^${jt(a).map(l=>{const i=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(l);if(i)return e.push({name:i[1],matcher:i[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const m=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(l);if(m)return e.push({name:m[1],matcher:m[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!l)return;const t=l.split(/\[(.+?)\](?!\])/);return"/"+t.map((h,_)=>{if(_%2){if(h.startsWith("x+"))return ke(String.fromCharCode(parseInt(h.slice(2),16)));if(h.startsWith("u+"))return ke(String.fromCharCode(...h.slice(2).split("-").map(P=>parseInt(P,16))));const y=It.exec(h);if(!y)throw new Error(`Invalid param: ${h}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,v,S,U,$]=y;return e.push({name:U,matcher:$,optional:!!v,rest:!!S,chained:S?_===1&&t[0]==="":!1}),S?"(.*?)":v?"([^/]*)?":"([^/]+?)"}return ke(h)}).join("")}).join("")}/?$`),params:e}}function Pt(a){return!/^\([^)]+\)$/.test(a)}function jt(a){return a.slice(1).split("/").filter(Pt)}function Nt(a,e,n){const l={},i=a.slice(1);let m="";for(let t=0;t<e.length;t+=1){const f=e[t];let h=i[t];if(f.chained&&f.rest&&m&&(h=h?m+"/"+h:m),m="",h===void 0)f.rest&&(l[f.name]="");else{if(f.matcher&&!n[f.matcher](h)){if(f.optional&&f.chained){let _=i.indexOf(void 0,t);if(_===-1){const y=e[t+1];if(y!=null&&y.rest&&y.chained)m=h;else return}for(;_>=t;)i[_]=i[_-1],_-=1;continue}return}l[f.name]=h}}if(!m)return l}function ke(a){return a.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Tt(a,e,n,l){const i=new Set(e);return Object.entries(n).map(([f,[h,_,y]])=>{const{pattern:v,params:S}=At(f),U={id:f,exec:$=>{const P=v.exec($);if(P)return Nt(P,S,l)},errors:[1,...y||[]].map($=>a[$]),layouts:[0,..._||[]].map(t),leaf:m(h)};return U.errors.length=U.layouts.length=Math.max(U.errors.length,U.layouts.length),U});function m(f){const h=f<0;return h&&(f=~f),[h,a[f]]}function t(f){return f===void 0?f:[i.has(f),a[f]]}}function Ut(a){let e,n,l;var i=a[0][0];function m(t){return{props:{data:t[2],form:t[1]}}}return i&&(e=W(i,m(a))),{c(){e&&Y(e.$$.fragment),n=F()},l(t){e&&je(e.$$.fragment,t),n=F()},m(t,f){e&&X(e,t,f),z(t,n,f),l=!0},p(t,f){const h={};if(f&4&&(h.data=t[2]),f&2&&(h.form=t[1]),i!==(i=t[0][0])){if(e){de();const _=e;B(_.$$.fragment,1,0,()=>{Z(_,1)}),pe()}i?(e=W(i,m(t)),Y(e.$$.fragment),M(e.$$.fragment,1),X(e,n.parentNode,n)):e=null}else i&&e.$set(h)},i(t){l||(e&&M(e.$$.fragment,t),l=!0)},o(t){e&&B(e.$$.fragment,t),l=!1},d(t){t&&G(n),e&&Z(e,t)}}}function $t(a){let e,n,l;var i=a[0][0];function m(t){return{props:{data:t[2],$$slots:{default:[Dt]},$$scope:{ctx:t}}}}return i&&(e=W(i,m(a))),{c(){e&&Y(e.$$.fragment),n=F()},l(t){e&&je(e.$$.fragment,t),n=F()},m(t,f){e&&X(e,t,f),z(t,n,f),l=!0},p(t,f){const h={};if(f&4&&(h.data=t[2]),f&523&&(h.$$scope={dirty:f,ctx:t}),i!==(i=t[0][0])){if(e){de();const _=e;B(_.$$.fragment,1,0,()=>{Z(_,1)}),pe()}i?(e=W(i,m(t)),Y(e.$$.fragment),M(e.$$.fragment,1),X(e,n.parentNode,n)):e=null}else i&&e.$set(h)},i(t){l||(e&&M(e.$$.fragment,t),l=!0)},o(t){e&&B(e.$$.fragment,t),l=!1},d(t){t&&G(n),e&&Z(e,t)}}}function Dt(a){let e,n,l;var i=a[0][1];function m(t){return{props:{data:t[3],form:t[1]}}}return i&&(e=W(i,m(a))),{c(){e&&Y(e.$$.fragment),n=F()},l(t){e&&je(e.$$.fragment,t),n=F()},m(t,f){e&&X(e,t,f),z(t,n,f),l=!0},p(t,f){const h={};if(f&8&&(h.data=t[3]),f&2&&(h.form=t[1]),i!==(i=t[0][1])){if(e){de();const _=e;B(_.$$.fragment,1,0,()=>{Z(_,1)}),pe()}i?(e=W(i,m(t)),Y(e.$$.fragment),M(e.$$.fragment,1),X(e,n.parentNode,n)):e=null}else i&&e.$set(h)},i(t){l||(e&&M(e.$$.fragment,t),l=!0)},o(t){e&&B(e.$$.fragment,t),l=!1},d(t){t&&G(n),e&&Z(e,t)}}}function Xe(a){let e,n=a[5]&&Ze(a);return{c(){e=lt("div"),n&&n.c(),this.h()},l(l){e=ct(l,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var i=ft(e);n&&n.l(i),i.forEach(G),this.h()},h(){ve(e,"id","svelte-announcer"),ve(e,"aria-live","assertive"),ve(e,"aria-atomic","true"),q(e,"position","absolute"),q(e,"left","0"),q(e,"top","0"),q(e,"clip","rect(0 0 0 0)"),q(e,"clip-path","inset(50%)"),q(e,"overflow","hidden"),q(e,"white-space","nowrap"),q(e,"width","1px"),q(e,"height","1px")},m(l,i){z(l,e,i),n&&n.m(e,null)},p(l,i){l[5]?n?n.p(l,i):(n=Ze(l),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(l){l&&G(e),n&&n.d()}}}function Ze(a){let e;return{c(){e=ut(a[6])},l(n){e=dt(n,a[6])},m(n,l){z(n,e,l)},p(n,l){l&64&&pt(e,n[6])},d(n){n&&G(e)}}}function Vt(a){let e,n,l,i,m;const t=[$t,Ut],f=[];function h(y,v){return y[0][1]?0:1}e=h(a),n=f[e]=t[e](a);let _=a[4]&&Xe(a);return{c(){n.c(),l=ot(),_&&_.c(),i=F()},l(y){n.l(y),l=it(y),_&&_.l(y),i=F()},m(y,v){f[e].m(y,v),z(y,l,v),_&&_.m(y,v),z(y,i,v),m=!0},p(y,[v]){let S=e;e=h(y),e===S?f[e].p(y,v):(de(),B(f[S],1,1,()=>{f[S]=null}),pe(),n=f[e],n?n.p(y,v):(n=f[e]=t[e](y),n.c()),M(n,1),n.m(l.parentNode,l)),y[4]?_?_.p(y,v):(_=Xe(y),_.c(),_.m(i.parentNode,i)):_&&(_.d(1),_=null)},i(y){m||(M(n),m=!0)},o(y){B(n),m=!1},d(y){f[e].d(y),y&&G(l),_&&_.d(y),y&&G(i)}}}function qt(a,e,n){let{stores:l}=e,{page:i}=e,{components:m}=e,{form:t}=e,{data_0:f=null}=e,{data_1:h=null}=e;st(l.page.notify);let _=!1,y=!1,v=null;return Oe(()=>{const S=l.page.subscribe(()=>{_&&(n(5,y=!0),n(6,v=document.title||"untitled page"))});return n(4,_=!0),S}),a.$$set=S=>{"stores"in S&&n(7,l=S.stores),"page"in S&&n(8,i=S.page),"components"in S&&n(0,m=S.components),"form"in S&&n(1,t=S.form),"data_0"in S&&n(2,f=S.data_0),"data_1"in S&&n(3,h=S.data_1)},a.$$.update=()=>{a.$$.dirty&384&&l.page.set(i)},[m,t,f,h,_,y,v,l,i]}class Ct extends nt{constructor(e){super(),at(this,e,qt,Vt,rt,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const Ft={},me=[()=>V(()=>import("./chunks/0-28c114f9.js"),["./chunks/0-28c114f9.js","./chunks/_layout-da46b06b.js","./components/pages/_layout.svelte-e6a2b042.js","./chunks/index-bec66cf6.js","./assets/_layout-3ecd69c8.css"],import.meta.url),()=>V(()=>import("./chunks/1-a97097ad.js"),["./chunks/1-a97097ad.js","./components/error.svelte-67ac89fc.js","./chunks/index-bec66cf6.js","./chunks/singletons-674447c6.js","./chunks/index-06c04e20.js"],import.meta.url),()=>V(()=>import("./chunks/2-bbe3dba9.js"),["./chunks/2-bbe3dba9.js","./components/pages/_page.svelte-6c4bdd2e.js","./chunks/index-bec66cf6.js","./chunks/vs-693c3a3a.js","./chunks/preload-helper-41c905a7.js","./assets/vs-19c14bc3.css","./assets/_page-3cf2ec16.css"],import.meta.url),()=>V(()=>import("./chunks/3-def38aed.js"),["./chunks/3-def38aed.js","./components/pages/candles/_page.svelte-d102d9a2.js","./chunks/index-bec66cf6.js","./chunks/candles-d329ea0c.js","./chunks/client-f7e91b7c.js","./chunks/timestamp-2a2772e4.js","./chunks/chart-017ebc62.js"],import.meta.url),()=>V(()=>import("./chunks/4-f5939896.js"),["./chunks/4-f5939896.js","./components/pages/dashboard/_page.svelte-3d957b78.js","./chunks/index-bec66cf6.js","./chunks/NumberInput-47c36468.js","./assets/NumberInput-1d121e74.css","./chunks/index-06c04e20.js","./chunks/editor-32cc1838.js","./chunks/vs-693c3a3a.js","./chunks/preload-helper-41c905a7.js","./assets/vs-19c14bc3.css","./chunks/now-9ded6817.js","./chunks/client-f7e91b7c.js","./assets/editor-cfa6e445.css","./chunks/candles-d329ea0c.js","./chunks/timestamp-2a2772e4.js","./chunks/chart-017ebc62.js","./chunks/heatmap-1d76fe3f.js","./assets/_page-bad9e80e.css"],import.meta.url),()=>V(()=>import("./chunks/5-e2690734.js"),["./chunks/5-e2690734.js","./components/pages/editor/_page.svelte-e5004882.js","./chunks/index-bec66cf6.js","./chunks/editor-32cc1838.js","./chunks/vs-693c3a3a.js","./chunks/preload-helper-41c905a7.js","./assets/vs-19c14bc3.css","./chunks/now-9ded6817.js","./chunks/client-f7e91b7c.js","./assets/editor-cfa6e445.css"],import.meta.url),()=>V(()=>import("./chunks/6-b63aa709.js"),["./chunks/6-b63aa709.js","./components/pages/gains/_page.svelte-8ff9e769.js","./chunks/index-bec66cf6.js","./chunks/NumberInput-47c36468.js","./assets/NumberInput-1d121e74.css"],import.meta.url),()=>V(()=>import("./chunks/7-57c2caaf.js"),["./chunks/7-57c2caaf.js","./components/pages/heatmap/_page.svelte-a0bc79a4.js","./chunks/index-bec66cf6.js","./chunks/heatmap-1d76fe3f.js","./chunks/client-f7e91b7c.js","./chunks/timestamp-2a2772e4.js","./chunks/chart-017ebc62.js"],import.meta.url),()=>V(()=>import("./chunks/8-5609a079.js"),["./chunks/8-5609a079.js","./components/pages/peers/_page.svelte-be796ea8.js","./chunks/index-bec66cf6.js","./chunks/client-f7e91b7c.js","./chunks/chart-017ebc62.js"],import.meta.url),()=>V(()=>import("./chunks/9-59ec4c1f.js"),["./chunks/9-59ec4c1f.js","./components/pages/recommendation-trends/_page.svelte-ba395786.js","./chunks/index-bec66cf6.js","./chunks/client-f7e91b7c.js","./chunks/chart-017ebc62.js"],import.meta.url)],Bt=[],Mt={"/":[2],"/candles":[3],"/dashboard":[4],"/editor":[5],"/gains":[6],"/heatmap":[7],"/peers":[8],"/recommendation-trends":[9]},Gt={handleError:({error:a})=>{console.error(a)}};class Ie{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Qe{constructor(e,n){this.status=e,this.location=n}}async function Jt(a){var e;for(const n in a)if(typeof((e=a[n])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(a).map(async([l,i])=>[l,await i])));return a}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Kt=-1,zt=-2,Ht=-3,Wt=-4,Yt=-5,Xt=-6;function Zt(a){if(typeof a=="number")return l(a,!0);if(!Array.isArray(a)||a.length===0)throw new Error("Invalid input");const e=a,n=Array(e.length);function l(i,m=!1){if(i===Kt)return;if(i===Ht)return NaN;if(i===Wt)return 1/0;if(i===Yt)return-1/0;if(i===Xt)return-0;if(m)throw new Error("Invalid input");if(i in n)return n[i];const t=e[i];if(!t||typeof t!="object")n[i]=t;else if(Array.isArray(t))if(typeof t[0]=="string")switch(t[0]){case"Date":n[i]=new Date(t[1]);break;case"Set":const h=new Set;n[i]=h;for(let v=1;v<t.length;v+=1)h.add(l(t[v]));break;case"Map":const _=new Map;n[i]=_;for(let v=1;v<t.length;v+=2)_.set(l(t[v]),l(t[v+1]));break;case"RegExp":n[i]=new RegExp(t[1],t[2]);break;case"Object":n[i]=Object(t[1]);break;case"BigInt":n[i]=BigInt(t[1]);break;case"null":const y=Object.create(null);n[i]=y;for(let v=1;v<t.length;v+=2)y[t[v]]=l(t[v+1]);break}else{const f=new Array(t.length);n[i]=f;for(let h=0;h<t.length;h+=1){const _=t[h];_!==zt&&(f[h]=l(_))}}else{const f={};n[i]=f;for(const h in t){const _=t[h];f[h]=l(_)}}return n[i]}return l(0)}const Re=Tt(me,Bt,Mt,Ft),Ae=me[0],Pe=me[1];Ae();Pe();let ne={};try{ne=JSON.parse(sessionStorage[et])}catch{}function Se(a){ne[a]=ue()}function Qt({target:a,base:e}){var Ge;const n=document.documentElement,l=[];let i=null;const m={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},f=!1,h=!1,_=!0,y=!1,v=!1,S=!1,U=!1,$,P=(Ge=history.state)==null?void 0:Ge[C];P||(P=Date.now(),history.replaceState({...history.state,[C]:P},"",location.href));const _e=ne[P];_e&&(history.scrollRestoration="manual",scrollTo(_e.x,_e.y));let J,Te,ae;async function Ue(){ae=ae||Promise.resolve(),await ae,ae=null;const r=new URL(location.href),o=ie(r,!0);i=null,await De(o,r,[])}async function ge(r,{noScroll:o=!1,replaceState:c=!1,keepFocus:s=!1,state:d={},invalidateAll:u=!1},p,w){return typeof r=="string"&&(r=new URL(r,ze(document))),se({url:r,scroll:o?ue():null,keepfocus:s,redirect_chain:p,details:{state:d,replaceState:c},nav_token:w,accepted:()=>{u&&(U=!0)},blocked:()=>{},type:"goto"})}async function $e(r){const o=ie(r,!1);if(!o)throw new Error(`Attempted to preload a URL that does not belong to this app: ${r}`);return i={id:o.id,promise:Ce(o).then(c=>(c.type==="loaded"&&c.state.error&&(i=null),c))},i.promise}async function re(...r){const c=Re.filter(s=>r.some(d=>s.exec(d))).map(s=>Promise.all([...s.layouts,s.leaf].map(d=>d==null?void 0:d[1]())));await Promise.all(c)}async function De(r,o,c,s,d={},u){var w,b;Te=d;let p=r&&await Ce(r);if(p||(p=await Me(o,{id:null},await ee(new Error(`Not found: ${o.pathname}`),{url:o,params:{},route:{id:null}}),404)),o=(r==null?void 0:r.url)||o,Te!==d)return!1;if(p.type==="redirect")if(c.length>10||c.includes(o.pathname))p=await oe({status:500,error:await ee(new Error("Redirect loop"),{url:o,params:{},route:{id:null}}),url:o,route:{id:null}});else return ge(new URL(p.location,o).href,{},[...c,o.pathname],d),!1;else((b=(w=p.props)==null?void 0:w.page)==null?void 0:b.status)>=400&&await K.updated.check()&&await le(o);if(l.length=0,U=!1,y=!0,s&&s.details){const{details:g}=s,k=g.replaceState?0:1;g.state[C]=P+=k,history[g.replaceState?"replaceState":"pushState"](g.state,"",o)}if(i=null,h?(t=p.state,p.props.page&&(p.props.page.url=o),$.$set(p.props)):Ve(p),s){const{scroll:g,keepfocus:k}=s;if(k||Le(),await ce(),_){const L=o.hash&&document.getElementById(o.hash.slice(1));g?scrollTo(g.x,g.y):L?L.scrollIntoView():scrollTo(0,0)}}else await ce();_=!0,p.props.page&&(J=p.props.page),u&&u(),y=!1}function Ve(r){var s;t=r.state;const o=document.querySelector("style[data-sveltekit]");o&&o.remove(),J=r.props.page,$=new Ct({target:a,props:{...r.props,stores:K},hydrate:!0});const c={from:null,to:{params:t.params,route:{id:((s=t.route)==null?void 0:s.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};m.after_navigate.forEach(d=>d(c)),h=!0}async function Q({url:r,params:o,branch:c,status:s,error:d,route:u,form:p}){const w=c.filter(Boolean);let b="never";for(const O of c)(O==null?void 0:O.slash)!==void 0&&(b=O.slash);r.pathname=gt(r.pathname,b),r.search=r.search;const g={type:"loaded",state:{url:r,params:o,branch:c,error:d,route:u},props:{components:w.map(O=>O.node.component)}};p!==void 0&&(g.props.form=p);let k={},L=!J;for(let O=0;O<w.length;O+=1){const E=w[O];k={...k,...E.data},(L||!t.branch.some(N=>N===E))&&(g.props[`data_${O}`]=k,L=L||Object.keys(E.data??{}).length>0)}return L||(L=Object.keys(J.data).length!==Object.keys(k).length),(!t.url||r.href!==t.url.href||t.error!==d||p!==void 0||L)&&(g.props.page={error:d,params:o,route:{id:(u==null?void 0:u.id)??null},status:s,url:new URL(r),form:p??null,data:L?k:J.data}),g}async function ye({loader:r,parent:o,url:c,params:s,route:d,server_data_node:u}){var g,k,L;let p=null;const w={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},b=await r();if((g=b.universal)!=null&&g.load){let D=function(...E){for(const N of E){const{href:T}=new URL(N,c);w.dependencies.add(T)}};const O={route:{get id(){return w.route=!0,d.id}},params:new Proxy(s,{get:(E,N)=>(w.params.add(N),E[N])}),data:(u==null?void 0:u.data)??null,url:vt(c,()=>{w.url=!0}),async fetch(E,N){let T;E instanceof Request?(T=E.url,N={body:E.method==="GET"||E.method==="HEAD"?void 0:await E.blob(),cache:E.cache,credentials:E.credentials,headers:E.headers,integrity:E.integrity,keepalive:E.keepalive,method:E.method,mode:E.mode,redirect:E.redirect,referrer:E.referrer,referrerPolicy:E.referrerPolicy,signal:E.signal,...N}):T=E;const R=new URL(T,c).href;return D(R),h?Ot(T,R,N):Lt(T,N)},setHeaders:()=>{},depends:D,parent(){return w.parent=!0,o()}};p=await b.universal.load.call(null,O)??null,p=p?await Jt(p):null}return{node:b,loader:r,server:u,universal:(k=b.universal)!=null&&k.load?{type:"data",data:p,uses:w}:null,data:p??(u==null?void 0:u.data)??null,slash:((L=b.universal)==null?void 0:L.trailingSlash)??(u==null?void 0:u.slash)}}function qe(r,o,c,s,d){if(U)return!0;if(!s)return!1;if(s.parent&&r||s.route&&o||s.url&&c)return!0;for(const u of s.params)if(d[u]!==t.params[u])return!0;for(const u of s.dependencies)if(l.some(p=>p(new URL(u))))return!0;return!1}function we(r,o){return(r==null?void 0:r.type)==="data"?{type:"data",data:r.data,uses:{dependencies:new Set(r.uses.dependencies??[]),params:new Set(r.uses.params??[]),parent:!!r.uses.parent,route:!!r.uses.route,url:!!r.uses.url},slash:r.slash}:(r==null?void 0:r.type)==="skip"?o??null:null}async function Ce({id:r,invalidating:o,url:c,params:s,route:d}){if((i==null?void 0:i.id)===r)return i.promise;const{errors:u,layouts:p,leaf:w}=d,b=[...p,w];u.forEach(R=>R==null?void 0:R().catch(()=>{})),b.forEach(R=>R==null?void 0:R[1]().catch(()=>{}));let g=null;const k=t.url?r!==t.url.pathname+t.url.search:!1,L=t.route?r!==t.route.id:!1,D=b.reduce((R,A,j)=>{var x;const I=t.branch[j],H=!!(A!=null&&A[0])&&((I==null?void 0:I.loader)!==A[1]||qe(R.some(Boolean),L,k,(x=I.server)==null?void 0:x.uses,s));return R.push(H),R},[]);if(D.some(Boolean)){try{g=await xe(c,D)}catch(R){return oe({status:500,error:await ee(R,{url:c,params:s,route:{id:d.id}}),url:c,route:d})}if(g.type==="redirect")return g}const O=g==null?void 0:g.nodes;let E=!1;const N=b.map(async(R,A)=>{var x;if(!R)return;const j=t.branch[A],I=O==null?void 0:O[A];if((!I||I.type==="skip")&&R[1]===(j==null?void 0:j.loader)&&!qe(E,L,k,(x=j.universal)==null?void 0:x.uses,s))return j;if(E=!0,(I==null?void 0:I.type)==="error")throw I;return ye({loader:R[1],url:c,params:s,route:d,parent:async()=>{var Ke;const Je={};for(let be=0;be<A;be+=1)Object.assign(Je,(Ke=await N[be])==null?void 0:Ke.data);return Je},server_data_node:we(I===void 0&&R[0]?{type:"skip"}:I??null,j==null?void 0:j.server)})});for(const R of N)R.catch(()=>{});const T=[];for(let R=0;R<b.length;R+=1)if(b[R])try{T.push(await N[R])}catch(A){if(A instanceof Qe)return{type:"redirect",location:A.location};let j=500,I;O!=null&&O.includes(A)?(j=A.status??j,I=A.error):A instanceof Ie?(j=A.status,I=A.body):I=await ee(A,{params:s,url:c,route:{id:d.id}});const H=await Fe(R,T,u);return H?await Q({url:c,params:s,branch:T.slice(0,H.idx).concat(H.node),status:j,error:I,route:d}):await Me(c,{id:d.id},I,j)}else T.push(void 0);return await Q({url:c,params:s,branch:T,status:200,error:null,route:d,form:o?void 0:null})}async function Fe(r,o,c){for(;r--;)if(c[r]){let s=r;for(;!o[s];)s-=1;try{return{idx:s+1,node:{node:await c[r](),loader:c[r],data:{},server:null,universal:null}}}catch{continue}}}async function oe({status:r,error:o,url:c,route:s}){const d={},u=await Ae();let p=null;if(u.server)try{const g=await xe(c,[!0]);if(g.type!=="data"||g.nodes[0]&&g.nodes[0].type!=="data")throw 0;p=g.nodes[0]??null}catch{(c.origin!==location.origin||c.pathname!==location.pathname||f)&&await le(c)}const w=await ye({loader:Ae,url:c,params:d,route:s,parent:()=>Promise.resolve({}),server_data_node:we(p)}),b={node:await Pe(),loader:Pe,universal:null,server:null,data:null};return await Q({url:c,params:d,branch:[w,b],status:r,error:o,route:null})}function ie(r,o){if(We(r,e))return;const c=yt(r.pathname.slice(e.length)||"/");for(const s of Re){const d=s.exec(c);if(d)return{id:r.pathname+r.search,invalidating:o,route:s,params:wt(d),url:r}}}function Be({url:r,type:o,intent:c,delta:s}){var w,b;let d=!1;const u={from:{params:t.params,route:{id:((w=t.route)==null?void 0:w.id)??null},url:t.url},to:{params:(c==null?void 0:c.params)??null,route:{id:((b=c==null?void 0:c.route)==null?void 0:b.id)??null},url:r},willUnload:!c,type:o};s!==void 0&&(u.delta=s);const p={...u,cancel:()=>{d=!0}};return v||m.before_navigate.forEach(g=>g(p)),d?null:u}async function se({url:r,scroll:o,keepfocus:c,redirect_chain:s,details:d,type:u,delta:p,nav_token:w,accepted:b,blocked:g}){const k=ie(r,!1),L=Be({url:r,type:u,delta:p,intent:k});if(!L){g();return}Se(P),b(),v=!0,h&&K.navigating.set(L),await De(k,r,s,{scroll:o,keepfocus:c,details:d},w,()=>{v=!1,m.after_navigate.forEach(D=>D(L)),K.navigating.set(null)})}async function Me(r,o,c,s){return r.origin===location.origin&&r.pathname===location.pathname&&!f?await oe({status:s,error:c,url:r,route:o}):await le(r)}function le(r){return location.href=r.href,new Promise(()=>{})}function tt(){let r;n.addEventListener("mousemove",u=>{const p=u.target;clearTimeout(r),r=setTimeout(()=>{s(p,2)},20)});function o(u){s(u.composedPath()[0],1)}n.addEventListener("mousedown",o),n.addEventListener("touchstart",o,{passive:!0});const c=new IntersectionObserver(u=>{for(const p of u)p.isIntersecting&&(re(new URL(p.target.href).pathname),c.unobserve(p.target))},{threshold:0});function s(u,p){const w=He(u,n);if(!w)return;const{url:b,external:g}=Ee(w,e);if(g)return;const k=fe(w);k.reload||(p<=k.preload_data?$e(b):p<=k.preload_code&&re(b.pathname))}function d(){c.disconnect();for(const u of n.querySelectorAll("a")){const{url:p,external:w}=Ee(u,e);if(w)continue;const b=fe(u);b.reload||(b.preload_code===Ye.viewport&&c.observe(u),b.preload_code===Ye.eager&&re(p.pathname))}}m.after_navigate.push(d),d()}return{after_navigate:r=>{Oe(()=>(m.after_navigate.push(r),()=>{const o=m.after_navigate.indexOf(r);m.after_navigate.splice(o,1)}))},before_navigate:r=>{Oe(()=>(m.before_navigate.push(r),()=>{const o=m.before_navigate.indexOf(r);m.before_navigate.splice(o,1)}))},disable_scroll_handling:()=>{(y||!h)&&(_=!1)},goto:(r,o={})=>ge(r,o,[]),invalidate:r=>{if(typeof r=="function")l.push(r);else{const{href:o}=new URL(r,location.href);l.push(c=>c.href===o)}return Ue()},invalidateAll:()=>(U=!0,Ue()),preload_data:async r=>{const o=new URL(r,ze(document));await $e(o)},preload_code:re,apply_action:async r=>{if(r.type==="error"){const o=new URL(location.href),{branch:c,route:s}=t;if(!s)return;const d=await Fe(t.branch.length,c,s.errors);if(d){const u=await Q({url:o,params:t.params,branch:c.slice(0,d.idx).concat(d.node),status:r.status??500,error:r.error,route:s});t=u.state,$.$set(u.props),ce().then(Le)}}else if(r.type==="redirect")ge(r.location,{invalidateAll:!0},[]);else{const o={form:r.data,page:{...J,form:r.data,status:r.status}};$.$set(o),r.type==="success"&&ce().then(Le)}},_start_router:()=>{var r;history.scrollRestoration="manual",addEventListener("beforeunload",o=>{var s;let c=!1;if(!v){const d={from:{params:t.params,route:{id:((s=t.route)==null?void 0:s.id)??null},url:t.url},to:null,willUnload:!0,type:"leave",cancel:()=>c=!0};m.before_navigate.forEach(u=>u(d))}c?(o.preventDefault(),o.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Se(P);try{sessionStorage[et]=JSON.stringify(ne)}catch{}}}),(r=navigator.connection)!=null&&r.saveData||tt(),n.addEventListener("click",o=>{if(o.button||o.which!==1||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||o.defaultPrevented)return;const c=He(o.composedPath()[0],n);if(!c)return;const{url:s,external:d,has:u}=Ee(c,e),p=fe(c);if(!s||!(c instanceof SVGAElement)&&s.protocol!==location.protocol&&!(s.protocol==="https:"||s.protocol==="http:")||u.download)return;if(d||p.reload){Be({url:s,type:"link"})||o.preventDefault(),v=!0;return}const[b,g]=s.href.split("#");if(g!==void 0&&b===location.href.split("#")[0]){S=!0,Se(P),t.url=s,K.page.set({...J,url:s}),K.page.notify();return}se({url:s,scroll:p.noscroll?ue():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:s.href===location.href},accepted:()=>o.preventDefault(),blocked:()=>o.preventDefault(),type:"link"})}),n.addEventListener("submit",o=>{if(o.defaultPrevented)return;const c=HTMLFormElement.prototype.cloneNode.call(o.target),s=o.submitter;if(((s==null?void 0:s.formMethod)||c.method)!=="get")return;const u=new URL((s==null?void 0:s.hasAttribute("formaction"))&&(s==null?void 0:s.formAction)||c.action);if(We(u,e))return;const p=o.target,{noscroll:w,reload:b}=fe(p);if(b)return;o.preventDefault(),o.stopPropagation();const g=new FormData(p),k=s==null?void 0:s.getAttribute("name");k&&g.append(k,(s==null?void 0:s.getAttribute("value"))??""),u.search=new URLSearchParams(g).toString(),se({url:u,scroll:w?ue():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",o=>{var c;if((c=o.state)!=null&&c[C]){if(o.state[C]===P)return;const s=o.state[C]-P;se({url:new URL(location.href),scroll:ne[o.state[C]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{P=o.state[C]},blocked:()=>{history.go(-s)},type:"popstate",delta:s})}}),addEventListener("hashchange",()=>{S&&(S=!1,history.replaceState({...history.state,[C]:++P},"",location.href))});for(const o of document.querySelectorAll("link"))o.rel==="icon"&&(o.href=o.href);addEventListener("pageshow",o=>{o.persisted&&K.navigating.set(null)})},_hydrate:async({status:r=200,error:o,node_ids:c,params:s,route:d,data:u,form:p})=>{f=!0;const w=new URL(location.href);({params:s={},route:d={id:null}}=ie(w,!1)||{});let b;try{const g=c.map(async(k,L)=>{const D=u[L];return ye({loader:me[k],url:w,params:s,route:d,parent:async()=>{const O={};for(let E=0;E<L;E+=1)Object.assign(O,(await g[E]).data);return O},server_data_node:we(D)})});b=await Q({url:w,params:s,branch:await Promise.all(g),status:r,error:o,form:p,route:Re.find(({id:k})=>k===d.id)??null})}catch(g){if(g instanceof Qe){await le(new URL(g.location,location.href));return}b=await oe({status:g instanceof Ie?g.status:500,error:await ee(g,{url:w,params:s,route:d}),url:w,route:d})}Ve(b)}}}async function xe(a,e){var m;const n=new URL(a);n.pathname=Rt(a.pathname),n.searchParams.append("x-sveltekit-invalidated",e.map(t=>t?"1":"").join("_"));const l=await he(n.href),i=await l.json();if(!l.ok)throw new Error(i);return(m=i.nodes)==null||m.forEach(t=>{(t==null?void 0:t.type)==="data"&&(t.data=Zt(t.data),t.uses={dependencies:new Set(t.uses.dependencies??[]),params:new Set(t.uses.params??[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url})}),i}function ee(a,e){return a instanceof Ie?a.body:Gt.handleError({error:a,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}function Le(){const a=document.querySelector("[autofocus]");if(a)a.focus();else{const e=document.body,n=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0}),setTimeout(()=>{var l;(l=getSelection())==null||l.removeAllRanges()}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex")}}async function nn({env:a,hydrate:e,paths:n,target:l,version:i}){ht(n),_t(i);const m=Qt({target:l,base:n.base});mt({client:m}),e?await m._hydrate(e):m.goto(location.href,{replaceState:!0}),m._start_router()}export{nn as start};
