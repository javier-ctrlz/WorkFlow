"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const ComentarioTarea = connection_1.default.define("comentarios_tareas", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tarea_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    contenido: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    comentario_padre_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    esta_editado: {
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
exports.default = ComentarioTarea;
//# sourceMappingURL=ComentarioTarea.js.map