"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const TareaDetallada = connection_1.default.define("tareas_detalladas", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    prioridad: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    columna_kanban: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    posicion_kanban: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATE,
    },
    fecha_vencimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    completado_en: {
        type: sequelize_1.DataTypes.DATE,
    },
    horas_estimadas: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
    },
    horas_reales: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
    },
    creado_en: {
        type: sequelize_1.DataTypes.DATE,
    },
    actualizado_en: {
        type: sequelize_1.DataTypes.DATE,
    },
    proyecto_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    proyecto_nombre: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    proyecto_estado: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    organizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    organizacion_nombre: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    usuario_asignado_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    usuario_asignado_nombre: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    usuario_asignado_email: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    usuario_asignado_avatar: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    usuario_creador_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    usuario_creador_nombre: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    usuario_creador_email: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    ia_descripcion: {
        type: sequelize_1.DataTypes.TEXT,
    },
    ia_prioridad_recomendada: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    ia_fecha_predicha: {
        type: sequelize_1.DataTypes.DATE,
    },
    ia_duracion_predicha: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
    },
    cantidad_comentarios: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cantidad_etiquetas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    estado_urgencia: {
        type: sequelize_1.DataTypes.STRING(20),
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = TareaDetallada;
//# sourceMappingURL=TareaDetallada.js.map