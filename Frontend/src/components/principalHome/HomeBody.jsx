// eslint-disable-next-line no-unused-vars
import React from 'react'

import { categorias } from "../../data/sections";
import InicioGridElement from "./GridElement";


function HomeBody() {
  return (
    <div id='inicio grid' className='felx justify-center w-full'>
        <ul id="inicio-gid-element" className="p-0 m-[40px] grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center gap-5">
            {/* Crea una lista de categorias */}
            {categorias.map(e=><InicioGridElement key={e.id} item={e}/>)}
        </ul>  
    </div>
  
  )
}

export default HomeBody
