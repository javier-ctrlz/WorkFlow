"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectoClass = void 0;
const Proyecto_1 = __importDefault(require("../models/Proyecto"));
const MiembroProyecto_1 = __importDefault(require("../models/MiembroProyecto"));
const EstadisticasProyecto_1 = __importDefault(require("../models/views/EstadisticasProyecto"));
class ProyectoClass {
    // GET /api/proyectos
    async obtenerTodos(organizacionId) {
        try {
            return await Proyecto_1.default.findAll({
                where: { organizacion_id: organizacionId }
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener los proyectos");
        }
    }
    // POST /api/proyectos
    async crear(body) {
        try {
            const proyecto = await Proyecto_1.default.create(body);
            return { mensaje: "Proyecto creado exitosamente", proyecto };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al crear el proyecto");
        }
    }
    // GET /api/proyectos/:id
    async obtenerPorId(id) {
        try {
            return await Proyecto_1.default.findByPk(id);
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener el proyecto");
        }
    }
    // PUT /api/proyectos/:id
    async actualizar(id, body) {
        try {
            const proyecto = await Proyecto_1.default.findByPk(id);
            if (!proyecto) {
                throw new Error("Proyecto no encontrado");
            }
            await proyecto.update(body);
            return { mensaje: "Proyecto actualizado exitosamente", proyecto };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al actualizar el proyecto");
        }
    }
    // DELETE /api/proyectos/:id
    async eliminar(id) {
        try {
            const proyecto = await Proyecto_1.default.findByPk(id);
            if (!proyecto) {
                throw new Error("Proyecto no encontrado");
            }
            await proyecto.destroy();
            return { mensaje: "Proyecto eliminado exitosamente" };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al eliminar el proyecto");
        }
    }
    // POST /api/proyectos/:id/miembros
    async agregarMiembro(proyectoId, body) {
        try {
            const miembro = await MiembroProyecto_1.default.create({
                ...body,
                proyecto_id: proyectoId
            });
            return { mensaje: "Miembro agregado exitosamente", miembro };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al agregar el miembro al proyecto");
        }
    }
    // DELETE /api/proyectos/:id/miembros/:usuario_id
    async eliminarMiembro(proyectoId, usuarioId) {
        try {
            await MiembroProyecto_1.default.destroy({
                where: {
                    proyecto_id: proyectoId,
                    usuario_id: usuarioId
                }
            });
            return { mensaje: "Miembro eliminado exitosamente" };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al eliminar el miembro del proyecto");
        }
    }
    // GET /api/reportes/proyectos
    async obtenerEstadisticas(organizacionId) {
        try {
            return await EstadisticasProyecto_1.default.findAll({
                where: { organizacion_id: organizacionId }
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener las estadísticas de los proyectos");
        }
    }
}
exports.ProyectoClass = ProyectoClass;
//# sourceMappingURL=Proyecto.js.map