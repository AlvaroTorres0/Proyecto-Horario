const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "sisekersuren",
    database: "itc",
    port:"5432"
});


//Datos del docente
const datosDocente = async (req,res)=>{
    let idDocente = req.params.id;
    const respDatosDocente = await  pool.query('SELECT nombredocente,apepatdocente,apematdocente FROM docente WHERE iddocente = $1',[idDocente]);
    res.status(200).json({
        ok:true,
        respDatosDocente
    });
}

//Horario del docente
const horarioDocente = async (req,res)=> {
    let idDocente = req.params.id;
    const respHorarioDocente = await pool.query('SELECT idedificiohorario,numeroaulahorario,horainicio,horafin,clavemateriahorario FROM horariogrupo WHERE iddocentehorario = $1',[idDocente]);

    res.status(200).json({
        ok:true,
        respHorarioDocente
    });
}

//Datos del alumno
const datosAlumno = async (req,res)=>{
    let numControl = req.params.id;
    const respDatosAlumno = await  pool.query("SELECT nombrealumno,apepatalumno,apematalumno FROM alumno WHERE nocontrol = $1",[numControl]);
    res.status(200).json({
        ok:true,
        respDatosAlumno
    });
}

//Horario del alumno
const horarioAlumno = async (req,res)=> {
    let numControl =  req.params.id;
    const respHorarioAlumno = await pool.query('SELECT idedificiohorario,numeroaulahorario,horainicio,horafin,clavemateriahorario FROM horariogrupo WHERE nocontrolhorario = $1',[numControl]);
    res.status(200).json({
        ok:true,
        respHorarioAlumno
    });
}

module.exports = {
    datosAlumno,
    datosDocente,
    horarioDocente,
    horarioAlumno
}