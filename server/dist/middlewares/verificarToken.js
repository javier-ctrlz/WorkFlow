"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verificarToken = (req, res, next) => {
    const headerAuth = req.headers["authorization"];
    if (!headerAuth) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
    }
    const token = headerAuth.split(" ")[1];
    if (!token) {
        return res.status(401).json({ mensaje: "Formato de token inválido" });
    }
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.usuario = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ mensaje: "Token inválido o expirado" });
    }
};
exports.verificarToken = verificarToken;
//# sourceMappingURL=verificarToken.js.map