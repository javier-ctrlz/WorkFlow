import db from "../../db/connection";
import { DataTypes } from "sequelize";

const EstadisticasProyecto = db.define(
  "estadisticas_proyectos",
  {
    proyecto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    proyecto_nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    organizacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_tareas: {
      type: DataTypes.INTEGER,
    },
    tareas_completadas: {
      type: DataTypes.INTEGER,
    },
    tareas_en_progreso: {
      type: DataTypes.INTEGER,
    },
    tareas_vencidas: {
      type: DataTypes.INTEGER,
    },
    total_miembros: {
      type: DataTypes.INTEGER,
    },
    porcentaje_progreso: {
      type: DataTypes.DECIMAL(5, 2),
    },
    proyecto_estado: {
      type: DataTypes.STRING(50),
    },
    proyecto_prioridad: {
      type: DataTypes.STRING(20),
    },
    fecha_limite: {
      type: DataTypes.DATE,
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

export default EstadisticasProyecto;