
import NoResults from '../../../elements/NoResults';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ButtonLink } from '../../../elements/Buttons';
import { ShortLoading } from '../../../components/generalSections/Loading';

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
        <div className="bg-white p-5">

          <div className="container mx-auto px-8 py-12">
            <h2 className="text-3xl font-semibold text-center">
              Proximo Seminario
            </h2>
          </div>

          {proxSeminario.length === 0 ? (
            <NoResults />
          ) :
            (
              <article className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
                {/* Imagen del Seminario */}
                <figure
                  className="w-full md:w-1/2 flex bg-black"
                  onClick={handleClick}
                >
                  <img
                    alt="Descripción del seminario"
                    src={proxSeminario.imagen}
                    className="rounded-lg shadow-md object-cover max-w-full max-h-80 min-w-full min-h-80"
                  />
                </figure>

                {/* Contenido del Seminario */}
                <aside className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
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
                      className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full w-full md:w-auto"
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