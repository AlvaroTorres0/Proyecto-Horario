const { Router } = require('express');
const router = Router();
const { datosAlumno } = require('../controllers/index.controllers');
const { datosDocente } = require('../controllers/index.controllers');
const { horarioAlumno } = require('../controllers/index.controllers');
const { horarioDocente } = require('../controllers/index.controllers');


router.get('/datos/alumno/:id',datosAlumno);
router.get('/buscar/alumno/:id',horarioAlumno);

router.get('/datos/docente/:id',datosDocente);
router.get('/buscar/docente/:id',horarioDocente);

module.exports = router;