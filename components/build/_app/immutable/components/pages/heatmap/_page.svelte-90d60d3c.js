import{S as C,i as D,s as A,e as d,b as H,t as g,d as L,f as p,h as M,o as J,g as N,B as K,J as _,K as c,w as R,x as U,y as j,M as b,z as E}from"../../../chunks/index-2151f539.js";import{H as F}from"../../../chunks/heatmap-49dc4244.js";function P(t){let i,a,n,e,s,l,r;function h(o){t[6](o)}function k(o){t[7](o)}function w(o){t[8](o)}function y(o){t[9](o)}function S(o){t[10](o)}let u={};return t[0]!==void 0&&(u.symbols=t[0]),t[1]!==void 0&&(u.resolution=t[1]),t[2]!==void 0&&(u.last=t[2]),t[3]!==void 0&&(u.from=t[3]),t[4]!==void 0&&(u.to=t[4]),i=new F({props:u}),_.push(()=>c(i,"symbols",h,t[0])),_.push(()=>c(i,"resolution",k,t[1])),_.push(()=>c(i,"last",w,t[2])),_.push(()=>c(i,"from",y,t[3])),_.push(()=>c(i,"to",S,t[4])),{c(){R(i.$$.fragment)},l(o){U(i.$$.fragment,o)},m(o,f){j(i,o,f),r=!0},p(o,f){const m={};!a&&f&1&&(a=!0,m.symbols=o[0],b(()=>a=!1)),!n&&f&2&&(n=!0,m.resolution=o[1],b(()=>n=!1)),!e&&f&4&&(e=!0,m.last=o[2],b(()=>e=!1)),!s&&f&8&&(s=!0,m.from=o[3],b(()=>s=!1)),!l&&f&16&&(l=!0,m.to=o[4],b(()=>l=!1)),i.$set(m)},i(o){r||(p(i.$$.fragment,o),r=!0)},o(o){g(i.$$.fragment,o),r=!1},d(o){E(i,o)}}}function I(t){let i,a,n=t[5]&&P(t);return{c(){n&&n.c(),i=d()},l(e){n&&n.l(e),i=d()},m(e,s){n&&n.m(e,s),H(e,i,s),a=!0},p(e,s){e[5]?n?(n.p(e,s),s&32&&p(n,1)):(n=P(e),n.c(),p(n,1),n.m(i.parentNode,i)):n&&(N(),g(n,1,1,()=>{n=null}),L())},i(e){a||(p(n),a=!0)},o(e){g(n),a=!1},d(e){n&&n.d(e),e&&M(i)}}}function G(t){let i=t[5],a,n,e=I(t);return{c(){e.c(),a=d()},l(s){e.l(s),a=d()},m(s,l){e.m(s,l),H(s,a,l),n=!0},p(s,[l]){l&32&&A(i,i=s[5])?(N(),g(e,1,1,K),L(),e=I(s),e.c(),p(e,1),e.m(a.parentNode,a)):e.p(s,l)},i(s){n||(p(e),n=!0)},o(s){g(e),n=!1},d(s){s&&M(a),e.d(s)}}}function O(t,i,a){let n,e,s,l,r,h=!1;J(async()=>{if(window&&window.location&&window.location.search){const o=new Proxy(new URLSearchParams(window.location.search),{get:(z,B)=>z.get(B)});a(0,n=(o.symbols||"AAPL").split(",")),a(1,e=o.resolution||"D");const f=o.last||"0";a(2,s=parseInt(f));const m=o.from||"1667278800000";a(3,l=parseInt(m));const q=o.to||"1673121379603";a(4,r=parseInt(q)),a(5,h=!0)}});function k(o){n=o,a(0,n)}function w(o){e=o,a(1,e)}function y(o){s=o,a(2,s)}function S(o){l=o,a(3,l)}function u(o){r=o,a(4,r)}return[n,e,s,l,r,h,k,w,y,S,u]}class V extends C{constructor(i){super(),D(this,i,O,G,A,{})}}export{V as default};
