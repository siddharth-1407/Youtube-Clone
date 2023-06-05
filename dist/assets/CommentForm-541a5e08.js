import{r as s,C as p,j as l,a as r}from"./index-4483838d.js";import{a as m,b as x,p as b}from"./config-42586af4.js";import{A as v}from"./Avatar-6815148a.js";const C=()=>{var c,f;const{user:a,setUser:d}=s.useContext(p);s.useEffect(()=>{document.querySelector("#comment").addEventListener("input",t=>{t.target.style.height>="600px"?(t.target.classList.add("overflow-y-auto"),t.target.classList.add("scrollbar-thin")):(t.target.classList.remove("overflow-y-auto"),t.target.classList.remove("scrollbar-thin"))})},[]),s.useEffect(()=>{},[a]);const[o,n]=s.useState(""),u=e=>{e.preventDefault();const t=document.querySelector("#comment");t.style.height="40px",e.target.blur(),n("")},h=async e=>{const t=document.querySelector(".formFooter");try{await g()==="success"?(e.target.value=o,t.classList.add("group-focus-within:flex")):(t.classList.remove("group-focus-within:flex"),e.target.blur(),e.target.value="")}catch(i){console.log(i)}},g=async()=>{try{const e=await x(m,b);return d(!0),localStorage.setItem("user",e.user.displayName),localStorage.setItem("email",e.user.email),localStorage.setItem("pfp",e.user.photoURL),localStorage.setItem("token",e.user.accessToken),localStorage.setItem("refreshToken",e.user.refreshToken),"success"}catch(e){return console.log(e),"login failed"}};return l("div",{className:"form | flex gap-3",children:[r("div",{className:"image-container",children:r(v,{src:a?(f=(c=m)==null?void 0:c.currentUser)==null?void 0:f.photoURL:""})}),r("form",{method:"post",className:"flex-1  relative focus-within:outline-none",children:l("div",{className:"form-control | group h-full flex flex-col gap-3",children:[r("label",{htmlFor:"comment",className:"sr-only",children:"Add a comment"}),r("div",{className:` relative min-h-[40px]  flex ${a&&"before:absolute before:opacity-0 before:w-full before:z-10 before:scale-0 before:border-b-[#0f0f0f] dark:before:border-b-white before:border-b-[2px] before:bottom-0 before:origin-center focus-within:before:opacity-100 focus-within:before:scale-100 before:transition-transform before:duration-500"}`,children:r("textarea",{onClick:e=>{a||h(e)},maxLength:5e3,name:"comment",value:o,onChange:e=>{a&&n(e.target.value),e.target.style.height="40px";const t=e.target.scrollHeight;e.target.style.height=`${t}px`},spellCheck:"false",id:"comment",className:"relative overflow-hidden bottom-0 min-h-[40px] max-h-[600px] h-[40px]  w-full bg-transparent border-b-[1px] border-b-[#e5e5e5] dark:border-b-[#717171]   focus-visible:outline-none resize-none text-[0.95rem] py-2 dark:text-[#f1f1f1] text-[#0f0f0f] dark:placeholder:text-[#aaaaaa] placeholder:text-[#606060] placeholder:text-[0.95rem]",placeholder:"Add a comment..."})}),l("div",{className:`formFooter | gap-4 justify-end ${document.activeElement===document.querySelector("#comment")&&o.length>0?"flex":"hidden"}`,children:[r("div",{className:`${o.length>0?"flex":"hidden"} h-full items-center mr-auto dark:text-[#f1f1f1] text-[#0f0f0f] text-sm`,children:l("p",{children:[o.length,"/5000"]})}),r("button",{className:"px-4 py-2  rounded-full font-medium text-sm bg-transparent hover:bg-[#e5e5e5] dark:hover:bg-[#3f3f3f] text-[#0f0f0f] dark:text-[#f1f1f1]",onClick:e=>u(e),children:"Cancel"}),r("button",{type:"submit",disabled:o.trim().length<=0,className:`px-4 py-2 rounded-full ${o.trim().length<=0?"bg-[#f2f2f2] dark:bg-[#272727] text-[#909090] dark:text-[#717171] cursor-not-allowed":"bg-[#065fd4] dark:bg-[#3ea6ff] text-[#ffffff] dark:text-[#0f0f0f] cursor-pointer"}    `,children:"Comment"})]})]})})]})};export{C as default};
