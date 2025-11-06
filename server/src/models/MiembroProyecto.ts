import db from "../db/connection";
import { DataTypes } from "sequelize";

const MiembroProyecto = db.define(
  "miembros_proyecto",
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
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(50),
      defaultValue: 'miembro',
      validate: {
        isIn: [['propietario', 'gestor', 'miembro', 'observador']]
      }
    },
    agregado_en: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    agregado_por: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default MiembroProyecto;