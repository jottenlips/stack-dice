var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function a(e){e.forEach(t)}function r(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function o(e,t){e.appendChild(t)}function i(e){e.parentNode.removeChild(e)}function c(e){return document.createElement(e)}function l(e){return document.createTextNode(e)}function u(){return l(" ")}function h(e,t,n,a){return e.addEventListener(t,n,a),()=>e.removeEventListener(t,n,a)}function f(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function d(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function p(e,t,n,a){e.style.setProperty(t,n,a?"important":"")}let m;function g(e){m=e}const b=[],$=[],k=[],v=[],y=Promise.resolve();let S=!1;function M(e){k.push(e)}let A=!1;const _=new Set;function x(){if(!A){A=!0;do{for(let e=0;e<b.length;e+=1){const t=b[e];g(t),E(t.$$)}for(g(null),b.length=0;$.length;)$.pop()();for(let e=0;e<k.length;e+=1){const t=k[e];_.has(t)||(_.add(t),t())}k.length=0}while(b.length);for(;v.length;)v.pop()();S=!1,A=!1,_.clear()}}function E(e){if(null!==e.fragment){e.update(),a(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(M)}}const j=new Set;function D(e,t){-1===e.$$.dirty[0]&&(b.push(e),S||(S=!0,y.then(x)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function R(s,o,c,l,u,h,f,d=[-1]){const p=m;g(s);const b=s.$$={fragment:null,ctx:null,props:h,update:e,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:o.context||[]),callbacks:n(),dirty:d,skip_bound:!1,root:o.target||p.$$.root};f&&f(b.root);let $=!1;if(b.ctx=c?c(s,o.props||{},((e,t,...n)=>{const a=n.length?n[0]:t;return b.ctx&&u(b.ctx[e],b.ctx[e]=a)&&(!b.skip_bound&&b.bound[e]&&b.bound[e](a),$&&D(s,e)),t})):[],b.update(),$=!0,a(b.before_update),b.fragment=!!l&&l(b.ctx),o.target){if(o.hydrate){const e=function(e){return Array.from(e.childNodes)}(o.target);b.fragment&&b.fragment.l(e),e.forEach(i)}else b.fragment&&b.fragment.c();o.intro&&((k=s.$$.fragment)&&k.i&&(j.delete(k),k.i(v))),function(e,n,s,o){const{fragment:i,on_mount:c,on_destroy:l,after_update:u}=e.$$;i&&i.m(n,s),o||M((()=>{const n=c.map(t).filter(r);l?l.push(...n):a(n),e.$$.on_mount=[]})),u.forEach(M)}(s,o.target,o.anchor,o.customElement),x()}var k,v;g(p)}function B(t){let n,r,s,m,g,b,$,k,v,y,S,M,A,_,x,E,j,D,R,B,L,P,w,C,T,G,q,F,K,I,N,H,W,O,Q,V,J,z,U,X,Y,Z,ee,te,ne,ae,re,se,oe,ie,ce,le,ue,he,fe,de,pe,me,ge,be,$e,ke,ve,ye,Se,Me,Ae,_e,xe,Ee,je,De,Re,Be,Le,Pe,we,Ce,Te,Ge,qe,Fe,Ke,Ie,Ne,He,We,Oe,Qe=t[5][t[24]]+"",Ve=t[6][t[25]]+"",Je=t[8]?`${t[1][t[20]]}\n`:"",ze=(t[10]||t[11])&&t[8]&&t[9]?`${t[2][t[21]]}\n`:"",Ue=t[10]?`${t[3][t[22]]}\n`:"",Xe=t[11]?`${t[4][t[23]]}\n`:"",Ye=t[7]?`${t[0][t[19]]}\n`:"";return{c(){n=c("main"),r=c("h1"),s=l("Build a "),m=c("span"),g=l(Qe),b=l(" for\n    "),$=c("span"),k=l(Ve),v=l("\n    with "),y=l("\n"),S=u(),M=c("a"),A=l(Je),x=u(),E=c("a"),j=l(ze),R=c("a"),B=l(Ue),P=c("a"),w=l(Xe),T=c("a"),G=l(Ye),F=u(),K=c("p"),I=c("button"),I.textContent="Roll 🎲 For App",N=u(),H=l("\n"),W=l("\n    Settings:\n    "),O=l("\n"),Q=u(),V=c("button"),J=l("Backend: "),z=l(t[8]),U=u(),X=c("button"),Y=l("API Type: "),Z=l(t[9]),ee=u(),te=c("button"),ne=l("Frontend Framework: "),ae=l(t[10]),re=u(),se=c("button"),oe=l("Mobile: "),ie=l(t[11]),ce=u(),le=c("button"),ue=l("Pick Database: "),he=l(t[7]),fe=u(),de=c("p"),de.textContent="\n\n    Locks:\n    \n",pe=u(),me=c("button"),ge=l("Keep Idea: "),be=l(t[13]),$e=u(),ke=c("button"),ve=l("Keep Audience: "),ye=l(t[12]),Se=u(),Me=c("button"),Ae=l("Keep Backend: "),_e=l(t[15]),xe=u(),Ee=c("button"),je=l("Keep API Type: "),De=l(t[16]),Re=u(),Be=c("button"),Le=l("Keep Frontend: "),Pe=l(t[17]),we=u(),Ce=c("button"),Te=l("Keep Mobile: "),Ge=l(t[18]),qe=u(),Fe=c("button"),Ke=l("Keep Database: "),Ie=l(t[14]),Ne=u(),He=c("h2"),He.innerHTML='Not seeing your favorite stack? Make a contribution on <a href="https://github.com/jottenlips/stack-dice" class="svelte-2hrgfj">Github</a>',p(m,"font-weight","500"),p($,"font-weight","500"),f(M,"target","_blank"),f(M,"href",_=`https://github.com/search?ref=simplesearch&q=${t[1][t[20]]}`),f(M,"class","svelte-2hrgfj"),f(E,"target","_blank"),f(E,"href",D=`https://github.com/search?ref=simplesearch&q=${t[2][t[21]]}`),f(E,"class","svelte-2hrgfj"),f(R,"target","_blank"),f(R,"href",L=`https://github.com/search?ref=simplesearch&q=${t[3][t[22]]}`),f(R,"class","svelte-2hrgfj"),f(P,"target","_blank"),f(P,"href",C=`https://github.com/search?ref=simplesearch&q=${t[4][t[23]]}`),f(P,"class","svelte-2hrgfj"),f(T,"target","_blank"),f(T,"href",q=`https://github.com/search?ref=simplesearch&q=${t[0][t[19]]}`),f(T,"class","svelte-2hrgfj"),f(r,"class","svelte-2hrgfj"),p(I,"background-color","#7496db"),p(I,"border-radius","2px"),f(K,"class","svelte-2hrgfj"),f(de,"class","svelte-2hrgfj"),f(He,"class","svelte-2hrgfj"),f(n,"class","svelte-2hrgfj")},m(e,a){!function(e,t,n){e.insertBefore(t,n||null)}(e,n,a),o(n,r),o(r,s),o(r,m),o(m,g),o(r,b),o(r,$),o($,k),o(r,v),o(r,y),o(r,S),o(r,M),o(M,A),o(r,x),o(r,E),o(E,j),o(r,R),o(R,B),o(r,P),o(P,w),o(r,T),o(T,G),o(n,F),o(n,K),o(K,I),o(K,N),o(K,H),o(K,W),o(K,O),o(n,Q),o(n,V),o(V,J),o(V,z),o(n,U),o(n,X),o(X,Y),o(X,Z),o(n,ee),o(n,te),o(te,ne),o(te,ae),o(n,re),o(n,se),o(se,oe),o(se,ie),o(n,ce),o(n,le),o(le,ue),o(le,he),o(n,fe),o(n,de),o(n,pe),o(n,me),o(me,ge),o(me,be),o(n,$e),o(n,ke),o(ke,ve),o(ke,ye),o(n,Se),o(n,Me),o(Me,Ae),o(Me,_e),o(n,xe),o(n,Ee),o(Ee,je),o(Ee,De),o(n,Re),o(n,Be),o(Be,Le),o(Be,Pe),o(n,we),o(n,Ce),o(Ce,Te),o(Ce,Ge),o(n,qe),o(n,Fe),o(Fe,Ke),o(Fe,Ie),o(n,Ne),o(n,He),We||(Oe=[h(I,"click",t[38]),h(V,"click",t[27]),h(X,"click",t[28]),h(te,"click",t[29]),h(se,"click",t[30]),h(le,"click",t[26]),h(me,"click",t[32]),h(ke,"click",t[31]),h(Me,"click",t[34]),h(Ee,"click",t[35]),h(Be,"click",t[36]),h(Ce,"click",t[37]),h(Fe,"click",t[33])],We=!0)},p(e,t){16777248&t[0]&&Qe!==(Qe=e[5][e[24]]+"")&&d(g,Qe),33554496&t[0]&&Ve!==(Ve=e[6][e[25]]+"")&&d(k,Ve),1048834&t[0]&&Je!==(Je=e[8]?`${e[1][e[20]]}\n`:"")&&d(A,Je),1048578&t[0]&&_!==(_=`https://github.com/search?ref=simplesearch&q=${e[1][e[20]]}`)&&f(M,"href",_),2100996&t[0]&&ze!==(ze=(e[10]||e[11])&&e[8]&&e[9]?`${e[2][e[21]]}\n`:"")&&d(j,ze),2097156&t[0]&&D!==(D=`https://github.com/search?ref=simplesearch&q=${e[2][e[21]]}`)&&f(E,"href",D),4195336&t[0]&&Ue!==(Ue=e[10]?`${e[3][e[22]]}\n`:"")&&d(B,Ue),4194312&t[0]&&L!==(L=`https://github.com/search?ref=simplesearch&q=${e[3][e[22]]}`)&&f(R,"href",L),8390672&t[0]&&Xe!==(Xe=e[11]?`${e[4][e[23]]}\n`:"")&&d(w,Xe),8388624&t[0]&&C!==(C=`https://github.com/search?ref=simplesearch&q=${e[4][e[23]]}`)&&f(P,"href",C),524417&t[0]&&Ye!==(Ye=e[7]?`${e[0][e[19]]}\n`:"")&&d(G,Ye),524289&t[0]&&q!==(q=`https://github.com/search?ref=simplesearch&q=${e[0][e[19]]}`)&&f(T,"href",q),256&t[0]&&d(z,e[8]),512&t[0]&&d(Z,e[9]),1024&t[0]&&d(ae,e[10]),2048&t[0]&&d(ie,e[11]),128&t[0]&&d(he,e[7]),8192&t[0]&&d(be,e[13]),4096&t[0]&&d(ye,e[12]),32768&t[0]&&d(_e,e[15]),65536&t[0]&&d(De,e[16]),131072&t[0]&&d(Pe,e[17]),262144&t[0]&&d(Ge,e[18]),16384&t[0]&&d(Ie,e[14])},i:e,o:e,d(e){e&&i(n),We=!1,a(Oe)}}}function L(e,t,n){let{database:a}=t,{backend:r}=t,{api:s}=t,{frontend:o}=t,{mobile:i}=t,{ideas:c}=t,{audiences:l}=t,u=!1,h=!0,f=!1,d=!0,p=!1;let m=!1,g=!1,b=!1,$=!1,k=!1,v=!1,y=!1;let S=0,M=0,A=0,_=0,x=0,E=0,j=0;const D=e=>Math.floor(Math.random()*e),R=()=>{b||n(19,S=D(a.length)),$||n(20,M=D(r.length)),k||n(21,A=D(s.length)),v||n(22,_=D(o.length)),y||n(23,x=D(i.length)),g||n(24,E=D(c.length)),m||n(25,j=D(l.length))};return R(),e.$$set=e=>{"database"in e&&n(0,a=e.database),"backend"in e&&n(1,r=e.backend),"api"in e&&n(2,s=e.api),"frontend"in e&&n(3,o=e.frontend),"mobile"in e&&n(4,i=e.mobile),"ideas"in e&&n(5,c=e.ideas),"audiences"in e&&n(6,l=e.audiences)},[a,r,s,o,i,c,l,u,h,f,d,p,m,g,b,$,k,v,y,S,M,A,_,x,E,j,()=>{n(7,u=!u)},()=>{n(8,h=!h)},()=>{n(9,f=!f)},()=>{n(10,d=!d)},()=>{n(11,p=!p)},()=>{n(12,m=!m)},()=>{n(13,g=!g)},()=>{n(14,b=!b)},()=>{n(15,$=!$)},()=>{n(16,k=!k)},()=>{n(17,v=!v)},()=>{n(18,y=!y)},R]}return new class extends class{$destroy(){!function(e,t){const n=e.$$;null!==n.fragment&&(a(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),R(this,e,L,B,s,{database:0,backend:1,api:2,frontend:3,mobile:4,ideas:5,audiences:6},null,[-1,-1])}}({target:document.body,props:{database:["PostgreSQL","MongoDB","DynamoDB","MySQL","Neo4j","Redis","SQLite","MariaDB","Microsoft SQL Server","Elasticsearch"],backend:["Ruby on Rails","Django","Serverless Cloud","Meteor","Flask","Sinatra","FastAPI","Supabase","Laravel","Express","Koa","Spring","ASP.NET","Serverless"],api:["GraphQL","REST"],frontend:["React","Svelte","Vue","Vanilla.js","Electron","Next.js","Preact","Rescript","ReasonReact","Elm","Ink"],mobile:["React Native","Flutter","Kotlin Multiplatform","Swift/Xcode","Java/Android Studio","PWA","Expo"],ideas:["Chat App","Game","Schedule App","Marketplace","Blogsphere","Map Application","Reccomendation Engine","Bulletin Board","Edu-tainment Platform","Command Line Interface","Twitter Bot","Twilio Bot","Reddit Bot","Media Player","RPG Game","Musical Instrument","Kanban Board","Email Organizer","Avatar Generator","Content Management System","Massively multiplayer online game","Sidescroller Game","Data Visualization Dashboard","Swipe Left/Right App","Habit Tracker","Search Engine"],audiences:["Cat Owners","Coffee Addicts","Cooks","Book Lovers","Board Game Enthusiast","Movie Nerds","Gym Rats","Skaters","Car Lovers","Gamers","Gardeners","Metal Workers","Animal Rights Activists","Remote Learning","Rock Climbers","Dog Trainers","Personal Trainers","Pokemon Trainers","Arborists","Wookies","Grateful Dead Heads","Electronic Musicians","Lego Builders","Artists","Painters","Javascript Developers","Web Developers","Mobile Developers","VSCode Users","Music Festival Goers","Hair Stylists","Doctors","Data Scientists","Data Analysts","Fast Food Junkies","Insomniacs","Cyclists","Families","Vegans","Snowboarders","Tennis Players","Indie Musicians","Weight Lifters","Home Aqauriums","Recipes","Home Decorators","Landscape Architects","Beer Drinkers","Wine Snobs","Car Maintenance"]}})}();
//# sourceMappingURL=bundle.js.map
