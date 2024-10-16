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
const host = "http://localhost:5173"; // Host para pruebas en máquina local Vite frontend
// const host = "http://dmas.cua.uam.mx"; // Host para producción

const hostApi = "http://localhost:3001"; // Host para pruebas en máquina local
// const hostApi = "http://dmas.cua.uam.mx:3001"; // Host para producción

// Inicializa Express
const app = express();


// ==== middlewares ====

app.use(cors({
    origin: host,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());
app.use(express.static('public'));

app.use(
    session({
        key: "user",
        secret: "dmas",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }
        /*cookie:{
            expires: 1500, //La sesión expira en 2 horas en milisegundos
        },*/
    })
);


// createPool: Crea un grupo (pool) de conexiones reutilizables, lo que mejora el rendimiento en aplicaciones con múltiples solicitudes concurrentes.
// Uso recomendado:
// Aplicaciones web o servicios con alto tráfico.
// Cuando necesitas reutilizar conexiones para reducir la latencia.


// Configuración de la conexión
const poolDB = mysql.createPool({
    waitForConnections: true, // La solicitud espera en una cola hasta que una conexión se libere
    connectionLimit: 10, // El limite de conexiones simultaneas
    host: "148.206.111.111",
    user: "adminUser",
    password: "admin123",
    database: "dmas",
    port: "3306"
})

console.log('Conexión establecida exitosamente');

// Inicia el servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${hostApi}`);
});


const getYoutubeVideoId = (url) => {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_-]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}




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



// ================== Inicia Configuración de sesiones ============================

app.get('/get/login', (req, res) => {
    console.log("Comprobacion de sesion: " + req.session.user);
    if (req.session.user === true) {
        res.send({ loggedIn: true });
    } else {
        res.send({ loggedIn: false });
    }
})

app.post('/post/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Intento de inicio de sesión | user: " + username + " pass: " + password);
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM usuarios WHERE BINARY mail = ? AND BINARY password = ? ;', [username, password],
                (err, result) => {
                    if (err) {
                        console.log('Inicio de sesión sin éxito: ' + err);
                        res.status(500).send("Error interno del servidor");
                    }
                    else if (result.length > 0) {
                        console.log("Guardo " + result[0].idusuario + " en cookie.")
                        req.session.user = true;
                        console.log("sesion: " + req.session);
                        console.log('Inicio de sesión con éxito');
                        res.send(result);
                    } else if (result.length === 0) {
                        res.status(404).send("No hay elementos")
                    }
                    else {
                        console.log('Error desconocido al iniciar sesión');
                        res.send("error");
                    }
                    conn.release();
                });
        }
    });
});

app.post('/post/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al cerrar sesión");
        } else {
            res.status(200).send("Sesión cerrada exitosamente")
        }
    });
});

// ================== Termina Configuración de sesiones ============================


//===============================================================================================
//==================================Inicia Seminarios ===========================================
//===============================================================================================


app.get('/get/seminarios', function(req, res){
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query('SELECT * FROM seminarios ORDER BY fecha DESC', function(error, results){
                if ( error ){
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});


app.get('/get/seminarios/mas-lejano-primero', function(req, res){
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query('SELECT * FROM seminarios ORDER BY fecha ASC', function(error, results){
                if ( error ){
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});


app.get('/get/seminarios/mas-proximo', function(req, res){
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query('SELECT * FROM seminarios ORDER BY fecha DESC LIMIT 1;', function(error, results){
                if ( error ){
                    res.send("error");
                } else {
                    res.send(results[0]);
                }
            });
        }
        conn.release();    
    });
});




app.get('/get/seminarios/filtrar', function(req, res){
    const busqueda = req.query.busqueda;
    const expositor = req.query.expositor=="-1" ? "": req.query.expositor;
    const area = req.query.area=="0" ? "": req.query.area;
    console.log("Recibi: Busqueda: "+busqueda+" Expositor: "+expositor+" Area: "+area);
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query('SELECT * FROM seminarios WHERE (titulo LIKE ? OR resumen LIKE ? OR expositor LIKE ? OR semblanza LIKE ?) AND expositor LIKE ? AND area LIKE ?',
            ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%', '%' +expositor+ '%', '%' + area+ '%'],
            function (error, results) {
                if (error) {        
                    console.log("error: "+error)
                    res.send("error");
                } else {
                    console.log(JSON.stringify(results))
                    res.send(results);
                }
            });
        }
        conn.release();
    });    
    
});


