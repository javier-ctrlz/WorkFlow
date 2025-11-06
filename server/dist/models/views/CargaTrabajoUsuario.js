"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const CargaTrabajoUsuario = connection_1.default.define("carga_trabajo_usuarios", {
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre_completo: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    organizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    departamento: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    total_tareas_asignadas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tareas_activas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tareas_pendientes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tareas_completadas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tareas_vencidas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    total_horas_estimadas: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    total_horas_reales: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = CargaTrabajoUsuario;
//# sourceMappingURL=CargaTrabajoUsuario.js.map