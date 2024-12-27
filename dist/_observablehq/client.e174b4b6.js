var ie=Object.defineProperty;var n=(e,t)=>ie(e,"name",{value:t,configurable:!0});import{Inspector as j,Runtime as le}from"./runtime.9393ab6d.js";import{Generators as $,resize as ce,FileAttachment as de,Mutable as pe}from"./stdlib.95bfbf7e.js";var ue=Object.defineProperty,A=n((e,t)=>ue(e,"name",{value:t,configurable:!0}),"o$2");const B=document.createElement("template");B.innerHTML='<button title="Copy code" class="observablehq-pre-copy"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6C2 5.44772 2.44772 5 3 5H10C10.5523 5 11 5.44772 11 6V13C11 13.5523 10.5523 14 10 14H3C2.44772 14 2 13.5523 2 13V6Z M4 2.00004L12 2.00001C13.1046 2 14 2.89544 14 4.00001V12"></path></svg></button>',O();function O(){for(const e of document.querySelectorAll("pre:not([data-copy=none])")){const t=e.parentNode;if(t.classList.contains("observablehq-pre-container"))continue;const r=t.insertBefore(document.createElement("div"),e);r.className="observablehq-pre-container",Object.assign(r.dataset,e.dataset),r.appendChild(B.content.cloneNode(!0).firstChild).addEventListener("click",D),r.appendChild(e)}}n(O,"r$2"),A(O,"enableCopyButtons");async function D({currentTarget:e}){await navigator.clipboard.writeText(e.nextElementSibling.textContent.trim());const[t]=e.getAnimations({subtree:!0});t&&(t.currentTime=0),e.classList.add("observablehq-pre-copied"),e.addEventListener("animationend",()=>e.classList.remove("observablehq-pre-copied"),{once:!0})}n(D,"c$3"),A(D,"copy");var me=Object.defineProperty,S=n((e,t)=>me(e,"name",{value:t,configurable:!0}),"s$2");const c=document.querySelector("#observablehq-sidebar-toggle");if(c){let e=c.indeterminate;const t=S(()=>matchMedia("(min-width: calc(640px + 6rem + 272px))").matches,"match");c.onclick=()=>{const o=t();e?(c.checked=!o,e=!1):c.checked===o&&(e=!0),c.indeterminate=e,e?sessionStorage.removeItem("observablehq-sidebar"):sessionStorage.setItem("observablehq-sidebar",c.checked)},addEventListener("keydown",o=>{o.code==="Escape"&&!t()&&(!c.indeterminate&&c.checked&&(o.target===document.body||o.target===c)||o.target?.closest("#observablehq-sidebar"))&&c.click()}),addEventListener("keypress",o=>{o.code==="KeyB"&&(o.metaKey||o.altKey)&&!o.ctrlKey&&(o.target===document.body||o.target===c||o.target?.closest("#observablehq-sidebar"))&&(c.click(),o.preventDefault())});const r=`Toggle sidebar ${/Mac|iPhone/.test(navigator.platform)?/Firefox/.test(navigator.userAgent)?"\u2325":"\u2318":"Alt-"}B`;for(const o of document.querySelectorAll("#observablehq-sidebar-toggle, label[for='observablehq-sidebar-toggle']"))o.title=r}function R(e){e.detail>1&&e.preventDefault()}n(R,"l$4"),S(R,"preventDoubleClick");function I(){sessionStorage.setItem(`observablehq-sidebar:${this.firstElementChild.textContent}`,this.open)}n(I,"c$2"),S(I,"persistOpen");for(const e of document.querySelectorAll("#observablehq-sidebar summary"))e.onmousedown=R,e.parentElement.ontoggle=I;var fe=Object.defineProperty,P=n((e,t)=>fe(e,"name",{value:t,configurable:!0}),"l$3");const x=document.querySelector("#observablehq-toc");if(x){const e=x.appendChild(document.createElement("div"));e.classList.add("observablehq-secondary-link-highlight");const t=document.querySelector("#observablehq-main"),r=Array.from(t.querySelectorAll(x.dataset.selector)).reverse(),o=x.querySelectorAll(".observablehq-secondary-link"),m=P(()=>{for(const a of o)a.classList.remove("observablehq-secondary-link-active");if(location.hash)for(const a of r){const f=encodeURI(`#${a.id}`);if(f===location.hash){const h=a.getBoundingClientRect().top;if(0<h&&h<40){for(const q of o)if(q.querySelector("a[href]")?.hash===f)return q.classList.add("observablehq-secondary-link-active"),q;return}break}}for(const a of r){if(a.getBoundingClientRect().top>=innerHeight*.5)continue;const f=a.querySelector("a[href]")?.hash;for(const h of o)if(h.querySelector("a[href]")?.hash===f)return h.classList.add("observablehq-secondary-link-active"),h;break}},"relink"),g=P(()=>{const a=m();e.style.cssText=a?`top: ${a.offsetTop}px; height: ${a.offsetHeight}px;`:""},"intersected"),y=new IntersectionObserver(g,{rootMargin:"0px 0px -50% 0px"});for(const a of r)y.observe(a)}var he=Object.defineProperty,T=n((e,t)=>he(e,"name",{value:t,configurable:!0}),"r$1");function M(e,t){const r=document.createElement("div");if(new j(r).fulfilled(e),t)for(const o of t){let m=r;for(const g of o)m=m?.childNodes[g];m?.dispatchEvent(new Event("mouseup"))}return r}n(M,"f$2"),T(M,"inspect");function z(e){const t=document.createElement("div");return new j(t).rejected(e),t.classList.add("observablehq--error"),t}n(z,"l$2"),T(z,"inspectError");var be=Object.defineProperty,s=n((e,t)=>be(e,"name",{value:t,configurable:!0}),"o");const ve=s(()=>import("../_npm/lodash@4.17.21/_esm.js").then(e=>e.default),"_"),ge=s(()=>import("../_npm/arquero@7.2.0/_esm.js"),"aq"),ye=s(()=>import("../_npm/apache-arrow@18.1.0/_esm.js"),"Arrow"),qe=s(()=>import("../_npm/d3@7.9.0/7055d4c5.js"),"d3"),$e=s(()=>import("./stdlib/dot.js").then(e=>e.default),"dot"),we=s(()=>import("../_npm/@duckdb/duckdb-wasm@1.29.0/_esm.js"),"duckdb"),_e=s(()=>import("./stdlib/duckdb.js").then(e=>e.DuckDBClient),"DuckDBClient"),xe=s(()=>import("../_npm/echarts@5.5.1/dist/echarts.esm.min.js._esm.js"),"echarts"),ke=s(()=>import("../_npm/htl@0.3.1/063eb405.js"),"htl"),Ce=s(()=>import("../_npm/htl@0.3.1/063eb405.js").then(e=>e.html),"html"),Le=s(()=>import("../_npm/htl@0.3.1/063eb405.js").then(e=>e.svg),"svg"),Ee=s(()=>import("./stdlib/inputs.d397b6a8.js"),"Inputs"),Se=s(()=>import("../_npm/leaflet@1.9.4/_esm.js"),"L"),Ne=s(()=>import("../_npm/mapbox-gl@3.8.0/_esm.js").then(e=>e.default),"mapboxgl"),je=s(()=>import("./stdlib/mermaid.js").then(e=>e.default),"mermaid"),Ae=s(()=>import("../_npm/@observablehq/plot@0.6.16/e828d8c8.js"),"Plot"),Be=s(()=>import("../_npm/react@19.0.0/_esm.js"),"React"),Oe=s(()=>import("../_npm/react-dom@19.0.0/_esm.js"),"ReactDOM"),De=s(()=>import("./stdlib/duckdb.js").then(e=>e.sql),"sql"),Re=s(()=>import("./stdlib/sqlite.js").then(e=>e.default),"SQLite"),Ie=s(()=>import("./stdlib/sqlite.js").then(e=>e.SQLiteDatabaseClient),"SQLiteDatabaseClient"),Pe=s(()=>import("./stdlib/tex.js").then(e=>e.default),"tex"),Te=s(()=>import("../_npm/topojson-client@3.1.0/44d97fcb.js"),"topojson"),Me=s(()=>import("./stdlib/vgplot.js").then(e=>e.default()),"vg"),ze=s(()=>import("./stdlib/vega-lite.js").then(e=>e.default),"vl");var Qe=Object.freeze({__proto__:null,Arrow:ye,DuckDBClient:_e,Inputs:Ee,L:Se,Plot:Ae,React:Be,ReactDOM:Oe,SQLite:Re,SQLiteDatabaseClient:Ie,_:ve,aq:ge,d3:qe,dot:$e,duckdb:we,echarts:xe,htl:ke,html:Ce,mapboxgl:Ne,mermaid:je,sql:De,svg:Le,tex:Pe,topojson:Te,vg:Me,vl:ze}),He=Object.defineProperty,l=n((e,t)=>He(e,"name",{value:t,configurable:!0}),"e");const Ve=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/aapl.csv"),!0),"aapl"),Ke=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/alphabet.csv"),!0),"alphabet"),Fe=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/cars.csv"),!0),"cars"),Ge=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/citywages.csv"),!0),"citywages"),Je=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/diamonds.csv"),!0),"diamonds"),Ue=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/flare.csv"),!0),"flare"),Ze=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/industries.csv"),!0),"industries"),We=l(()=>Q(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/miserables.json")),"miserables"),Xe=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/olympians.csv"),!0),"olympians"),Ye=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/penguins.csv"),!0),"penguins"),et=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/pizza.csv"),!0),"pizza"),tt=l(()=>d(import.meta.resolve("../_npm/@observablehq/sample-datasets@1.0.1/weather.csv"),!0),"weather");async function Q(e){const t=await fetch(e);if(!t.ok)throw new Error(`unable to fetch ${e}: status ${t.status}`);return t.json()}n(Q,"w$1"),l(Q,"json");async function H(e){const t=await fetch(e);if(!t.ok)throw new Error(`unable to fetch ${e}: status ${t.status}`);return t.text()}n(H,"y"),l(H,"text");async function d(e,t){const[r,o]=await Promise.all([H(e),import("../_npm/d3-dsv@3.0.1/407f7a1f.js")]);return o.csvParse(r,t&&o.autoType)}n(d,"t"),l(d,"csv");var ot=Object.freeze({__proto__:null,aapl:Ve,alphabet:Ke,cars:Fe,citywages:Ge,diamonds:Je,flare:Ue,industries:Ze,miserables:We,olympians:Xe,penguins:Ye,pizza:et,weather:tt}),rt=Object.defineProperty,i=n((e,t)=>rt(e,"name",{value:t,configurable:!0}),"i");const nt={now:()=>$.now(),width:()=>$.width(document.querySelector("main")),dark:()=>$.dark(),resize:()=>ce,FileAttachment:()=>de,Generators:()=>$,Mutable:()=>pe,...Qe,...ot},st=new le(nt),V=st.module(),N=new Map,k=X(document.body);function K(e){const{id:t,mode:r,inputs:o=[],outputs:m=[],body:g}=e,y=[];N.set(t,{cell:e,variables:y});const a=k.get(t),f=te(a);a._nodes=[],r===void 0&&(a._expanded=[]),f&&a._nodes.push(f);const h=i(()=>G(a,f),"pending"),q=i(b=>J(a,b),"rejected"),u=V.variable({_node:a.parentNode,pending:h,rejected:q},{shadow:{}});if(o.includes("display")||o.includes("view")){let b=-1;const L=r==="jsx"?F:w,se=r==="inline"?Z:r==="jsx"?U:W,E=new u.constructor(2,u._module);if(E.define(o.filter(p=>p!=="display"&&p!=="view"),()=>{let p=u._version;return _=>{if(p<b)throw new Error("stale display");return p>b&&L(a),b=p,se(a,_),_}}),u._shadow.set("display",E),o.includes("view")){const p=new u.constructor(2,u._module,null,{shadow:{}});p._shadow.set("display",E),p.define(["display"],_=>ae=>$.input(_(ae))),u._shadow.set("view",p)}}u.define(m.length?`cell ${t}`:null,o,g),y.push(u);for(const b of m)y.push(V.variable(!0).define(b,[`cell ${t}`],L=>L[b]))}n(K,"$"),i(K,"define");function F(){}n(F,"z"),i(F,"noop");function w(e){e._expanded&&(e._expanded=e._nodes.map(oe)),e._nodes.forEach(t=>t.remove()),e._nodes.length=0}n(w,"p"),i(w,"clear");function G(e,t){e._error&&(e._error=!1,w(e),t&&v(e,t))}n(G,"C"),i(G,"reset");function J(e,t){console.error(t),e._error=!0,w(e),v(e,z(t))}n(J,"F"),i(J,"reject");function U(e,t){return(e._root??=import("../_npm/react-dom@19.0.0/_esm.js").then(({createRoot:r})=>{const o=document.createElement("DIV");return[o,r(o)]})).then(([r,o])=>{r.parentNode||(e._nodes.push(r),e.parentNode.insertBefore(r,e)),o.render(t)})}n(U,"H"),i(U,"displayJsx");function v(e,t){if(t.nodeType===11){let r;for(;r=t.firstChild;)e._nodes.push(r),e.parentNode.insertBefore(r,e)}else e._nodes.push(t),e.parentNode.insertBefore(t,e)}n(v,"a"),i(v,"displayNode");function Z(e,t){if(C(t))v(e,t);else if(typeof t=="string"||!t?.[Symbol.iterator])v(e,document.createTextNode(t));else for(const r of t)v(e,C(r)?r:document.createTextNode(r))}n(Z,"J"),i(Z,"displayInline");function W(e,t){v(e,C(t)?t:M(t,e._expanded[e._nodes.length]))}n(W,"P"),i(W,"displayBlock");function at(e){w(k.get(e)),N.get(e).variables.forEach(t=>t.delete()),N.delete(e)}n(at,"Q"),i(at,"undefine");function C(e){return e instanceof Node&&e instanceof e.constructor}n(C,"N"),i(C,"isNode");function X(e){const t=new Map,r=document.createNodeIterator(e,128,null);let o;for(;o=r.nextNode();)Y(o)&&t.set(o.data.slice(1,-1),o);return t}n(X,"v"),i(X,"findRoots");function Y(e){return e.nodeType===8&&/^:[0-9a-f]{8}(?:-\d+)?:$/.test(e.data)}n(Y,"K"),i(Y,"isRoot");function ee(e){return e.nodeType===1&&e.tagName==="OBSERVABLEHQ-LOADING"}n(ee,"U"),i(ee,"isLoading");function te(e){const t=e.previousSibling;return t&&ee(t)?t:null}n(te,"B"),i(te,"findLoading");function it(e,t){t==null?k.delete(e):k.set(e,t)}n(it,"W"),i(it,"registerRoot");function oe(e){if(e.nodeType!==1||!e.classList.contains("observablehq"))return;const t=e.querySelectorAll(".observablehq--expanded");if(t.length)return Array.from(t,r=>re(e,r))}n(oe,"X"),i(oe,"getExpanded");function re(e,t){const r=[];for(;t!==e;)r.push(ne(t)),t=t.parentNode;return r.reverse()}n(re,"Y"),i(re,"getNodePath");function ne(e){return Array.prototype.indexOf.call(e.parentNode.childNodes,e)}n(ne,"Z"),i(ne,"getChildIndex");export{K as define};
