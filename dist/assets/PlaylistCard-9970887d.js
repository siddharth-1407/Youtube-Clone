import{r,_,C as k,a as n,j as o,L as w}from"./index-4483838d.js";import{d as j}from"./MoreVert-a588e145.js";const V=e=>r.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},r.createElement("path",{d:"M22 7H2V8H22V7ZM13 12H2V11H13V12ZM13 16H2V15H13V16ZM15 19V11L22 15L15 19Z"})),C=r.lazy(()=>_(()=>import("./SharePopup-af864640.js"),["assets/SharePopup-af864640.js","assets/index-4483838d.js","assets/index-1f6290d0.css","assets/ReactToastify-22ff13ec.js","assets/ReactToastify-f2ebcc7d.css"])),M=({playlistData:e})=>{var i,u,m,f,t,l,h,x,v,b,g;const d=r.useRef(),[c,s]=r.useState(!1),{mouseDownAction:N,mouseUpAction:p}=r.useContext(k);return n("div",{className:" flex justify-between video_card  w-[210px]",children:o("div",{className:" group flex flex-col w-full",children:[n(w,{className:"max-w-full",to:`/playlist/${e==null?void 0:e.id}`,children:o("div",{className:"thumbnail relative  bg-[#e5e5e5] dark:bg-[#272727] rounded-[12px] aspect-video   ",children:[n("img",{loading:"lazy",src:((m=(u=(i=e==null?void 0:e.snippet)==null?void 0:i.thumbnails)==null?void 0:u.maxres)==null?void 0:m.url)||((l=(t=(f=e==null?void 0:e.snippet)==null?void 0:f.thumbnails)==null?void 0:t.medium)==null?void 0:l.url),alt:"",className:"w-full rounded-[12px] aspect-video  bg-[#e5e5e5] dark:bg-[#272727] border-[#272727] "}),o("div",{className:"flex flex-col gap-2 justify-center items-center rounded-r-[10px] absolute top-0 right-0 z-10 w-[40%] opacity-80 h-full bg-black",children:[n("span",{className:"text-lg",children:(h=e==null?void 0:e.contentDetails)==null?void 0:h.itemCount}),n(V,{className:"fill-white"})]})]})}),n("div",{className:"details flex gap-4 mt-2",children:n("div",{className:"flex flex-col justify-between leading-snug w-full relative",children:o("div",{className:"flex mb-1 pr-7",children:[n(w,{className:"w-full ",title:(v=(x=e==null?void 0:e.snippet)==null?void 0:x.localized)==null?void 0:v.title,to:`/playlist/${e==null?void 0:e.id}`,children:n("div",{className:"flex w-full",children:n("p",{className:"line-clamp font-medium w-full text-sm text-[#0f0f0f] dark:text-white",children:(g=(b=e==null?void 0:e.snippet)==null?void 0:b.localized)==null?void 0:g.title})})}),o("div",{className:"button | h-fit ",ref:d,children:[n("button",{className:` js_EventBtn | opacity-0 group-hover:opacity-100 absolute top-[-18%] right-[-4%] w-[35.7px] h-[35.7px] rounded-full flex items-center justify-center  border-transparent  active:bg-[rgba(227,227,227,0.7)] dark:active:bg-[rgba(39,39,39,0.7)] border-[1px]  ${c&&"opacity-100"}`,onClick:()=>s(!c),onMouseUp:p,onMouseDown:N,children:n(j,{className:"text-black dark:text-white pointer-events-none"})}),n(r.Suspense,{fallback:n("div",{}),children:n(C,{open:c,setOpen:s,playlist:e==null?void 0:e.id,shareRef:d})})]})]})})})]})})};export{M as default};