app.get('/get/seminarios/seminario-item', function(req, res){
    const id = req.query.id;
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query('SELECT * FROM seminarios WHERE idseminario=?',[id], function(error, results){
                if ( error ){    
                    console.log("error: "+error)
                    res.status(500).send("Error interno del servidor");
                } else if(results.length===0){
                    res.status(404).send("No hay elementos")
                }
                else {
                    let fecha = new Date(results[0].fecha);
                    fecha = fecha.toJSON(fecha);
                    results[0].fecha=fecha.substr(0,10);
                    let youtube = results[0].youtube;
                    results[0].youtube = getYoutubeVideoId(youtube);
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });
    
});


app.get('/get/seminarios/seminario-edit', function(req, res){
    const id = req.query.id;
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query('SELECT * FROM seminarios WHERE idseminario=?',[id], function(error, results){
                if ( error ){
                    console.log("error: "+error);
                    res.send("error");
                } else {
                    let fecha = new Date(results[0].fecha);
                    fecha = fecha.toJSON(fecha);
                    results[0].fecha=fecha.substr(0,10);
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });
    
});


app.get('/get/seminarios/expositores', function(req, res){
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query('SELECT DISTINCT expositor FROM seminarios', function(error, results){
                if ( error ){
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
    
});




app.post('/post/seminarios/',uploadSeminarios.single("imagen"), (req, res) =>{
    const titulo = req.body.titulo;
    const expositor = req.body.expositor;
    const youtube = req.body.youtube;
    const fecha = req.body.fecha;
    const area = req.body.area;
    const resumen = req.body.resumen;
    const semblanza = req.body.semblanza;

    console.log("Se solicita agregar un seminario.")
    const host = hostApi+"/seminarios/";
    const imagenRuta = req.file ? host + path.basename(req.file.path) : ''


    var sql = "INSERT INTO seminarios (titulo, resumen, expositor, semblanza, fecha, area, imagen, youtube, idusuario) VALUES ?";
    var values = [
        [titulo, resumen, expositor, semblanza, fecha, area, imagenRuta, youtube, 1],
    ];


    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query(sql, [values], function (err, result) {
                if (err){
                    console.log("Error al publicar seminario: "+err);
                    res.send(false);
                }else{
                    console.log("Se agregó un seminario: "+result.insertId);
                    res.send((result.insertId).toString());
                }
                
            });
        }
        conn.release();
    });
      
    //Publicar en facebook

});


app.post('/post/seminarios/edit/image',uploadSeminarios.single("imagen"), (req, res) =>{
    const idseminario = req.body.id;
    const titulo = req.body.titulo;
    const expositor = req.body.expositor;
    const youtube = req.body.youtube;
    const fecha = req.body.fecha;
    const area = req.body.area;
    const resumen = req.body.resumen;
    const semblanza = req.body.semblanza;
    const idusuario = req.body.userId;
    
    console.log("Se solicita modificar con imagen.")
    const host = hostApi+"/seminarios/";
    const imagenRuta = host + path.basename(req.file.path);
    //Obtener nombre de imagen en base de datos para eliminarla.
    var sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM seminarios WHERE idseminario= ?;"
    
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query(sqlImage, idseminario, function (error, results) {
                if(error){
                    console.log("Hubo un error.");
                }else{
                    if (fs.existsSync("./public/seminarios/" + results[0].imagen)) { //Si el archivo existe
                        fs.unlink("./public/seminarios/" + results[0].imagen, (err) => {
                            if (err) {
                                console.error("No se pudo eliminar la imagen.")
                            }
                        });
                    }
                }    
            });
        }
        conn.release();
    });


            
    var sql = "UPDATE `seminarios` SET `titulo` = ?, `resumen` = ?, `expositor`=?, `semblanza`=?, `fecha`=?, `area`=?, `youtube`=?, `idusuario` =?, `imagen` =?  WHERE `idseminario`=?;";
    var values = [titulo, resumen, expositor, semblanza, fecha, area, youtube, idusuario, imagenRuta, idseminario];
    
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query(sql, values, function (err) {
                if (err){ //Error al editar
                    console.log(err)
                    res.send(false);
                }else{ //Se editó correctamente
                    res.send(idseminario+"");
                }
            });
        }
        conn.release();
    });


    


});


app.post('/post/seminarios/edit', (req, res) =>{
    const idseminario = req.body.id;
    const titulo = req.body.titulo;
    const expositor = req.body.expositor;
    const youtube = req.body.youtube;
    const fecha = req.body.fecha;
    const area = req.body.area;
    const resumen = req.body.resumen;
    const semblanza = req.body.semblanza;
    const idusuario = req.body.userId;
    
    console.log("Se solicita modificar sin imagen.")
            
    var sql = "UPDATE `seminarios` SET `titulo` = ?, `resumen` = ?, `expositor`=?, `semblanza`=?, `fecha`=?, `area`=?, `youtube`=?, `idusuario` =? WHERE `idseminario`=?;";
    var values = [titulo, resumen, expositor, semblanza, fecha, area, youtube, idusuario, idseminario];
    
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query(sql, values, function (err) {
                if (err){ //Error al editar
                    res.send(false);
                }else{ //Se editó correctamente
                    res.send(idseminario+"");
                }
            });
        }
        conn.release();
    });
    
    


});


app.delete('/delete/seminarios/item', function (req, res) {
    const id = req.body.id;


    //Obtener nombre de imagen en base de datos para eliminarla.
    var sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM seminarios WHERE idseminario= ?;"
    
    poolDB.getConnection((err,conn)=>{
        if(err){
            res.send("error");
        }else{
            conn.query(sqlImage, id, function (error, results) {
                if(error){
                    console.log("Hubo un error.");
                }else{
                    if (fs.existsSync("./public/seminarios/" + results[0].imagen)) { //Si el archivo existe
                        fs.unlink("./public/seminarios/" + results[0].imagen, (err) => {
                            if (err) {
                                console.error("No se pudo eliminar la imagen.")
                            }
                        });
                    }
                    //Eliminar Seminario
                    conn.query('DELETE FROM seminarios WHERE idseminario=?', [id], function (error, results) {
                        
                        
                        if (results.affectedRows > 0) {
                            res.status(200).send(true);
                        }else{
                            res.status(500).send("Error interno del servidor", error);
                        }
                    });
                } 
                conn.release();
            });
        }
        
    });
});


//================================================================================================
//==================================Termina Seminarios ===========================================
//================================================================================================







//================================================================================================
//===========================Inicia Proyectos de Investigación ===================================
//================================================================================================

app.get('/get/proyectosinvestigacion', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosinvestigacion ORDER BY fechaactualizacion DESC', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/proyectosinvestigacion/mas-lejano-primero', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosinvestigacion ORDER BY fechaactualizacion ASC', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });

});

app.get('/get/proyectosinvestigacion/filtrar', function (req, res) {
    const busqueda = req.query.busqueda;
    const responsable = req.query.responsable == "-1" ? "" : req.query.responsable;
    // const area = req.query.area == "0" ? "" : req.query.area;
    console.log("Recibi: Busqueda: " + busqueda + " Responsable: " + responsable);
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosinvestigacion WHERE (titulo LIKE ? OR objetivo LIKE ? OR responsable LIKE ?) AND responsable LIKE ?',
                ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%', '%' + responsable + '%'],
                function (error, results) {
                    if (error) {
                        console.log("error: " + error);
                        res.send("error");
                    } else {
                        res.send(results);
                    }
                });
        }
        conn.release();
    });
});

