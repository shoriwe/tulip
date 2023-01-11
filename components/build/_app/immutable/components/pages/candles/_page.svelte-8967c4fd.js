import{S as Z,i as F,s as M,I as g,J as b,w as N,x as D,y as G,K as h,f as w,t as y,z as q,o as z,e as k,b as B,d as J,h as K,g as O,B as j}from"../../../chunks/index-d92fc7ef.js";import{c as x}from"../../../chunks/client-c74e5291.js";import{t as E,c as H}from"../../../chunks/timestamp-2a2772e4.js";import{C as Q}from"../../../chunks/chart-525ca76e.js";function W(t){if(!t)return[];let e=[];for(let s=0;s<t.length;s++){const o=t[s];e.push([o.timestamp,o.open,o.close,o.low,o.high,o.volume,o.open<=o.close?1:-1])}return e}async function X(t,e,s,o,l,i,r){if(l!==0){const d=H(o,l);i=d.from,r=d.to}const f=E(o,i,r);return new Date(i).toLocaleString(),{dataset:{source:W(await x(s,o,i,r))},title:{text:`${s}: ${f.from} --> ${f.to}`},tooltip:{trigger:"axis",axisPointer:{type:"line"}},toolbox:{feature:{dataZoom:{yAxisIndex:!1}}},grid:[{left:"10%",right:"10%",bottom:200},{left:"10%",right:"10%",height:80,bottom:80}],xAxis:[{type:"category",boundaryGap:!1,axisLine:{onZero:!1},splitLine:{show:!1},min:"dataMin",max:"dataMax"},{type:"category",gridIndex:1,boundaryGap:!1,axisLine:{onZero:!1},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1},min:"dataMin",max:"dataMax"}],yAxis:[{scale:!0,splitArea:{show:!0}},{scale:!0,gridIndex:1,splitNumber:2,axisLabel:{show:!1},axisLine:{show:!1},axisTick:{show:!1},splitLine:{show:!1}}],dataZoom:[{type:"inside",xAxisIndex:[0,1],start:10,end:100},{show:!0,xAxisIndex:[0,1],type:"slider",bottom:10,start:10,end:100}],visualMap:{show:!1,seriesIndex:1,dimension:6,pieces:[{value:1,color:t},{value:-1,color:e}]},series:[{type:"candlestick",itemStyle:{color:t,color0:e,borderColor:t,borderColor0:e},encode:{x:0,y:[1,2,3,4]}},{name:"Volume",type:"bar",xAxisIndex:1,yAxisIndex:1,itemStyle:{color:"#7fbe9e"},large:!0,encode:{x:0,y:5}}]}}function Y(t){let e,s,o;function l(r){t[8](r)}let i={};return t[0]!==void 0&&(i.option=t[0]),e=new Q({props:i}),g.push(()=>b(e,"option",l,t[0])),{c(){N(e.$$.fragment)},l(r){D(e.$$.fragment,r)},m(r,f){G(e,r,f),o=!0},p(r,[f]){const u={};!s&&f&1&&(s=!0,u.option=r[0],h(()=>s=!1)),e.$set(u)},i(r){o||(w(e.$$.fragment,r),o=!0)},o(r){y(e.$$.fragment,r),o=!1},d(r){q(e,r)}}}function v(t,e,s){let{upColor:o}=e,{downColor:l}=e,{symbol:i}=e,{resolution:r}=e,{last:f}=e,{from:u}=e,{to:c}=e,d;z(async function(){s(0,d=await X(o,l,i,r,f,u,c))});function C(a){d=a,s(0,d)}return t.$$set=a=>{"upColor"in a&&s(1,o=a.upColor),"downColor"in a&&s(2,l=a.downColor),"symbol"in a&&s(3,i=a.symbol),"resolution"in a&&s(4,r=a.resolution),"last"in a&&s(5,f=a.last),"from"in a&&s(6,u=a.from),"to"in a&&s(7,c=a.to)},[d,o,l,i,r,f,u,c,C]}class $ extends Z{constructor(e){super(),F(this,e,v,Y,M,{upColor:1,downColor:2,symbol:3,resolution:4,last:5,from:6,to:7})}}function P(t){let e,s,o,l,i,r,f,u,c;function d(n){t[8](n)}function C(n){t[9](n)}function a(n){t[10](n)}function I(n){t[11](n)}function L(n){t[12](n)}function A(n){t[13](n)}function S(n){t[14](n)}let _={};return t[0]!==void 0&&(_.upColor=t[0]),t[1]!==void 0&&(_.downColor=t[1]),t[2]!==void 0&&(_.symbol=t[2]),t[3]!==void 0&&(_.resolution=t[3]),t[4]!==void 0&&(_.last=t[4]),t[5]!==void 0&&(_.from=t[5]),t[6]!==void 0&&(_.to=t[6]),e=new $({props:_}),g.push(()=>b(e,"upColor",d,t[0])),g.push(()=>b(e,"downColor",C,t[1])),g.push(()=>b(e,"symbol",a,t[2])),g.push(()=>b(e,"resolution",I,t[3])),g.push(()=>b(e,"last",L,t[4])),g.push(()=>b(e,"from",A,t[5])),g.push(()=>b(e,"to",S,t[6])),{c(){N(e.$$.fragment)},l(n){D(e.$$.fragment,n)},m(n,m){G(e,n,m),c=!0},p(n,m){const p={};!s&&m&1&&(s=!0,p.upColor=n[0],h(()=>s=!1)),!o&&m&2&&(o=!0,p.downColor=n[1],h(()=>o=!1)),!l&&m&4&&(l=!0,p.symbol=n[2],h(()=>l=!1)),!i&&m&8&&(i=!0,p.resolution=n[3],h(()=>i=!1)),!r&&m&16&&(r=!0,p.last=n[4],h(()=>r=!1)),!f&&m&32&&(f=!0,p.from=n[5],h(()=>f=!1)),!u&&m&64&&(u=!0,p.to=n[6],h(()=>u=!1)),e.$set(p)},i(n){c||(w(e.$$.fragment,n),c=!0)},o(n){y(e.$$.fragment,n),c=!1},d(n){q(e,n)}}}function T(t){let e,s,o=t[7]&&P(t);return{c(){o&&o.c(),e=k()},l(l){o&&o.l(l),e=k()},m(l,i){o&&o.m(l,i),B(l,e,i),s=!0},p(l,i){l[7]?o?(o.p(l,i),i&128&&w(o,1)):(o=P(l),o.c(),w(o,1),o.m(e.parentNode,e)):o&&(O(),y(o,1,1,()=>{o=null}),J())},i(l){s||(w(o),s=!0)},o(l){y(o),s=!1},d(l){o&&o.d(l),l&&K(e)}}}function oo(t){let e=t[7],s,o,l=T(t);return{c(){l.c(),s=k()},l(i){l.l(i),s=k()},m(i,r){l.m(i,r),B(i,s,r),o=!0},p(i,[r]){r&128&&M(e,e=i[7])?(O(),y(l,1,1,j),J(),l=T(i),l.c(),w(l,1),l.m(s.parentNode,s)):l.p(i,r)},i(i){o||(w(l),o=!0)},o(i){y(l),o=!1},d(i){i&&K(s),l.d(i)}}}function eo(t,e,s){let o,l,i,r,f,u,c,d=!1;z(async()=>{if(window&&window.location&&window.location.search){const n=new Proxy(new URLSearchParams(window.location.search),{get:(U,V)=>U.get(V)});s(0,o=n.upColor||"green"),s(1,l=n.downColor||"red"),s(2,i=n.symbol||"AAPL"),s(3,r=n.resolution||"D");const m=n.last||"0";s(4,f=parseInt(m));const p=n.from||"1667278800000";s(5,u=parseInt(p));const R=n.to||"1673121379603";s(6,c=parseInt(R)),s(7,d=!0)}});function C(n){o=n,s(0,o)}function a(n){l=n,s(1,l)}function I(n){i=n,s(2,i)}function L(n){r=n,s(3,r)}function A(n){f=n,s(4,f)}function S(n){u=n,s(5,u)}function _(n){c=n,s(6,c)}return[o,l,i,r,f,u,c,d,C,a,I,L,A,S,_]}class io extends Z{constructor(e){super(),F(this,e,eo,oo,M,{})}}export{io as default};