
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';

// Componentes y páginas
import GlobalAuth from './components/validations/GlobalAuth';
import JefesDelDMAS from './pages/JefesDelDMAS';
import Home from './pages/Home';
import AcercaDe from './pages/AcercaDe';
import QuinesSomos from './pages/quienesSomos';
import Sugerencias from './pages/Sugerencias';


// Categorias
import Seminarios from './pages/categories/Seminarios';
import Eventos from './pages/categories/Eventos';
import LineamientosProc from './pages/categories/LineamientosProc';
import ProyectosInvestigacion from './pages/categories/ProyectosInvestigacion';
import ProyectosTerminales from './pages/categories/ProyectosTerminales';
import Publicaciones from './pages/categories/Publicaciones';

// ver item
import VerItem from './pages/categories/verItem';


// rutas protegidas
import ProtectedRoute from './components/validations/ProtectedRoute';
import EditarSeminario from './pages/categories/protected/EditarSeminario';
import EditarEvento from './pages/categories/protected/EditarEvento';
import EditarLineamientoProc from './pages/categories/protected/EditarLineamientoProc';
import EditarProyectoInvestigacion from './pages/categories/protected/EditarProyectoInvestigacion';
import EditarProyectoTerminal from './pages/categories/protected/EditarProyectoTerminal';
import EditarPublicacion from './pages/categories/protected/EditarPublicacion';

// rutas admin
import Login from './pages/Login';
import InicioAdmin from './pages/admin/inicioAdmin';
import CrudAdmin from './components/adminSections/crudAdmin';
import NuevoUsuario from './pages/admin/nuevoUsuario';
import EditarUsuario from './pages/admin/editarUsuario';



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
            <Route path="/" element={<Home />}>
            </Route> 
            <Route path="/jefesdeldmas" element={<JefesDelDMAS />} />
            <Route path='/acercade' element={<AcercaDe />} />
            <Route path='/quienessomos' element={<QuinesSomos />} />
            <Route path='/sugerencias' element={<Sugerencias />} />
            {/* FIXME: VerItem */}
            <Route exact path='/ver/:categoria/:item' element={<VerItem/>}/>


            {/* Categorias */}
            <Route path='/seminarios' element={<Seminarios/>}/>
            <Route path='/eventos' element={<Eventos/>}/>
            <Route path='/lineamientosproc' element={<LineamientosProc/>}/>
            <Route path='/proyectosinvestigacion' element={<ProyectosInvestigacion/>}/>
            <Route path='/proyectosterminales' element={<ProyectosTerminales/>}/>
            <Route path='/publicaciones' element={<Publicaciones/>}/>


            {/* ruteo */}
            <Route exact path='/login' element={<Login/>}/> 

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
