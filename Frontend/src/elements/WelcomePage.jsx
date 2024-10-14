// import React from "react";
// import { useLayoutData } from "../hooks/usePageLayout"

// export default function WelcomePage() {
//     const {layoutData} = useLayoutData()
//     const jefesdeldmasHeaderStyle = {
//         background: 'radial-gradient(#ffb865 15%, transparent 16%), linear-gradient(45deg, transparent 49%, #fd7e14 49% 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, #fd7e14 49% 51%, transparent 51%)',
//         backgroundSize: '3em 3em',
//         backgroundColor: '#FEEDAA',
//         opacity: '1'
//     }
//     if(!layoutData) return null;
//     const {title, bgHeader, desc} = layoutData;
//     return (
//         <header id='section-header'>
//             {title==='Inicio'&&
//                 <h2 id='welcome-greating'>Bienvenido/a</h2>  
//             }
            
//             <div id="bg-header" style={title==='Jefes del DMAS'?
//                 jefesdeldmasHeaderStyle
//                 :
//                 {backgroundImage:`url(${bgHeader})`}}></div>
            
//             {!(title==='Inicio'||title==='Jefes del DMAS') &&
//                 <div id='header-content'>
//                     <h2 id="title-section">{title}</h2>
//                 {desc && (desc).map((e,index)=>
//                     <p className='p-section' key={index}>{e}
//                     </p>)}
//                 </div>
//             }
//         </header>
//     )
// }

