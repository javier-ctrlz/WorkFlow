import { Router } from "express";
import {
    // Auth
    registrarOrganizacion,
    login,
    
    // Organizaciones
    obtenerOrganizaciones,
    obtenerOrganizacionPorId,
    obtenerResumenOrganizacion,
    
    // Usuarios
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    
    // Proyectos
    obtenerProyectos,
    crearProyecto,
    obtenerProyecto,
    actualizarProyecto,
    eliminarProyecto,
    
    // Miembros de proyecto
    agregarMiembroProyecto,
    eliminarMiembroProyecto,
    
    // Tareas
    obtenerTareas,
    crearTarea,
    actualizarTarea,
    actualizarEstadoTarea,
    eliminarTarea,
    obtenerTareaPorId,
    
    // Etiquetas
    obtenerEtiquetas,
    crearEtiqueta,
    
    // Comentarios
    obtenerComentariosTarea,
    crearComentarioTarea,
    eliminarComentarioTarea,
    
    // Reportes
    obtenerEstadisticasProyectos,
    obtenerCargaTrabajoUsuarios,
    obtenerTareasDetalladas,
    obtenerActividad,
    obtenerUsuario
} from "../controllers/controladores";

const router = Router();

// LOGIN Y REGISTRO
router.post("/register-org", registrarOrganizacion);
router.post("/login", login);

// ORGANIZACIONES
router.get("/organizaciones", obtenerOrganizaciones);
router.get("/organizaciones/:id", obtenerOrganizacionPorId);
router.get("/organizaciones/:id/resumen", obtenerResumenOrganizacion);

// USUARIOS
router.get("/usuarios", obtenerUsuarios);
router.get("/usuarios/:id", obtenerUsuario);
router.post("/usuarios", crearUsuario);
router.put("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

// PROYECTOS
router.get("/proyectos", obtenerProyectos);
router.post("/proyectos", crearProyecto);
router.get("/proyectos/:id", obtenerProyecto);
router.put("/proyectos/:id", actualizarProyecto);
router.delete("/proyectos/:id", eliminarProyecto);

// MIEMBROS DE PROYECTO
router.post("/proyectos/:id/miembros", agregarMiembroProyecto);
router.delete("/proyectos/:id/miembros/:usuario_id", eliminarMiembroProyecto);

// TAREAS
router.get("/tareas", obtenerTareas);
router.get("/tareas/:id", obtenerTareaPorId);
router.post("/tareas", crearTarea);
router.put("/tareas/:id", actualizarTarea);
router.patch("/tareas/:id/estado", actualizarEstadoTarea);
router.delete("/tareas/:id", eliminarTarea);

// ETIQUETAS
router.get("/etiquetas", obtenerEtiquetas);
router.post("/etiquetas", crearEtiqueta);

// COMENTARIOS EN TAREAS
router.get("/tareas/:id/comentarios", obtenerComentariosTarea);
router.post("/tareas/:id/comentarios", crearComentarioTarea);
router.delete("/comentarios/:id", eliminarComentarioTarea);

// REPORTES Y DASHBOARD
router.get("/reportes/proyectos", obtenerEstadisticasProyectos);
router.get("/reportes/usuarios", obtenerCargaTrabajoUsuarios);
router.get("/reportes/tareas", obtenerTareasDetalladas);
router.get("/reportes/actividad", obtenerActividad);

export default router;
