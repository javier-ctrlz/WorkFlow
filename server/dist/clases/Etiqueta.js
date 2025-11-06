"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtiquetaClass = void 0;
const Etiqueta_1 = __importDefault(require("../models/Etiqueta"));
const TareaEtiqueta_1 = __importDefault(require("../models/TareaEtiqueta"));
class EtiquetaClass {
    // GET /api/etiquetas
    async obtenerTodas(organizacionId) {
        try {
            return await Etiqueta_1.default.findAll({
                where: { organizacion_id: organizacionId }
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener las etiquetas");
        }
    }
    // POST /api/etiquetas
    async crear(body) {
        try {
            const etiqueta = await Etiqueta_1.default.create(body);
            return { mensaje: "Etiqueta creada exitosamente", etiqueta };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al crear la etiqueta");
        }
    }
    // PUT /api/etiquetas/:id
    async actualizar(id, body) {
        try {
            const etiqueta = await Etiqueta_1.default.findByPk(id);
            if (!etiqueta) {
                throw new Error("Etiqueta no encontrada");
            }
            await etiqueta.update(body);
            return { mensaje: "Etiqueta actualizada exitosamente", etiqueta };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al actualizar la etiqueta");
        }
    }
    // DELETE /api/etiquetas/:id
    async eliminar(id) {
        try {
            const etiqueta = await Etiqueta_1.default.findByPk(id);
            if (!etiqueta) {
                throw new Error("Etiqueta no encontrada");
            }
            await etiqueta.destroy();
            return { mensaje: "Etiqueta eliminada exitosamente" };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al eliminar la etiqueta");
        }
    }
    // POST /api/tareas/:id/etiquetas
    async asignarATarea(tareaId, etiquetaId) {
        try {
            const asignacion = await TareaEtiqueta_1.default.create({
                tarea_id: tareaId,
                etiqueta_id: etiquetaId
            });
            return { mensaje: "Etiqueta asignada exitosamente", asignacion };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al asignar la etiqueta a la tarea");
        }
    }
    // DELETE /api/tareas/:id/etiquetas/:etiqueta_id
    async desasignarDeTarea(tareaId, etiquetaId) {
        try {
            await TareaEtiqueta_1.default.destroy({
                where: {
                    tarea_id: tareaId,
                    etiqueta_id: etiquetaId
                }
            });
            return { mensaje: "Etiqueta desasignada exitosamente" };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al desasignar la etiqueta de la tarea");
        }
    }
}
exports.EtiquetaClass = EtiquetaClass;
//# sourceMappingURL=Etiqueta.js.map