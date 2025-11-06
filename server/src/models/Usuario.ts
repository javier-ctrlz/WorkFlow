import db from "../db/connection";
import { DataTypes } from "sequelize";

const Usuario = db.define(
  "usuarios",
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nombre_completo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(50),
      defaultValue: 'miembro',
      validate: {
        isIn: [['admin', 'gestor_proyecto', 'miembro']]
      }
    },
    avatar_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    departamento: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    puesto_trabajo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    biografia: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    email_verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ultimo_login: {
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

export default Usuario;