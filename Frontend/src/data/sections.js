//Background Section
// import bgHeaderHome from '../assets/backgrounds/bgbanner.jpg';
import bgHeaderSugerencias from '../assets/backgrounds/bgsugerencias.jpg';


//Background Categorias
import bgHeaderSeminarios from '../assets/backgrounds/bgseminario.jpg';
import bgHeaderEventos from '../assets/backgrounds/bgeventos.jpg';
import bgHeaderLineamientos from '../assets/backgrounds/bglineamientoproc.jpg';
import bgHeaderInvestigacion from '../assets/backgrounds/bgproyectoinvestigacion.jpg';
import bgHeaderTerminales from '../assets/backgrounds/bgproyectoterminal.jpg';
import bgHeaderPublicaciones from '../assets/backgrounds/bgpublicaciones.jpg';

//Iconos Categorias
import seminariosIcon from "../assets/icons/seminariosdepartamentales.png";
import proyectosInvestigacionIcon from "../assets/icons/proyectosinvestigacion.png";
import publicacionesIcon from "../assets/icons/publicaciones.png";
import eventosIcon from "../assets/icons/eventos.png"
import proyectosTerminalesIcon from "../assets/icons/proyectosterminales.png"
import lineamientosIcon from "../assets/icons/lineamientosyprocedimientos.png"

//Imagenes de jefes de dmas
import arelyImg from '../assets/jefesdeldmas/Dra_Areli_Rojo_Hernandez.jpg';
import julianImg from '../assets/jefesdeldmas/Dr_Julian _Fresan.jpeg';
import elsaImg from '../assets/jefesdeldmas/Dra_Elsa_Baez_Juarez.jpg';
import robertoImg from '../assets/jefesdeldmas/Dr_Roberto_Bernal_Jaquez.jpg';
import pedroImg from '../assets/jefesdeldmas/Dr._Pedro_Pablo_Gonzalez.jpeg'
import victorImg from '../assets/jefesdeldmas/Dr_Victor_Manuel_Perez_Abreu.jpeg'

/**
 * Arreglo con la información para mostrar en las secciones
 */
export const sections = [
    {
        id:0,
        title: 'Inicio',
        bgHeader: 'bg-body-uam-img',
        to: ''
    },
    {
        id:1,
        title: 'Categorias',
        bgHeader: null,
        to: null
    },
    {
        id:2,
        title: '¿Quiénes somos?',
        bgHeader: 'bg-quienesomos',
        desc: ['El Departamento de Matemáticas Aplicadas y Sistemas (DMAS) surge en el marco del fomento a la interdisciplina que promueve la Universidad Autónoma Metropolitana Unidad Cuajimalpa (UAM-C) y forma parte de la División de Ciencias Naturales e Ingeniería (DCNI).','El DMAS atiende, actualmente, a la Licenciatura en Ingeniería en Computación y a la Licenciatura en Matemáticas Aplicadas, en las cuales se promueve un modelo educativo centrado en el alumnado, que busca el desarrollo del pensamiento crítico, de la habilidad de aprender a aprender y del trabajo colaborativo.','En el ámbito de la investigación, el DMAS está conformado por un grupo de investigadores expertos en distintas áreas de conocimiento. La investigación en el DMAS gira entorno a la computación, la física y las matemáticas, y a los espacios de convergencia entre estas ciencias.'],
        to: 'quienessomos'
    },
    {
        id:3,
        title: 'Acerca de',
        bgHeader: 'bg-acercade',
        to: 'acercade'
    },
    {
        id:4,
        title: 'Jefes del DMAS',
        bgHeader: 'bg-jefesdeldmas',
        to: 'jefesdeldmas'
    },
    {
        id:5,
        title: 'Sugerencias',
        bgHeader: bgHeaderSugerencias,
        desc: ['Envía tus sugerencias para ayudarnos a mejorar nuestro servicio. ¡Valoramos tu opinión!'],
        to: 'sugerencias'
    }
]

/**
 * Arreglo con la información para mostrar en las secciones del apartado categorias
 */
export const categorias =[
    {
        "id": 1,
        "title": "Seminarios Departamentales",
        "bgHeader": bgHeaderSeminarios,
        "desc": ["Consulta las pláticas a nivel divulgación sobre los temas de investigación en el DMAS."],
        "icon": seminariosIcon,
        "link": "seminarios"
    },
    {
        "id": 2,
        "title": "Proyectos de Investigación",
        "bgHeader": bgHeaderInvestigacion,
        "desc": ["Consulta los proyectos de investigación en los que participa el profesorado del DMAS."],
        "icon":  proyectosInvestigacionIcon,
        "link": "proyectosinvestigacion"
    },
    {
        "id": 3,
        "title": "Publicaciones",
        "bgHeader": bgHeaderPublicaciones,
        "desc": ["Consulta las publicaciones más recientes de los integrantes del DMAS: artículos en revista, memorias de congreso, capítulos de libro y otros."],
        "icon":  publicacionesIcon,
        "link": "publicaciones"
    },
    {
        "id": 4,
        "title": "Eventos",
        "bgHeader": bgHeaderEventos,
        "desc": ["Consulta los próximos eventos: Talleres, conferencias, seminarios, etc."],
        "icon":  eventosIcon,
        "link": "eventos"
    },
    {
        "id": 5,
        "title": "Proyectos Terminales",
        "bgHeader": bgHeaderTerminales,
        "desc": ["Proyectos terminales dirigidos por profesores del DMAS elaborados por el alumnado de Matemáticas Aplicadas e Ingeniería en Computación."],
        "icon":  proyectosTerminalesIcon,
        "link": "proyectosterminales"
    },
    {
        "id": 6,
        "title": "Lineamientos y Procedimientos",
        "bgHeader": bgHeaderLineamientos,
        "desc": ["Lineamientos y Procedimientos del Departamento de Matemáticas Aplicadas y Sistemas."],
        "icon": lineamientosIcon,
        "link": "lineamientosproc"
    }
    
]
/**
 * Arreglo con la información para mostrar en la seccion jefes del dmas
 */
