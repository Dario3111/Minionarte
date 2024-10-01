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
      validate:{
        notEmpty:{ msg: 'El título no puede estar vacío'},
        len:{args:[1, 50], msg:'El título debe tener entre 1 y 50 caracteres'},
      }
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false, 
      validate:{
        notEmpty:{ msg: 'La descripción no puede estar vacío'},
        len:{args:[1, 50], msg:'La descripción debe tener entre 1 y 50 caracteres'},
      }
    },
    url: {
      type: DataTypes.STRING(2083),  // Tamaño máximo de URL para imageUrl
      allowNull: false, 
      validate:{
        notEmpty:{ msg: 'La url de la imagen no puede estar vacío'},
        isUrl:{msg:'Debe ser una URL válida'},
      }
    },
  },
  {
    timestamps: false,  // Deshabilita los timestamps automáticos
    tableName: 'memes',  // Especifica explícitamente el nombre de la tabla
  }
);

export default MinionModel;