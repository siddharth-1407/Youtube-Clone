import{r as t,_ as d,u as l,d as u,C as p,j as h,a as e}from"./index-4483838d.js";import{N as f}from"./NoUserTemplate-9abc9c37.js";import"./MylikesActive-4396e479.js";import"./SigninBtn-bb89ba13.js";import"./config-42586af4.js";const y=t.lazy(()=>d(()=>import("./Sidebar-fdf91e6d.js"),["assets/Sidebar-fdf91e6d.js","assets/index-4483838d.js","assets/index-1f6290d0.css","assets/Constants-c70401ee.js","assets/MylikesActive-4396e479.js","assets/SigninBtn-bb89ba13.js","assets/config-42586af4.js"])),q=()=>{const r=l(),{pathname:s}=u(),{rateLimited:a,setSelectCategory:m,setSidebarExpanded:n,user:o}=t.useContext(p);t.useEffect(()=>{m("Watch later"),c(),window.innerWidth<=1024&&n(!1)},[]);const c=()=>{document.title="YouTube Clone",document.querySelector("meta[name=description]")&&document.head.removeChild(document.querySelector("meta[name=description]")),document.querySelector('meta[name="keywords"]')&&document.head.removeChild(document.querySelector("meta[name=keywords]")),document.querySelectorAll('meta[name="tags"]')&&document.querySelectorAll('meta[name="tags"]').forEach(i=>{document.head.removeChild(i)})};return h("div",{className:"flex min-h-[calc(100vh-56px)] h-full justify-center p-6 sm:p-0",children:[!a&&o&&e(t.Suspense,{fallback:e("div",{}),children:e(y,{})}),!a&&o?e(f,{page:s}):r("/rateLimited")]})};export{q as default};
