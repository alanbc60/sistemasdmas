// import React from 'react'
// import { useParams } from 'react-router-dom';
// import { useValidRoute } from '../hooks/usePageLayout';
// import { connect } from 'react-redux';
// import { Outlet } from 'react-router-dom';
// import { useEffect } from 'react';
// import { host } from '../data/host';

// import Header from '../components/generalSections/Header'
// import Footer from '../components/generalSections/Footer'
// import HeaderSection from '../components/generalSections/HeaderSection'
// import BodySuggest from './principalHome/BodySuggest'
// import toggleLogin from '../redux/actions/toggleLogin';

// import axios from 'axios';
// import Swal from 'sweetalert2';

// /**
//  * 
//  * @param {*} props
//  * toogleLogin actualiza el estado global después de cargar
//  * @returns Componente principal que verifica si la ruta es valida y dependiendo del parametro de la URL pondrá el titulo.
//  * Realizará una petición al servidor para ver si se está logeado y regresará las barras de navegación, el header de cada sección y la ruta hijo.
//  */
// function Home(props) {

//   //console.log(" == Page Layout ==")

//   // validacion de ruta y cambio de titulo
//   const isValidRoute = useValidRoute();
//   const { section } = useParams()
//   const titulo =
//     section === 'quienessomos' ? '¿Quiénes somos?' :
//       section === 'acercade' ? 'Acerca de' :
//         section === 'jefesdeldmas' ? 'Jefes del DMAS' :
//           section === 'seminarios' ? 'Seminarios' :
//             section === 'proyectosinvestigacion' ? 'Proyectos de Investigación' :
//               section === 'proyectosterminales' ? 'Proyectos Terminales' :
//                 section === 'eventos' ? 'Eventos' :
//                   section === 'sugerencias' ? 'Sugerencias' :
//                     section === 'publicaciones' ? 'Publicaciones' :
//                       section === 'lineamientosproc' ? 'Lineamientos y Procedimientos' : 'Departamento de Matemáticas Aplicadas y Sistemas'

//   useEffect(() => {
//     document.title = `${titulo} | DMAS`
//   }, [section, titulo])

//   //console.log(" == Entro a page layout")

//   useEffect(() => {

//     /***
//      * Al cargar el layout principal hace una petición al servido para revisar si es usuario o no
//      * en caso de error se lanza una advertencía y el mensaje
//      */
//     const getLogin = async () => {
//       try {
//         //console.log(" == Entro a getLogin ==")
//         const response = await axios.get(host + ":3001/get/login", { withCredentials: true })

//         const result = response.data.loggedIn;
//         props.toggleLogin(result);

//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           iconColor: '#F05757',
//           backdrop: 'rgba(255,157,5,0.2)',
//           title: 'Oops...',
//           text: 'Parece que hubo un problema.',
//           showConfirmButton: false,
//           timer: '4000',
//           footer: error.message === 'Network Error' ? 'Intente más tarde' :
//             error.message === 'Request failed with status code 500' ? 'Error interno del servidor (500)'
//               : error.message
//         })
//       }
//     }
//     getLogin();

//   }, [])

//   if (!isValidRoute) return null


//   return (
//     <>
//       <Header />
//       <HeaderSection />
//       {/* <HomeBody /> */}
//       {/* Carga el contenido de InicioBody ( las categorias ) */}
//       <section id='section-body' className='min-w-[500px]'>
//         <Outlet />
//       </section>
//       <BodySuggest />
//       <Footer />
//     </>
//   )
// }

// // export default Home

// const mapStateToProps = (state) => {
//   console.log(" == Entro a mapStateToProps ==")
//   return {
//     logged: state.logged,
//   };
// };

// const mapDispatchToProps = {
//   toggleLogin,
// };
// // está conectando el componente PageLayout a la tienda de Redux utilizando la función connect 
// // de react-redux. Esto le permite al componente acceder al estado de Redux y despachar acciones. 
// // Se mapea el estado logged a la prop logged y se mapea la acción toggleLogin a la prop toggleLogin


// const ConnectedPageLayout = connect(mapStateToProps, mapDispatchToProps)(Home);
// export default ConnectedPageLayout
