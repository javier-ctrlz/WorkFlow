"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClass = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthClass {
    // POST /api/register-org
    async registrarOrganizacion(body) {
        try {
            const usuario = await Usuario_1.default.create({
                ...body.usuario,
                organizacion_id: body.organizacion.id,
                rol: 'admin',
            });
            return { mensaje: 'Usuario administrador registrado exitosamente', usuario };
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al registrar el usuario administrador');
        }
    }
    // POST /api/login
    async login(email, password) {
        try {
            const usuario = await Usuario_1.default.findOne({
                where: { email },
            });
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            if (usuario.password_hash !== password) {
                throw new Error('Contraseña incorrecta');
            }
            await usuario.update({ ultimo_login: new Date() });
            const payload = {
                id: usuario.id,
                email: usuario.email,
                nombre: usuario.nombre_completo,
                rol: usuario.rol,
            };
            // Generar token JWT
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'defaultsecret', {
                expiresIn: '1h',
            });
            return {
                mensaje: 'Inicio de sesión exitoso',
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre_completo,
                    email: usuario.email,
                    rol: usuario.rol,
                },
                token,
            };
        }
        catch (error) {
            console.error('Error en login:', error);
            throw new Error(error.message || 'Error en el inicio de sesión');
        }
    }
}
exports.AuthClass = AuthClass;
//# sourceMappingURL=Auth.js.map