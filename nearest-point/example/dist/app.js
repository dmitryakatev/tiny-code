(()=>{"use strict";function e(e,t,n){const i=t.x>=e.x?1:-1;return{x:t.x+i*n,y:t.y}}function t(e,t){return((t.x-e.x)**2+(t.y-e.y)**2)**.5}function n(n,i,c,l){const r=e(i,n,l.gap),s=e(n,i,l.gap),o=Math.abs(n.y-c.y),x=r.x<=c.x&&s.x>=c.x&&o<=l.weight;let y=null,a=null;if(x){const e=t(n,c),l=t(i,c);e<l?(y=n,a=e):(y=i,a=l)}const u={inside:x,nearest:y,distance:a};if(l.rects&&(u.rect=[{x:r.x,y:r.y+l.weight},{x:s.x,y:s.y+l.weight},{x:s.x,y:s.y-l.weight},{x:r.x,y:r.y-l.weight}]),l.clientRects){const e={x:r.x,y:c.y},t={x:s.x,y:c.y};u.clientRect=[r,e,t,s]}return u}function i(e,t,n){const i=t.y>=e.y?1:-1;return{x:t.x,y:t.y+i*n}}function c(e,n,c,l){const r=i(n,e,l.gap),s=i(e,n,l.gap),o=Math.abs(e.x-c.x),x=r.y<=c.y&&s.y>=c.y&&o<=l.weight;let y=null,a=null;if(x){const i=t(e,c),l=t(n,c);i<l?(y=e,a=i):(y=n,a=l)}const u={inside:x,nearest:y,distance:a};if(l.rects&&(u.rect=[{x:r.x-l.weight,y:r.y},{x:s.x-l.weight,y:s.y},{x:s.x+l.weight,y:s.y},{x:r.x+l.weight,y:r.y}]),l.clientRects){const e={x:c.x,y:s.y},t={x:c.x,y:r.y};u.clientRect=[r,s,e,t]}return u}function l(e,t,n){const i=Math.abs(t.x-e.x),c=Math.abs(t.y-e.y)/i,l=n*c/(c**2+1)**.5,r=(n**2-l**2)**.5,s=t.x>e.x?1:-1,o=t.y>e.y?1:-1;return{x:t.x+s*r,y:t.y+o*l}}function r(e,n,i,c){const r=l(n,e,c.gap),y=l(e,n,c.gap),a=function(e,t){return(e.y-t.y)/(e.x-t.x)}(r,y),u=s(i,a),h=-1/a,g=s(r,h),d=s(y,h),f={};f.x=o(a,u,h,g),f.y=x(a,f.x,u);const p={};p.x=o(a,u,h,d),p.y=x(a,p.x,u);const b=t(r,f),w=f.x<=i.x&&p.x>=i.x&&b<=c.weight;let v=null,k=null;if(w){const c=t(e,i),l=t(n,i);c<l?(v=e,k=c):(v=n,k=l)}const S={inside:w,nearest:v,distance:k};if(c.rects){const e={};e.x=r.x+c.weight,e.y=h*e.x+g;const t={};t.x=y.x+c.weight,t.y=h*t.x+d;const n=l(e,r,c.weight),i=l(t,y,c.weight),s=l(n,r,c.weight),o=l(i,y,c.weight);S.rect=[s,n,i,o]}return c.clientRects&&(S.clientRect=[r,f,p,y]),S}function s(e,t){return e.y-t*e.x}function o(e,t,n,i){return(i-t)/(e-n)}function x(e,t,n){return e*t+n}const y={gap:5,weight:5,rects:!1,clientRects:!1};function a(e,t,i,l){return e.x===t.x?function(e,t,n,i){return t.y>=e.y?c(e,t,n,i):c(t,e,n,i)}(e,t,i,l):e.y===t.y?function(e,t,i,c){return t.x>=e.x?n(e,t,i,c):n(t,e,i,c)}(e,t,i,l):function(e,t,n,i){return t.x>e.x?r(e,t,n,i):r(t,e,n,i)}(e,t,i,l)}const u=document.createElement("div");document.body.appendChild(u);let h=[{x:103,y:22},{x:136,y:38},{x:166,y:56},{x:186,y:70},{x:211,y:90},{x:232,y:101},{x:268,y:101},{x:300,y:103},{x:330,y:104},{x:360,y:120},{x:356,y:141},{x:328,y:154},{x:296,y:161},{x:260,y:165},{x:218,y:166},{x:188,y:160},{x:181,y:138},{x:159,y:140},{x:96,y:149},{x:59,y:171}],g=!0,d=!1,f=10,p=10,b=!1;u.innerHTML=`\n  <div>\n    <input type="checkbox" class="show-rect" ${g?"checked":""} />\n    <label>show rects</label>\n    <input type="checkbox" class="show-client-rect" ${d?"checked":""} />\n    <label>show mouse rects</label>\n    <input type="number" class="gap-rect" style="width: 50px" value="${f}" />\n    <label>gap</label>\n    <input type="number" class="weight-rect" style="width: 50px" value="${p}" />\n    <label>weight</label>\n    <button class="draw-line">draw line</button>\n  </div>\n  <div>\n    <canvas style="border: 1px solid black;">\n  </div>\n`;const w=u.querySelector("canvas"),v=u.querySelector("input.show-rect"),k=u.querySelector("input.show-client-rect"),S=u.querySelector("input.gap-rect"),m=u.querySelector("input.weight-rect"),R=u.querySelector("button.draw-line");w.width=800..toString(),w.height=400..toString();const E=w.getContext("2d"),M=()=>{E.beginPath(),E.fillStyle="white",E.globalAlpha=1,E.lineWidth=1,E.fillRect(0,0,800,400),E.stroke()},L=(e,t)=>{E.beginPath(),E.arc(e.x,e.y,t,0,2*Math.PI,!1),E.fillStyle="green",E.fill(),E.lineWidth=5,E.strokeStyle="#003300",E.stroke()},T=()=>{const e=h.length;if(e<2)return;E.beginPath();let t=h[0];E.moveTo(t.x,t.y);for(let n=1;n<e;++n)t=h[n],E.lineTo(t.x,t.y);E.globalAlpha=.4,E.fillStyle="green",E.lineWidth=1,E.stroke()},q=(e={x:-100,y:-100})=>{if(b)return;const t=function(e,t,n){const i=function(e,t,n){const i=[],c=e.length;for(let l=1;l<c;++l)i.push(a(e[l-1],e[l],t,n));return i}(e,t,n=Object.assign({},y,n)),c=[],l=i.length;let r=1/0,s=null,o=null;for(let e=0;e<l;++e){const t=i[e];t.inside&&(c.push(t),t.distance<r&&(r=t.distance,s=t.nearest))}return null!==s&&(o=e.indexOf(s)),{rects:i,inside:c,nearest:{index:o,point:s}}}(h,e,{gap:f,weight:p,rects:g,clientRects:d});M(),g&&t.rects.forEach((e=>{(e=>{E.beginPath();let[t]=e.rect;E.moveTo(t.x,t.y);for(let n=1;n<4;++n)t=e.rect[n],E.lineTo(t.x,t.y);[t]=e.rect,E.lineTo(t.x,t.y),E.globalAlpha=e.inside?.6:.2,E.fillStyle="green",E.fill(),E.lineWidth=1,E.strokeStyle="#003300",E.stroke()})(e)})),d&&(t.rects.forEach((e=>{(e=>{E.beginPath();let[t]=e.clientRect;E.moveTo(t.x,t.y);for(let n=1;n<4;++n)t=e.clientRect[n],E.lineTo(t.x,t.y);[t]=e.clientRect,E.lineTo(t.x,t.y),E.globalAlpha=.2,E.lineWidth=1,E.strokeStyle="black",E.stroke()})(e)})),L(e,2)),T(),h.forEach(((e,n)=>{const i=t.nearest.index===n;L(e,i?5:2)}))};v.addEventListener("change",(e=>{g=e.target.checked,q()})),k.addEventListener("change",(e=>{d=e.target.checked,q()})),S.addEventListener("change",(e=>{f=parseInt(e.target.value,10)||0,q()})),m.addEventListener("change",(e=>{p=parseInt(e.target.value,10)||0,q()})),R.addEventListener("click",(()=>{b=!0,h=[{x:0,y:0}],M()})),w.addEventListener("click",(()=>{if(!b)return;const e=h.length,t=h[e-1];if(e>1){const n=h[e-2];if(Math.abs(n.x-t.x)<5&&Math.abs(n.y-t.y)<5)return h.pop(),b=!1,void q()}h.push(t),M(),T()})),w.addEventListener("mousemove",(e=>{if(!b)return;const{left:t,top:n}=w.getBoundingClientRect(),{clientX:i,clientY:c}=e,l={x:Math.floor(i-t),y:Math.floor(c-n)};h[h.length-1]=l,M(),T()})),q(),w.addEventListener("mousemove",(e=>{q({x:e.offsetX,y:e.offsetY})}))})();