import{r as o,_ as c,u as L,C as b,j as A,a as t}from"./index-4483838d.js";import{V as x}from"./VideoCardSkeleton-6af0e9c0.js";import{f as E}from"./api-8804df91.js";import"./index-26f5842a.js";/* empty css                 */import"./axios-aba6f0e0.js";const v=o.lazy(()=>c(()=>import("./NoConnection-58b500a5.js"),["assets/NoConnection-58b500a5.js","assets/index-4483838d.js","assets/index-1f6290d0.css"])),N=o.lazy(()=>c(()=>import("./VideoCard-86418876.js"),["assets/VideoCard-86418876.js","assets/index-4483838d.js","assets/index-1f6290d0.css","assets/index-325fa521.js","assets/index-f28fc07c.js","assets/api-8804df91.js","assets/axios-aba6f0e0.js","assets/index-f60fa138.js","assets/index-307d66e5.js","assets/MoreVert-a588e145.js","assets/index-26f5842a.js","assets/skeleton-43978ee9.css"])),I=o.lazy(()=>c(()=>import("./Sidebar-fdf91e6d.js"),["assets/Sidebar-fdf91e6d.js","assets/index-4483838d.js","assets/index-1f6290d0.css","assets/Constants-c70401ee.js","assets/MylikesActive-4396e479.js","assets/SigninBtn-bb89ba13.js","assets/config-42586af4.js"])),F=()=>{const R=L(),{searchResults:_,rateLimited:l,loading:m,setSelectCategory:C,setLoading:i,setRateLimited:r,nextPageToken:d,setNextPageToken:u,setSearchResults:p,setProgress:a,location:f,sidebarExpanded:k,setSidebarExpanded:w,setIsOnline:n,isOnline:g}=o.useContext(b);let h="&videoCategoryId=10";o.useEffect(()=>{C("Music"),S(),w(!0),navigator.onLine?(n(!0),T()):n(!1)},[]),o.useEffect(()=>(window.addEventListener("scroll",y),()=>{window.removeEventListener("scroll",y)}),[d]);const S=()=>{document.title="Music - YouTube Clone",document.querySelector("meta[name=description]")&&document.head.removeChild(document.querySelector("meta[name=description]")),document.querySelector('meta[name="keywords"]')&&document.head.removeChild(document.querySelector("meta[name=keywords]")),document.querySelectorAll('meta[name="tags"]')&&document.querySelectorAll('meta[name="tags"]').forEach(s=>{document.head.removeChild(s)})},T=async()=>{document.documentElement.scrollTop=0,a(80);try{const e=await E(`videos?part=contentDetails&part=snippet&part=statistics&chart=mostPopular&maxResults=16${h}&regionCode=${f}&key=${{}.VITE_APP_YOUTUBE_API_KEY}`);i(!1),r(!1),p(e.items),u(e.nextPageToken)}catch(e){e.response.status===403?console.log("ERROR-> Forbidden :  Api Limit most likely!"):e.response.status===400?console.log("ERROR-> OperationNotSupported : Check parameters!"):e.response.status===404?console.log("ERROR-> CommentNotFound, maybe check the id!"):console.log("Error-> ",e),i(!1),r(!0)}a(100)},P=async()=>{a(80);try{const e=await E(`videos?part=snippet&chart=mostPopular&maxResults=16${h}&pageToken=${d}&
			regionCode=${f}&key=${{}.VITE_APP_YOUTUBE_API_KEY}`);r(!1),u(e.nextPageToken),p(s=>[...s,...e.items])}catch(e){e.response.status===403?console.log("ERROR-> Forbidden :  Api Limit most likely!"):e.response.status===400?console.log("ERROR-> OperationNotSupported : Check parameters!"):e.response.status===404?console.log("ERROR-> CommentNotFound, maybe check the id!"):console.log("Error-> ",e),i(!1),r(!0)}a(100)},y=async()=>{if(window.innerHeight+document.documentElement.scrollTop+1===document.documentElement.scrollHeight)try{a(80),navigator.onLine?(n(!0),P()):n(!1),a(100)}catch(e){console.log(e)}},O=["","","","","","","","","","","","","","","","",""];return A("div",{className:"flex min-h-[calc(100vh-56px)] h-full",children:[!l&&t(o.Suspense,{fallback:t("div",{}),children:t(I,{})}),m&&t("div",{className:"flex flex-wrap justify-center gap-y-7 gap-2  py-5 mx-auto  max-w-[2500px] min-w-[375px]  overflow-auto",children:g?O.forEach((e,s)=>t(x,{},s)):t(v,{})}),!m&&t("div",{className:`main-feed | h-full p-6 ml-0 flex flex-wrap justify-center gap-y-7 gap-x-2 sm:px-0 sm:py-5 mx-auto overflow-auto text-white ${l?"w-screen ml-[0px]":"max-w-[2500px]"} ${k?"ml-0 sm:ml-[57px]  lg:ml-[240px] ":" ml-0 sm:ml-[72px] "} `,children:g?l?R("/rateLimited"):_.map((e,s)=>t("div",{className:"videoCard ",children:t(o.Suspense,{fallback:t(x,{}),children:t(N,{video:e})})},s)):t(o.Suspense,{fallback:"",children:t(v,{})})})]})};export{F as default};
