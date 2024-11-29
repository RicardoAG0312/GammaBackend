//Constantes
const cors = require("cors");
const express = require("express");
const appExpress = express();
const mysql = require("mysql2");

const PORT = 3000;
appExpress.use(cors());
appExpress.use(express.json());

const config = {
    user: "root",
    password: "123456789",
    host: "localhost",
    database: "sistemaescolar"
}

//Configuracion para la conexion a la base de datos 
const conexionBD = mysql.createConnection(config);

//Mensaje para verificar la conexion a la base de datos
conexionBD.connect((error) => {
    if (error) {
        console.log("¡CONEXION FALLIDA A LA BASE DE DATOS!");
        throw error
    } else {
        console.log("¡CONEXION EXITOSA A LA BASE DE DATOS!");
    }
})

//Tabla Alumno
//Creacion de la api para agregar alumnos a la tabla de alumnos
appExpress.post("/addAlumno", (req, res) => {
    const {DNI, Nombre, Apellido, FechaNacimiento, Genero, TelefonoApoderado} = req.body;
    const SQL_INSERTARALUMNO = 'INSERT INTO Alumno (DNI, Nombre, Apellido, FechaNacimiento, Genero, TelefonoApoderado) VALUES (?, ?, ?, ?, ?, ?)';
    conexionBD.query(SQL_INSERTARALUMNO, [DNI, Nombre, Apellido, FechaNacimiento, Genero, TelefonoApoderado], (error, resultados) => {
        if (error) {
            res.send(error);
        } else {
            res.send("Alumno registrado con éxito");
        }
    });
});

//Creacion de la api para eliminar un alumno en base a su DNI
appExpress.delete("/deleteAlumno/:dni", (req, res) => {
    const dni = req.params.dni;
    const SQL_ELIMINARALUMNO = "DELETE FROM Alumno WHERE DNI = ?";
    conexionBD.query(SQL_ELIMINARALUMNO, dni, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send("Alumno eliminado con éxito");
        }
    });
});

//Creacion de la api de la base de datos para traer a todos los alumnos
appExpress.get("/alumno", (req, res) => {
    const SQL_MOSTRARDATOS = "SELECT * FROM Alumno";
    conexionBD.query(SQL_MOSTRARDATOS, (error, data) => {
        if (error) throw error;
        res.json(data);
    });
});

//Creacion de la api para actualizar los datos de un alumno por el DNI
appExpress.put("/updateAlumno", (req, res) => {
    const {Nombre, Apellido, FechaNacimiento, Genero, TelefonoApoderado, DNI} = req.body;
    const SQL_ACTUALIZARALUMNO = "UPDATE Alumno SET Nombre = ?, Apellido = ?, FechaNacimiento = ?, Genero = ?, TelefonoApoderado = ? WHERE DNI = ?";
    conexionBD.query(SQL_ACTUALIZARALUMNO, [Nombre, Apellido, FechaNacimiento, Genero, TelefonoApoderado, DNI], (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send("Alumno actualizado con exito");
        }
    });
});



//Tabla Curso
//Creacion de la api para mostrar todos los datos de la tabla Curso
appExpress.get("/cursos", (req, res) => {
    const SQL_MOSTRARDATOS = "SELECT * FROM Curso";
    conexionBD.query(SQL_MOSTRARDATOS, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});
//Creacion de la api para agregar cursos a la tabla de cursos
appExpress.post("/addCurso", (req, res) => {
    const {Codigo, Nombre, Nivel, Grado} = req.body;
    const SQL_INSERTARALUMNO = 'INSERT INTO Curso (Codigo, Nombre, Nivel, Grado) VALUES (?, ?, ?, ?)';
    conexionBD.query(SQL_INSERTARALUMNO, [Codigo, Nombre, Nivel, Grado], (error, resultados) => {
        if (error) {
            res.send(error);
        } else {
            res.send("Curso registrado con éxito");
        }
    });
});
//Creacion de la api para eliminar un cursi en base a su codigo
appExpress.delete("/deleteCurso/:codigo", (req, res) => {
    const codigo = req.params.codigo;
    const SQL_ELIMINARALUMNO = "DELETE FROM Curso WHERE Codigo = ?";
    conexionBD.query(SQL_ELIMINARALUMNO, codigo, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send("Curso eliminado con éxito");
        }
    });
});
//Creacion de la api para actualizar los datos de un curso por el codigo
appExpress.put("/updateCurso", (req, res) => {
    const {Nombre, Nivel, Grado, Codigo} = req.body;
    const SQL_ACTUALIZARALUMNO = "UPDATE Curso SET Nombre = ?, Nivel = ?, Grado = ? WHERE Codigo = ?";
    conexionBD.query(SQL_ACTUALIZARALUMNO, [Nombre, Nivel, Grado, Codigo], (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send("Curso actualizado con exito");
        }
    });
});


