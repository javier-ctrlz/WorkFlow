"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const RegistroActividad = connection_1.default.define("registros_actividad", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    organizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    tipo_entidad: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [['proyecto', 'tarea', 'usuario', 'organizacion', 'comentario', 'etiqueta']]
        }
    },
    entidad_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    accion: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    cambios: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    metadata: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    direccion_ip: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    agente_usuario: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    creado_en: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = RegistroActividad;
//# sourceMappingURL=RegistroActividad.js.map