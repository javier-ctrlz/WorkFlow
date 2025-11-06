import db from "../db/connection";
import { DataTypes } from "sequelize";

const TareaEtiqueta = db.define(
  "tareas_etiquetas",
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
    etiqueta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agregado_en: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default TareaEtiqueta;