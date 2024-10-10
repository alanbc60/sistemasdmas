import mysql from 'mysql2/promise';


// Configuración de la conexión
const connection = await mysql.createConnection({
  host: '148.206.168.33', // Reemplaza con tu dirección del hosting
  user: 'root', // Tu nombre de usuario de la base de datos
  password: 'X22muy2Dqw,q', // Tu contraseña de la base de datos
  database: 'dmas_r' // Nombre de tu base de datos
});

console.log('Conexión establecida exitosamente');

// Función para cerrar la conexión cuando sea necesario
async function closeConnection() {
  try {
    await connection.end();
    console.log('Conexión cerrada');
  } catch (error) {
    console.error('Error al cerrar la conexión:', error);
  }
}

// Ejemplo de uso: Realiza una consulta SQL
async function exampleQuery() {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM usuarios LIMIT 5'
    );
    console.log(rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
  }
}

// Ejecuta la función de ejemplo
exampleQuery();

closeConnection();
// // Espera a que se presione Ctrl+C para cerrar la conexión
// process.on('SIGINT', async () => {
//   await closeConnection();
//   process.exit(0);
// });