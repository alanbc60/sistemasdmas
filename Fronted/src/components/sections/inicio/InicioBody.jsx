// Componente de la ruta principal ('/')

import { categorias } from "../../../data/sections";
import InicioGridItem from "./InicioGridItem";
/**
 * 
 * @returns renderiza en una lista el arreglo categorias de carpeta data
 */
export default function InicioBody() {
  return (
    <ul id='inicio-grid'>
        {/* Crea una lista de categorias */}
        {categorias.map(e=><InicioGridItem key={e.id} item={e}/>)}
    </ul>
  )
}
