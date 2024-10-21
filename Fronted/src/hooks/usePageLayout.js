import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categorias, sections } from "../data/sections";

/**
 * 
 * @returns Valida si existe la ruta, si no manda a la página principal
 */



export const useValidRoute = ()=>{
const [isValidRoute, setIsValidRoute] = useState(false);
  const navigate = useNavigate();
  const {section} = useParams();
  useEffect(() => {
    const validPaths = [
      'acerca',
      'quienessomos',
      'acercade',
      'jefesdeldmas',
      'sugerencias',
      'seminarios',
      'proyectosinvestigacion',
      'proyectosterminales',
      'eventos',
      'publicaciones',
      'lineamientosproc'
    ];

    if ( section===undefined|| validPaths.includes(section)) {
      setIsValidRoute(true);
    } else {
      setIsValidRoute(false);
      navigate('/');
    }
  }, [navigate, section]);
  return isValidRoute;
}

/**
 * 
 * @returns Revisa si el parametro del url es una sección o parte de 
 * una categoria, dependiendo de eso cargara la información, del banner, 
 * información, saludo, titulo y link. Los datos estan en un arreglo en la carpeta data 
 */
export const useLayoutData = ()=>{
    const [layoutData, setLayoutdata] = useState(sections[0])
    const {section, categoria} = useParams();
    useEffect(()=>{
      if(section){
          const isSectionOnCategoriesArr = categorias.find((e)=> e.link === section);
          const isSectionOnSectionsArr = isSectionOnCategoriesArr?isSectionOnCategoriesArr:sections.find((e)=> e.to === section);
          setLayoutdata(isSectionOnSectionsArr)
      }else if(categoria){
        setLayoutdata(null)
      }
      else{
          setLayoutdata(sections[0])
      }
      
    },[section])

    return {layoutData}
}