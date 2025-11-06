import db from "../db/connection";
import { DataTypes } from "sequelize";

const Tarea = db.define(
  "tareas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    organizacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(50),
      defaultValue: 'pendiente',
      validate: {
        isIn: [['pendiente', 'en_progreso', 'en_revision', 'completada']]
      }
    },
    prioridad: {
      type: DataTypes.STRING(20),
      defaultValue: 'media',
      validate: {
        isIn: [['baja', 'media', 'alta', 'urgente']]
      }
    },
    asignado_a: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creado_por: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completado_en: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    horas_estimadas: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    horas_reales: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    ia_descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ia_prioridad_recomendada: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ia_duracion_predicha: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    ia_fecha_predicha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    columna_kanban: {
      type: DataTypes.STRING(50),
      defaultValue: 'pendiente',
      validate: {
        isIn: [['pendiente', 'en_progreso', 'en_revision', 'completada']]
      }
    },
    posicion_kanban: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    etiquetas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    adjuntos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    esta_archivada: {
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

export default Tarea;