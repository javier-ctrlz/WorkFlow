"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Etiqueta = connection_1.default.define("etiquetas", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    organizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING(7),
        allowNull: true,
    },
    descripcion: {
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
exports.default = Etiqueta;
//# sourceMappingURL=Etiqueta.js.map