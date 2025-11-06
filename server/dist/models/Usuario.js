"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Usuario = connection_1.default.define("usuarios", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    organizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    nombre_completo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: 'miembro',
        validate: {
            isIn: [['admin', 'gestor_proyecto', 'miembro']]
        }
    },
    avatar_url: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    departamento: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    puesto_trabajo: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    biografia: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    esta_activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    email_verificado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ultimo_login: {
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
exports.default = Usuario;
//# sourceMappingURL=Usuario.js.map