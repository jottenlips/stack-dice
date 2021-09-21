var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function r(e){e.forEach(t)}function a(e){return"function"==typeof e}function o(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function s(e,t){e.appendChild(t)}function i(e){e.parentNode.removeChild(e)}function c(e){return document.createElement(e)}function l(e){return document.createTextNode(e)}function u(){return l(" ")}function h(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function d(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function p(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function f(e,t,n,r){e.style.setProperty(t,n,r?"important":"")}let m;function g(e){m=e}const b=[],k=[],$=[],S=[],y=Promise.resolve();let v=!1;function A(e){$.push(e)}let M=!1;const P=new Set;function C(){if(!M){M=!0;do{for(let e=0;e<b.length;e+=1){const t=b[e];g(t),_(t.$$)}for(g(null),b.length=0;k.length;)k.pop()();for(let e=0;e<$.length;e+=1){const t=$[e];P.has(t)||(P.add(t),t())}$.length=0}while(b.length);for(;S.length;)S.pop()();v=!1,M=!1,P.clear()}}function _(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(A)}}const D=new Set;function E(e,t){-1===e.$$.dirty[0]&&(b.push(e),v||(v=!0,y.then(C)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function R(o,s,c,l,u,h,d,p=[-1]){const f=m;g(o);const b=o.$$={fragment:null,ctx:null,props:h,update:e,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:s.context||[]),callbacks:n(),dirty:p,skip_bound:!1,root:s.target||f.$$.root};d&&d(b.root);let k=!1;if(b.ctx=c?c(o,s.props||{},((e,t,...n)=>{const r=n.length?n[0]:t;return b.ctx&&u(b.ctx[e],b.ctx[e]=r)&&(!b.skip_bound&&b.bound[e]&&b.bound[e](r),k&&E(o,e)),t})):[],b.update(),k=!0,r(b.before_update),b.fragment=!!l&&l(b.ctx),s.target){if(s.hydrate){const e=function(e){return Array.from(e.childNodes)}(s.target);b.fragment&&b.fragment.l(e),e.forEach(i)}else b.fragment&&b.fragment.c();s.intro&&(($=o.$$.fragment)&&$.i&&(D.delete($),$.i(S))),function(e,n,o,s){const{fragment:i,on_mount:c,on_destroy:l,after_update:u}=e.$$;i&&i.m(n,o),s||A((()=>{const n=c.map(t).filter(a);l?l.push(...n):r(n),e.$$.on_mount=[]})),u.forEach(A)}(o,s.target,s.anchor,s.customElement),C()}var $,S;g(f)}function x(t){let n,a,o,m,g,b,k,$,S,y,v,A,M,P,C,_,D,E,R,x,B,T,j,L,w,F,G,I,q,N,K,V,H,W,O,Q,z,J,U,X,Y,Z,ee,te,ne,re,ae,oe,se,ie,ce,le,ue,he,de,pe,fe,me,ge,be,ke,$e,Se,ye,ve,Ae,Me,Pe,Ce,_e,De,Ee,Re,xe,Be,Te,je,Le,we,Fe,Ge,Ie,qe,Ne,Ke,Ve,He,We,Oe=t[5][t[24]]+"",Qe=t[6][t[25]]+"",ze=t[8]?`${t[1][t[20]]}\n`:"",Je=(t[10]||t[11])&&t[8]&&t[9]?`${t[2][t[21]]}\n`:"",Ue=t[10]?`${t[3][t[22]]}\n`:"",Xe=t[11]?`${t[4][t[23]]}\n`:"",Ye=t[7]?`${t[0][t[19]]}\n`:"";return{c(){n=c("main"),a=c("h1"),o=l("Build a "),m=c("span"),g=l(Oe),b=l(" for\n    "),k=c("span"),$=l(Qe),S=l("\n    with "),y=l("\n"),v=u(),A=c("a"),M=l(ze),C=u(),_=c("a"),D=l(Je),R=c("a"),x=l(Ue),T=c("a"),j=l(Xe),w=c("a"),F=l(Ye),I=u(),q=c("p"),N=c("button"),N.textContent="Roll 🎲 For App",K=u(),V=l("\n"),H=l("\n    Settings:\n    "),W=l("\n"),O=u(),Q=c("button"),z=l("Backend: "),J=l(t[8]),U=u(),X=c("button"),Y=l("API Type: "),Z=l(t[9]),ee=u(),te=c("button"),ne=l("Frontend Framework: "),re=l(t[10]),ae=u(),oe=c("button"),se=l("Mobile: "),ie=l(t[11]),ce=u(),le=c("button"),ue=l("Pick Database: "),he=l(t[7]),de=u(),pe=c("p"),pe.textContent="\n\n    Locks:\n    \n",fe=u(),me=c("button"),ge=l("Keep Idea: "),be=l(t[13]),ke=u(),$e=c("button"),Se=l("Keep Audience: "),ye=l(t[12]),ve=u(),Ae=c("button"),Me=l("Keep Backend: "),Pe=l(t[15]),Ce=u(),_e=c("button"),De=l("Keep API Type: "),Ee=l(t[16]),Re=u(),xe=c("button"),Be=l("Keep Frontend: "),Te=l(t[17]),je=u(),Le=c("button"),we=l("Keep Mobile: "),Fe=l(t[18]),Ge=u(),Ie=c("button"),qe=l("Keep Database: "),Ne=l(t[14]),Ke=u(),Ve=c("h2"),Ve.innerHTML='Not seeing your favorite stack? Make a contribution on <a href="https://github.com/jottenlips/stack-dice" class="svelte-2hrgfj">Github</a>',f(m,"font-weight","500"),f(k,"font-weight","500"),d(A,"target","_blank"),d(A,"href",P=`https://github.com/search?ref=simplesearch&q=${t[1][t[20]]}`),d(A,"class","svelte-2hrgfj"),d(_,"target","_blank"),d(_,"href",E=`https://github.com/search?ref=simplesearch&q=${t[2][t[21]]}`),d(_,"class","svelte-2hrgfj"),d(R,"target","_blank"),d(R,"href",B=`https://github.com/search?ref=simplesearch&q=${t[3][t[22]]}`),d(R,"class","svelte-2hrgfj"),d(T,"target","_blank"),d(T,"href",L=`https://github.com/search?ref=simplesearch&q=${t[4][t[23]]}`),d(T,"class","svelte-2hrgfj"),d(w,"target","_blank"),d(w,"href",G=`https://github.com/search?ref=simplesearch&q=${t[0][t[19]]}`),d(w,"class","svelte-2hrgfj"),d(a,"class","svelte-2hrgfj"),f(N,"background-color","#7496db"),f(N,"border-radius","2px"),d(q,"class","svelte-2hrgfj"),d(pe,"class","svelte-2hrgfj"),d(Ve,"class","svelte-2hrgfj"),d(n,"class","svelte-2hrgfj")},m(e,r){!function(e,t,n){e.insertBefore(t,n||null)}(e,n,r),s(n,a),s(a,o),s(a,m),s(m,g),s(a,b),s(a,k),s(k,$),s(a,S),s(a,y),s(a,v),s(a,A),s(A,M),s(a,C),s(a,_),s(_,D),s(a,R),s(R,x),s(a,T),s(T,j),s(a,w),s(w,F),s(n,I),s(n,q),s(q,N),s(q,K),s(q,V),s(q,H),s(q,W),s(n,O),s(n,Q),s(Q,z),s(Q,J),s(n,U),s(n,X),s(X,Y),s(X,Z),s(n,ee),s(n,te),s(te,ne),s(te,re),s(n,ae),s(n,oe),s(oe,se),s(oe,ie),s(n,ce),s(n,le),s(le,ue),s(le,he),s(n,de),s(n,pe),s(n,fe),s(n,me),s(me,ge),s(me,be),s(n,ke),s(n,$e),s($e,Se),s($e,ye),s(n,ve),s(n,Ae),s(Ae,Me),s(Ae,Pe),s(n,Ce),s(n,_e),s(_e,De),s(_e,Ee),s(n,Re),s(n,xe),s(xe,Be),s(xe,Te),s(n,je),s(n,Le),s(Le,we),s(Le,Fe),s(n,Ge),s(n,Ie),s(Ie,qe),s(Ie,Ne),s(n,Ke),s(n,Ve),He||(We=[h(N,"click",t[38]),h(Q,"click",t[27]),h(X,"click",t[28]),h(te,"click",t[29]),h(oe,"click",t[30]),h(le,"click",t[26]),h(me,"click",t[32]),h($e,"click",t[31]),h(Ae,"click",t[34]),h(_e,"click",t[35]),h(xe,"click",t[36]),h(Le,"click",t[37]),h(Ie,"click",t[33])],He=!0)},p(e,t){16777248&t[0]&&Oe!==(Oe=e[5][e[24]]+"")&&p(g,Oe),33554496&t[0]&&Qe!==(Qe=e[6][e[25]]+"")&&p($,Qe),1048834&t[0]&&ze!==(ze=e[8]?`${e[1][e[20]]}\n`:"")&&p(M,ze),1048578&t[0]&&P!==(P=`https://github.com/search?ref=simplesearch&q=${e[1][e[20]]}`)&&d(A,"href",P),2100996&t[0]&&Je!==(Je=(e[10]||e[11])&&e[8]&&e[9]?`${e[2][e[21]]}\n`:"")&&p(D,Je),2097156&t[0]&&E!==(E=`https://github.com/search?ref=simplesearch&q=${e[2][e[21]]}`)&&d(_,"href",E),4195336&t[0]&&Ue!==(Ue=e[10]?`${e[3][e[22]]}\n`:"")&&p(x,Ue),4194312&t[0]&&B!==(B=`https://github.com/search?ref=simplesearch&q=${e[3][e[22]]}`)&&d(R,"href",B),8390672&t[0]&&Xe!==(Xe=e[11]?`${e[4][e[23]]}\n`:"")&&p(j,Xe),8388624&t[0]&&L!==(L=`https://github.com/search?ref=simplesearch&q=${e[4][e[23]]}`)&&d(T,"href",L),524417&t[0]&&Ye!==(Ye=e[7]?`${e[0][e[19]]}\n`:"")&&p(F,Ye),524289&t[0]&&G!==(G=`https://github.com/search?ref=simplesearch&q=${e[0][e[19]]}`)&&d(w,"href",G),256&t[0]&&p(J,e[8]),512&t[0]&&p(Z,e[9]),1024&t[0]&&p(re,e[10]),2048&t[0]&&p(ie,e[11]),128&t[0]&&p(he,e[7]),8192&t[0]&&p(be,e[13]),4096&t[0]&&p(ye,e[12]),32768&t[0]&&p(Pe,e[15]),65536&t[0]&&p(Ee,e[16]),131072&t[0]&&p(Te,e[17]),262144&t[0]&&p(Fe,e[18]),16384&t[0]&&p(Ne,e[14])},i:e,o:e,d(e){e&&i(n),He=!1,r(We)}}}function B(e,t,n){let{database:r}=t,{backend:a}=t,{api:o}=t,{frontend:s}=t,{mobile:i}=t,{ideas:c}=t,{audiences:l}=t,u=!1,h=!0,d=!1,p=!0,f=!1;let m=!1,g=!1,b=!1,k=!1,$=!1,S=!1,y=!1;let v=0,A=0,M=0,P=0,C=0,_=0,D=0;const E=e=>Math.floor(Math.random()*e),R=()=>{b||n(19,v=E(r.length)),k||n(20,A=E(a.length)),$||n(21,M=E(o.length)),S||n(22,P=E(s.length)),y||n(23,C=E(i.length)),g||n(24,_=E(c.length)),m||n(25,D=E(l.length))};return R(),e.$$set=e=>{"database"in e&&n(0,r=e.database),"backend"in e&&n(1,a=e.backend),"api"in e&&n(2,o=e.api),"frontend"in e&&n(3,s=e.frontend),"mobile"in e&&n(4,i=e.mobile),"ideas"in e&&n(5,c=e.ideas),"audiences"in e&&n(6,l=e.audiences)},[r,a,o,s,i,c,l,u,h,d,p,f,m,g,b,k,$,S,y,v,A,M,P,C,_,D,()=>{n(7,u=!u)},()=>{n(8,h=!h)},()=>{n(9,d=!d)},()=>{n(10,p=!p)},()=>{n(11,f=!f)},()=>{n(12,m=!m)},()=>{n(13,g=!g)},()=>{n(14,b=!b)},()=>{n(15,k=!k)},()=>{n(16,$=!$)},()=>{n(17,S=!S)},()=>{n(18,y=!y)},R]}return new class extends class{$destroy(){!function(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),R(this,e,B,x,o,{database:0,backend:1,api:2,frontend:3,mobile:4,ideas:5,audiences:6},null,[-1,-1])}}({target:document.body,props:{database:["PostgreSQL","MongoDB","DynamoDB","MySQL","Neo4j","Redis","SQLite","MariaDB","Microsoft SQL Server","Elasticsearch","Firebase"],backend:["Ruby on Rails","Django","Serverless Cloud","Meteor","Flask","Sinatra","FastAPI","Supabase","Laravel","Express","Koa","Spring","ASP.NET","Serverless"],api:["GraphQL","REST"],frontend:["React","Svelte","Vue","Vanilla.js","Electron","Next.js","Preact","Rescript","ReasonReact","Elm","Ink"],mobile:["React Native","Flutter","Kotlin Multiplatform","Swift/Xcode","Java/Android Studio","PWA","Expo"],ideas:["Chat App","Game","Schedule App","Marketplace","Blogsphere","Map Application","Reccomendation Engine","Bulletin Board","Edu-tainment Platform","Command Line Interface","Twitter Bot","Twilio Bot","Reddit Bot","Media Player","RPG Game","Musical Instrument","Kanban Board","Email Organizer","Avatar Generator","Content Management System","Massively multiplayer online game","Sidescroller Game","Data Visualization Dashboard","Swipe Left/Right App","Habit Tracker","Search Engine","Static Site Generator","Video Chat Site","Scoreboard","Reminder App","Neopets Clone","Picture Sharing Site","Stock Photo Search","Stock Music Search","Stock Video Search","VR App","Reddit Clone","Pixel Art Studio","Synthesizer","Sheet Music Player","Virtual Tape Recorder","Craigslist Clone","Donation Portal","PDF Generator","Penpal Service","Trading post","App Idea Generator","Note Taking App","Ecosystem","Progress Tracker"],audiences:["Cat Owners","Coffee Addicts","Cooks","Book Lovers","Board Game Enthusiast","Movie Nerds","Gym Rats","Skaters","Car Lovers","Gamers","Gardeners","Metal Workers","Animal Rights Activists","Remote Learning","Rock Climbers","Dog Trainers","Personal Trainers","Pokemon Trainers","Arborists","Wookies","Grateful Dead Heads","Electronic Musicians","Lego Builders","Artists","Painters","Javascript Developers","Web Developers","Mobile Developers","VSCode Users","Music Festival Goers","Hair Stylists","Doctors","Data Scientists","Data Analysts","Fast Food Junkies","Insomniacs","Cyclists","Families","Vegans","Snowboarders","Tennis Players","Indie Musicians","Weight Lifters","Home Aqauriums","Recipes","Home Decorators","Landscape Architects","Beer Drinkers","Wine Snobs","Car Maintenance","Youtube Creators","Social Media Influencers","Thrift Stores","Popup Shops","Farmers Markets","Indoor Plant Fanatics","Comic Book Fans","Astronomers","Service Industry Workers","Comppany Founders","Lawyers","Politicians","Football Players","Soccer Players","Mobile Developers","Dual Citizens","Craft Breweries","Tea Shops","Hackers","Everyone","Animals","Philosophers"]}})}();
//# sourceMappingURL=bundle.js.map
