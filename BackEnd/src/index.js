const express = require('express');
//cors poder hacer actualizaciones desde cualquier red o dispositivo
const cors = require('cors');
const app = express();

// middlewares
app.use(express.json()); //el servidor lo entiende y lo convierte a un objeto de js
app.use(express.urlencoded({extended: false})); //extended es para aceptar solo datos simples, no imágenes, videos, etc


//routes
app.use(require('./routes/index'));
app.use(cors());

app.listen(3000);
console.log("Servidor corriendo");