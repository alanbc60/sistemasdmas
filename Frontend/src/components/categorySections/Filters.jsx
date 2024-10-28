import Select from 'react-select';
import filterSubject from '../../data/dropdownSubject.json';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { SubmitInput } from '../../elements/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const FilterSection = ({
  loadingMenu,
  arrMenu,
  filtrarPorKey,
  filtrarPorLabel,
  cambiarOrden,
  mostrarArea,
  arrOrdenarPor,
  getFiltered,
}) => {
  const defaultFiltrarPor = { value: 'Todos', label: 'Todos' };
  const defaultArea = { value: filterSubject[0].type, label: filterSubject[0].filtro };

  const [busquedaInput, setBusquedaInput] = useState('');
  const [filtrarPor, setFiltrarPor] = useState(defaultFiltrarPor);
  const [areaValue, setAreaValue] = useState(defaultArea);
  const optionsOrder = arrOrdenarPor.map((e) => ({ value: e.id, label: e.filtro }));
  const [orderValue, setOrderValue] = useState(optionsOrder[0]);

  const onChangeBusqueda = (e) => setBusquedaInput(e.target.value);
  const onChangeFiltrarPor = (e) => setFiltrarPor(e);
  const onChangeAreaValue = (e) => setAreaValue(e);
  const onChangeOrderValue = (e) => {
    cambiarOrden(e);
    setOrderValue(e);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    getFiltered(busquedaInput, filtrarPor.value, areaValue.value);
    setBusquedaInput('');
    setFiltrarPor(defaultFiltrarPor);
    setAreaValue(defaultArea);
  };

  useEffect(() => {
    setFiltrarPor(defaultFiltrarPor);
    setAreaValue(defaultArea);
    setOrderValue(optionsOrder[0]);
    cambiarOrden({ value: 1 });
  }, [arrMenu]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <form onSubmit={handleSumbit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Búsqueda */}
        <div className="flex flex-col">
          <label htmlFor="busqueda" className="mb-2 text-lg font-semibold">
            Búsqueda
          </label>
          <div className="relative">
            <input
              id="busqueda"
              name="busqueda"
              type="text"
              placeholder="Palabras clave"
              value={busquedaInput}
              onChange={onChangeBusqueda}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-4 top-3 text-gray-400"
            />
          </div>
        </div>

        {/* Filtro por Expositor/Responsable */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">{filtrarPorLabel}</label>
          <Select
            options={[defaultFiltrarPor, ...arrMenu.map((e) => ({
              value: e[filtrarPorKey], label: e[filtrarPorKey]
            }))]}
            value={filtrarPor}
            onChange={onChangeFiltrarPor}
            classNamePrefix="react-select"
            className="rounded-lg"
          />
        </div>

        {/* Filtro por Área */}
        {mostrarArea && (
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold">Área</label>
            <Select
              options={filterSubject.map((e) => ({
                value: e.type, label: e.filtro
              }))}
              value={areaValue}
              onChange={onChangeAreaValue}
              classNamePrefix="react-select"
              className="rounded-lg"
            />
          </div>
        )}

        {/* Botón de Buscar */}
        <div className="col-span-full mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
          >
            Buscar
          </button>
        </div>

        {/* Ordenar */}
        <div className="col-span-full">
          <label className="mb-2 text-lg font-semibold">Ordenar</label>
          <Select
            options={optionsOrder}
            value={orderValue}
            onChange={onChangeOrderValue}
            classNamePrefix="react-select"
            className="rounded-lg"
          />
        </div>
      </form>
    </div>
  );
};

FilterSection.propTypes = {
  loadingMenu: PropTypes.bool.isRequired,
  arrMenu: PropTypes.array.isRequired,
  filtrarPorKey: PropTypes.string.isRequired,
  filtrarPorLabel: PropTypes.string.isRequired,
  cambiarOrden: PropTypes.func.isRequired,
  mostrarArea: PropTypes.bool.isRequired,
  arrOrdenarPor: PropTypes.array.isRequired,
  getFiltered: PropTypes.func.isRequired,
};