export const jefesdeldmas = [
    {
        nombre: 'Dra. Areli Rojo Hernández', 
        period: '2023-2027', 
        detalles: 'Realizó sus estudios de Ingeniería en Electrónica en la UAM-I (2011), de Maestría en Ciencias de Ingeniería en Microelectrónica en el IPN (2014) y de Doctorado en Comunicaciones y Electrónica en el IPN (2018). Actualmente es el Jefe de Departamento de Matemáticas Aplicadas y Sistemas, por el periodo 2023-2027.', 
        imgSrc: arelyImg
    }, 
    {
        nombre: 'Dr. Julián Alberto Fresán Figueroa', 
        period: '2019-2023',
        detalles: 'Realizó sus estudios de Licenciatura en Matemáticas Aplicadas en la UAM Cuajimalpa, de Maestría en Ciencias (Matemáticas) en la UAM Iztapalapa y de Doctorado en Ciencias (Matemáticas) en la UAM Iztapalapa. Fue Jefe del Departamento de Matemáticas Aplicadas y Sistemas de Junio 2019 a Junio 2023.',
        imgSrc: julianImg
    }, 
    {
        nombre: 'Dra. Elsa Báez Juárez', 
        period: '2015-2019',
        detalles:'Realizó sus estudios de Licenciatura en Matemáticas en la UAM Iztapalapa (1990), de Maestría en Ciencias (Matemáticas) en la UAM Iztapalapa (2002) y de Doctorado en Ciencias (Matemáticas) en la UAM Iztapalapa (2008). Fue Jefe del Departamento de Matemáticas Aplicadas y Sistemas de Junio 2015 a Junio 2019.',
        imgSrc: elsaImg
    }, 
    {
        nombre: 'Dr. Roberto Bernal Jaquez', 
        period: '2011-2015', 
        detalles: 'Realizó sus estudios de Licenciatura en Física en la Facultad de Ciencias, UNAM, de Doctorado en Ciencias (Física) en la UAEMor - ICN UNAM (2006), Posdoctorado en la Facultad de Ciencias-UAEMor (2006-2007) y Posdoctorado en Gruppo di Chimica Teorica-NIS, Centre of Excellence. Fue Jefe del Departamento de Matemáticas Aplicadas y Sistemas de Junio 29 del 2011 al 28 de Junio 2015.',
        imgSrc: robertoImg
    }, 
    {
        nombre: 'Dr. Pedro Pablo González Pérez', 
        period: '2006-2011', 
        detalles: 'Realizó sus estudios de Licenciatura en la Universidad de la Habana, Cuba (1982), de Maestría en el Instituto de Investigaciones Biomédicas, UNAM (1995) y de Doctorado en el Instituto de Investigaciones Biomédicas, UNAM (2000). Fue Jefe del Departamento de Matemáticas Aplicadas y Sistemas de 20 de Junio 2007 al 19 de Junio 2011.',
        imgSrc: pedroImg
    }, 
    {
        nombre: 'Dr. Víctor Manuel Pérez Abreu Carrión', 
        period: '2005-2006',
        detalles: 'Realizó sus estudios de Licenciatura en el Instituto Politécnico Nacional y de Maestría en Matemáticas Aplicadas (1979), una Maestría en Estadística y Doctorado Estadística Matemática en la Universidad de Carolina del Norte en Chapel Hill. Participó en la creación del Departamento de Matemáticas Aplicadas y Sistemas de la UAM-Cuajimalpa.',
        imgSrc: victorImg
    }
];

/**
 * Arreglo con la información para mostrar en la sección acerca de
 */
export const siteManagement = [{
    title: "Concepción del sitio",
    members: ["Julián Alberto Fresán Figueroa"]
}, {
    title: "Responsables del sitio",
    members: ["Jorge Cervantes Ojeda","María del Carmen Gómez Fuentes"]
},{
    title: "Desarrolladores del sitio",
    members: ["Luis Gerardo Moreno Lerma", "Edgar Sánchez García","Alan Uriel Martínez Sánchez","Alan Keveen Bastida Cervantes"]
},{
    title: "Colaboradores",
    members: ["Arturo Torres Flores"]
}]

