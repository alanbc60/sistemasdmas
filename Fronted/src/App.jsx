import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store, persistor } from './redux/configureStore';
import Error404 from './components/Error404';
import PageLayout from './components/sections/PageLayout';
import SectionBody from './components/sections/SectionBody';
import InicioBody from './components/sections/inicio/InicioBody';
import VerItem from './components/verItem/VerItem';
import Login from './components/login/Login';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import EditarSeminario from './components/protectedroute/EditarSeminario';
import EditarEvento from './components/protectedroute/EditarEvento';
import EditarLineamientoProc from './components/protectedroute/EditarLineamientoProc';
import EditarProyectoInvestigacion from './components/protectedroute/EditarProyectoInvestigacion';
import EditarProyectoTerminal from './components/protectedroute/EditarProyectoTerminal';
import EditarPublicacion from './components/protectedroute/EditarPublicacion';


// Administrador

import InicioAdmin from './components/protectedroute/Admin/InicioAdmin';
import CrudAdmin from './components/protectedroute/Admin/CrudAdmin';

import NuevoUsuario from './components/protectedroute/Admin/nuevoUsuario';
import EditarUsuario from './components/protectedroute/Admin/editarUsuario';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>

            {/*  Usuarios  */}
            <Route path='*' element={<Error404/>}/>
            <Route path='/' element={<PageLayout/>}>
                <Route index element={<InicioBody/>}/>
                <Route path=':section' element={<SectionBody/>}/>
                <Route exact path='/ver/:categoria/:item' element={<VerItem/>}/>
            </Route>
            <Route exact path='/login' element={<Login/>}/> 

            {/* <Route element={<ProtectedRoute/>}>

            </Route> */}


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
        </Router>
        <ToastContainer /> 
      </PersistGate>
    </Provider>
  );
}

export default App;
