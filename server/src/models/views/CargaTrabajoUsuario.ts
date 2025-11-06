import db from "../../db/connection";
import { DataTypes } from "sequelize";

const CargaTrabajoUsuario = db.define(
  "carga_trabajo_usuarios",
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre_completo: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
    },
    organizacion_id: {
      type: DataTypes.INTEGER,
    },
    rol: {
      type: DataTypes.STRING(50),
    },
    departamento: {
      type: DataTypes.STRING(100),
    },
    total_tareas_asignadas: {
      type: DataTypes.INTEGER,
    },
    tareas_activas: {
      type: DataTypes.INTEGER,
    },
    tareas_pendientes: {
      type: DataTypes.INTEGER,
    },
    tareas_completadas: {
      type: DataTypes.INTEGER,
    },
    tareas_vencidas: {
      type: DataTypes.INTEGER,
    },
    total_horas_estimadas: {
      type: DataTypes.DECIMAL(10, 2),
    },
    total_horas_reales: {
      type: DataTypes.DECIMAL(10, 2),
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default CargaTrabajoUsuario;