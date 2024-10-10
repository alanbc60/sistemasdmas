
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './redux/configureStore';

// importaciones de rutas

import Home from './pages/Home'
import JefesDelDmas from './pages/JefesDelDMAS'


function App() {

  return (
    <>
      {/* <Provider store={store}> (Redux): Se utiliza para envolver la aplicación y proporcionar acceso al estado global 
        de la aplicación, administrado por Redux. Todos los componentes que están dentro del Provider pueden acceder al 
        estado global y despachar acciones. */}

      <Provider store={store}>
        <Router>
          <Routes>
        
            <Route path="/" element={<Home />} />
            <Route path="/jefesdeldmas" element={<JefesDelDmas />} />

          </Routes>
          </Router>

        </Provider>



    </>
  )
}

export default App