app.get('/get/proyectosinvestigacion/proyectoinvestigacion-item', function (req, res) {
    const id = req.query.id;
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosinvestigacion WHERE idproyecto=?', [id], function (error, results) {
                if (error) {
                    console.log("error: " + error)
                    res.status(500).send("Error interno del servidor");
                } else if (results.length === 0) {
                    res.status(404).send("No hay elementos")
                } else {
                    let fechainicio = new Date(results[0].fechainicio);
                    fechainicio = fechainicio.toJSON(fechainicio);
                    results[0].fechainicio = fechainicio.substr(0, 10);
                    let fechaactualizacion = new Date(results[0].fechaactualizacion);
                    fechaactualizacion = fechaactualizacion.toJSON(fechaactualizacion);
                    results[0].fechaactualizacion = fechaactualizacion.substr(0, 10);
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/proyectosinvestigacion/proyectoinvestigacion-edit', function (req, res) {
    const id = req.query.id;
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosinvestigacion WHERE idproyecto=?', [id], function (error, results) {
                if (error) {
                    console.log("error: " + error);
                    res.send("error");
                } else {
                    let fechainicio = new Date(results[0].fechainicio);
                    fechainicio = fechainicio.toJSON(fechainicio);
                    results[0].fechainicio = fechainicio.substr(0, 10);
                    let fechaactualizacion = new Date(results[0].fechaactualizacion);
                    fechaactualizacion = fechaactualizacion.toJSON(fechaactualizacion);
                    results[0].fechaactualizacion = fechaactualizacion.substr(0, 10);
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/proyectosinvestigacion/profesores', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT DISTINCT responsable FROM proyectosinvestigacion', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.post('/post/proyectosinvestigacion/', uploadProyectosInvestigacion.single("imagen"), (req, res) => {
    const titulo = req.body.titulo;
    const responsable = req.body.responsable;
    const enlace = req.body.enlace;
    const fechainicio = req.body.fechainicio;
    const fechaactualizacion = req.body.fechaactualizacion;
    const area = req.body.area;
    const objetivo = req.body.objetivo;
    const participantes = req.body.participantes;
    const userId = req.body.userId;
    console.log("Se solicita agregar un proyecto de investigacion.")
    const host = hostApi + "/proyectosinvestigacion/";
    const imagenRuta = req.file ? host + path.basename(req.file.path) : '';


    var sql = "INSERT INTO proyectosinvestigacion (titulo, objetivo, responsable, participantes, fechainicio, fechaactualizacion, area, imagen, enlace, idusuario) VALUES ?";
    var values = [
        [titulo, objetivo, responsable, participantes, fechainicio, fechaactualizacion, area, imagenRuta, enlace, userId],
    ];
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, [values], function (err, result) {
                if (err) {
                    console.log("Error al publicar proyecto de investigación: " + err);
                    res.send(false);
                } else {
                    console.log("Se agregó un proyecto de investigación: " + result.insertId);
                    res.send((result.insertId).toString());
                }

            });
        }
        conn.release();
    });


});

app.post('/post/proyectosinvestigacion/edit/image', uploadProyectosInvestigacion.single("imagen"), (req, res) => {
    const idproyecto = req.body.id;
    const titulo = req.body.titulo;
    const responsable = req.body.responsable;
    const enlace = req.body.enlace;
    const fechainicio = req.body.fechainicio;
    const fechaactualizacion = req.body.fechaactualizacion;
    const area = req.body.area;
    const objetivo = req.body.objetivo;
    const participantes = req.body.participantes;
    const userId = req.body.userId;

    console.log("Se solicita modificar con imagen.")
    const host = hostApi + "/proyectosinvestigacion/";
    const imagenRuta = host + path.basename(req.file.path);
    // const fbImagenRuta = './public/proyectosinvestigacion/' + path.basename(req.file.path);
    //Obtener nombre de imagen en base de datos para eliminarla.
    var sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM proyectosinvestigacion WHERE idproyecto= ?;"
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sqlImage, idproyecto, function (error, results) {
                if (error) {
                    console.log("Hubo un error.");
                } else {
                    if (fs.existsSync("./public/proyectosinvestigacion/" + results[0].imagen)) { //Si el archivo existe
                        fs.unlink("./public/proyectosinvestigacion/" + results[0].imagen, (err) => {
                            if (err) {
                                console.error("No se pudo eliminar la imagen.")
                            }
                        });
                    }
                }
            });
        }
        conn.release();
    });

    var sql = "UPDATE `proyectosinvestigacion` SET `titulo` = ?, `objetivo` = ?, `responsable`=?, `participantes`=?, `fechainicio`=?, `fechaactualizacion`=?, `area`=?, `enlace`=?, `idusuario` =?, `imagen` =?  WHERE `idproyecto`=?;";
    var values = [titulo, objetivo, responsable, participantes, fechainicio, fechaactualizacion, area, enlace, userId, imagenRuta, idproyecto];
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, values, function (err) {
                if (err) { //Error al editar
                    console.log(err)
                    res.send(false);
                } else { //Se editó correctamente
                    res.send(idproyecto + "");
                }
            });
        }
        conn.release();
    });
});

app.post('/post/proyectosinvestigacion/edit', (req, res) => {
    const idproyecto = req.body.id;
    const titulo = req.body.titulo;
    const responsable = req.body.responsable;
    const enlace = req.body.enlace;
    const fechainicio = req.body.fechainicio;
    const fechaactualizacion = req.body.fechaactualizacion;
    const area = req.body.area;
    const objetivo = req.body.objetivo;
    const participantes = req.body.participantes;
    const userId = req.body.userId;

    console.log("Se solicita modificar sin imagen.")

    var sql = "UPDATE `proyectosinvestigacion` SET `titulo` = ?, `objetivo` = ?, `responsable`=?, `participantes`=?, `fechainicio`=?, `fechaactualizacion`=?, `area`=?, `enlace`=?, `idusuario` =?  WHERE `idproyecto`=?;";
    var values = [titulo, objetivo, responsable, participantes, fechainicio, fechaactualizacion, area, enlace, userId, idproyecto];
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, values, function (err) {
                if (err) { //Error al editar
                    console.log(err)
                    res.send(false);
                } else { //Se editó correctamente
                    res.send(idproyecto + "");
                }
            });
        }
        conn.release();
    });


});

