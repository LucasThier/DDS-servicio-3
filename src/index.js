const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'servicio'
});

// Conectar a db
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a MySQL');
});


app.get('/localidades', (req, res) => {
    const query = `
    SELECT localidad, COUNT(id) AS total_personas, GROUP_CONCAT(nombre SEPARATOR ',') AS nombres
    FROM personas
    WHERE viandas_solicitadas > 0
    GROUP BY localidad;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            res.status(500).json({ error: 'Error al ejecutar la consulta' });
            return;
        }

        console.log('Resultados:', results);

        //Dar formato a los datos
        const formattedResults = results.map(row => ({
            Nombre_Localidad: row.localidad,
            Cant_Personas: row.total_personas,
            Nombres: row.nombres.split(',')
        }));

        res.json(formattedResults);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}, API disponible en http://localhost:${port}/localidades`);
});