//Tabla Usuario
//Api para mostrar todos los profesores o usuarios
appExpress.get("/usuarioData", (req, res) => {
    const SQL_MOSTRARDATOS = "SELECT * FROM Usuario;";
    conexionBD.query(SQL_MOSTRARDATOS, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send(data);
        }
    });
});
//Api para agregar nuevos profesores
//Creacion de la api para agregar asuarios a la tabla de alumnos
appExpress.post("/addProfesor", (req, res) => {
    const { DNI, Nombre, Apellido, Telefono, Estado, Rol, Clave } = req.body;
    const SQL_INSERTARDATOS = 'INSERT INTO Usuario (DNI, Nombre, Apellido, Telefono, Estado, Rol, Clave) VALUES (?, ?, ?, ?, ?, ?, ?)';
    conexionBD.query(SQL_INSERTARDATOS, [DNI, Nombre, Apellido, Telefono, Estado, Rol, Clave], (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send(data);
        }
    });
});
//Creacion de la api para eliminar un usuario en base a su id
appExpress.delete("/deleteProfesor/:id", (req, res) => {
    const id = req.params.id;
    const SQL_ELIMINARALUMNO = "DELETE FROM Usuario WHERE DNI = ?";
    conexionBD.query(SQL_ELIMINARALUMNO, id, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send("Usuario eliminado con éxito");
        }
    });
});

//Creacion de la api para actualizar los datos de un usuario por el DNI
appExpress.put("/updateUsuario", (req, res) => {
    const {Nombre, Apellido, Telefono, Estado, Rol, Clave, DNI} = req.body;
    const SQL_ACTUALIZARALUMNO = "UPDATE Usuario SET Nombre = ?, Apellido = ?, Telefono = ?, Estado = ?, Rol = ?, Clave = ? WHERE DNI = ?";
    conexionBD.query(SQL_ACTUALIZARALUMNO, [Nombre, Apellido, Telefono, Estado, Rol, Clave, DNI], (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send("Usuario actualizado con exito");
        }
    });
});

//Tabla Asistencia
//Creacion de la api para mostrar la asistencia
appExpress.get("/asistencia", (req, res) => {
    const SQL_MOSTRARDATOS = "SELECT Asistencia.IDAsistencia, Asistencia.DNI, Asistencia.Codigo, Curso.Nombre, Asistencia.Fecha, Asistencia.Asistencia FROM Asistencia JOIN Curso ON Asistencia.Codigo = Curso.Codigo;";
    conexionBD.query(SQL_MOSTRARDATOS, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.json(data);
        }
    });
});
//Creacion de la api para agregar una asistencia
appExpress.post("/addAsistencia", (req, res) => {
    const { Calificacion, Codigo, IDSeccion, DNI } = req.body;
    const SQL_INSERTARDATOS = 'INSERT INTO Asistencia (Calificacion, Codigo, IDSeccion, DNI) VALUES (?, ?, ?, ?)';
    conexionBD.query(SQL_INSERTARDATOS, [Calificacion, Codigo, IDSeccion, DNI], (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send(data);
        }
    });
});

//Tabla Notas
//Creacion de la api para agregar notas
appExpress.post("/addNotas", (req, res) => {
    const { Calificacion, Codigo, IDSeccion, DNI } = req.body;
    const SQL_INSERTARDATOS = 'INSERT INTO Notas (Calificacion, Codigo, IDSeccion, DNI) VALUES (?, ?, ?, ?)';
    conexionBD.query(SQL_INSERTARDATOS, [Calificacion, Codigo, IDSeccion, DNI], (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send(data);
        }
    });
});
//Api para mostrar todos las notas 
appExpress.get("/notas", (req, res) => {
    const SQL_MOSTRARDATOS = "SELECT N.*, C.Nombre AS NombreCurso,A.Nombre AS NombreAlumno, A.Apellido AS ApellidoAlumno FROM Notas N JOIN Curso C ON N.Codigo = C.Codigo JOIN Alumno A ON N.DNI = A.DNI";
    conexionBD.query(SQL_MOSTRARDATOS, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send(data);
        }
    });
});
//Creacion de la api para actualizar los datos de un usuario por el DNI
appExpress.put("/updateNotas", (req, res) => {
    const {Calificacion, IDNota} = req.body;
    const SQL_ACTUALIZARALUMNO = "UPDATE Notas SET Calificacion = ? WHERE IDNota = ?";
    conexionBD.query(SQL_ACTUALIZARALUMNO, [Calificacion, IDNota], (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send("Nota actualizada con exito");
        }
    });
});