app.delete('/delete/proyectosinvestigacion/item', function (req, res) {
    const id = req.body.id;

    //Obtener nombre de imagen en base de datos para eliminarla.
    var sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM proyectosinvestigacion WHERE idproyecto= ?;"
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sqlImage, id, function (error, results) {
                if (error) {
                    console.log("Hubo un error.");
                } else {
                    if (fs.existsSync("./public/proyectosinvestigacion/" + results[0].imagen)) { //Si el archivo existe
                        fs.unlink("./public/proyectosinvestigacion/" + results[0].imagen, (err) => {
                            if (err) {
                                console.error("No se pudo eliminar la imagen.")
                            }
                        });
                    }
                    //Eliminar Proyecto de investigación
                    conn.query('DELETE FROM proyectosinvestigacion WHERE idproyecto=?', [id], function (error, results) {
                        

                        if(results.affectedRows > 0){
                            res.send(true);
                        }else{
                            res.status(500).send("Error interno del servidor", error);
                        }

                    });
                }
                conn.release();
            });
        }
    });

});

//=================================================================================================
//===========================Termina Proyectos de Investigación ===================================
//=================================================================================================

//================================================================================================
//===========================Inicia Publicaciones ===================================
//================================================================================================

app.get('/get/publicaciones', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM publicaciones ORDER BY anio DESC', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/publicaciones/mas-lejano-primero', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM publicaciones ORDER BY anio ASC', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/publicaciones/filtrar', function (req, res) {
    const busqueda = req.query.busqueda;
    const autor = req.query.autor == "-1" ? "" : req.query.autor;
    const area = req.query.area == "0" ? "" : req.query.area;
    const tipo = req.query.tipo == "0" ? "" : req.query.tipo;
    console.log("Recibi: Busqueda: " + busqueda + " Autor: " + autor + " Area: " + area + " Tipo: " + tipo);
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM publicaciones WHERE (titulo LIKE ? OR resumen LIKE ? OR autor LIKE ?) AND autor LIKE ? AND area LIKE ? AND tipo LIKE ?',
                ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%', '%' + autor + '%', '%' + area + '%', '%' + tipo + '%'],
                function (error, results) {
                    if (error) {
                        console.log("error: " + error);
                        res.send("error");
                    } else {
                        console.log(JSON.stringify(results))
                        res.send(results);
                    }
                });
        }
        conn.release();
    });
});

app.get('/get/publicaciones/publicacion-item', function (req, res) {
    const id = req.query.id;
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM publicaciones WHERE idpublicacion=?', [id], function (error, results) {
                if (error) {
                    console.log("error: " + error)
                    res.status(500).send("Error interno del servidor");
                } else if (results.length === 0) {
                    res.status(404).send("No hay elementos")
                } else {
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/publicaciones/publicacion-edit', function (req, res) {
    const id = req.query.id;
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM publicaciones WHERE idpublicacion=?', [id], function (error, results) {
                if (error) {
                    console.log("error: " + error);
                    res.send("error");
                } else {
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/publicaciones/autores', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT DISTINCT autor FROM publicaciones', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.post('/post/publicaciones/', uploadPublicaciones.single("imagen"), (req, res) => {
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const anio = req.body.anio;
    const area = req.body.area;
    const tipo = req.body.tipo;
    const resumen = req.body.resumen;
    const enlace = req.body.enlace;
    const userId = req.body.userId;

    console.log("Se solicita agregar una publicacion.")
    const host = hostApi + "/publicaciones/";
    const imagenRuta = req.file ? host + path.basename(req.file.path) : '';

    var sql = "INSERT INTO publicaciones (titulo, autor, anio, resumen, tipo, area, imagen, enlace, idusuario) VALUES ?";
    var values = [
        [titulo, autor, anio, resumen, tipo, area, imagenRuta, enlace, userId],
    ];
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, [values], function (err, result) {
                if (err) {
                    console.log("Error al publicar publicacion: " + err);
                    res.send(false);
                } else {
                    console.log("Se agregó una publicacion: " + result.insertId);
                    res.send((result.insertId).toString());
                }

            });
        }
        conn.release();
    });

});

app.post('/post/publicaciones/edit/image', uploadPublicaciones.single("imagen"), (req, res) => {
    const idpublicacion = req.body.id;
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const anio = req.body.anio;
    const area = req.body.area;
    const tipo = req.body.tipo;
    const resumen = req.body.resumen;
    const enlace = req.body.enlace;
    const userId = req.body.userId;

    console.log("Se solicita modificar con imagen.")
    const host = hostApi + "/publicaciones/";
    const imagenRuta = host + path.basename(req.file.path);
    //Obtener nombre de imagen en base de datos para eliminarla.
    var sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM publicaciones WHERE idpublicacion= ?;"
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sqlImage, idpublicacion, function (error, results) {
                if (error) {
                    console.log("Hubo un error.");
                } else {
                    if (fs.existsSync("./public/publicaciones/" + results[0].imagen)) { //Si el archivo existe
                        fs.unlink("./public/publicaciones/" + results[0].imagen, (err) => {
                            if (err) {
                                console.error("No se pudo eliminar la imagen.")
                            }
                        });
                    }
                }
            });
        }
        conn.release();
    });

    var sql = "UPDATE `publicaciones` SET `titulo` = ?, `autor` = ?, `anio`=?, `resumen`=?, `tipo`=?, `area`=?, `enlace`=?, `idusuario` =?, `imagen` =?  WHERE `idpublicacion`=?;";
    var values = [titulo, autor, anio, resumen, tipo, area, enlace, userId, imagenRuta, idpublicacion];
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, values, function (err) {
                if (err) { //Error al editar
                    console.log(err)
                    res.send(false);
                } else { //Se editó correctamente
                    res.send(idpublicacion + "");
                }
            });
        }
        conn.release();
    });
});

app.post('/post/publicaciones/edit', (req, res) => {
    const idpublicacion = req.body.id;
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const anio = req.body.anio;
    const area = req.body.area;
    const tipo = req.body.tipo;
    const resumen = req.body.resumen;
    const enlace = req.body.enlace;
    const userId = req.body.userId;

    console.log("Se solicita modificar sin imagen.")

    var sql = "UPDATE `publicaciones` SET `titulo` = ?, `autor` = ?, `anio`=?, `resumen`=?, `tipo`=?, `area`=?, `enlace`=?, `idusuario` =?  WHERE `idpublicacion`=?;";
    var values = [titulo, autor, anio, resumen, tipo, area, enlace, userId, idpublicacion];
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, values, function (err) {
                if (err) { //Error al editar
                    console.log(err)
                    res.send(false);
                } else { //Se editó correctamente
                    res.send(idpublicacion + "");
                }
            });
        }
        conn.release();
    });
});

