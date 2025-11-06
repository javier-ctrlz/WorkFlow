"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const ActividadReciente = connection_1.default.define("actividad_reciente", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    organizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    organizacion_nombre: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    usuario_nombre: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    usuario_email: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    usuario_avatar: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    tipo_entidad: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    entidad_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    accion: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
    },
    creado_en: {
        type: sequelize_1.DataTypes.DATE,
    },
    nombre_entidad: {
        type: sequelize_1.DataTypes.STRING(500),
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = ActividadReciente;
//# sourceMappingURL=ActividadReciente.js.map