"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioClass = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const CargaTrabajoUsuario_1 = __importDefault(require("../models/views/CargaTrabajoUsuario"));
class UsuarioClass {
    // GET /api/usuarios
    async obtenerTodos() {
        try {
            return await Usuario_1.default.findAll();
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener los usuarios");
        }
    }
    // POST /api/usuarios
    async crear(body) {
        try {
            const usuario = await Usuario_1.default.create(body);
            return { mensaje: "Usuario creado exitosamente", usuario };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al crear el usuario");
        }
    }
    // GET /api/usuarios/:id
    async obtenerPorId(id) {
        try {
            return await Usuario_1.default.findByPk(id);
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener el usuario");
        }
    }
    // PUT /api/usuarios/:id
    async actualizar(id, body) {
        try {
            const usuario = await Usuario_1.default.findByPk(id);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
            await usuario.update(body);
            return { mensaje: "Usuario actualizado exitosamente", usuario };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al actualizar el usuario");
        }
    }
    // DELETE /api/usuarios/:id
    async eliminar(id) {
        try {
            const usuario = await Usuario_1.default.findByPk(id);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
            await usuario.destroy();
            return { mensaje: "Usuario eliminado exitosamente" };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al eliminar el usuario");
        }
    }
    // GET /api/reportes/usuarios (carga de trabajo)
    async obtenerCargaTrabajo(organizacionId) {
        try {
            return await CargaTrabajoUsuario_1.default.findAll({
                where: { organizacion_id: organizacionId }
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener la carga de trabajo de los usuarios");
        }
    }
}
exports.UsuarioClass = UsuarioClass;
//# sourceMappingURL=Usuario.js.map