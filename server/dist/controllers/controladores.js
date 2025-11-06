"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerActividad = exports.obtenerTareasDetalladas = exports.obtenerCargaTrabajoUsuarios = exports.obtenerEstadisticasProyectos = exports.eliminarComentarioTarea = exports.crearComentarioTarea = exports.obtenerComentariosTarea = exports.crearEtiqueta = exports.obtenerEtiquetas = exports.eliminarTarea = exports.actualizarEstadoTarea = exports.actualizarTarea = exports.crearTarea = exports.obtenerTareaPorId = exports.obtenerTareas = exports.eliminarMiembroProyecto = exports.agregarMiembroProyecto = exports.eliminarProyecto = exports.actualizarProyecto = exports.obtenerProyecto = exports.crearProyecto = exports.obtenerProyectos = exports.eliminarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuario = exports.obtenerUsuarios = exports.obtenerResumenOrganizacion = exports.obtenerOrganizacionPorId = exports.obtenerOrganizaciones = exports.login = exports.registrarOrganizacion = void 0;
const Organizacion_1 = require("../clases/Organizacion");
const Usuario_1 = require("../clases/Usuario");
const Proyecto_1 = require("../clases/Proyecto");
const Tarea_1 = require("../clases/Tarea");
const Etiqueta_1 = require("../clases/Etiqueta");
const ComentarioTarea_1 = require("../clases/ComentarioTarea");
const Actividad_1 = require("../clases/Actividad");
const Auth_1 = require("../clases/Auth");
// Instancias de las clases
const organizacionController = new Organizacion_1.OrganizacionClass();
const usuarioController = new Usuario_1.UsuarioClass();
const proyectoController = new Proyecto_1.ProyectoClass();
const tareaController = new Tarea_1.TareaClass();
const etiquetaController = new Etiqueta_1.EtiquetaClass();
const comentarioController = new ComentarioTarea_1.ComentarioTareaClass();
const actividadController = new Actividad_1.ActividadClass();
const authController = new Auth_1.AuthClass();
// LOGIN Y REGISTRO
const registrarOrganizacion = async (req, res) => {
    try {
        const organizacion = await organizacionController.registrar(req.body);
        const usuario = await authController.registrarOrganizacion({
            organizacion: organizacion.organizacion,
            usuario: req.body.usuario,
        });
        res.json({
            msg: 'Organización y usuario administrador registrados exitosamente',
            datos: { organizacion, usuario },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al registrar la organización',
        });
    }
};
exports.registrarOrganizacion = registrarOrganizacion;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const resultado = await authController.login(email, password);
        res.json(resultado);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
exports.login = login;
// ORGANIZACIONES
const obtenerOrganizaciones = async (req, res) => {
    try {
        const organizaciones = await organizacionController.obtenerTodas();
        res.json(organizaciones);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.obtenerOrganizaciones = obtenerOrganizaciones;
const obtenerOrganizacionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID de la organización',
            });
        }
        const organizacion = await organizacionController.obtenerPorId(parseInt(id));
        if (!organizacion) {
            return res.status(404).json({
                msg: 'Organización no encontrada',
            });
        }
        res.json({
            msg: 'Organización obtenida exitosamente',
            datos: organizacion,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al obtener la organización',
        });
    }
};
exports.obtenerOrganizacionPorId = obtenerOrganizacionPorId;
const obtenerResumenOrganizacion = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID de la organización',
            });
        }
        const resumen = await organizacionController.obtenerResumen(parseInt(id));
        res.json({
            msg: 'Resumen de organización obtenido exitosamente',
            datos: resumen,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al obtener el resumen de la organización',
        });
    }
};
exports.obtenerResumenOrganizacion = obtenerResumenOrganizacion;
// USUARIOS
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioController.obtenerTodos();
        res.json(usuarios);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID del usuario',
            });
        }
        const usuario = await usuarioController.obtenerPorId(parseInt(id));
        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado',
            });
        }
        res.json({
            msg: 'Usuario obtenido exitosamente',
            datos: usuario,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al obtener el usuario',
        });
    }
};
exports.obtenerUsuario = obtenerUsuario;
const crearUsuario = async (req, res) => {
    try {
        const resultado = await usuarioController.crear(req.body);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.crearUsuario = crearUsuario;
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID del usuario',
            });
        }
        const resultado = await usuarioController.actualizar(parseInt(id), req.body);
        res.json({
            msg: 'Usuario actualizado exitosamente',
            datos: resultado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al actualizar el usuario',
        });
    }
};
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID del usuario',
            });
        }
        const resultado = await usuarioController.eliminar(parseInt(id));
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.eliminarUsuario = eliminarUsuario;
// PROYECTOS
const obtenerProyectos = async (req, res) => {
    try {
        const { organizacion_id } = req.query;
        const proyectos = await proyectoController.obtenerTodos(parseInt(organizacion_id));
        res.json(proyectos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.obtenerProyectos = obtenerProyectos;
const crearProyecto = async (req, res) => {
    try {
        const resultado = await proyectoController.crear(req.body);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.crearProyecto = crearProyecto;
const obtenerProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID del proyecto',
            });
        }
        const proyecto = await proyectoController.obtenerPorId(parseInt(id));
        if (!proyecto) {
            return res.status(404).json({
                msg: 'Proyecto no encontrado',
            });
        }
        res.json({
            msg: 'Proyecto obtenido exitosamente',
            datos: proyecto,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al obtener el proyecto',
        });
    }
};
exports.obtenerProyecto = obtenerProyecto;
const actualizarProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID del proyecto',
            });
        }
        const proyectoId = parseInt(id);
        if (isNaN(proyectoId)) {
            return res.status(400).json({
                msg: 'El ID del proyecto debe ser un número válido',
            });
        }
        const resultado = await proyectoController.actualizar(proyectoId, req.body);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.actualizarProyecto = actualizarProyecto;
const eliminarProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID del proyecto',
            });
        }
        const proyectoId = parseInt(id);
        if (isNaN(proyectoId)) {
            return res.status(400).json({
                msg: 'El ID del proyecto debe ser un número válido',
            });
        }
        const resultado = await proyectoController.eliminar(proyectoId);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.eliminarProyecto = eliminarProyecto;
// MIEMBROS DE PROYECTO
const agregarMiembroProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID del proyecto',
            });
        }
        const proyectoId = parseInt(id);
        if (isNaN(proyectoId)) {
            return res.status(400).json({
                msg: 'El ID del proyecto debe ser un número válido',
            });
        }
        const resultado = await proyectoController.agregarMiembro(proyectoId, req.body);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.agregarMiembroProyecto = agregarMiembroProyecto;
const eliminarMiembroProyecto = async (req, res) => {
    try {
        const { id, usuario_id } = req.params;
        if (!id || !usuario_id) {
            return res.status(400).json({
                msg: 'Se requieren los IDs del proyecto y del usuario',
            });
        }
        const proyectoId = parseInt(id);
        const usuarioId = parseInt(usuario_id);
        if (isNaN(proyectoId) || isNaN(usuarioId)) {
            return res.status(400).json({
                msg: 'Los IDs del proyecto y del usuario deben ser números válidos',
            });
        }
        const resultado = await proyectoController.eliminarMiembro(proyectoId, usuarioId);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.eliminarMiembroProyecto = eliminarMiembroProyecto;
// TAREAS
const obtenerTareas = async (req, res) => {
    try {
        const tareas = await tareaController.obtenerTodas(req.query);
        res.json(tareas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.obtenerTareas = obtenerTareas;
const obtenerTareaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID de la tarea',
            });
        }
        const tarea = await tareaController.obtenerPorId(parseInt(id));
        if (!tarea) {
            return res.status(404).json({
                msg: 'Tarea no encontrada',
            });
        }
        res.json({
            msg: 'Tarea obtenida exitosamente',
            datos: tarea,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al obtener la tarea',
        });
    }
};
exports.obtenerTareaPorId = obtenerTareaPorId;
const crearTarea = async (req, res) => {
    try {
        const resultado = await tareaController.crear(req.body);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.crearTarea = crearTarea;
const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID de la tarea',
            });
        }
        const tareaId = parseInt(id);
        if (isNaN(tareaId)) {
            return res.status(400).json({
                msg: 'El ID de la tarea debe ser un número válido',
            });
        }
        const resultado = await tareaController.actualizar(tareaId, req.body);
        res.json({
            msg: 'Tarea actualizada exitosamente',
            datos: resultado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al actualizar la tarea',
        });
    }
};
exports.actualizarTarea = actualizarTarea;
const actualizarEstadoTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID de la tarea',
            });
        }
        const tareaId = parseInt(id);
        if (isNaN(tareaId)) {
            return res.status(400).json({
                msg: 'El ID de la tarea debe ser un número válido',
            });
        }
        if (!estado) {
            return res.status(400).json({
                msg: 'Se requiere el estado de la tarea',
            });
        }
        const resultado = await tareaController.actualizarEstado(tareaId, estado);
        res.json({
            msg: 'Estado de la tarea actualizado exitosamente',
            datos: resultado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message,
        });
    }
};
exports.actualizarEstadoTarea = actualizarEstadoTarea;
const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID de la tarea',
            });
        }
        const tareaId = parseInt(id);
        if (isNaN(tareaId)) {
            return res.status(400).json({
                msg: 'El ID de la tarea debe ser un número válido',
            });
        }
        const resultado = await tareaController.eliminar(tareaId);
        res.json({
            msg: 'Tarea eliminada exitosamente',
            datos: resultado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message,
        });
    }
};
exports.eliminarTarea = eliminarTarea;
// ETIQUETAS
const obtenerEtiquetas = async (req, res) => {
    try {
        const { organizacion_id } = req.query;
        const etiquetas = await etiquetaController.obtenerTodas(parseInt(organizacion_id));
        res.json(etiquetas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.obtenerEtiquetas = obtenerEtiquetas;
const crearEtiqueta = async (req, res) => {
    try {
        const resultado = await etiquetaController.crear(req.body);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.crearEtiqueta = crearEtiqueta;
// COMENTARIOS
const obtenerComentariosTarea = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID de la tarea',
            });
        }
        const tareaId = parseInt(id);
        if (isNaN(tareaId)) {
            return res.status(400).json({
                msg: 'El ID de la tarea debe ser un número válido',
            });
        }
        const comentarios = await comentarioController.obtenerPorTarea(tareaId);
        res.json({
            msg: 'Comentarios obtenidos exitosamente',
            datos: comentarios,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al obtener los comentarios',
        });
    }
};
exports.obtenerComentariosTarea = obtenerComentariosTarea;
const crearComentarioTarea = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID de la tarea',
            });
        }
        const tareaId = parseInt(id);
        if (isNaN(tareaId)) {
            return res.status(400).json({
                msg: 'El ID de la tarea debe ser un número válido',
            });
        }
        const resultado = await comentarioController.crear({
            ...req.body,
            tarea_id: tareaId,
        });
        res.json({
            msg: 'Comentario creado exitosamente',
            datos: resultado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al crear el comentario',
        });
    }
};
exports.crearComentarioTarea = crearComentarioTarea;
const eliminarComentarioTarea = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere el ID del comentario',
            });
        }
        const resultado = await comentarioController.eliminar(parseInt(id));
        res.json({
            msg: 'Comentario eliminado exitosamente',
            datos: resultado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message || 'Error al eliminar el comentario',
        });
    }
};
exports.eliminarComentarioTarea = eliminarComentarioTarea;
// REPORTES
const obtenerEstadisticasProyectos = async (req, res) => {
    try {
        const { organizacion_id } = req.query;
        const estadisticas = await proyectoController.obtenerEstadisticas(parseInt(organizacion_id));
        res.json(estadisticas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.obtenerEstadisticasProyectos = obtenerEstadisticasProyectos;
const obtenerCargaTrabajoUsuarios = async (req, res) => {
    try {
        const { organizacion_id } = req.query;
        const cargaTrabajo = await usuarioController.obtenerCargaTrabajo(parseInt(organizacion_id));
        res.json(cargaTrabajo);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.obtenerCargaTrabajoUsuarios = obtenerCargaTrabajoUsuarios;
const obtenerTareasDetalladas = async (req, res) => {
    try {
        const { organizacion_id } = req.query;
        const tareas = await tareaController.obtenerDetalladas(parseInt(organizacion_id));
        res.json(tareas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.obtenerTareasDetalladas = obtenerTareasDetalladas;
const obtenerActividad = async (req, res) => {
    try {
        const { organizacion_id } = req.query;
        const actividad = await actividadController.obtenerActividad(parseInt(organizacion_id));
        res.json(actividad);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.obtenerActividad = obtenerActividad;
//# sourceMappingURL=controladores.js.map