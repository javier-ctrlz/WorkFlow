import db from "../db/connection";
import { DataTypes } from "sequelize";

const ComentarioTarea = db.define(
  "comentarios_tareas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tarea_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    comentario_padre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    esta_editado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    creado_en: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    actualizado_en: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default ComentarioTarea;