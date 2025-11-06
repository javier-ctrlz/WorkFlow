import db from "../../db/connection";
import { DataTypes } from "sequelize";

const TareaDetallada = db.define(
  "tareas_detalladas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(500),
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    estado: {
      type: DataTypes.STRING(50),
    },
    prioridad: {
      type: DataTypes.STRING(20),
    },
    columna_kanban: {
      type: DataTypes.STRING(50),
    },
    posicion_kanban: {
      type: DataTypes.INTEGER,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
    },
    fecha_vencimiento: {
      type: DataTypes.DATE,
    },
    completado_en: {
      type: DataTypes.DATE,
    },
    horas_estimadas: {
      type: DataTypes.DECIMAL(6, 2),
    },
    horas_reales: {
      type: DataTypes.DECIMAL(6, 2),
    },
    creado_en: {
      type: DataTypes.DATE,
    },
    actualizado_en: {
      type: DataTypes.DATE,
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
    },
    proyecto_nombre: {
      type: DataTypes.STRING(255),
    },
    proyecto_estado: {
      type: DataTypes.STRING(50),
    },
    organizacion_id: {
      type: DataTypes.INTEGER,
    },
    organizacion_nombre: {
      type: DataTypes.STRING(255),
    },
    usuario_asignado_id: {
      type: DataTypes.INTEGER,
    },
    usuario_asignado_nombre: {
      type: DataTypes.STRING(255),
    },
    usuario_asignado_email: {
      type: DataTypes.STRING(255),
    },
    usuario_asignado_avatar: {
      type: DataTypes.STRING(500),
    },
    usuario_creador_id: {
      type: DataTypes.INTEGER,
    },
    usuario_creador_nombre: {
      type: DataTypes.STRING(255),
    },
    usuario_creador_email: {
      type: DataTypes.STRING(255),
    },
    ia_descripcion: {
      type: DataTypes.TEXT,
    },
    ia_prioridad_recomendada: {
      type: DataTypes.STRING(20),
    },
    ia_fecha_predicha: {
      type: DataTypes.DATE,
    },
    ia_duracion_predicha: {
      type: DataTypes.DECIMAL(6, 2),
    },
    cantidad_comentarios: {
      type: DataTypes.INTEGER,
    },
    cantidad_etiquetas: {
      type: DataTypes.INTEGER,
    },
    estado_urgencia: {
      type: DataTypes.STRING(20),
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default TareaDetallada;