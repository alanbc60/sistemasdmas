// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';

// Componentes y páginas
import GlobalAuth from './components/validations/GlobalAuth';
import JefesDelDMAS from './pages/JefesDelDMAS';
import Home from './pages/Home';
import AcercaDe from './pages/AcercaDe';

function App() {

        {/* <Provider store={store}> (Redux): Se utiliza para envolver la aplicación y proporcionar acceso al estado global 
        de la aplicación, administrado por Redux. Todos los componentes que están dentro del Provider pueden acceder al 
        estado global y despachar acciones. */}

  return (
    <Provider store={store}>
      <Router>
        {/* GlobalAuth maneja la validación global de autenticación */}
        <GlobalAuth>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jefesdeldmas" element={<JefesDelDMAS />} />
            <Route path='/acercade' element={<AcercaDe />} />
          </Routes>
        </GlobalAuth>
      </Router>
    </Provider>
  );
}

export default App;
