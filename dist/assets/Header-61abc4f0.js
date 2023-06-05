import{r as t,_ as me,C as q,j as r,a as e,b as he,i as pe,c as ve,u as ge,d as be,L as le}from"./index-97ce0fac.js";import{a as we}from"./axios-aba6f0e0.js";import{S as U}from"./Search-172a1c75.js";import{S as xe}from"./Logo-e6898549.js";import{S as ke}from"./Burger-0a884bf2.js";import{a as se,s as Ne}from"./config-42586af4.js";import{d as ye}from"./MoreVert-02c8a8a7.js";import{S as Se}from"./SigninBtn-989d417a.js";import{S as Ee}from"./Bell-5d5894fc.js";import{S as Le}from"./ArrowForward-53bb19ac.js";import{A as Ce}from"./Avatar-39541f5e.js";function p(){return(p=Object.assign||function(a){for(var l=1;l<arguments.length;l++){var o=arguments[l];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(a[n]=o[n])}return a}).apply(this,arguments)}var Te=function(){};function ie(a,l){return Math.random()*(l-a+1)+a}function ne(a,l){return Math.floor(ie(a,l))}var _e=t.forwardRef(function(a,l){var o=a.progress,n=a.height,c=n===void 0?2:n,v=a.className,g=v===void 0?"":v,i=a.color,f=i===void 0?"red":i,b=a.background,x=b===void 0?"transparent":b,m=a.onLoaderFinished,d=a.transitionTime,w=d===void 0?300:d,R=a.loaderSpeed,k=R===void 0?500:R,C=a.waitingTime,F=C===void 0?1e3:C,M=a.shadow,S=M===void 0||M,j=a.containerStyle,D=j===void 0?{}:j,T=a.style,s=T===void 0?{}:T,B=a.shadowStyle,ce=B===void 0?{}:B,K=a.containerClassName,de=K===void 0?"":K,O=t.useRef(!1),G=t.useState(0),E=G[0],N=G[1],y=t.useRef({active:!1,refreshRate:1e3}),J=t.useState(!1),$=J[0],Q=J[1],W=t.useState({active:!1,value:20}),P=W[0],ee=W[1],fe={position:"fixed",top:0,left:0,height:c,background:x,zIndex:99999999999,width:"100%"},ue={boxShadow:"0 0 10px "+f+", 0 0 10px "+f,width:"5%",opacity:1,position:"absolute",height:"100%",transition:"all "+k+"ms ease",transform:"rotate(3deg) translate(0px, -4px)",left:"-10rem"},te=t.useState({height:"100%",background:f,transition:"all "+k+"ms ease",width:"0%"}),H=te[0],I=te[1],ae=t.useState(ue),z=ae[0],Y=ae[1];t.useEffect(function(){return O.current=!0,function(){O.current=!1}},[]),t.useImperativeHandle(l,function(){return{continuousStart:function(h,u){if(u===void 0&&(u=1e3),!P.active)if($)console.warn("react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!");else{var A=h||ne(10,20);y.current={active:!0,refreshRate:u},N(A),L(A)}},staticStart:function(h){if(!y.current.active)if($)console.warn("react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!");else{var u=h||ne(30,50);ee({active:!0,value:u}),N(u),L(u)}},complete:function(){$?console.warn("react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!"):(N(100),L(100))}}}),t.useEffect(function(){I(p({},H,{background:f})),Y(p({},z,{boxShadow:"0 0 10px "+f+", 0 0 5px "+f}))},[f]),t.useEffect(function(){if(l){if(l&&o!==void 0)return void console.warn(`react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar! Please use only props or only ref methods! Ref methods will override props if "ref" property is available.`);L(E),Q(!1)}else o&&L(o),Q(!0)},[o]);var re,_,V,L=function h(u){u>=100?(I(p({},H,{width:"100%"})),S&&Y(p({},z,{left:u-10+"%"})),setTimeout(function(){O.current&&(I(p({},H,{opacity:0,width:"100%",transition:"all "+w+"ms ease-out",color:f})),setTimeout(function(){O.current&&(y.current.active&&(y.current=p({},y.current,{active:!1}),N(0),h(0)),P.active&&(ee(p({},P,{active:!1})),N(0),h(0)),m&&m(),N(0),h(0))},w))},F)):(I(function(A){return p({},A,{width:u+"%",opacity:1,transition:u>0?"all "+k+"ms ease":""})}),S&&Y(p({},z,{left:u-5.5+"%",transition:u>0?"all "+k+"ms ease":""})))};return re=function(){var h=ie(Math.min(10,(100-E)/5),Math.min(20,(100-E)/3));E+h<95&&(N(E+h),L(E+h))},_=y.current.active?y.current.refreshRate:null,V=t.useRef(Te),t.useEffect(function(){V.current=re}),t.useEffect(function(){},[void 0]),t.useEffect(function(){if(_!==null&&_!==!1){var h=setInterval(function(){return V.current()},_);return function(){return clearInterval(h)}}},[_]),t.createElement("div",{className:de,style:p({},fe,D)},t.createElement("div",{className:g,style:p({},H,s)},S?t.createElement("div",{style:p({},z,ce)}):null))});const Re=t.lazy(()=>me(()=>import("./Options-e21ae75e.js"),["assets/Options-e21ae75e.js","assets/index-97ce0fac.js","assets/index-1f6290d0.css","assets/ArrowForward-53bb19ac.js","assets/axios-aba6f0e0.js","assets/Search-172a1c75.js","assets/Logo-e6898549.js","assets/Burger-0a884bf2.js","assets/config-42586af4.js","assets/MoreVert-02c8a8a7.js","assets/SigninBtn-989d417a.js","assets/Bell-5d5894fc.js","assets/Avatar-39541f5e.js"])),Me=()=>{const{mouseUpAction:a,mouseDownAction:l}=t.useContext(q),[o,n]=t.useState(!1),c=t.useRef();return t.useEffect(()=>{let v=g=>{c.current.contains(g.target)||n(!1)};return document.addEventListener("mousedown",v),()=>{document.removeEventListener("mousedown",v)}},[]),r("div",{className:"flex gap-2 items-center ",children:[r("div",{ref:c,children:[e("button",{className:"js_EventBtn | w-[39.7px] py-[.35rem] rounded-full border-transparent  active:bg-[#e6e6e6] dark:hover:bg-[#272727]  dark:active:bg-[#3d3d3d]  border-[1px]",onClick:()=>n(!0),onMouseUp:a,onMouseDown:l,children:e(ye,{className:"dark:text-white text-black pointer-events-none"})}),e(t.Suspense,{fallback:e("div",{className:" absolute z-50 loader dark:border-b-[transparent] border-[#2f2f2f] dark:border-[#c7c7c7]"}),children:e(Re,{setOpen:n,OptionsOpen:o})})]}),e(Se,{})]})},je=a=>t.createElement("svg",{enableBackground:"new 0 0 24 24",height:24,viewBox:"0 0 24 24",width:24,focusable:"false",style:{pointerEvents:"none",display:"block"},...a},t.createElement("path",{d:"M20 3v18H8v-1h11V4H8V3h12zm-8.9 12.1.7.7 4.4-4.4L11.8 7l-.7.7 3.1 3.1H3v1h11.3l-3.2 3.3z"})),De=a=>t.createElement("svg",{viewBox:"0 0 24 24",focusable:"false",style:{pointerEvents:"none",display:"block"},...a},t.createElement("path",{d:"M3,3v18h18V3H3z M4.99,20c0.39-2.62,2.38-5.1,7.01-5.1s6.62,2.48,7.01,5.1H4.99z M9,10c0-1.65,1.35-3,3-3s3,1.35,3,3 c0,1.65-1.35,3-3,3S9,11.65,9,10z M12.72,13.93C14.58,13.59,16,11.96,16,10c0-2.21-1.79-4-4-4c-2.21,0-4,1.79-4,4 c0,1.96,1.42,3.59,3.28,3.93c-4.42,0.25-6.84,2.8-7.28,6V4h16v15.93C19.56,16.73,17.14,14.18,12.72,13.93z"})),Be=a=>t.createElement("svg",{viewBox:"0 0 24 24",preserveAspectRatio:"xMidYMid meet",focusable:"false",style:{pointerEvents:"none",display:"block"},...a},t.createElement("g",null,t.createElement("path",{d:"M12 22C10.93 22 9.86998 21.83 8.83998 21.48L7.41998 21.01L8.83998 20.54C12.53 19.31 15 15.88 15 12C15 8.12 12.53 4.69 8.83998 3.47L7.41998 2.99L8.83998 2.52C9.86998 2.17 10.93 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM10.58 20.89C11.05 20.96 11.53 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C11.53 3 11.05 3.04 10.58 3.11C13.88 4.81 16 8.21 16 12C16 15.79 13.88 19.19 10.58 20.89Z"}))),X=a=>t.createElement("svg",{viewBox:"0 0 24 24",preserveAspectRatio:"xMidYMid meet",focusable:"false",style:{pointerEvents:"none",display:"block",width:"100%",height:"100%"},...a},t.createElement("g",null,t.createElement("path",{d:"M9,18.7l-5.4-5.4l0.7-0.7L9,17.3L20.6,5.6l0.7,0.7L9,18.7z"})));var Z={},Oe=pe;Object.defineProperty(Z,"__esModule",{value:!0});var oe=Z.default=void 0,He=Oe(he()),Ie=ve,ze=(0,He.default)((0,Ie.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBack");oe=Z.default=ze;const Ae=({setOpenThemeOptions:a,openThemeOptions:l,setOpen:o,open:n})=>{const c=t.useRef(null),[v,g]=t.useState(!1),{theme:i,setTheme:f}=t.useContext(q);t.useEffect(()=>{let m=d=>{c.current.contains(d.target)||g(!1)};return document.addEventListener("mousedown",m),()=>{document.removeEventListener("mousedown",m)}},[]);const b=()=>{window.matchMedia("(prefers-color-scheme: dark)")?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},x=()=>{localStorage.getItem("Theme")===null?b():f(localStorage.getItem("Theme")),i==="DeviceTheme"?b():i==="Dark"?document.documentElement.classList.add("dark"):i==="Light"&&document.documentElement.classList.remove("dark")};return t.useEffect(()=>{const m=document.getElementsByName("Theme");for(let d=0;d<m.length;d++){const w=m[d];w.addEventListener("click",()=>{f(w.id),localStorage.setItem("Theme",w.id)})}},[]),t.useEffect(()=>{x()},[i]),r("div",{id:"themes",ref:c,className:`box-shadow-custom overlay_js ${l?"flex":"hidden"} flex-col w-[18.75rem] h-auto rounded-lg py-2 absolute top-[50px] right-2 sm:right-0 gap-2 bg-white  dark:bg-[#282828] text-[#0f0f0f] dark:text-[#f1f1f1] divide-y-[1px] divide-[#e5e5e5] dark:divide-[#535353]`,children:[e("div",{className:" px-3",children:e("button",{className:"flex justify-center items-center hover:bg-[#e5e5e5] dark:hover:bg-[#3e3e3e] active:bg-[#e6e6e6] dark:active:bg-[#545454] p-1 rounded-full aspect-square",onClick:()=>{a(!1),o(!0)},children:e(oe,{})})}),e("div",{children:r("div",{className:"flex flex-col justify-between w-full items-center  ",children:[r("div",{className:"flex gap-3 px-3 py-2 w-full relative hover:bg-[#f2f2f2] dark:hover:bg-[#3e3e3e] active:bg-[#cccccc] dark:active:bg-[#545454]",onClick:()=>a(!1),children:[e("div",{className:"w-6 aspect-square",children:i==="DeviceTheme"?e(X,{className:"fill-[#0f0f0f] dark:fill-[#f1f1f1]"}):""}),e("input",{type:"radio",name:"Theme",id:"DeviceTheme",className:"w-full h-full absolute inset-0 appearance-none"}),e("label",{htmlFor:"DeviceTheme",children:"Device Theme"})]}),r("div",{className:"flex gap-3 px-3 py-2 w-full relative hover:bg-[#f2f2f2] dark:hover:bg-[#3e3e3e] active:bg-[#cccccc] dark:active:bg-[#545454]",onClick:()=>a(!1),children:[e("div",{className:"w-6 aspect-square",children:i==="Dark"?e(X,{className:"fill-[#0f0f0f] dark:fill-[#f1f1f1]"}):""}),e("input",{type:"radio",name:"Theme",id:"Dark",className:"w-full h-full absolute inset-0 appearance-none"}),e("label",{htmlFor:"DeviceTheme",children:"Dark"})]}),r("div",{className:"flex gap-3 px-3 py-2 w-full relative hover:bg-[#f2f2f2] dark:hover:bg-[#3e3e3e] active:bg-[#cccccc] dark:active:bg-[#545454]",onClick:()=>a(!1),children:[e("div",{className:"w-6 aspect-square",children:i==="Light"?e(X,{className:"fill-[#0f0f0f] dark:fill-[#f1f1f1]"}):""}),e("input",{type:"radio",name:"Theme",id:"Light",className:"w-full h-full absolute inset-0 appearance-none"}),e("label",{htmlFor:"DeviceTheme",children:"Light"})]})]})})]})},Ue=()=>{var x,m;const a=t.useRef(null),{theme:l,setUser:o}=t.useContext(q),[n,c]=t.useState(!1),[v,g]=t.useState(!1),i=t.useRef(),f=t.useRef();t.useEffect(()=>{let d=w=>{i!=null&&i.current.contains(w.target)||c(!1)};return document.addEventListener("mousedown",d),()=>{document.removeEventListener("mousedown",d)}},[]);const b=()=>{o(!1),localStorage.clear(),Ne(se),c(!1)};return r("div",{className:"header__right | relative h-10 min-w-min flex items-center  px-1.5 sm:gap-[0.6rem]",children:[e("div",{className:"formResponsive | h-full w-10  rounded-full sm:hidden",children:e("button",{title:"Search",className:"h-full w-full flex items-center justify-center ",children:e(U,{className:"fill-[#0f0f0f] dark:fill-white"})})}),r("div",{className:"notifications | h-full w-10   ",children:[e("button",{title:"Notifications",className:"h-full w-full rounded-full flex items-center justify-center hover:bg-[#eeeeee] active:bg-[#e5e5e5] dark:active:bg-[#272727] dark:hover:bg-[#272727]",children:e(Ee,{className:"fill-[#0f0f0f] dark:fill-white"})}),e("section",{className:"notification_dropdown | absolute hidden",children:r("div",{className:"head",children:[e("span",{children:"Notifications"}),e("img",{src:"",alt:""})]})})]}),r("div",{className:"profile | h-full w-10 ml-2 rounded-full overflow-hidden",ref:i,children:[e("button",{className:"h-full w-full flex items-center justify-center ",ref:a,onClick:d=>{d.preventDefault(),c(!n)},children:e(Ce,{alt:"",src:((m=(x=se)==null?void 0:x.currentUser)==null?void 0:m.photoURL)||"./broken-image.jpg",sx:{height:"32px",width:"32px"}})}),r("div",{className:`dropdown box-shadow-custom | absolute top-[50px] right-0 w-[300px]  bg-white dark:bg-[#282828] rounded-[12px] py-2 text-[#0f0f0f] dark:text-[#f1f1f1] text-sm ${n?"flex":"hidden"}`,children:[e("div",{className:"accounts"}),r("ul",{className:" w-full ",children:[e("li",{className:"py-2 px-4  flex hover:bg-[#e5e5e5] hover:dark:bg-[#535353]",children:r("a",{href:"",className:"w-full flex items-center gap-4",children:[e(De,{className:"fill-[#0f0f0f] dark:fill-white w-6"})," ",e("span",{children:"Your Channel"})]})}),e("li",{className:"py-2 px-4 flex hover:bg-[#e5e5e5] hover:dark:bg-[#535353]",children:r("button",{className:"w-full  flex items-center gap-4",onClick:b,children:[e(je,{className:"fill-[#0f0f0f] dark:fill-white w-6 pointer-events-none"})," ",e("span",{children:"Sign out"})]})}),e("hr",{className:"h-px my-0  border-0 bg-[#e5e5e5] dark:bg-[#3f3f3f]"}),e("li",{className:"py-2 px-4 flex hover:bg-[#e5e5e5] hover:dark:bg-[#535353]",ref:f,children:r("button",{className:"w-full flex items-center gap-4",onClick:()=>{g(!0),c(!1)},children:[e(Be,{className:"fill-[#0f0f0f] dark:fill-white w-6"}),r("span",{children:["Appearance: ",` ${l==="DeviceTheme"?"Device Theme":l}`]}),e("div",{className:"flex w-6 aspect-square items-center ml-auto",children:e(Le,{className:"  fill-[#0f0f0f] dark:fill-[#f1f1f1]"})})]})})]})]})]}),e(Ae,{setOpen:c,open:n,setOpenThemeOptions:g,openThemeOptions:v})]})},qe=()=>{const[a,l]=t.useState(""),[o,n]=t.useState([]),[c,v]=t.useState(!0),[g,i]=t.useState(!1),f=ge(),{pathname:b}=be(),{progress:x,setProgress:m,location:d,mouseUp:w,mouseDown:R,rateLimited:k,setRateLimited:C,setSelectCategory:F,handleSidebar:M,user:S}=t.useContext(q);t.useEffect(()=>{},[S]),t.useEffect(()=>{C(b==="/rateLimited")},[b]),t.useEffect(()=>{i(!1)},[b]);const j=async()=>{if(c)try{const s=await we.get(`https://youtube138.p.rapidapi.com/auto-complete/?q=${a}&hl=en&gl=US`,{headers:{"X-RapidAPI-Key":"8d87136f3fmsh0d51cd4a8d4b288p1914d6jsnd764a4d624b5","X-RapidAPI-Host":"youtube138.p.rapidapi.com"}});s.data.results.length<=7?n(s.data.results):n(s.data.results.slice(0,6))}catch(s){console.log(s)}c&&(v(!1),setTimeout(()=>{v(!0)},1500))},D=s=>{s.preventDefault(),a!==""&&f(`/results/query/${a}`)},T=s=>{s.target.classList.contains("input")||i(!1)};return t.useEffect(()=>(window.addEventListener("click",s=>{T(s)}),()=>{window.removeEventListener("click",s=>{T(s)})}),[g]),t.useEffect(()=>{a.length<1&&n([])},[a.length]),r("div",{id:"header",className:"header | w-full pl-4 pr-5  h-14 flex items-center sticky top-0 z-10 bg-white dark:bg-[#0f0f0f] ",children:[e(_e,{loaderSpeed:100,transitionTime:100,waitingTime:500,color:"#ff0000",progress:x,onLoaderFinished:()=>m(0)}),r("div",{className:"header__left | flex justify-between gap-4 h-10 min-w-[140px]",children:[!k&&e("button",{id:"sidebarBtn",className:"js_EventBtn | p-[0.4rem] rounded-full hover:bg-[#e5e5e5] dark:hover:bg-[#272727] active:bg-[#cccccc] dark:active:bg-[#3d3d3d] border-transparent  border-[1px]",onClick:M,onMouseUp:w,onMouseDown:R,children:e(ke,{className:"fill-[#030303] dark:fill-white pointer-events-none"})}),r(le,{to:"/",className:"flex items-end gap-1 pr-[.85rem] relative",children:[e(xe,{className:" fill-[#212121] dark:fill-white ",onClick:()=>{F("New")}}),e("span",{className:"text-[#7f7f7f] dark:text-[#8d8d8d] text-[0.65rem] font-bold inline absolute right-0 -top-1",children:d||""})]})]}),!k&&r("div",{className:"header__center | relative hidden items-center max-w-2xl min-w-[10rem] h-10 mx-10  sm:flex",children:[r("div",{className:"search |  flex h-full w-[40.25rem] min-w-[5rem] justify-end ",children:[r("form",{onSubmit:D,className:" group/item | input flex items-center w-[36.25rem] min-w-[5rem] pl-5 ml-7 border-[1px] border-[#ccc] dark:border-[#303030] rounded-l-full  overflow-hidden focus-within:border-blue-500 dark:focus-within:border-blue-500  focus-within:ml-0 focus-within:pl-12 relative bg-[hsl(0, 0%, 100%)] dark:bg-[#121212]",children:[e("div",{className:"h-10 w-10 items-center ml-1 justify-center hidden group-focus-within/item:flex absolute left-0 top-0 bg-transparent",children:e(U,{className:"fill-[#0f0f0f] dark:fill-white scale-[0.85]"})}),r("div",{className:" input-control  | input flex items-center w-full h-full  bg-transparent",children:[e("label",{htmlFor:"search",className:"sr-only",children:"Search"}),e("input",{id:"search",type:"text",name:"search",placeholder:"Search",autoComplete:"off",className:"w-full input  focus:outline-none mt-[0.3rem] pr-2 bg-transparent text-black dark:text-[#e2e2e2] -translate-y-[2px] font-normal placeholder:font-normal  placeholder:text-[#838383] ",onChange:s=>{l(s.target.value),j()},value:a,onFocus:()=>{i(!0)}})]})]}),e("button",{onClick:D,title:"Search",className:"bg-[#f0f0f0]  dark:bg-[#222222] px-5 h-full rounded-r-full border-[1px] border-[#c6c6c6] dark:border-[#303030] border-l-0",children:e(U,{className:" fill-[#0f0f0f] dark:fill-white"})})]}),e("div",{id:"searchSuggestions",className:`searchSuggestions |  ${o.length>0&&g&&a.length>0?"flex":"hidden"} absolute top-11 pt-3 pb-2 w-[300px] sm:min-w-[90%] lg:min-w-[36rem] rounded-xl bg-white`,children:e("ul",{className:"flex flex-col w-full list-none",children:o.map((s,B)=>e("li",{children:r(le,{to:`/results/query/${s}`,className:"flex gap-3 px-2 py-1 font-medium hover:bg-[#e3e3e3] cursor-pointer",children:[e(U,{className:"fill-[#0f0f0f] scale-[0.85]"}),e("span",{children:s})]})},B))})})]}),e("div",{className:"signinBtn",children:S?e(Ue,{}):e(Me,{})})]})},We=Object.freeze(Object.defineProperty({__proto__:null,default:qe},Symbol.toStringTag,{value:"Module"}));export{We as H,Be as S,oe as d};