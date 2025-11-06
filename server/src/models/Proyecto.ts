import db from "../db/connection";
import { DataTypes } from "sequelize";

const Proyecto = db.define(
  "proyectos",
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
    propietario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(50),
      defaultValue: 'activo',
      validate: {
        isIn: [['planificacion', 'activo', 'en_espera', 'completado', 'cancelado']]
      }
    },
    prioridad: {
      type: DataTypes.STRING(20),
      defaultValue: 'media',
      validate: {
        isIn: [['baja', 'media', 'alta', 'urgente']]
      }
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    icono: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_limite: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completado_en: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    porcentaje_progreso: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.00,
      validate: {
        min: 0,
        max: 100
      }
    },
    ia_descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ia_tareas_sugeridas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ia_duracion_estimada: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ia_fecha_predicha: {
      type: DataTypes.DATE,
      allowNull: true,
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

export default Proyecto;