module.exports = (sequelize, DataTypes) => {
  return sequelize.define('web', {
    webId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    catalogId: {
      type: DataTypes.INTEGER,
    },
    webName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    iconUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isLock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
 }