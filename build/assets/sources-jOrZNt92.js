import{u as P,a as T,b as z,r as n,j as e,B as A,C as B,T as E,I as R,d as G,L as V,g as $,y as D}from"./index-BCga4vqC.js";import{a as q}from"./useConfigurationState-BNPoOUvK.js";const K=()=>{const b={width:"450px","& .MuiOutlinedInput-root":{borderRadius:"10px",background:"linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.8), rgba(0, 0, 0, 0.8))",backdropFilter:"blur(10px)",padding:"3px 8px !important",transition:"all 0.3s",fontSize:"var(--text-xl)",border:"1px solid var(--color-gray-800)",height:"40px"},"& .MuiOutlinedInput-notchedOutline":{border:"none"},"&:hover .MuiOutlinedInput-notchedOutline":{outline:"none",border:"none"},"& .MuiOutlinedInput-input":{padding:0},"& .MuiInputBase-input":{color:"var(--color-cyan-300)",paddingLeft:"14px",fontSize:"var(--text-lg)",border:"none"}},f=P(),{icons:s,imgs:v}=T(),{resSources:i,setResSources:y,resSourcesFree:l,resSourcesPurchase:c,resSourcesSub:d,resSourcesTv2:u}=q(),w=r=>{r.currentTarget.onerror=null,r.currentTarget.src=v.imgDefault},{setSelectNav:S,checkedSources:p,setCheckedSources:j}=z(),[g,h]=n.useState(!0),k=async()=>{try{h(!0);const r=await $();y(r.data)}catch(r){D.error("Sources: "+r.response?.data?.statusMessage)}finally{h(!1)}};n.useEffect(()=>{k(),S(0)},[]);const[m,N]=n.useState(0),C=r=>{const o=p.includes(r)?p.filter(a=>a!==r):[...p,r];j(o),f("/universal")},[t,I]=n.useState(""),L=n.useMemo(()=>t.trim()?i.filter(r=>r.name.toLowerCase().includes(t.toLowerCase())):i,[t,i]),_=n.useMemo(()=>t.trim()?d.filter(r=>r.name.toLowerCase().includes(t.toLowerCase())):d,[t,d]),M=n.useMemo(()=>t.trim()?l.filter(r=>r.name.toLowerCase().includes(t.toLowerCase())):l,[t,l]),F=n.useMemo(()=>t.trim()?u.filter(r=>r.name.toLowerCase().includes(t.toLowerCase())):u,[t,u]),O=n.useMemo(()=>t.trim()?c.filter(r=>r.name.toLowerCase().includes(t.toLowerCase())):c,[t,c]);return g?e.jsx(e.Fragment,{children:e.jsx(A,{sx:r=>({color:"#fff",zIndex:r.zIndex.drawer+1}),open:g,children:e.jsx(B,{color:"inherit"})})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-full sticky z-[999]  md:top-[80px] top-[73px] backdrop-blur-[10px] bg-black/50",children:e.jsxs("div",{className:"flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl md:text-lg sm:text-base",children:[e.jsx("span",{className:"text-sm",children:s.iconNext}),e.jsx("div",{className:"transition duration-300 ease",children:"Sources"})]})}),e.jsxs("div",{className:"max-w-[1535px] text-lg text-white/70 mx-auto gap-4 md:gap-6 flex flex-col py-4 md:py-5",children:[e.jsxs("div",{className:"flex flex-col md:flex-row justify-between gap-3 sm:gap-4",children:[e.jsx("div",{className:"flex gap-1 sm:gap-2 md:gap-3 overflow-x-auto scroll-x pb-2 sm:pb-0 scrollbar-hide",children:[{label:"All"},{label:"Sub"},{label:"Free"},{label:"Tve"},{label:"Purchase"}].map((r,o)=>e.jsx("button",{onClick:()=>N(o),className:`
                        border flex-shrink-0 transition-all duration-300 ease-in-out hover:text-cyan-300
                        ${m===o?" text-cyan-300 border-cyan-500":"  border-cyan-500/20"}
                        h-[40px] px-3 rounded-lg text-lg shadow-2xl bg-gradient-to-br from-gray-900 via-gray-950 to-black
                    `,children:r.label},o))}),e.jsx("div",{className:"w-full sm:w-auto min-w-[200px]",children:e.jsx(E,{type:"search",placeholder:"Search sources...",sx:{...b,width:"100%","& .MuiInputBase-root":{height:"40px",fontSize:"14px","@media (min-width: 640px)":{fontSize:"16px",height:"44px"}}},onChange:r=>I(r.target.value),value:t,InputProps:{endAdornment:e.jsx(R,{position:"end",children:e.jsx(G,{sx:{color:"var(--color-cyan-300)",padding:"8px"},children:s.iconSearch})})}})})]}),[{data:L},{data:_},{data:M},{data:F},{data:O}].map((r,o)=>e.jsx("div",{className:`
                ${m===o?"animate-fadeIn":"hidden"}
                grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 
                gap-3 sm:gap-4 md:gap-6 lg:gap-8
            `,children:r.data?.map(a=>e.jsxs("button",{onClick:()=>C(a.id),className:`\r
        group relative w-full aspect-[1/1] overflow-hidden rounded-2xl \r
        border border-gray-700/60 \r
        bg-gray-900/80 backdrop-blur-[10px]\r
        hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30\r
        hover:scale-[1.04] active:scale-[0.97]\r
        transition-all duration-500 ease-in-out\r
    `,children:[e.jsx("img",{src:a.logo_100px,alt:a.name,onError:w,className:`\r
            absolute inset-0 w-full h-full object-cover \r
            rounded-2xl opacity-80 group-hover:opacity-50\r
            transition-all duration-500 ease-in-out\r
        `}),e.jsx("div",{className:`\r
            absolute inset-0 \r
            bg-gradient-to-b from-black/40 via-black/20 to-black/60\r
            opacity-100 group-hover:opacity-70\r
            transition-opacity duration-500 pointer-events-none\r
        `}),e.jsx("div",{className:`\r
            absolute inset-0 \r
            bg-gradient-to-t from-cyan-400/15 via-transparent to-transparent \r
            opacity-0 group-hover:opacity-100 \r
            blur-xl transition-opacity duration-500 pointer-events-none\r
        `}),e.jsx("div",{className:`\r
            absolute top-3 left-3 px-3 py-1.5 rounded-lg \r
            bg-black/70 backdrop-blur-md border border-cyan-400/40\r
            text-cyan-300 text-xs uppercase font-bold tracking-wider \r
            shadow-[0_0_15px_rgba(34,211,238,0.5)]\r
            group-hover:bg-cyan-400/20 group-hover:text-cyan-100 group-hover:border-cyan-400/60\r
            transition-all duration-300\r
        `,children:a.type}),e.jsxs("div",{className:`\r
            absolute inset-0 flex flex-col items-center justify-end p-4\r
            opacity-0 group-hover:opacity-100\r
            bg-gradient-to-t from-black/90 via-black/50 to-transparent\r
            transition-all duration-500 ease-in-out\r
        `,children:[e.jsxs("p",{className:`\r
            text-sm text-white/90 font-medium text-center leading-tight\r
            mb-3 px-2\r
        `,children:[a.regions.slice(0,6).join(", "),a.regions.length>6&&" ..."]}),e.jsxs("div",{className:"flex items-center justify-center gap-3",children:[a.ios_appstore_url&&e.jsx("a",{href:a.ios_appstore_url,target:"_blank",rel:"noopener noreferrer",onClick:x=>x.stopPropagation(),className:`\r
                        p-2 rounded-lg bg-white/15 border border-white/30\r
                        hover:border-cyan-400/80 hover:bg-cyan-400/20\r
                        hover:scale-110 active:scale-95\r
                        transition-all duration-300\r
                        backdrop-blur-md\r
                    `,title:"Open in App Store",children:e.jsx("span",{className:"w-4 h-4 text-white/90",children:s.iconAppStore})}),a.android_playstore_url&&e.jsx("a",{href:a.android_playstore_url,target:"_blank",rel:"noopener noreferrer",onClick:x=>x.stopPropagation(),className:`\r
                        p-2 rounded-lg bg-white/15 border border-white/30\r
                        hover:border-cyan-400/80 hover:bg-cyan-400/20\r
                        hover:scale-110 active:scale-95\r
                        transition-all duration-300\r
                        backdrop-blur-md\r
                    `,title:"Open in Google Play",children:e.jsx("span",{className:"w-4 h-4 text-white/90",children:s.iconAndroid})})]})]}),e.jsx("div",{className:`\r
            absolute inset-0 rounded-2xl border-1 border-transparent \r
            group-hover:border-cyan-400/30 \r
            transition-all duration-500 pointer-events-none\r
        `})]},a.id))},o))]}),e.jsx(V,{position:"top-right",autoClose:3e3})]})};export{K as default};
