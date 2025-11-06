"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActividadClass = void 0;
const RegistroActividad_1 = __importDefault(require("../models/RegistroActividad"));
const ActividadReciente_1 = __importDefault(require("../models/views/ActividadReciente"));
class ActividadClass {
    // GET /api/reportes/actividad
    async obtenerActividad(organizacionId) {
        try {
            return await ActividadReciente_1.default.findAll({
                where: { organizacion_id: organizacionId },
                order: [['creado_en', 'DESC']]
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener la actividad reciente");
        }
    }
    // Método interno para registrar actividad
    async registrar(datos) {
        try {
            await RegistroActividad_1.default.create(datos);
        }
        catch (error) {
            console.error(error);
            console.error("Error al registrar la actividad");
        }
    }
    // GET /api/reportes/actividad/usuario/:id
    async obtenerActividadUsuario(usuarioId) {
        try {
            return await ActividadReciente_1.default.findAll({
                where: { usuario_id: usuarioId },
                order: [['creado_en', 'DESC']]
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener la actividad del usuario");
        }
    }
    // GET /api/reportes/actividad/proyecto/:id
    async obtenerActividadProyecto(proyectoId) {
        try {
            return await ActividadReciente_1.default.findAll({
                where: {
                    tipo_entidad: 'proyecto',
                    entidad_id: proyectoId
                },
                order: [['creado_en', 'DESC']]
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener la actividad del proyecto");
        }
    }
}
exports.ActividadClass = ActividadClass;
//# sourceMappingURL=Actividad.js.map