app.delete('/delete/publicaciones/item', function (req, res) {
    const id = req.body.id;

    //Obtener nombre de imagen en base de datos para eliminarla.
    var sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM publicaciones WHERE idpublicacion= ?;";
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sqlImage, id, function (error, results) {
                if (error) {
                    console.log("Hubo un error.");
                } else {
                    if (fs.existsSync("./public/publicaciones/" + results[0].imagen)) { //Si el archivo existe
                        fs.unlink("./public/publicaciones/" + results[0].imagen, (err) => {
                            if (err) {
                                console.error("No se pudo eliminar la imagen.")
                            }
                        });
                    }
                    //Eliminar Publicacion
                    conn.query('DELETE FROM publicaciones WHERE idpublicacion=?', [id], function (error, results) {
                        
                        if(results.affectedRows > 0){
                            res.send(true);
                        }else{
                            res.status(500).send("Error interno del servidor", error);
                        }

                    });
                }
                conn.release();
            });
        }
    });
});

//=================================================================================================
//===========================Termina Publicaciones================================================
//=================================================================================================

//================================================================================================
//===========================Inicia Eventos===================================
//================================================================================================

app.get('/get/eventos', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM otroseventos ORDER BY fecha DESC', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/eventos/mas-lejano-primero', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM otroseventos ORDER BY fecha ASC', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/eventos/filtrar', function (req, res) {
    const busqueda = req.query.busqueda;
    const organizador = req.query.organizador == "-1" ? "" : req.query.organizador;
    const area = req.query.area == "0" ? "" : req.query.area;
    console.log("Recibi: Busqueda: " + busqueda + " Organizador: " + organizador + " Area: " + area);
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM otroseventos WHERE (titulo LIKE ? OR descripcion LIKE ? OR organizador LIKE ?) AND organizador LIKE ? AND area LIKE ?',
                ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%', '%' + organizador + '%', '%' + area + '%'],
                function (error, results) {
                    if (error) {
                        console.log("error: " + error);
                        res.send("error");
                    } else {
                        console.log(JSON.stringify(results))
                        res.send(results);
                    }
                });
        }
        conn.release();
    });
});

app.get('/get/eventos/evento-item', function (req, res) {
    const id = req.query.id;
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM otroseventos WHERE idevento=?', [id], function (error, results) {
                if (error) {
                    console.log("error: " + error)
                    res.status(500).send("Error interno del servidor");
                } else if (results.length === 0) {
                    res.status(404).send("No hay elementos")
                } else {
                    let fecha = new Date(results[0].fecha);
                    fecha = fecha.toJSON(fecha);
                    results[0].fecha = fecha.substr(0, 10);
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/eventos/evento-edit', function (req, res) {
    const id = req.query.id;
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM otroseventos WHERE idevento=?', [id], function (error, results) {
                if (error) {
                    console.log("error: " + error);
                    res.send("error");
                } else {
                    let fecha = new Date(results[0].fecha);
                    fecha = fecha.toJSON(fecha);
                    results[0].fecha = fecha.substr(0, 10);
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/eventos/organizadores', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT DISTINCT organizador FROM otroseventos', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.post('/post/eventos/', uploadEventos.single("imagen"), (req, res) => {
    const titulo = req.body.titulo;
    const organizador = req.body.organizador;
    const fecha = req.body.fecha;
    const area = req.body.area;
    const lugar = req.body.lugar;
    const descripcion = req.body.descripcion;
    const userId = req.body.userId;

    console.log("Se solicita agregar un evento.")
    const host = hostApi + "/eventos/";
    const imagenRuta = req.file ? host + path.basename(req.file.path) : '';

    var sql = "INSERT INTO otroseventos (titulo, organizador, lugar, fecha, area, descripcion, imagen, idusuario) VALUES ?";
    var values = [
        [titulo, organizador, lugar, fecha, area, descripcion, imagenRuta, userId],
    ];
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, [values], function (err, result) {
                if (err) {
                    console.log("Error al publicar evento: " + err);
                    res.send(false);
                } else {
                    console.log("Se agregó un evento: " + result.insertId);
                    res.send((result.insertId).toString());
                }

            });
        }
        conn.release();
    });


});

app.post('/post/eventos/edit/image', uploadEventos.single("imagen"), (req, res) => {
    const idevento = req.body.id;
    const titulo = req.body.titulo;
    const organizador = req.body.organizador;
    const fecha = req.body.fecha;
    const area = req.body.area;
    const lugar = req.body.lugar;
    const descripcion = req.body.descripcion;
    const userId = req.body.userId;

    console.log("Se solicita modificar con imagen.")
    const host = hostApi + "/eventos/";
    const imagenRuta = host + path.basename(req.file.path);
    //Obtener nombre de imagen en base de datos para eliminarla.
    var sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM otroseventos WHERE idevento= ?;";
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sqlImage, idevento, function (error, results) {
                if (error) {
                    console.log("Hubo un error.");
                } else {
                    if (fs.existsSync("./public/eventos/" + results[0].imagen)) { //Si el archivo existe
                        fs.unlink("./public/eventos/" + results[0].imagen, (err) => {
                            if (err) {
                                console.error("No se pudo eliminar la imagen.")
                            }
                        });
                    }
                }
            });
        }
        conn.release();
    });

    var sql = "UPDATE `otroseventos` SET `titulo` = ?, `organizador` = ?, `lugar`=?, `fecha`=?, `area`=?, `descripcion`=?, `imagen` =?, `idusuario` =? WHERE `idevento`=?;";
    var values = [titulo, organizador, lugar, fecha, area, descripcion, imagenRuta, userId, idevento];
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, values, function (err) {
                if (err) { //Error al editar
                    console.log(err)
                    res.send(false);
                } else { //Se editó correctamente
                    res.send(idevento + "");
                }
            });
        }
        conn.release();
    });
});

