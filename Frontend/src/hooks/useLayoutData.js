// useLayoutData.js
import { useEffect, useState } from 'react';
import {sections} from '../data/sections'; 

export const useLayoutData = (selectedSection) => {
  const [layoutData, setLayoutData] = useState(sections[0]); // Estado inicial

  useEffect(() => {
    if (selectedSection) {
      const foundSection = sections.find((e) => e.to === selectedSection);
      if (foundSection) {
        setLayoutData(foundSection);
      } else {
        setLayoutData(sections[0]); // Default a 'Inicio'
      }
    } else {
      setLayoutData(sections[0]); // Default a 'Inicio'
    }
  }, [selectedSection]);

  return { layoutData };
};

export default useLayoutData;
