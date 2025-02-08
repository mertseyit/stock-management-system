const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Birim = sequelize.define(
  'Birim',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    birim_turu: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Birim türü zorunlu'
        }
      }
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    freezeTableName: true,
    modelName: 'Birim',
    tableName: 'birim',
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Birim;