app.post('/post/eventos/edit', (req, res) => {
    const idevento = req.body.id;
    const titulo = req.body.titulo;
    const organizador = req.body.organizador;
    const fecha = req.body.fecha;
    const area = req.body.area;
    const lugar = req.body.lugar;
    const descripcion = req.body.descripcion;
    const userId = req.body.userId;

    console.log("Se solicita modificar sin imagen.")

    var sql = "UPDATE `otroseventos` SET `titulo` = ?, `organizador` = ?, `lugar`=?, `fecha`=?, `area`=?, `descripcion`=?, `idusuario` =?  WHERE `idevento`=?;";
    var values = [titulo, organizador, lugar, fecha, area, descripcion, userId, idevento];
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, values, function (err) {
                if (err) { //Error al editar
                    console.log(err)
                    res.send(false);
                } else { //Se editó correctamente
                    res.send(idevento + "");
                }
            });
        }
        conn.release();
    });
});

app.delete('/delete/eventos/item', function (req, res) {
    const id = req.body.id;
    // Obtener nombre de imagen en base de datos para eliminarla.
    var sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM otroseventos WHERE idevento= ?;";
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sqlImage, id, function (error, results) {
                if (error) {
                    console.log("Hubo un error.");
                } else {
                    if (fs.existsSync("./public/eventos/" + results[0].imagen)) { // Si el archivo existe
                        fs.unlink("./public/eventos/" + results[0].imagen, (err) => {
                            if (err) {
                                console.error("No se pudo eliminar la imagen.")
                            }
                        });
                    }

                    // Eliminar evento
                    conn.query('DELETE FROM otroseventos WHERE idevento=?', [id], function (error, results) {
                        
                        if(results.affectedRows > 0){
                            res.send(true);
                        }
                        else{
                            res.send("Error interno del servidor", error);
                        }
                        
                    });
                }
                conn.release();
            });
        }
    });

});

//================================================================================================
//===========================Termina Eventos===================================
//================================================================================================

//===============================================================================================
//==================================Inicia Proyectos Terminales ===========================================
//===============================================================================================

app.get('/get/proyectosterminales', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosterminales ORDER BY fechapublicacion DESC', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/proyectosterminales/mas-lejano-primero', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosterminales ORDER BY fechapublicacion ASC', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/proyectosterminales/mas-proximo', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosterminales ORDER BY fechapublicacion DESC LIMIT 1;', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });
});


app.get('/get/proyectosterminales/filtrar', function (req, res) {
    const busqueda = req.query.busqueda;
    const asesores = req.query.asesores == "-1" ? "" : req.query.asesores;
    const area = req.query.area == "0" ? "" : req.query.area;
    console.log("Recibi: Busqueda: " + busqueda + " Asesores: " + asesores + " Area: " + area);
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosterminales WHERE (titulo LIKE ? OR objetivo LIKE ? OR asesores LIKE ? OR tesina LIKE ?) AND asesores LIKE ? AND area LIKE ?',
                ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%', '%' + asesores + '%', '%' + area + '%'],
                function (error, results) {
                    if (error) {
                        console.log("error: " + error)
                        res.send("error");
                    } else {
                        console.log(JSON.stringify(results))
                        res.send(results);
                    }
                });
        }
        conn.release();
    });

});


//FIXME: ver lo de getYoutubeVideoId
app.get('/get/proyectosterminales/proyectoterminal-item', function (req, res) {
    const id = req.query.id;
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosterminales WHERE idproyecto=?', [id], function (error, results) {
                if (error) {
                    console.log("error: " + error)
                    res.status(500).send("Error interno del servidor");
                } else if (results.length === 0) {
                    res.status(404).send("No hay elementos")
                } else {
                    let fechapublicacion = new Date(results[0].fechapublicacion);
                    fechapublicacion = fechapublicacion.toJSON(fechapublicacion);
                    results[0].fechapublicacion = fechapublicacion.substr(0, 10);
                    let youtube = results[0].youtube;
                    results[0].youtube = getYoutubeVideoId(youtube);
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });

});

app.get('/get/proyectosterminales/proyectoterminal-edit', function (req, res) {
    const id = req.query.id;
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM proyectosterminales WHERE idproyecto=?', [id], function (error, results) {
                if (error) {
                    console.log("error: " + error);
                    res.send("error");
                } else {
                    let fechapublicacion = new Date(results[0].fechapublicacion);
                    fechapublicacion = fechapublicacion.toJSON(fechapublicacion);
                    results[0].fechapublicacion = fechapublicacion.substr(0, 10);
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });

});

app.get('/get/proyectosterminales/asesores', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT DISTINCT asesores FROM proyectosterminales', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});


app.post('/post/proyectosterminales/', uploadProyectosTerminales.single("imagen"), (req, res) => {
    const titulo = req.body.titulo;
    const asesores = req.body.asesores;
    const autores = req.body.autores;
    const youtube = req.body.youtube;
    const fechapublicacion = req.body.fechapublicacion;
    const area = req.body.area;
    const objetivo = req.body.objetivo;
    const tesina = req.body.tesina;
    const userId = req.body.userId;

    console.log("Se solicita agregar un proyecto terminal.")
    const host = hostApi + "/proyectosterminales/";
    const imagenRuta = req.file ? host + path.basename(req.file.path) : '';


    var sql = "INSERT INTO proyectosterminales (titulo, asesores, objetivo, autores, youtube, tesina, fechapublicacion, area, imagen, idusuario) VALUES ?";
    var values = [
        [titulo, asesores, objetivo, autores, youtube, tesina, fechapublicacion, area, imagenRuta, userId],
    ];

    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, [values], function (err, result) {
                if (err) {
                    console.log("Error al publicar proyecto terminal: " + err);
                    res.send(false);
                } else {
                    console.log("Se agregó un proyecto terminal: " + result.insertId);
                    res.send((result.insertId).toString());
                }

            });
        }
        conn.release();
    });

    //Publicar en facebook

});

