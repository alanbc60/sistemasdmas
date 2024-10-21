import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { categorias, sections } from '../../data/sections';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes, faChevronDown);



/**
 * 
 * @returns Barra de navegación para nagevar através de las secciones
 */
// ... (import statements)

/**
 * @returns Barra de navegación para navegar a través de las secciones
 */

export default function SectionNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickCategories = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Navbar id='bottom-nav' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav>
          {/* Hace un renderizado de las secciones  excluyendo la ultima (Sugerencias)*/}
          {sections.slice(0, -1).map((e, index) =>
            index !== 1 ? (
              <NavLink className="nav-link" key={`section-${index}`} to={`/${e.to}`}>
                {e.title}
              </NavLink>
              // Si el indice es igual a 1, se renderiza la sección de Categorias
            ) : (
              <div key={`section-${index}`} className={`dropdown nav-link ${isOpen ? "open" : ""}`} ref={dropdownRef}>
                <button className='nav-link' onClick={() => setIsOpen(!isOpen)}>
                  <span>Categorias</span>
                  {isOpen ? <FontAwesomeIcon className='categories-icon' icon={['fas', 'times']} /> : <FontAwesomeIcon className='categories-icon' icon={['fas', 'chevron-down']} />}
                </button>
                <div className='menu'>
                  {categorias.map((e, index) => (
                    <NavLink className='nav-link' to={`/${e.link}`} key={`${index}-category`} onClick={handleClickCategories}>
                      {e.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
