import Clamp from 'react-multiline-clamp';
import NoResults from '../../../elements/NoResults';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ButtonLink } from '../../../elements/Buttons';
import { ShortLoading } from '../../../elements/Loading';

/**
 * Componente que muestra un próximo seminario en forma de tarjeta.
 */
export const ProximoSeminario = ({ proxSeminario, loadingProxSeminario }) => {
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
        <div className="container mx-auto p-4">
          <div className="mt-3 text-center">
            <h3 className="text-2xl font-semibold">Próximo seminario</h3>
          </div>

          {proxSeminario.length === 0 ? (
            <NoResults />
          ) : (
            <article className="flex flex-col md:flex-row gap-6 bg-white shadow-md rounded-lg p-6 mt-4">
              <figure
                className="cursor-pointer w-full md:w-1/2"
                onClick={handleClick}
              >
                <img
                  alt="Descripción del seminario"
                  src={proxSeminario.imagen}
                  className="rounded-lg shadow-md object-cover w-full h-full"
                />
              </figure>

              <aside className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <Clamp lines={3}>
                    <h4 className="text-xl font-bold mb-2">
                      {proxSeminario.titulo}
                    </h4>
                  </Clamp>
                  <p className="text-gray-600">{proxSeminario.responsable}</p>

                  <div className="mt-2">
                    <Clamp lines={3}>
                      <p className="text-gray-500">{proxSeminario.resumen}</p>
                    </Clamp>
                  </div>
                </div>

                <div className="mt-4">
                  <ButtonLink
                    label="Ver en Youtube"
                    path={proxSeminario.youtube}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
                  />
                </div>

                <p className="text-gray-400 text-sm mt-2">{date}</p>
              </aside>
            </article>
          )}

          <div className="my-4 text-center">
            <h3 className="text-2xl font-semibold">Más seminarios</h3>
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