app.post('/post/proyectosterminales/edit/image', uploadProyectosTerminales.single("imagen"), (req, res) => {
    const idproyecto = req.body.id;
    const titulo = req.body.titulo;
    const asesores = req.body.asesores;
    const autores = req.body.autores;
    const youtube = req.body.youtube;
    const fechapublicacion = req.body.fechapublicacion;
    const area = req.body.area;
    const objetivo = req.body.objetivo;
    const tesina = req.body.tesina;
    const userId = req.body.userId;

    console.log("Se solicita modificar con imagen.")
    const host = hostApi + "/proyectosterminales/";
    const imagenRuta = host + path.basename(req.file.path);
    //Obtener nombre de imagen en base de datos para eliminarla.
    var sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM proyectosterminales WHERE idproyecto= ?;"

    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sqlImage, idproyecto, function (error, results) {
                if (error) {
                    console.log("Hubo un error.");
                } else {
                    if (fs.existsSync("./public/proyectosterminales/" + results[0].imagen)) { //Si el archivo existe
                        fs.unlink("./public/proyectosterminales/" + results[0].imagen, (err) => {
                            if (err) {
                                console.error("No se pudo eliminar la imagen.")
                            }
                        });
                    }
                }
            });
        }
        conn.release();
    });


    var sql = "UPDATE `proyectosterminales` SET `titulo` = ?, `asesores` = ?, `objetivo`=?, `autores`=?, `youtube`=?, `tesina`=?, `fechapublicacion`=?, `area` =?, `imagen` =?, `idusuario` =?  WHERE `idproyecto`=?;";
    var values = [titulo, asesores, objetivo, autores, youtube, tesina, fechapublicacion, area, imagenRuta, userId, idproyecto];

    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, values, function (err) {
                if (err) { //Error al editar
                    console.log(err)
                    res.send(false);
                } else { //Se editó correctamente
                    res.send(idproyecto + "");
                }
            });
        }
        conn.release();
    });



});

app.post('/post/proyectosterminales/edit', (req, res) => {
    const idproyecto = req.body.id;
    const titulo = req.body.titulo;
    const asesores = req.body.asesores;
    const autores = req.body.autores;
    const youtube = req.body.youtube;
    const fechapublicacion = req.body.fechapublicacion;
    const area = req.body.area;
    const objetivo = req.body.objetivo;
    const tesina = req.body.tesina;
    const userId = req.body.userId;

    console.log("Se solicita modificar sin imagen.")

    var sql = "UPDATE `proyectosterminales` SET `titulo` = ?, `asesores` = ?, `objetivo`=?, `autores`=?, `youtube`=?, `tesina`=?, `fechapublicacion`=?, `area` =?, `idusuario` =?  WHERE `idproyecto`=?;";
    var values = [titulo, asesores, objetivo, autores, youtube, tesina, fechapublicacion, area, userId, idproyecto];

    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sql, values, function (err) {
                if (err) { //Error al editar
                    res.send(false);
                } else { //Se editó correctamente
                    res.send(idproyecto + "");
                }
            });
        }
        conn.release();
    });
});

app.delete('/delete/proyectosterminales/item', function (req, res) {
    const id = req.body.id;

    //Obtener nombre de imagen en base de datos para eliminarla.
    var sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM proyectosterminales WHERE idproyecto= ?;"

    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query(sqlImage, id, function (error, results) {
                if (error) {
                    console.log("Hubo un error.");
                } else {
                    if (fs.existsSync("./public/proyectosterminales/" + results[0].imagen)) { //Si el archivo existe
                        fs.unlink("./public/proyectosterminales/" + results[0].imagen, (err) => {
                            if (err) {
                                console.error("No se pudo eliminar la imagen.")
                            }
                        });
                    }
                    //Eliminar Proyecto terminal
                    conn.query('DELETE FROM proyectosterminales WHERE idproyecto=?', [id], function (error, results) {
                        
                        if(results.affectedRows > 0){
                            res.status(200).send("Proyecto terminal eliminado");
                        }
                        else{
                            res.status(200).send("Proyecto terminal no eliminado", error);
                        }
                        

                    });
                }
                conn.release();
            });
        }
    });

});

//================================================================================================
//==================================Termina Proyectos Terminales ===========================================
//================================================================================================

//===============================================================================================
//==================================Inicia Lineamientos y Proc ===========================================
//===============================================================================================

app.get('/get/lineamientosproc', function (_req, res) {
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM procedimientos', function (error, results) {
                if (error) {
                    res.send("error");
                } else {
                    res.send(results);
                }
            });
        }
        conn.release();
    });
});

app.get('/get/lineamientosproc/lineamientoproc-item', function (req, res) {
    const id = req.query.id;
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.send("error");
        } else {
            conn.query('SELECT * FROM procedimientos WHERE idprocedimiento=?', [id], function (error, results) {
                if (error) {
                    console.log("error: " + error)
                    res.status(500).send("Error interno del servidor");
                } else if (results.length === 0) {
                    res.status(404).send("No hay elementos")
                } else {
                    res.send(results[0]);
                }
            });
        }
        conn.release();
    });
});

// app.get('/get/lineamientosproc/lineamientoproc-edit', function(req, res){
//     const id = req.query.id;
//     db.getConnection((err,conn)=>{
//         if(err){
//             res.send("error");
//         }else{
//             conn.query('SELECT * FROM procedimientos WHERE idprocedimiento=?',[id], function(error, results){
//                 if ( error ){
//                     console.log("error: "+error);
//                     res.send("error");
//                 } else {
//                     res.send(results[0]);
//                 }
//             });
//         }
//         conn.release();
//     });
// });

app.post('/post/lineamientosproc/', uploadLineamientosProc, (req, res) => {
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const userId = req.body.userId;

    console.log("Se solicita agregar un lineamiento y proc.")
    const host = hostApi + "/lineamientosproc/";

    const imagenRuta = req.files['imagen'] ? host + 'imagenes/' + path.basename(req.files['imagen'][0].path) : null;
    const pdfRuta = req.files['documento'] ? host + 'documentos/' + path.basename(req.files['documento'][0].path) : null;


    var sql = "INSERT INTO procedimientos (titulo, descripcion, imagen, documento, idusuario) VALUES ?";
    var values = [
        [titulo, descripcion, imagenRuta, pdfRuta, userId],
    ];

    poolDB.getConnection((err, conn) => {
        if (err) {
            console.error("Error al conectar a la base de datos:", err);
            res.send("error");
            return;
        }
        else {
            conn.query(sql, [values], function (err, result) {
                if (err) {
                    console.log("Error al publicar lineamiento y proc: " + err);
                    res.send(false);
                } else {
                    console.log("Se agregó un lineamiento y proc: " + result.insertId);
                    res.send((result.insertId).toString());
                }
                conn.release();
            });
        }
    });

});

