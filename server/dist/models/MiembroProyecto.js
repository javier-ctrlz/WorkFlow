"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const MiembroProyecto = connection_1.default.define("miembros_proyecto", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    proyecto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: 'miembro',
        validate: {
            isIn: [['propietario', 'gestor', 'miembro', 'observador']]
        }
    },
    agregado_en: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    agregado_por: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = MiembroProyecto;
//# sourceMappingURL=MiembroProyecto.js.map