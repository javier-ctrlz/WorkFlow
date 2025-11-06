"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const EstadisticasProyecto = connection_1.default.define("estadisticas_proyectos", {
    proyecto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    proyecto_nombre: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    organizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    total_tareas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tareas_completadas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tareas_en_progreso: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tareas_vencidas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    total_miembros: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    porcentaje_progreso: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
    },
    proyecto_estado: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    proyecto_prioridad: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    fecha_limite: {
        type: sequelize_1.DataTypes.DATE,
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
exports.default = EstadisticasProyecto;
//# sourceMappingURL=EstadisticasProyecto.js.map