const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Malzeme = require('./Malzeme');
const Birim = require('./Birim');
const Tedarikci = require('./Tedarikci');

const StokIslemi = sequelize.define(
  'StokIslemi',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    malzeme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Malzeme,
        key: 'id'
      },
      validate: {
        notNull: {
          msg: 'Malzeme zorunlu'
        }
      }
    },
    islem_tarihi: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        notNull: {
          msg: 'İşlem Tarihi'
        }
      }
    },
    stok_miktari: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stok miktarı zorunlu'
        }
      }
    },
    islem_turu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'İşlem türü zorunlu'
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
    tedarikci_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tedarikci,
        key: 'id'
      },
      validate: {
        notNull: {
          msg: 'Tedarikçi zorunlu'
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
    modelName: 'StokIslemi',
    tableName: 'stok_islemi',
    createdAt: false,
    updatedAt: false
  }
);

StokIslemi.belongsTo(Malzeme, {
  as: 'malzeme',
  foreignKey: 'malzeme_id',
  targetKey: 'id'
});

StokIslemi.belongsTo(Birim, {
  as: 'birim',
  foreignKey: 'birim_id',
  targetKey: 'id'
});

StokIslemi.belongsTo(Tedarikci, {
  as: 'tedarikci',
  foreignKey: 'tedarikci_id',
  targetKey: 'id'
});

module.exports = StokIslemi;
