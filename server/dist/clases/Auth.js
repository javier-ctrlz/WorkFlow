"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClass = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
class AuthClass {
    // POST /api/register-org
    async registrarOrganizacion(body) {
        try {
            const usuario = await Usuario_1.default.create({
                ...body.usuario,
                organizacion_id: body.organizacion.id,
                rol: 'admin'
            });
            return { mensaje: "Usuario administrador registrado exitosamente", usuario };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al registrar el usuario administrador");
        }
    }
    // POST /api/login
    async login(email, password) {
        try {
            const usuario = await Usuario_1.default.findOne({
                where: { email }
            });
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
            await usuario.update({ ultimo_login: new Date() });
            return { mensaje: "Inicio de sesión exitoso", usuario };
        }
        catch (error) {
            console.error(error);
            throw new Error("Error en el inicio de sesión");
        }
    }
}
exports.AuthClass = AuthClass;
//# sourceMappingURL=Auth.js.map