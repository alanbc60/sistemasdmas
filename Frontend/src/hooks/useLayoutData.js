import { useEffect, useState} from 'react';
import { sections, categorias } from '../data/sections';

export const useLayoutData = (selected) => {
  const [layoutData, setLayoutData] = useState(sections[0]); 
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    
    const fetchData = async () => {

      let foundData = sections.find((e) => e.to === selected);
      if (!foundData) {
        console.log('No se encuentra la sección, buscando en categorías...');
        foundData = categorias.find(
          (e) => e.to === selected || e.link === selected
        );
      }

      console.log('Found al momento:', foundData);

      setLayoutData(foundData || categorias[0]); // Fallback si no se encuentra
      setLoading(false); // Finaliza la carga
      
    };

    fetchData();

  }, [selected]);


  return { layoutData, loading };
};

export default useLayoutData;
