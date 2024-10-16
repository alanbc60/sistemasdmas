// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';

// Componentes y páginas
import GlobalAuth from './components/validations/GlobalAuth';
import JefesDelDMAS from './pages/JefesDelDMAS';
import Home from './pages/Home';
import AcercaDe from './pages/AcercaDe';


// rutas protegidas
import ProtectedRoute from './components/validations/ProtectedRoute';
import EditarSeminario from './pages/categories/EditarSeminario';
import EditarEvento from './pages/categories/EditarEvento';
import EditarLineamientoProc from './pages/categories/EditarLineamientoProc';
import EditarProyectoInvestigacion from 'EditarProyectoInvestigacion';
import EditarProyectoTerminal from './pages/categories/EditarProyectoTerminal';
import EditarPublicacion from './pages/categories/EditarPublicacion';

// rutas admin
import InicioAdmin from './pages/admin/InicioAdmin';
import CrudAdmin from './pages/admin/CrudAdmin';
import NuevoUsuario from './pages/admin/NuevoUsuario';
import EditarUsuario from './pages/admin/EditarUsuario';



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


            {/* ruteo */}

            <Route element={<ProtectedRoute/>}>  

              <Route path='/admin' element={<InicioAdmin/>}>
                <Route index element={<CrudAdmin/>}/>
                <Route path='usuarios/nuevoUsuario' element={<NuevoUsuario/>}/>
                <Route path='usuarios/editarUsuario/:usuarioId' element={<EditarUsuario/>}/> 
              </Route>

              <Route path='editar/seminarios/:id' element={<EditarSeminario/>}/>
              <Route path='agregar/seminarios' element={<EditarSeminario/>}/>
              <Route path='editar/eventos/:id' element={<EditarEvento/>}/>
              <Route path='agregar/eventos' element={<EditarEvento/>}/>
              <Route path='editar/lineamientosproc/:id' element={<EditarLineamientoProc/>}/>
              <Route path='agregar/lineamientosproc' element={<EditarLineamientoProc/>}/>
              <Route path='editar/proyectosinvestigacion/:id' element={<EditarProyectoInvestigacion/>}/>
              <Route path='agregar/proyectosinvestigacion' element={<EditarProyectoInvestigacion/>}/>
              <Route path='editar/proyectosterminales/:id' element={<EditarProyectoTerminal/>}/>
              <Route path='agregar/proyectosterminales' element={<EditarProyectoTerminal/>}/>
              <Route path='editar/publicaciones/:id' element={<EditarPublicacion/>}/>
              <Route path='agregar/publicaciones' element={<EditarPublicacion/>}/>
            </Route>


          </Routes>
        </GlobalAuth>
      </Router>
    </Provider>
  );
}

export default App;
