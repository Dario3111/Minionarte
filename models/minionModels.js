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
    title: {
      type: DataTypes.STRING (50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(2083),
      allowNull: false, 
    },
    imageUrl: {
      type: DataTypes.STRING(2083),  // Tamaño máximo de URL para imageUrl
      allowNull: false, 
    },
  },
  {
    timestamps: false,  // Deshabilita los timestamps automáticos
    tableName: 'memes',  // Especifica explícitamente el nombre de la tabla
  }
);

export default MinionModel;