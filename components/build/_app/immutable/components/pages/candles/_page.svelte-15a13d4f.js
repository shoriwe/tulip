import{S as C,i as I,s as L,I as p,J as b,w as x,x as M,y as P,K as h,f as g,t as w,z as Z,o as B,e as S,b as N,d as G,h as T,g as q,B as K}from"../../../chunks/index-a755ff6d.js";import{c as O,C as R}from"../../../chunks/chart-c128dc5b.js";function U(s,n,t,e,o){var i;return t>e?i=-1:t<e?i=1:i=n>0?s[n-1][o]<=e?1:-1:1,i}function j(s){if(!s)return[];let n=[];for(let t=0;t<s.length;t++){const e=s[t];n.push([e.timestamp,e.open,e.close,e.low,e.high,e.volume,U(n,t,e.open,e.close,4)])}return n}async function E(s,n,t,e,o){const i="#ec0000",l="#8A0000",f="#00da3c",c="#008F28";if(t!==0)switch(e=o=Date.now(),n){case"1":e-=t*6e4;case"60":e-=t*36e5;case"D":e-=t*864e5;case"M":e-=t*26784e5}let u="",r="";switch(n){case"1":case"60":u=new Date(e).toLocaleString(),r=new Date(o).toLocaleString();break;case"D":case"M":u=new Date(e).toLocaleDateString(),r=new Date(o).toLocaleDateString();break}return new Date(e).toLocaleString(),{dataset:{source:j(await O(s,n,e,o))},title:{text:`${s}: ${u} --> ${r}`},tooltip:{trigger:"axis",axisPointer:{type:"line"}},toolbox:{feature:{dataZoom:{yAxisIndex:!1}}},grid:[{left:"10%",right:"10%",bottom:200},{left:"10%",right:"10%",height:80,bottom:80}],xAxis:[{type:"category",boundaryGap:!1,axisLine:{onZero:!1},splitLine:{show:!1},min:"dataMin",max:"dataMax"},{type:"category",gridIndex:1,boundaryGap:!1,axisLine:{onZero:!1},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1},min:"dataMin",max:"dataMax"}],yAxis:[{scale:!0,splitArea:{show:!0}},{scale:!0,gridIndex:1,splitNumber:2,axisLabel:{show:!1},axisLine:{show:!1},axisTick:{show:!1},splitLine:{show:!1}}],dataZoom:[{type:"inside",xAxisIndex:[0,1],start:10,end:100},{show:!0,xAxisIndex:[0,1],type:"slider",bottom:10,start:10,end:100}],visualMap:{show:!1,seriesIndex:1,dimension:6,pieces:[{value:1,color:i},{value:-1,color:f}]},series:[{type:"candlestick",itemStyle:{color:i,color0:f,borderColor:l,borderColor0:c},encode:{x:0,y:[1,4,3,2]}},{name:"Volumn",type:"bar",xAxisIndex:1,yAxisIndex:1,itemStyle:{color:"#7fbe9e"},large:!0,encode:{x:0,y:5}}]}}function H(s){let n,t,e;function o(l){s[6](l)}let i={};return s[0]!==void 0&&(i.option=s[0]),n=new R({props:i}),p.push(()=>b(n,"option",o,s[0])),{c(){x(n.$$.fragment)},l(l){M(n.$$.fragment,l)},m(l,f){P(n,l,f),e=!0},p(l,[f]){const c={};!t&&f&1&&(t=!0,c.option=l[0],h(()=>t=!1)),n.$set(c)},i(l){e||(g(n.$$.fragment,l),e=!0)},o(l){w(n.$$.fragment,l),e=!1},d(l){Z(n,l)}}}function Q(s,n,t){let{symbol:e}=n,{resolution:o}=n,{last:i}=n,{from:l}=n,{to:f}=n,c;B(async function(){t(0,c=await E(e,o,i,l,f))});function u(r){c=r,t(0,c)}return s.$$set=r=>{"symbol"in r&&t(1,e=r.symbol),"resolution"in r&&t(2,o=r.resolution),"last"in r&&t(3,i=r.last),"from"in r&&t(4,l=r.from),"to"in r&&t(5,f=r.to)},[c,e,o,i,l,f,u]}class W extends C{constructor(n){super(),I(this,n,Q,H,L,{symbol:1,resolution:2,last:3,from:4,to:5})}}function D(s){let n,t,e,o,i,l,f;function c(a){s[6](a)}function u(a){s[7](a)}function r(a){s[8](a)}function y(a){s[9](a)}function k(a){s[10](a)}let m={};return s[0]!==void 0&&(m.symbol=s[0]),s[1]!==void 0&&(m.resolution=s[1]),s[2]!==void 0&&(m.last=s[2]),s[3]!==void 0&&(m.from=s[3]),s[4]!==void 0&&(m.to=s[4]),n=new W({props:m}),p.push(()=>b(n,"symbol",c,s[0])),p.push(()=>b(n,"resolution",u,s[1])),p.push(()=>b(n,"last",r,s[2])),p.push(()=>b(n,"from",y,s[3])),p.push(()=>b(n,"to",k,s[4])),{c(){x(n.$$.fragment)},l(a){M(n.$$.fragment,a)},m(a,d){P(n,a,d),f=!0},p(a,d){const _={};!t&&d&1&&(t=!0,_.symbol=a[0],h(()=>t=!1)),!e&&d&2&&(e=!0,_.resolution=a[1],h(()=>e=!1)),!o&&d&4&&(o=!0,_.last=a[2],h(()=>o=!1)),!i&&d&8&&(i=!0,_.from=a[3],h(()=>i=!1)),!l&&d&16&&(l=!0,_.to=a[4],h(()=>l=!1)),n.$set(_)},i(a){f||(g(n.$$.fragment,a),f=!0)},o(a){w(n.$$.fragment,a),f=!1},d(a){Z(n,a)}}}function A(s){let n,t,e=s[5]&&D(s);return{c(){e&&e.c(),n=S()},l(o){e&&e.l(o),n=S()},m(o,i){e&&e.m(o,i),N(o,n,i),t=!0},p(o,i){o[5]?e?(e.p(o,i),i&32&&g(e,1)):(e=D(o),e.c(),g(e,1),e.m(n.parentNode,n)):e&&(q(),w(e,1,1,()=>{e=null}),G())},i(o){t||(g(e),t=!0)},o(o){w(e),t=!1},d(o){e&&e.d(o),o&&T(n)}}}function X(s){let n=s[5],t,e,o=A(s);return{c(){o.c(),t=S()},l(i){o.l(i),t=S()},m(i,l){o.m(i,l),N(i,t,l),e=!0},p(i,[l]){l&32&&L(n,n=i[5])?(q(),w(o,1,1,K),G(),o=A(i),o.c(),g(o,1),o.m(t.parentNode,t)):o.p(i,l)},i(i){e||(g(o),e=!0)},o(i){w(o),e=!1},d(i){i&&T(t),o.d(i)}}}function Y(s,n,t){let e,o,i,l,f,c=!1;B(async()=>{if(window&&window.location&&window.location.search){const a=new Proxy(new URLSearchParams(window.location.search),{get:(F,J)=>F.get(J)});t(0,e=a.symbol||"AAPL"),t(1,o=a.resolution||"D");const d=a.last||"0";t(2,i=parseInt(d));const _=a.from||"1667278800000";t(3,l=parseInt(_));const z=a.to||"1673121379603";t(3,l=parseInt(z)),t(5,c=!0)}});function u(a){e=a,t(0,e)}function r(a){o=a,t(1,o)}function y(a){i=a,t(2,i)}function k(a){l=a,t(3,l)}function m(a){f=a,t(4,f)}return[e,o,i,l,f,c,u,r,y,k,m]}class $ extends C{constructor(n){super(),I(this,n,Y,X,L,{})}}export{$ as default};