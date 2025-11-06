"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Proyecto = connection_1.default.define("proyectos", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    organizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    propietario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: 'activo',
        validate: {
            isIn: [['planificacion', 'activo', 'en_espera', 'completado', 'cancelado']]
        }
    },
    prioridad: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: 'media',
        validate: {
            isIn: [['baja', 'media', 'alta', 'urgente']]
        }
    },
    color: {
        type: sequelize_1.DataTypes.STRING(7),
        allowNull: true,
    },
    icono: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    fecha_fin: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    fecha_limite: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    completado_en: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    porcentaje_progreso: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        defaultValue: 0.00,
        validate: {
            min: 0,
            max: 100
        }
    },
    ia_descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    ia_tareas_sugeridas: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    ia_duracion_estimada: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    ia_fecha_predicha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
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
exports.default = Proyecto;
//# sourceMappingURL=Proyecto.js.map