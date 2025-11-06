import db from "../../db/connection";
import { DataTypes } from "sequelize";

const ResumenOrganizacion = db.define(
  "resumen_organizaciones",
  {
    organizacion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    organizacion_nombre: {
      type: DataTypes.STRING(255),
    },
    slug: {
      type: DataTypes.STRING(100),
    },
    plan: {
      type: DataTypes.STRING(50),
    },
    estado: {
      type: DataTypes.STRING(20),
    },
    maximo_usuarios: {
      type: DataTypes.INTEGER,
    },
    maximo_proyectos: {
      type: DataTypes.INTEGER,
    },
    total_usuarios: {
      type: DataTypes.INTEGER,
    },
    total_proyectos: {
      type: DataTypes.INTEGER,
    },
    total_tareas: {
      type: DataTypes.INTEGER,
    },
    usuarios_activos: {
      type: DataTypes.INTEGER,
    },
    proyectos_activos: {
      type: DataTypes.INTEGER,
    },
    tareas_en_progreso: {
      type: DataTypes.INTEGER,
    },
    tareas_completadas: {
      type: DataTypes.INTEGER,
    },
    creado_en: {
      type: DataTypes.DATE,
    },
    actualizado_en: {
      type: DataTypes.DATE,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default ResumenOrganizacion;