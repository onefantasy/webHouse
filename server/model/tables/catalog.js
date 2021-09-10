module.exports = (sequelize, DataTypes) => {
  return sequelize.define('catalog', {
    catalogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    catalogName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isLock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER
    }
  })
 }