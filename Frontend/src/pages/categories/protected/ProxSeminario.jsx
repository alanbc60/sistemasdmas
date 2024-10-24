
import NoResults from '../../../elements/NoResults';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ButtonLink } from '../../../elements/Buttons';
import { ShortLoading } from '../../../elements/Loading';

/**
 * Componente que muestra un próximo seminario en forma de tarjeta.
 */
export const ProximoSeminario = ({ proxSeminario, loadingProxSeminario }) => {
  console.log("entro a prox seminario");
  const dateObject = new Date(proxSeminario.fecha);
  const date = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ver/seminarios/${proxSeminario.id}`);
  };

  return (
    <>
      {loadingProxSeminario ? (
        <ShortLoading />
      ) : (
        <div className="bg-gray-100">

          <div className="container mx-auto px-8 py-12">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Agregar Seminario
            </h2>
          </div>

          {proxSeminario.length === 0 ? (
            <NoResults />
          ) : (
            <article className="flex flex-wrap md:flex-nowrap">
              {/* Imagen del Seminario */}
              <figure
                className="w-1/2 md:w-1/2"
                onClick={handleClick}
              >
                <img
                  alt="Descripción del seminario"
                  src={proxSeminario.imagen}
                  className="rounded-lg shadow-lg hover:opacity-75 object-cover"
                />
              </figure>

              {/* Contenido del Seminario */}
              <aside className="w-full md:w-1/2 p-6">
                <div>
                  <h4 className="text-2xl font-bold mb-2">{proxSeminario.titulo}</h4>
                  <p className="text-gray-600 mb-1">{proxSeminario.responsable}</p>

                  <p className="text-gray-500 mt-4 line-clamp-3">
                    {proxSeminario.resumen}
                  </p>
                </div>

                <div className="mt-6">
                  <ButtonLink
                    label="Ver en YouTube"
                    path={proxSeminario.youtube}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full md:w-auto"
                  />
                </div>

                <p className="text-gray-400 text-sm mt-4">{date}</p>
              </aside>
            </article>
          )}

          {/* Título para Más Seminarios */}
          <div className="my-8 text-center">
            <h3 className="text-2xl font-semibold">Más Seminarios</h3>
          </div>
        </div>
      )}
    </>
  );
};



ProximoSeminario.propTypes = {
  proxSeminario: PropTypes.any.isRequired,
  loadingProxSeminario: PropTypes.bool.isRequired,
};
