"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const ResumenOrganizacion = connection_1.default.define("resumen_organizaciones", {
    organizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    organizacion_nombre: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    slug: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    plan: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    maximo_usuarios: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    maximo_proyectos: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    total_usuarios: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    total_proyectos: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    total_tareas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    usuarios_activos: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    proyectos_activos: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tareas_en_progreso: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tareas_completadas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    creado_en: {
        type: sequelize_1.DataTypes.DATE,
    },
    actualizado_en: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = ResumenOrganizacion;
//# sourceMappingURL=ResumenOrganizacion.js.map