//Tabla profesor
appExpress.get("/profesor", (req, res) => {
    const SQL_MOSTRARDATOS = "SELECT p.*, c.Nombre AS NombreCurso FROM Profesor p INNER JOIN Curso c ON p.Codigo = c.Codigo";
    conexionBD.query(SQL_MOSTRARDATOS, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});
//Creacion de la api para actualizar los datos de un alumno por el DNI
appExpress.put("/updateProfesor", (req, res) => {
    const {Nombre, Apellido, Rol, Clave, Codigo, DNI} = req.body;
    const SQL_ACTUALIZARALUMNO = "UPDATE Profesor SET Nombre = ?, Apellido = ?, Rol = ?, Clave = ?, Codigo = ? WHERE DNI = ?";
    conexionBD.query(SQL_ACTUALIZARALUMNO, [Nombre, Apellido, Rol, Clave, Codigo, DNI], (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send("Profesor actualizado con exito");
        }
    });
});
//Creacion de la api para eliminar un alumno en base a su DNI
appExpress.delete("/deleteMaestro/:dni", (req, res) => {
    const dni = req.params.dni;
    const SQL_ELIMINARALUMNO = "DELETE FROM Profesor WHERE DNI = ?";
    conexionBD.query(SQL_ELIMINARALUMNO, dni, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send("Profesor eliminado con éxito");
        }
    });
});
//Creacion de la api para agregar alumnos a la tabla de alumnos
appExpress.post("/addMaestro", (req, res) => {
    const {DNI, Nombre, Apellido, Rol, Clave, Codigo} = req.body;
    const SQL_INSERTARALUMNO = 'INSERT INTO Profesor (DNI, Nombre, Apellido, Rol, Clave, Codigo) VALUES (?, ?, ?, ?, ?, ?)';
    conexionBD.query(SQL_INSERTARALUMNO, [DNI, Nombre, Apellido, Rol, Clave, Codigo], (error, resultados) => {
        if (error) {
            res.send(error);
        } else {
            res.send("Profesor registrado con éxito");
        }
    });
});


//Creacion de la api de la base de datos para filtrar los datos de Alumno por el DNI
appExpress.get('/buscarPorDNI/:dni', (req, res) => {
    const dni = req.params.dni;
    const SQL_MOSTRARDATOS = " SELECT a.DNI, a.Nombre, a.Apellido, a.FechaNacimiento, a.Genero, a.TelefonoApoderado, GROUP_CONCAT(n.Calificacion) AS Calificaciones, GROUP_CONCAT(c.Nombre) AS NombresCursos FROM Alumno a LEFT JOIN Notas n ON a.DNI = n.DNI  LEFT JOIN Curso c ON n.Codigo = c.Codigo WHERE a.DNI = ? GROUP BY a.DNI";
    conexionBD.query(SQL_MOSTRARDATOS, [dni], (error, data) => {
        if (error) throw error;
        res.json(data);
    });
});

//Creacion de la api para traer el rol y usuario de la tabla usuario
appExpress.get("/usuario", (req, res) => {
    const SQL_MOSTRARDATOS = "SELECT Rol, Clave FROM Usuario";
    conexionBD.query(SQL_MOSTRARDATOS, (error, data) => {
        if (error) throw error;
        res.json(data);
    });
});
//Creacion de la api para traer el rol y usuario de la tabla usuario
appExpress.get("/logprof", (req, res) => {
    const SQL_MOSTRARDATOS = "SELECT Rol, Clave FROM Profesor";
    conexionBD.query(SQL_MOSTRARDATOS, (error, data) => {
        if (error) throw error;
        res.json(data);
    });
});


//Mensaje de escucha efectiva
appExpress.listen(PORT, () => {
    console.log(`SERVIDOR ESCUCHANDO PERFECTAMENTE EN LOCALHOST:${PORT}`);
});