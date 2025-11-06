"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizacionClass = void 0;
const Organizacion_1 = __importDefault(require("../models/Organizacion"));
const ResumenOrganizacion_1 = __importDefault(require("../models/views/ResumenOrganizacion"));
class OrganizacionClass {
    // POST /api/register-org
    async registrar(body) {
        try {
            const organizacion = await Organizacion_1.default.create(body);
            return { mensaje: "Organización registrada exitosamente", organizacion };
        }
        catch (error) {
            console.error(error);
            throw new Error("No se pudo registrar la organización");
        }
    }
    // GET /api/organizaciones
    async obtenerTodas() {
        try {
            return await Organizacion_1.default.findAll();
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener las organizaciones");
        }
    }
    // GET /api/organizaciones/:id
    async obtenerPorId(id) {
        try {
            return await Organizacion_1.default.findByPk(id);
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener la organización");
        }
    }
    // GET /api/organizaciones/:id/resumen
    async obtenerResumen(id) {
        try {
            return await ResumenOrganizacion_1.default.findByPk(id);
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener el resumen de la organización");
        }
    }
    // PUT /api/organizaciones/:id
    async actualizar(id, body) {
        try {
            const organizacion = await Organizacion_1.default.findByPk(id);
            if (!organizacion) {
                throw new Error("Organización no encontrada");
            }
            await organizacion.update(body);
            return { mensaje: "Organización actualizada exitosamente", organizacion };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al actualizar la organización");
        }
    }
    // DELETE /api/organizaciones/:id
    async eliminar(id) {
        try {
            const organizacion = await Organizacion_1.default.findByPk(id);
            if (!organizacion) {
                throw new Error("Organización no encontrada");
            }
            await organizacion.destroy();
            return { mensaje: "Organización eliminada exitosamente" };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al eliminar la organización");
        }
    }
}
exports.OrganizacionClass = OrganizacionClass;
//# sourceMappingURL=Organizacion.js.map