app.post('/update/lineamientosproc/', uploadLineamientosProc, function (req, res) {
    const id = req.body.id;

    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const userId = req.body.userId;

    const host = hostApi + "/lineamientosproc/";

    const imagenRuta = req.files['imagen'] ? host + 'imagenes/' + path.basename(req.files['imagen'][0].path) : null;
    const pdfRuta = req.files['documento'] ? host + 'documentos/' + path.basename(req.files['documento'][0].path) : null;
    console.log('Se ha solicitado actualizar')
    //Obtener nombre de imagen y documento en base de datos para eliminarla.
    const sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM procedimientos WHERE idprocedimiento= ?;"
    const sqlDocument = "SELECT SUBSTRING_INDEX(documento, '/', -1) AS documento FROM procedimientos WHERE idprocedimiento= ?;"

    // Obtener el elemento existente de la base de datos
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.status(500).send("Error interno del servidor");
            return;
        }
        conn.query('SELECT * FROM procedimientos WHERE idprocedimiento = ?', [id], function (err, results) {
            if (err) {
                console.error("Error al obtener el elemento de la base de datos:", err);
                res.status(500).send("Error interno del servidor");
                res.send("error");
                return;
            } else if (results.length === 0) {
                res.status(404).send("No hay elementos")
                return
            } else {
                const elementoExistente = results[0];
                // Comparar y actualizar valores
                const nuevaImagen = imagenRuta || elementoExistente.imagen;
                const nuevoPdf = pdfRuta || elementoExistente.documento;

                // Consultar la ruta de la imagen y el documento actual
                conn.query(sqlImage, id, function (err, results) {
                    if (err) {
                        console.error("Error al obtener la imagen de la base de datos:", err);
                    } else {
                        const imagenAnterior = results[0].imagen;

                        //Consultar la ruta de documento actual
                        conn.query(sqlDocument, id, function (err, results) {
                            if (err) {
                                console.error("Error al obtener el documento de la base de datos:", err);
                            } else {
                                const documentoAnterior = results[0].documento;
                                //Actualizar la base de datos
                                conn.query('UPDATE procedimientos SET titulo=?, descripcion=?, imagen=?, documento=?, idusuario=? WHERE idprocedimiento=?',
                                    [titulo, descripcion, nuevaImagen, nuevoPdf, userId, id], (err, result) => {
                                        if (err) {
                                            console.log("Error al actualizar el elemento: " + err);
                                            res.send(false);
                                        } else {
                                            console.log("Elemento actualizado: " + id);
                                            if (imagenRuta && imagenAnterior && imagenRuta !== imagenAnterior) {
                                                if (fs.existsSync("./public/lineamientosproc/imagenes/" + imagenAnterior)) {
                                                    fs.unlink("./public/lineamientosproc/imagenes/" + imagenAnterior, (err) => {
                                                        if (err) {
                                                            console.error("No se pudo eliminar la imagen.")
                                                        }
                                                        else{
                                                            console.log("Se elimino la imagen")
                                                            result = results[0].imagen;
                                                            console.log(result)
                                                        }
                                                    });
                                                }
                                            }
                                            if (pdfRuta && documentoAnterior && pdfRuta !== documentoAnterior) {
                                                if (fs.existsSync("./public/lineamientosproc/documentos/" + documentoAnterior)) {
                                                    fs.unlink("./public/lineamientosproc/documentos/" + documentoAnterior, (err) => {
                                                        if (err) {
                                                            console.error("No se pudo eliminar el documento.")
                                                        }
                                                        else{
                                                            console.log("Se elimino el documento")
                                                            result = results[0].documento;
                                                            console.log(result)
                                                        }
                                                    });
                                                }
                                            }

                                            res.send(id + "");
                                        }
                                        conn.release();
                                    });
                            }
                        });
                    }
                });
            }
        });
    });
});

app.delete('/delete/lineamientosproc/item', function (req, res) {
    const id = req.body.id;
    const sqlImage = "SELECT SUBSTRING_INDEX(imagen, '/', -1) AS imagen FROM procedimientos WHERE idprocedimiento= ?;"
    const sqlDocument = "SELECT SUBSTRING_INDEX(documento, '/', -1) AS documento FROM procedimientos WHERE idprocedimiento= ?;"
    console.log('Se ha solicitad eliminar')
    poolDB.getConnection((err, conn) => {
        if (err) {
            res.status(500).send("Error interno del servidor");
            return;
        } else {
            conn.query(sqlImage, id, function (err, results) {
                if (err) {
                    console.error("Error al obtener la imagen de la base de datos:", err);
                } else {
                    const imagenAEliminar = results[0].imagen;

                    //Consultar la ruta de documento actual
                    conn.query(sqlDocument, id, function (err, results) {
                        if (err) {
                            console.error("Error al obtener el documento de la base de datos:", err);
                        } else {
                            const documentoAEliminar = results[0].documento;
                            if (fs.existsSync("./public/lineamientosproc/imagenes/" + imagenAEliminar)) {
                                fs.unlink("./public/lineamientosproc/imagenes/" + imagenAEliminar, (err) => {
                                    if (err) {
                                        console.error("No se pudo eliminar la imagen.")
                                    }
                                });
                            }
                            if (fs.existsSync("./public/lineamientosproc/documentos/" + documentoAEliminar)) {
                                fs.unlink("./public/lineamientosproc/documentos/" + documentoAEliminar, (err) => {
                                    if (err) {
                                        console.error("No se pudo eliminar el documento.")
                                    }
                                });
                            }
                            //Eliminar Documento
                            conn.query('DELETE FROM procedimientos WHERE idprocedimiento=?', [id], function (error, results) {

                                if (results.affectedRows > 0) {    
                                    res.status(200).send("Procedimiento eliminado");
                                } else {
                                    res.status(500).send("Procedimiento no eliminado", error);
                                }
                            });
                        }
                        conn.release();
                    })
                }
            })
        }
    })
})

