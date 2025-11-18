"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verificarToken_1 = require("../middlewares/verificarToken");
const controladores_1 = require("../controllers/controladores");
const router = (0, express_1.Router)();
// LOGIN Y REGISTRO
router.post("/register-org", controladores_1.registrarOrganizacion);
router.post("/login", controladores_1.login);
// MIDDLEWARE DE AUTENTICACIÓN
router.use(verificarToken_1.verificarToken);
// ORGANIZACIONES
router.get("/organizaciones", controladores_1.obtenerOrganizaciones);
router.get("/organizaciones/:id", controladores_1.obtenerOrganizacionPorId);
router.get("/organizaciones/:id/resumen", controladores_1.obtenerResumenOrganizacion);
// USUARIOS
router.get("/usuarios", controladores_1.obtenerUsuarios);
router.get("/usuarios/:id", controladores_1.obtenerUsuario);
router.post("/usuarios", controladores_1.crearUsuario);
router.put("/usuarios/:id", controladores_1.actualizarUsuario);
router.delete("/usuarios/:id", controladores_1.eliminarUsuario);
// PROYECTOS
router.get("/proyectos", controladores_1.obtenerProyectos);
router.post("/proyectos", controladores_1.crearProyecto);
router.get("/proyectos/:id", controladores_1.obtenerProyecto);
router.put("/proyectos/:id", controladores_1.actualizarProyecto);
router.delete("/proyectos/:id", controladores_1.eliminarProyecto);
// MIEMBROS DE PROYECTO
router.post("/proyectos/:id/miembros", controladores_1.agregarMiembroProyecto);
router.delete("/proyectos/:id/miembros/:usuario_id", controladores_1.eliminarMiembroProyecto);
// TAREAS
router.get("/tareas", controladores_1.obtenerTareas);
router.get("/tareas/:id", controladores_1.obtenerTareaPorId);
router.post("/tareas", controladores_1.crearTarea);
router.put("/tareas/:id", controladores_1.actualizarTarea);
router.patch("/tareas/:id/estado", controladores_1.actualizarEstadoTarea);
router.delete("/tareas/:id", controladores_1.eliminarTarea);
// ETIQUETAS
router.get("/etiquetas", controladores_1.obtenerEtiquetas);
router.post("/etiquetas", controladores_1.crearEtiqueta);
// COMENTARIOS EN TAREAS
router.get("/tareas/:id/comentarios", controladores_1.obtenerComentariosTarea);
router.post("/tareas/:id/comentarios", controladores_1.crearComentarioTarea);
router.delete("/comentarios/:id", controladores_1.eliminarComentarioTarea);
// REPORTES Y DASHBOARD
router.get("/reportes/proyectos", controladores_1.obtenerEstadisticasProyectos);
router.get("/reportes/usuarios", controladores_1.obtenerCargaTrabajoUsuarios);
router.get("/reportes/tareas", controladores_1.obtenerTareasDetalladas);
router.get("/reportes/actividad", controladores_1.obtenerActividad);
exports.default = router;
//# sourceMappingURL=rutas.js.map