import{j as n,a as o}from"./index-4483838d.js";const r=({time:s})=>n("div",{className:`absolute bottom-1 right-1 bg-black text-white text-xs rounded-[0.3rem] opacity-90 font-medium ${s.hours===void 0&&s.minutes===void 0?"":"px-1 py-0.5"} ${s.hours===void 0&&s.minutes===void 0?"py-0 font-medium":""}`,children:[s.hours===void 0||s.hours<1?"":o("span",{children:`${s.hours}:`}),s.minutes!==void 0&&o("span",{children:s.minutes<10?`0${s.minutes}:`:`${s.minutes}:`}),o("span",{children:s.seconds<10?`0${s.seconds}`:s.seconds})]});export{r as default};
