const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Birim = require('./Birim');

const Malzeme = sequelize.define(
  'Malzeme',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    malzeme_adi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Malzeme adı zorunlu'
        }
      }
    },
    stok_seviyesi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stok seviyesi zorunlu'
        }
      }
    },
    kritik_stok_seviyesi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Kritik stok seviyesi zorunlu'
        }
      }
    },

    birim_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Birim,
        key: 'id'
      },
      validate: {
        notNull: {
          msg: 'Birim zorunlu'
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
    modelName: 'Malzeme',
    tableName: 'malzeme',
    createdAt: false,
    updatedAt: false
  }
);

Malzeme.belongsTo(Birim, {
  as: 'birim',
  foreignKey: 'birim_id',
  targetKey: 'id'
});

module.exports = Malzeme;
