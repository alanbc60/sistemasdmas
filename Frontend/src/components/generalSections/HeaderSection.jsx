import React from 'react'

import { useLayoutData } from "../../hooks/usePageLayout"

export default function HeaderSection() {
    const { layoutData } = useLayoutData()

    // Estilos para el encabezado de Jefes del DMAS
    const jefesdeldmasColor =
        'bg-jefesheader opacity-70';
    const jefesdmasSVG = 
        'max-h-[250px] relative w-full h-screen bg-[length:100px_100px] bg-[position:_center] bg-jefesdeldmas bg-repeat';        

    if (!layoutData) return null;
    const { title, bgHeader, desc } = layoutData;
    return (
        <header id='section-header' className="flex flex-col items-center relative w-full mb-[24px] min-w-[500px] ">
            <div id="bg-header" className={`relative ${title === 'Jefes del DMAS' ? `${jefesdmasSVG}  ${jefesdeldmasColor}` : `${bgHeader} bg-cover bg-fixed bg-center h-[250px] w-full bg-no-repeat`} `}>
            </div>

            {title === 'Inicio' && (
                <h2 id='welcome-greating' className="absolute p-5 text-white font-bold leading-relaxed text-3xl">Bienvenido/a</h2>
            )}

            {!['Inicio', 'Jefes del DMAS'].includes(title) && (
                <div id='header-content' className="flex flex-col gap-4 w-[80%] items-center p-4 mt-4">
                    <h2 id="title-section" className="text-xl font-semibold">{title}</h2>
                    {desc && desc.map((item, index) => (
                        <p key={index} className="mt-2 text-gray-600">{item}</p>
                    ))}
                </div>
            )}
        </header>
    )
}

