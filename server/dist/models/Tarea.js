"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Tarea = connection_1.default.define("tareas", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    proyecto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    organizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: 'pendiente',
        validate: {
            isIn: [['pendiente', 'en_progreso', 'en_revision', 'completada']]
        }
    },
    prioridad: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: 'media',
        validate: {
            isIn: [['baja', 'media', 'alta', 'urgente']]
        }
    },
    asignado_a: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    creado_por: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    fecha_vencimiento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    completado_en: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    horas_estimadas: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
        allowNull: true,
    },
    horas_reales: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
        allowNull: true,
    },
    ia_descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    ia_prioridad_recomendada: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    ia_duracion_predicha: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
        allowNull: true,
    },
    ia_fecha_predicha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    columna_kanban: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: 'pendiente',
        validate: {
            isIn: [['pendiente', 'en_progreso', 'en_revision', 'completada']]
        }
    },
    posicion_kanban: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    etiquetas: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    adjuntos: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    esta_archivada: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    creado_en: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    actualizado_en: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = Tarea;
//# sourceMappingURL=Tarea.js.map