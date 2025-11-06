import db from "../db/connection";
import { DataTypes } from "sequelize";

const RegistroActividad = db.define(
  "registros_actividad",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    organizacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipo_entidad: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [['proyecto', 'tarea', 'usuario', 'organizacion', 'comentario', 'etiqueta']]
      }
    },
    entidad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cambios: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    direccion_ip: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    agente_usuario: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    creado_en: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default RegistroActividad;