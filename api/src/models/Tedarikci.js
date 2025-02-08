const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Tedarikci = sequelize.define(
  'Tedarikci',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    tedarikci_adi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Tedarikçi adı zorunlu'
        }
      }
    },
    minimum_parti_buyuklugu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Minimum parti büyüklüğü zorunlu'
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
    modelName: 'Tedarikci',
    tableName: 'tedarikci',
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Tedarikci;
