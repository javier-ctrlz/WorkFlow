"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Organizacion = connection_1.default.define("organizaciones", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    logo_url: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    plan: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: 'gratuito',
        validate: {
            isIn: [['gratuito', 'profesional', 'empresarial']]
        }
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: 'activo',
        validate: {
            isIn: [['activo', 'suspendido', 'prueba', 'inactivo']]
        }
    },
    maximo_usuarios: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 10,
    },
    maximo_proyectos: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 5,
    },
    fecha_fin_prueba: {
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
exports.default = Organizacion;
//# sourceMappingURL=Organizacion.js.map