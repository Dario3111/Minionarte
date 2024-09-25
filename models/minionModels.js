import connection_db from '../database/connection_db.js';
import { DataTypes } from 'sequelize';

const MinionModel = connection_db.define(
  'Meme',  // Nombre del modelo, que corresponde a la tabla 'memes'
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false,  // Permite que el campo sea opcional
    },
    imagen: {
      type: DataTypes.STRING(2083),  // Tamaño máximo de URL para imagen
      allowNull: false,  // Permite que el campo sea opcional
    },
  },
  {
    timestamps: false,  // Deshabilita los timestamps automáticos
    tableName: 'memes',  // Especifica explícitamente el nombre de la tabla
  }
);

export default MinionModel;