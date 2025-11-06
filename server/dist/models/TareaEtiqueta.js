"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const TareaEtiqueta = connection_1.default.define("tareas_etiquetas", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tarea_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    etiqueta_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    agregado_en: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = TareaEtiqueta;
//# sourceMappingURL=TareaEtiqueta.js.map