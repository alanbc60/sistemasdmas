// usando EsModules
import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
// Variables globales
const host = "http://localhost:5173"; // Host para pruebas locales con Vite frontend
const hostApi = "http://localhost:3001"; // Host del backend para pruebas locales

// Inicializa Express
const app = express();

// ==== Middlewares ====
app.use(cors({
    origin: host,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Permite enviar cookies
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
    key: "user",
    secret: "dmas",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Cambia a true si usas HTTPS
    store: new session.MemoryStore(),
    rolling: true,
    maxAge: 30 * 24 * 60 * 1000, // Sesión válida por 30 días
}));

// Middleware de depuración
app.use((req, res, next) => {
    console.log('Sesión en middleware de depuración:', req.session);
    next();
});

// Configuración de la conexión a la base de datos
const poolDB = mysql.createPool({
    connectionLimit: 10,
    host: "148.206.168.33",
    user: "adminUser",
    password: "X22muy2Dqw,q",
    database: "dmas",
    port: "3306",
});

// Prueba de conexión a la base de datos
// async function testDBConnection() {
//     let conn;
//     try {
//         conn = await poolDB.getConnection();
//         console.log("Conexión a la base de datos exitosa");

//         const [rows] = await conn.query('SELECT * FROM usuarios;');
//         if (rows.length > 0) {
//             console.log("Usuarios encontrados en la base de datos:", rows);
//         } else {
//             console.log("No hay elementos en la tabla 'usuarios'");
//         }
//     } catch (err) {
//         console.error("Error al conectar o consultar la base de datos:", err);
//     } finally {
//         if (conn) conn.release(); // Asegura liberar la conexión
//     }
// }


//=================Inicia Configuración de almacenamiento de imágenes ============================

const storageSeminario = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'public/seminarios')
    },
    filename: function (_req, file, cb) {
        cb(null, "seminario" + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadSeminarios = multer({ storage: storageSeminario })

const storageProyectoInvestigacion = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'public/proyectosinvestigacion')
    },
    filename: function (_req, file, cb) {
        cb(null, "proyectoinvestigacion" + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadProyectosInvestigacion = multer({ storage: storageProyectoInvestigacion })

const storagePublicacion = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'public/publicaciones')
    },
    filename: function (_req, file, cb) {
        cb(null, "publicacion" + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadPublicaciones = multer({ storage: storagePublicacion })

const storageEvento = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'public/eventos')
    },
    filename: function (_req, file, cb) {
        cb(null, "evento" + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadEventos = multer({ storage: storageEvento })

const storageProyectoTerminal = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'public/proyectosterminales')
    },
    filename: function (_req, file, cb) {
        cb(null, "proyectoterminal" + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadProyectosTerminales = multer({ storage: storageProyectoTerminal })

// var storageLineamientoProc = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/lineamientosproc')
//     },
//     filename: function (req, file, cb) {
//       cb(null, "lineamientoproc" + '-' + Date.now()+path.extname(file.originalname));
//     }
// })

// var uploadLineamientosProc = multer({ storage: storageLineamientoProc })
const storageLineamientoProc = multer.diskStorage({
    destination: function (_req, file, cb) {
        if (file.fieldname === "imagen") {
            cb(null, 'public/lineamientosproc/imagenes');
        } else if (file.fieldname === "documento") {
            cb(null, 'public/lineamientosproc/documentos');
        }
    },
    filename: function (_req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadLineamientosProc = multer({ storage: storageLineamientoProc }).fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'documento', maxCount: 1 }
]);


//=================Termina Configuración de almacenamiento de imágenes ============================


app.get('/get/login', (req, res) => {
    console.log("Comprobacion de sesion: " + req.session.user);
    if (req.session.user === true) {
        res.send({ loggedIn: true });
    } else {
        res.send({ loggedIn: false });
    }
})


// Ruta de inicio de sesión (POST)
app.post('/post/login', async (req, res) => {
    const { mail, password } = req.body;
    console.log(`Intentando inicio de sesión con: ${mail} | ${password}`);

    let conn;
    try {
        conn = await poolDB.getConnection();

        const [result] = await conn.query(
            'SELECT * FROM usuarios WHERE mail = ? AND password = ?',
            [mail, password]
        );

        if (result.length > 0) {
            req.session.user = true; // Guarda la sesión
            console.log('Inicio de sesión exitoso:', result[0]);

            res.status(200).json({ message: 'Inicio de sesión exitoso', user: result[0] });
        } else {
            res.status(404).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    } finally {
        if (conn) conn.release();
    }
});


// Inicia el servidor y prueba la conexión a la base de datos
const PORT = 3001;
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en ${hostApi}`);
    // await testDBConnection(); // Prueba la conexión a la base de datos
});
