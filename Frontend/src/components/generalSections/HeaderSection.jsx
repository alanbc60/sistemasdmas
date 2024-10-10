import React from 'react'

import { useLayoutData } from "../../hooks/usePageLayout"

export default function HeaderSection() {
    const {layoutData} = useLayoutData()
    
    // Estilos para el encabezado de Jefes del DMAS
    const jefesdeldmasHeaderStyle =
    'relative w-full h-screen bg-gradient-to-r from-transparent via-transparent to-yellow-200 bg-gradient-to-b from-transparent via-transparent to-orange-500 bg-gradient-to-r from-transparent via-transparent to-yellow-200 bg-gradient-to-t from-transparent via-transparent to-orange-500';

    if(!layoutData) return null;
    const {title, bgHeader, desc} = layoutData;
    return (
        <header id='section-header' className="flex flex-col items-center relative w-full mb-6 min-w-[500px]">
            <div id="bg-header" className={`relative ${title === 'Jefes del DMAS' ? `bg-cover bg-fixed bg-center bg-no-repeat ${jefesdeldmasHeaderStyle}`: `${bgHeader} bg-cover bg-fixed bg-center h-[15rem] w-full bg-no-repeat`} `}>
            </div>
            
            {title === 'Inicio' && (
                <h2 id='welcome-greating' className="absolute p-5 text-white font-bold leading-relaxed text-3xl">Bienvenido/a</h2>
            )}

            {!['Inicio', 'Jefes del DMAS'].includes(title) && (
                <div id='header-content' className="mt-4">
                    <h2 id="title-section" className="text-xl font-semibold">{title}</h2>
                    {desc && desc.map((item, index) => (
                        <p key={index} className="mt-2 text-gray-600">{item}</p>
                    ))}
                </div>
            )}
        </header>
    )
}

// export default HeaderSection
