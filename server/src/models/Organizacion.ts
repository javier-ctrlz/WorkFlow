import db from "../db/connection";
import { DataTypes } from "sequelize";

const Organizacion = db.define(
  "organizaciones",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    plan: {
      type: DataTypes.STRING(50),
      defaultValue: 'gratuito',
      validate: {
        isIn: [['gratuito', 'profesional', 'empresarial']]
      }
    },
    estado: {
      type: DataTypes.STRING(20),
      defaultValue: 'activo',
      validate: {
        isIn: [['activo', 'suspendido', 'prueba', 'inactivo']]
      }
    },
    maximo_usuarios: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    maximo_proyectos: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    fecha_fin_prueba: {
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

export default Organizacion;