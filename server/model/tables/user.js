module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    withPassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // 最近登陆时间
    latestLoginTime: DataTypes.DATE,
    // 最近退出时间
    latestLogoutTime: DataTypes.DATE,
    // 上次登陆客户端的地址
    origin: DataTypes.STRING
  })
 }
