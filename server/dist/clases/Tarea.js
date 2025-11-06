"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TareaClass = void 0;
const Tarea_1 = __importDefault(require("../models/Tarea"));
const TareaDetallada_1 = __importDefault(require("../models/views/TareaDetallada"));
const sequelize_1 = require("sequelize");
class TareaClass {
    // GET /api/tareas
    async obtenerTodas(filtros = {}) {
        try {
            const where = {};
            if (filtros.proyecto_id) {
                where.proyecto_id = filtros.proyecto_id;
            }
            if (filtros.estado) {
                where.estado = filtros.estado;
            }
            if (filtros.organizacion_id) {
                where.organizacion_id = filtros.organizacion_id;
            }
            return await Tarea_1.default.findAll({ where });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener las tareas");
        }
    }
    // POST /api/tareas
    async crear(body) {
        try {
            const tarea = await Tarea_1.default.create(body);
            return { mensaje: "Tarea creada exitosamente", tarea };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al crear la tarea");
        }
    }
    // GET /api/tareas/:id
    async obtenerPorId(id) {
        try {
            return await TareaDetallada_1.default.findByPk(id);
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener la tarea");
        }
    }
    // PUT /api/tareas/:id
    async actualizar(id, body) {
        try {
            const tarea = await Tarea_1.default.findByPk(id);
            if (!tarea) {
                throw new Error("Tarea no encontrada");
            }
            await tarea.update(body);
            return { mensaje: "Tarea actualizada exitosamente", tarea };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al actualizar la tarea");
        }
    }
    // PATCH /api/tareas/:id/estado
    async actualizarEstado(id, estado) {
        try {
            const tarea = await Tarea_1.default.findByPk(id);
            if (!tarea) {
                throw new Error("Tarea no encontrada");
            }
            await tarea.update({
                estado,
                columna_kanban: estado,
                ...(estado === 'completada' ? { completado_en: new Date() } : {})
            });
            return { mensaje: "Estado de tarea actualizado exitosamente", tarea };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al actualizar el estado de la tarea");
        }
    }
    // DELETE /api/tareas/:id
    async eliminar(id) {
        try {
            const tarea = await Tarea_1.default.findByPk(id);
            if (!tarea) {
                throw new Error("Tarea no encontrada");
            }
            await tarea.destroy();
            return { mensaje: "Tarea eliminada exitosamente" };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al eliminar la tarea");
        }
    }
    // GET /api/reportes/tareas
    async obtenerDetalladas(organizacionId) {
        try {
            return await TareaDetallada_1.default.findAll({
                where: { organizacion_id: organizacionId }
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener el reporte detallado de tareas");
        }
    }
    // GET /api/reportes/tareas/vencidas
    async obtenerTareasVencidas(organizacionId) {
        try {
            return await TareaDetallada_1.default.findAll({
                where: {
                    organizacion_id: organizacionId,
                    fecha_vencimiento: {
                        [sequelize_1.Op.lt]: new Date()
                    },
                    estado: {
                        [sequelize_1.Op.ne]: 'completada'
                    }
                }
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener las tareas vencidas");
        }
    }
}
exports.TareaClass = TareaClass;
//# sourceMappingURL=Tarea.js.map