(this.webpackJsonprps_fontend=this.webpackJsonprps_fontend||[]).push([[0],{15:function(e,t,n){"use strict";var a,r;n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),function(e){e.ROCK="ROCK",e.PAPER="PAPER",e.SCISSORS="SCISSORS",e.NONE="NONE"}(a||(a={})),function(e){e[e.DRAW=101]="DRAW",e[e.PLAYERWIN=102]="PLAYERWIN",e[e.DEALERWIN=201]="DEALERWIN"}(r||(r={}));var i="0xbef444230B8005F255C859E7eea90AD58da74684"},151:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return x}));var a=n(2),r=n.n(a),i=n(26),c=n(33),u=n(157),s=n(12),l=n(152),o=n(158),p=n(3),m=n(13),d=n(50),y=n(156),b=n.n(y),f=n(15),v=n(37),h=n(7),j=new m.a.providers.Web3Provider(window.ethereum),O=f.c;console.log(f.c);var g=1048576;function x(){var t=Object(p.useState)(null),n=Object(c.a)(t,2),a=n[0],y=n[1],x=Object(p.useState)(0),w=Object(c.a)(x,2),T=w[0],E=w[1],S=Object(p.useState)(!1),k=Object(c.a)(S,2),N=k[0],C=k[1];window.ethereum.on("accountsChanged",(function(e){return P(e)})),window.ethereum.on("close",C(!1));var P=function(){var e=Object(i.a)(r.a.mark((function e(t){var n,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===t||void 0===t){e.next=4;break}e.t0=t,e.next=7;break;case 4:return e.next=6,j.listAccounts();case 6:e.t0=e.sent;case 7:if(0!==(n=e.t0).length){e.next=10;break}return e.abrupt("return");case 10:return C(!0),y(n[0]),e.next=14,j.getBalance(n[0]);case 14:a=e.sent,E(+m.a.utils.formatEther(a));case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(i.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.ethereum.request({method:"eth_requestAccounts"});case 2:t=e.sent,P(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=function(){var e=Object(i.a)(r.a.mark((function e(t,n){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=t,e.next=e.t0===f.a.ROCK?3:e.t0===f.a.PAPER?7:e.t0===f.a.SCISSORS?11:15;break;case 3:return e.next=5,n.ROCK();case 5:return a=e.sent,e.abrupt("break",18);case 7:return e.next=9,n.PAPER();case 9:return a=e.sent,e.abrupt("break",18);case 11:return e.next=13,n.SCISSORS();case 13:return a=e.sent,e.abrupt("break",18);case 15:return e.next=17,n.NONE();case 17:a=e.sent;case 18:return e.abrupt("return",a);case 19:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),A=function(){var e=Object(i.a)(r.a.mark((function e(t,n){var i,c,u,s,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R(t,n);case 2:if(i=e.sent,null!==a){e.next=5;break}return e.abrupt("return");case 5:return c=b.a.randomBytes(32),u=c.toString("base64"),s=m.a.utils.solidityKeccak256(["address","uint8","bytes32"],[a,i,c]),l={randomSecretStr:u,dealerHash:s},e.abrupt("return",l);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),M=function(){var e=Object(i.a)(r.a.mark((function e(t,n){var a,i,c,u,s,l,o,p,y,b;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=j.getSigner(),i=new m.a.Contract(O,d.a,a),e.next=4,A(t,i);case 4:return c=e.sent,u=null===c||void 0===c?void 0:c.dealerHash,s=null===c||void 0===c?void 0:c.randomSecretStr,l=window.ethersProvider.getGasPrice(),e.prev=8,e.next=11,i.createGame(u,{value:m.a.utils.parseEther(n),gasLimit:m.a.utils.hexlify(g),gasPrice:l});case 11:return o=e.sent,e.next=14,Object(v.d)(o);case 14:p=e.sent,y=Object(v.c)(p),console.log(y),b={gameId:y,randomStr:s,choice:t},localStorage.setItem("".concat(y),JSON.stringify(b)),window.location.reload(),e.next=26;break;case 22:e.prev=22,e.t0=e.catch(8),console.log("fail to creat game"),console.log(e.t0);case 26:case"end":return e.stop()}}),e,null,[[8,22]])})));return function(t,n){return e.apply(this,arguments)}}(),G=function(){var e=Object(i.a)(r.a.mark((function e(t,n,a){var i,c,u,s,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=j.getSigner(),c=new m.a.Contract(O,d.a,i),e.next=4,R(t,c);case 4:return u=e.sent,s=Object(v.a)(a),l=window.ethersProvider.getGasPrice(),e.prev=7,e.next=10,c.joinGame(s,u,{value:m.a.utils.parseEther(n),gasLimit:m.a.utils.hexlify(g),gasPrice:l});case 10:window.location.reload(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(7),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[7,13]])})));return function(t,n,a){return e.apply(this,arguments)}}(),B=function(){var t=Object(i.a)(r.a.mark((function t(n){var a,c,u,s,l,o,p,y,b,h;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=j.getSigner(),c=new m.a.Contract(O,d.a,a),u=localStorage.getItem("".concat(n)),s=u?JSON.parse(u):"",l=Object(v.a)(n),o=s.choice,t.next=8,R(o,c);case 8:return p=t.sent,y=s.randomStr,b=y?e.from(y,"base64"):"",h=window.ethersProvider.getGasPrice(),t.prev=12,t.next=15,c.revealGame(l,p,b,{gasLimit:m.a.utils.hexlify(g),gasPrice:h});case 15:c.on("CloseGame",function(){var e=Object(i.a)(r.a.mark((function e(t,n,a,i){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:localStorage.removeItem("".concat(t)),e.t0=Object(v.c)(i),e.next=e.t0===f.b.DRAW?4:e.t0===f.b.DEALERWIN?6:e.t0===f.b.PLAYERWIN?8:9;break;case 4:return alert("This is a draw!"),e.abrupt("break",9);case 6:return alert("Congrats! You win a game"),e.abrupt("break",9);case 8:alert("Opps, you lose a game");case 9:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}()).on("error",console.error),t.next=21;break;case 18:t.prev=18,t.t0=t.catch(12),console.log(t.t0);case 21:case"end":return t.stop()}}),t,null,[[12,18]])})));return function(e){return t.apply(this,arguments)}}();return Object(p.useEffect)((function(){P(null)}),[N]),Object(h.jsx)(u.a,{basename:"/",children:Object(h.jsxs)(s.d,{children:[Object(h.jsx)(s.b,{exact:!0,path:"/",children:N?Object(h.jsx)(s.a,{to:"/playground"}):Object(h.jsx)(l.a,{onClick:I})}),Object(h.jsx)(s.b,{path:"/playground",children:Object(h.jsx)(o.a,{account:a,balance:T,createGame:M,joinGame:G,revealResult:B})}),Object(h.jsx)(s.a,{from:"*",to:"/"})]})})}}).call(this,n(18).Buffer)},152:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(170);var a=n(7);function r(e){return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("h1",{children:"Welcome to the ROCK PAPER SCISSORS Game "}),Object(a.jsx)("h3",{children:"Click to connect your Metamask account!"}),Object(a.jsx)("span",{onClick:e.onClick,children:"Connect!"})]})})}},158:function(e,t,n){"use strict";n.d(t,"a",(function(){return Z}));var a=n(60),r=n(2),i=n.n(r),c=n(26),u=n(33),s=n(3);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=s.createElement("g",null,s.createElement("path",{d:"m256 0c-140.959 0-256 115.05-256 256 0 140.959 115.05 256 256 256 140.959 0 256-115.049 256-256 0-140.959-115.049-256-256-256zm0 482c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"}),s.createElement("path",{d:"m256 151c28.047 0 54.414 10.922 74.246 30.753 5.856 5.857 15.354 5.858 21.213 0 5.858-5.857 5.858-15.355 0-21.213-25.498-25.498-59.399-39.54-95.459-39.54s-69.961 14.042-95.459 39.541c-52.636 52.636-52.636 138.283 0 190.919 25.498 25.498 59.399 39.54 95.459 39.54s69.961-14.042 95.459-39.541c5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0-19.832 19.832-46.199 30.754-74.246 30.754-28.046 0-54.415-10.922-74.247-30.753-40.939-40.94-40.939-107.553 0-148.493 19.832-19.832 46.201-30.754 74.247-30.754z"}));function m(e,t){var n=e.title,a=e.titleId,r=o(e,["title","titleId"]);return s.createElement("svg",l({id:"Capa_1",enableBackground:"new 0 0 512 512",height:512,viewBox:"0 0 512 512",width:512,xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},r),n?s.createElement("title",{id:a},n):null,p)}var d=s.forwardRef(m),y=(n.p,n(172),n(7));function b(e){var t=(new Date).getTime(),n=(1e3*e.expireTime-t)/1e3/60;return Object(y.jsx)(y.Fragment,{children:Object(y.jsxs)("div",{className:"medal ".concat(e.owned?"own":""),children:[e.owned&&Object(y.jsx)(d,{className:"creatorSticker",id:"creator",width:"25",height:"25",fill:"rgb(228, 224, 172)",stroke:"rgb(228, 224, 172)",strokeWidth:"10",strokeLinecap:"round"}),Object(y.jsxs)("div",{className:"title",children:[Object(y.jsx)("span",{children:"GameId"}),Object(y.jsx)("span",{children:e.id})]}),Object(y.jsx)("table",{children:Object(y.jsxs)("tbody",{children:[e.owned&&Object(y.jsxs)("tr",{children:[Object(y.jsx)("th",{children:"Status:"}),Object(y.jsx)("td",{children:e.complete?"Waitting reveal":"Waitting player to join"})]}),Object(y.jsxs)("tr",{children:[Object(y.jsx)("th",{children:"Bet amount"}),Object(y.jsx)("td",{children:e.value})]}),Object(y.jsxs)("tr",{children:[Object(y.jsx)("th",{children:"Expired in"}),Object(y.jsx)("td",{children:"".concat(n.toFixed(0)," mins")})]})]})}),e.complete&&e.owned&&Object(y.jsx)("span",{className:"revealBtn",children:"Reveal"})]})})}var f=n(292),v=n(291),h=n(293),j=n(290);function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function g(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var x=s.createElement("path",{d:"m163.183594 390.335938-142.09375-69.375 141.964844 191.039062 21.328124-28.703125v-103.34375zm0 0",fill:"#708299"}),w=s.createElement("path",{d:"m163.054688 0-163.054688 292.574219h326.113281zm0 0",fill:"#708299"}),T=s.createElement("path",{d:"m326.113281 293.007812-163.058593-293.007812v293.007812zm0 0",fill:"#68788e"}),E=s.createElement("path",{d:"m113.726562 162.496094h32v32h-32zm0 0",fill:"#fff"}),S=s.createElement("path",{d:"m163.054688 213.121094-.640626-.304688-162.398437 80h.144531l162.398438 80 .640625-.304687 21.183593-10.367188v-138.578125zm0 0",fill:"#3c3c47"}),k=s.createElement("path",{d:"m113.726562 101.96875h32v32h-32zm0 0",fill:"#fff"}),N=s.createElement("path",{d:"m163.183594 390.335938-.128906 121.664062 142.066406-191.167969zm0 0",fill:"#68788e"}),C=s.createElement("path",{d:"m325.808594 292.816406-162.753906-79.695312-.640626-.304688.144532 160 .640625-.304687 162.753906-79.695313zm0 0",fill:"#31313b"});function P(e,t){var n=e.title,a=e.titleId,r=g(e,["title","titleId"]);return s.createElement("svg",O({height:"512pt",viewBox:"-93 0 512 512",width:"512pt",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},r),n?s.createElement("title",{id:a},n):null,x,w,T,E,S,k,N,C)}var I=s.forwardRef(P);n.p;function R(){return(R=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function A(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var M=s.createElement("g",null,s.createElement("path",{strokeWidth:2,d:"m140.107 281.589v-8.911c.066-20.065-24.254-30.576-38.775-17.035-8.444-8.076-22.834-8.074-31.275 0-13.106-12.243-35.007-4.952-38.337 12.553-14.683-6.207-32.052 5.45-31.715 21.483v85.197c0 18.558 10.642 35.587 26.957 43.897v85.68c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-90.551c0-3.118-1.929-5.91-4.845-7.014-13.226-5.007-22.112-17.872-22.112-32.012v-48.629c7.864 3.15 17.855 1.083 23.775-4.621 8.444 8.076 22.835 8.075 31.276 0 4.121 3.786 9.613 6.103 15.638 6.103h28.773v10.222c-14.886 5.439-28.819 20.409-28.819 41.229 0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5c0-15.567 11.688-26.132 22.686-28.169 3.555-.659 6.134-3.759 6.134-7.375v-23.408c0-4.142-3.357-7.5-7.5-7.5h-36.274c-4.487 0-8.138-3.651-8.138-8.138s3.65-8.138 8.138-8.138h51.912c4.487 0 8.138 3.65 8.138 8.138v70.286c0 14.14-8.887 27.004-22.112 32.012-2.916 1.104-4.845 3.896-4.845 7.014v90.551c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-85.68c16.315-8.31 26.957-25.339 26.957-43.897v-70.286c0-11.913-9.051-21.749-20.637-23.001zm-23.138-17.049c4.487 0 8.138 3.65 8.138 8.138v8.774h-16.275v-8.774c0-4.487 3.65-8.138 8.137-8.138zm-93.827 48.188c-4.487 0-8.138-3.65-8.138-8.138v-.684-14.228c.41-10.784 15.869-10.775 16.275 0v14.912c.001 4.488-3.649 8.138-8.137 8.138zm31.277 0c-4.487 0-8.139-3.65-8.139-8.138v-14.912-17c.41-10.783 15.87-10.776 16.276 0v31.912c0 4.488-3.65 8.138-8.137 8.138zm23.137-29.794v-10.255c.41-10.784 15.869-10.775 16.275 0v8.774h-8.138c-2.862-.001-5.604.525-8.137 1.481z"}));function G(e,t){var n=e.title,a=e.titleId,r=A(e,["title","titleId"]);return s.createElement("svg",R({id:"Layer_1",enableBackground:"new 0 0 512.003 512.003",height:512,viewBox:"0 0 512.003 512.003",width:512,xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},r),n?s.createElement("title",{id:a},n):null,M)}var B=s.forwardRef(G);n.p;function W(){return(W=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function z(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var L=s.createElement("path",{strokeWidth:2,d:"m367.524 112.211c-2.217-5.769-6.549-10.329-12.195-12.84-11.521-5.121-25.522.449-30.576 11.814l-11.709 27.111v-93.26c.318-15.84-16.63-27.481-31.276-21.66-1.781-31.114-45.02-31.087-46.275 0-14.649-5.817-31.592 5.819-31.275 21.661v15.34c-14.639-5.816-31.6 5.817-31.276 21.66v54.916c0 9.697 15 9.697 15 0v-54.917c.418-10.791 15.868-10.771 16.276 0v52.16c0 9.697 15 9.697 15 0 0-29.72 0-59.44 0-89.16.401-10.763 15.862-10.795 16.275 0v72.934c0 9.697 15 9.697 15 0v-94.88c0-4.487 3.65-8.138 8.138-8.138s8.138 3.65 8.138 8.138v94.88c0 9.697 15 9.697 15 0v-72.934c0-4.487 3.651-8.138 8.139-8.138s8.138 3.65 8.138 8.138v110.64c-22.138 1.979-39.46 20.591-39.46 42.862 0 9.697 15 9.697 15 0 0-21.027 19.038-28.786 36.963-28.043 2.992 0 5.699-1.779 6.886-4.526l21.06-48.762c2.44-4.342 6.021-5.719 10.741-4.129 4.343 2.44 5.72 6.021 4.13 10.742-11.829 26.603-36.258 81.051-36.258 81.051-3.458 9.825-11.136 17.816-20.538 21.375-2.916 1.104-4.845 3.896-4.845 7.014v271.193c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-266.335c11.148-5.73 20.07-15.856 24.419-27.952 12.074-26.708 24.018-53.47 35.927-80.252 2.509-5.647 2.671-11.934.453-17.703z","data-original":"#000000",className:""});function D(e,t){var n=e.title,a=e.titleId,r=z(e,["title","titleId"]);return s.createElement("svg",W({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",xmlnssvgjs:"http://svgjs.com/svgjs",width:512,height:512,x:0,y:0,viewBox:"0 0 512.003 512.003",style:{enableBackground:"new 0 0 512 512"},xmlSpace:"preserve",className:"",ref:t,"aria-labelledby":a},r),n?s.createElement("title",{id:a},n):null,s.createElement("g",{transform:"matrix(1.23,0,0,1.23,-58.88036016464224,211.11946304321305)"},s.createElement("g",{xmlns:"http://www.w3.org/2000/svg"},s.createElement("path",{strokeWidth:2,d:"m210.053 226.245c-13.227-5.007-22.113-17.872-22.113-32.011v-19.781c0-9.697-15-9.697-15 0v19.781c0 18.558 10.642 35.587 26.958 43.896v266.322c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-271.193c0-3.117-1.929-5.91-4.845-7.014z","data-original":"#000000",style:{},className:""}),L)))}var F=s.forwardRef(D);n.p;function J(){return(J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function K(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function Y(e,t){var n=e.title,a=e.titleId,r=K(e,["title","titleId"]);return s.createElement("svg",J({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",xmlnssvgjs:"http://svgjs.com/svgjs",width:512,height:512,x:0,y:0,viewBox:"0 0 512.003 512.003",style:{enableBackground:"new 0 0 512 512"},xmlSpace:"preserve",className:"",ref:t,"aria-labelledby":a},r),n?s.createElement("title",{id:a},n):null,s.createElement("g",{transform:"matrix(1.23,0,0,1.23,-268.88036016464224,26.119463043213045)"},s.createElement("g",{xmlns:"http://www.w3.org/2000/svg"},s.createElement("path",{strokeWidth:2,d:"m495.179 143.37c-12.063-3.424-25.19 4.007-28.575 15.942l-13.876 48.897-8.811-47.777c-2.314-12.547-14.411-20.875-26.951-18.558-12.547 2.314-20.871 14.404-18.558 26.951l7.529 40.828c-11.456-1.115-22.724 7.221-24.956 18.544-14.683-6.207-32.053 5.449-31.716 21.483v85.197c0 18.558 10.642 35.587 26.957 43.897v125.68c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-130.552c0-3.118-1.929-5.91-4.845-7.014-13.226-5.007-22.112-17.872-22.112-32.012v-48.629c7.864 3.151 17.856 1.082 23.776-4.621 8.443 8.076 22.834 8.074 31.275 0 4.121 3.786 9.614 6.103 15.638 6.103h28.774v10.222c-14.887 5.439-28.82 20.409-28.82 41.229 0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5c0-15.567 11.688-26.132 22.687-28.169 3.555-.658 6.134-3.759 6.134-7.375v-23.408c0-4.142-3.357-7.5-7.5-7.5h-36.274c-10.765-.4-10.792-15.865 0-16.276 17.304 0 34.608.002 51.912 0 4.487 0 8.138 3.65 8.138 8.138v70.286c0 14.14-8.887 27.004-22.112 32.012-2.916 1.104-4.845 3.896-4.845 7.014v39.717c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-34.846c16.315-8.31 26.957-25.339 26.957-43.897v-70.286c0-11.251-8.073-20.646-18.729-22.711l19.846-69.934c3.482-12.275-3.669-25.094-15.943-28.575zm-122.776 129.358c-4.487 0-8.138-3.65-8.138-8.138v-.684-14.228c.41-10.784 15.87-10.775 16.276 0v14.912c.001 4.488-3.651 8.138-8.138 8.138zm39.414-8.138c-.405 10.773-15.865 10.786-16.275 0v-14.912-17c.404-10.772 15.865-10.786 16.275 0zm15-21.656v-10.255c0-4.605-1.358-8.896-3.686-12.505l-9.971-54.069c-.814-4.413 2.113-8.665 6.526-9.479 4.413-.813 8.665 2.114 9.479 6.527l14.44 78.3h-8.65c-2.863-.001-5.605.525-8.138 1.481zm69.875-75.084-20.887 73.602h-16.92l22.149-78.046c1.802-4.645 5.152-6.514 10.051-5.606 4.316 1.224 6.832 5.733 5.607 10.05z","data-original":"#000000",style:{},className:""}))))}var _,H=s.forwardRef(Y),V=(n.p,n(15)),q=n(37),U=n(13),X=n(50);n(181);!function(e){e.CREAT="CREAT",e.JOIN="JOIN"}(_||(_={}));var Q={state:!1,type:_.CREAT};function Z(e){var t,n,r,l=Object(s.useState)(Q),o=Object(u.a)(l,2),p=o[0],m=o[1],d=Object(s.useState)("0"),O=Object(u.a)(d,2),g=O[0],x=O[1],w=Object(s.useState)(V.a.NONE),T=Object(u.a)(w,2),E=T[0],S=T[1],k=Object(s.useState)(null),N=Object(u.a)(k,2),C=N[0],P=N[1],R=Object(s.useState)(null),A=Object(u.a)(R,2),M=A[0],G=A[1],W=Object(s.useState)("Loading"),z=Object(u.a)(W,2),L=z[0],D=z[1],J=e.createGame,K=e.joinGame,Y=e.revealResult,Z=function(){var e=Object(c.a)(i.a.mark((function e(){var t,n,a,r,c,u,s,l,o,p,m;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new U.a.providers.Web3Provider(window.ethereum),n=V.c,a=new U.a.Contract(n,X.a,t),e.next=5,a.getAllGames();case 5:r=e.sent,c=[],u=0;case 8:if(!(u<r.length)){e.next=20;break}return s=r[u],e.next=12,a.games(s);case 12:l=e.sent,console.log(l),o=1e3*+U.a.BigNumber.from(l.expireTime).toString(),p=new Date,o>p.getTime()&&!l.closed&&(m={value:Object(q.b)(l.dealerValue._hex),expireTime:Object(q.c)(l.expireTime),id:Object(q.c)(l.gameId),creator:l.dealer,complete:0!==l.playerChoice},c.push(m));case 17:u++,e.next=8;break;case 20:if(0!==c.length){e.next=23;break}return D('No avaliable games now. Click "Create" to create your own game!'),e.abrupt("return");case 23:console.log(c),P(c);case 25:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(s.useEffect)((function(){Z()}),[]);var $=function(e,t,n,r){t?t&&(e||alert("Waitthing other player to join"),e&&Y(r)):function(e,t){console.log("join"),x(e),m((function(e){return Object(a.a)(Object(a.a)({},e),{},{state:!0,type:_.JOIN})})),G(t)}(n,r)};return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsxs)("div",{className:"container",children:[Object(y.jsxs)("div",{className:"userInfo",children:[Object(y.jsx)("h1",{children:"PLAYGROUND"}),Object(y.jsxs)("div",{className:"account",children:[Object(y.jsxs)("p",{children:["Account:",Object(y.jsx)("br",{}),"".concat(null===(t=e.account)||void 0===t?void 0:t.slice(0,5),"...").concat(null===(n=e.account)||void 0===n?void 0:n.slice(-4))]}),Object(y.jsxs)("p",{children:["Balance: ",null===(r=e.balance)||void 0===r?void 0:r.toFixed(2)," ETH"]})]})]}),!p.state&&Object(y.jsxs)("div",{className:"playground",children:[Object(y.jsx)("ul",{className:"gameList",children:C?C.map((function(t,n){return Object(y.jsx)("li",{onClick:function(){return $(t.complete,e.account===t.creator,t.value,t.id)},children:Object(y.jsx)(b,{value:t.value,expireTime:t.expireTime,id:t.id,owned:e.account===t.creator,complete:t.complete})},n)})):L}),Object(y.jsx)("div",{className:"creatbtn",children:Object(y.jsx)("span",{className:"button",onClick:function(){m((function(e){return Object(a.a)(Object(a.a)({},e),{},{state:!0})}))},children:"Create Your Game"})})]})]}),p.state&&Object(y.jsxs)("div",{className:"popup",children:[Object(y.jsx)("div",{className:"amount",children:Object(y.jsxs)(f.a,{fullWidth:!0,children:[Object(y.jsx)(v.a,{htmlFor:"standard-adornment-amount",children:"Amount"}),Object(y.jsx)(j.a,{id:"standard-adornment-amount",value:g,disabled:p.type===_.JOIN,onChange:function(e){x(e.target.value)},startAdornment:Object(y.jsx)(h.a,{position:"start",children:Object(y.jsx)(I,{width:"20",height:"20"})})})]})}),Object(y.jsxs)("div",{className:"choices",children:[Object(y.jsx)(B,{className:"choice ".concat(E===V.a.ROCK?"selected":""),id:"rock",viewBox:"0 0 200 450",width:"50",height:"50",strokeLinecap:"round",onClick:function(){return S(V.a.ROCK)}}),Object(y.jsx)(F,{className:"choice ".concat(E===V.a.PAPER?"selected":""),id:"paper",strokeLinecap:"round",onClick:function(){return S(V.a.PAPER)}}),Object(y.jsx)(H,{className:"choice ".concat(E===V.a.SCISSORS?"selected":""),id:"scissors",strokeLinecap:"round",onClick:function(){return S(V.a.SCISSORS)}})]}),Object(y.jsx)("div",{className:"submitBtn",children:Object(y.jsx)("span",{onClick:function(){if(p.type===_.CREAT){if(0===+g)return void alert("Please imput a valid value");if(E===V.a.NONE)return void alert("Please make your choice");J(E,g)}else if(p.type===_.JOIN){if(E===V.a.NONE)return void alert("Please make your choice");if(null===M)return;K(E,g,M)}},children:"SUBMIT"})})]})]})}},166:function(e,t,n){},170:function(e,t,n){},172:function(e,t,n){},173:function(e,t){},181:function(e,t,n){},186:function(e,t){},188:function(e,t){},198:function(e,t){},200:function(e,t){},225:function(e,t){},230:function(e,t){},232:function(e,t){},239:function(e,t){},252:function(e,t){},269:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n.n(a),i=n(150),c=n.n(i),u=(n(166),n(151)),s=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,294)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),i(e),c(e)}))},l=n(7);c.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(u.a,{})}),document.getElementById("root")),s()},37:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return l})),n.d(t,"d",(function(){return o}));var a=n(2),r=n.n(a),i=n(26),c=n(13),u=function(e){return c.a.BigNumber.from(e)},s=function(e){return c.a.BigNumber.from(e).toNumber()},l=function(e){return c.a.utils.formatEther(e)},o=function(){var e=Object(i.a)(r.a.mark((function e(t){var n,a,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.wait(1);case 2:return n=e.sent,a=n.events.pop(),i=a.args[0],e.abrupt("return",i);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},50:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"gameid",type:"uint256"},{indexed:!1,internalType:"address",name:"dealer",type:"address"},{indexed:!1,internalType:"address",name:"player",type:"address"},{indexed:!1,internalType:"uint8",name:"result",type:"uint8"}],name:"CloseGame",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"gameid",type:"uint256"},{indexed:!1,internalType:"address",name:"dealer",type:"address"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"CreateGame",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"gameid",type:"uint256"},{indexed:!1,internalType:"address",name:"player",type:"address"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"JoinGame",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"gameid",type:"uint256"},{indexed:!1,internalType:"address",name:"player",type:"address"},{indexed:!1,internalType:"uint8",name:"choice",type:"uint8"}],name:"Reveal",type:"event"},{inputs:[],name:"DEALERWIN",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[],name:"DRAW",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[],name:"NONE",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[],name:"PAPER",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[],name:"PLAYERWIN",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[],name:"ROCK",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[],name:"SCISSORS",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint8",name:"choice",type:"uint8"}],name:"checkChoice",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"uint256",name:"gameid",type:"uint256"}],name:"claim",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"gameid",type:"uint256"},{internalType:"uint8",name:"result",type:"uint8"}],name:"close",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"dealerHash",type:"bytes32"}],name:"createGame",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"payable",type:"function"},{inputs:[{internalType:"uint256",name:"gameId",type:"uint256"}],name:"deleteGame",outputs:[{internalType:"bool",name:"success",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"expireTimeLimit",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"gameList",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"},{internalType:"uint256",name:"",type:"uint256"}],name:"gameidsOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"games",outputs:[{internalType:"uint256",name:"listPointer",type:"uint256"},{internalType:"uint256",name:"gameId",type:"uint256"},{internalType:"uint256",name:"expireTime",type:"uint256"},{internalType:"address",name:"dealer",type:"address"},{internalType:"uint256",name:"dealerValue",type:"uint256"},{internalType:"bytes32",name:"dealerHash",type:"bytes32"},{internalType:"uint8",name:"dealerChoice",type:"uint8"},{internalType:"address",name:"player",type:"address"},{internalType:"uint8",name:"playerChoice",type:"uint8"},{internalType:"uint256",name:"playerValue",type:"uint256"},{internalType:"uint8",name:"result",type:"uint8"},{internalType:"bool",name:"closed",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"getAllGames",outputs:[{internalType:"uint256[]",name:"",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[],name:"getGameCount",outputs:[{internalType:"uint256",name:"gameCount",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"sender",type:"address"},{internalType:"uint8",name:"choice",type:"uint8"},{internalType:"bytes32",name:"randomSecret",type:"bytes32"}],name:"getProof",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"uint256",name:"gameId",type:"uint256"}],name:"isGame",outputs:[{internalType:"bool",name:"isIndeed",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"gameid",type:"uint256"},{internalType:"uint8",name:"choice",type:"uint8"}],name:"joinGame",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"payable",type:"function"},{inputs:[],name:"maxgame",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint8",name:"",type:"uint8"},{internalType:"uint8",name:"",type:"uint8"}],name:"payoff",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"gameid",type:"uint256"},{internalType:"uint8",name:"choice",type:"uint8"},{internalType:"bytes32",name:"randomSecret",type:"bytes32"}],name:"revealGame",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"}]}},[[269,1,2]]]);
//# sourceMappingURL=main.b79c76e6.chunk.js.map