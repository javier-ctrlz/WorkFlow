"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentarioTareaClass = void 0;
const ComentarioTarea_1 = __importDefault(require("../models/ComentarioTarea"));
class ComentarioTareaClass {
    // GET /api/tareas/:id/comentarios
    async obtenerPorTarea(tareaId) {
        try {
            return await ComentarioTarea_1.default.findAll({
                where: { tarea_id: tareaId },
                order: [['creado_en', 'ASC']]
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener los comentarios de la tarea");
        }
    }
    // POST /api/tareas/:id/comentarios
    async crear(body) {
        try {
            const comentario = await ComentarioTarea_1.default.create(body);
            return { mensaje: "Comentario creado exitosamente", comentario };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al crear el comentario");
        }
    }
    // PUT /api/comentarios/:id
    async actualizar(id, body) {
        try {
            const comentario = await ComentarioTarea_1.default.findByPk(id);
            if (!comentario) {
                throw new Error("Comentario no encontrado");
            }
            await comentario.update({
                ...body,
                esta_editado: true
            });
            return { mensaje: "Comentario actualizado exitosamente", comentario };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al actualizar el comentario");
        }
    }
    // DELETE /api/comentarios/:id
    async eliminar(id) {
        try {
            const comentario = await ComentarioTarea_1.default.findByPk(id);
            if (!comentario) {
                throw new Error("Comentario no encontrado");
            }
            await comentario.destroy();
            return { mensaje: "Comentario eliminado exitosamente" };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al eliminar el comentario");
        }
    }
    // GET /api/tareas/:id/comentarios/respuestas/:comentario_id
    async obtenerRespuestas(comentarioId) {
        try {
            return await ComentarioTarea_1.default.findAll({
                where: { comentario_padre_id: comentarioId },
                order: [['creado_en', 'ASC']]
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener las respuestas del comentario");
        }
    }
}
exports.ComentarioTareaClass = ComentarioTareaClass;
//# sourceMappingURL=ComentarioTarea.js.map