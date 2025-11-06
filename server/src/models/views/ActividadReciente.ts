import db from "../../db/connection";
import { DataTypes } from "sequelize";

const ActividadReciente = db.define(
  "actividad_reciente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    organizacion_id: {
      type: DataTypes.INTEGER,
    },
    organizacion_nombre: {
      type: DataTypes.STRING(255),
    },
    usuario_id: {
      type: DataTypes.INTEGER,
    },
    usuario_nombre: {
      type: DataTypes.STRING(255),
    },
    usuario_email: {
      type: DataTypes.STRING(255),
    },
    usuario_avatar: {
      type: DataTypes.STRING(500),
    },
    tipo_entidad: {
      type: DataTypes.STRING(50),
    },
    entidad_id: {
      type: DataTypes.INTEGER,
    },
    accion: {
      type: DataTypes.STRING(100),
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    creado_en: {
      type: DataTypes.DATE,
    },
    nombre_entidad: {
      type: DataTypes.STRING(500),
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default ActividadReciente;