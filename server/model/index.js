const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const fs = require('fs')
const { sql } = require('../config.js')
const createAssociation = require('./association')

// 数据库配置
const sequelize = new Sequelize(sql.database, sql.user, sql.password, {
  host: sql.host,
  dialect: 'mysql',
  port: sql.port,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define:{
    //是否冻结表名,最好设置为true，要不sequelize会自动给表名加上复数s造成查询数据失败。
    freezeTableName: true,
    // 是否为表添加 createdAt 和 updatedAt 字段
    // createdAt 记录表的创建时间
    // updatedAt 记录字段更新时间
    timestamps: true,
    // 是否为表添加 deletedAt 字段
    // 在日常开发中删除数据记录是一大禁忌，因此我们删除数据并不会真正删除，而是为他添加
    // deletedAt字段
    paranoid: true
  },
  timezone: '+08:00' // 时区配置
})

// 自动导入数据库表模型
const tables = fs.readdirSync('./model/tables')
const models = tables.reduce((models, table) => {
  const tableName = table.replace(/(.*)\.\w+$/, '$1')
  models[tableName] = sequelize.import(`${__dirname}/tables/${tableName}.js`)
  return models
}, {})

// 连接数据库
sequelize
  .authenticate()
  .then(() => {
    console.log('MYSQL 连接成功......')
  })
  .catch(err => {
    console.error('链接失败:', err)
  })

// 根据模型自动创建表
sequelize
  .sync({ alter: true })
  .then(async () => {
    const user = models && models.user
    if (!user) {
      console.error('管理员创建失败:', '不存在用户列表！')
      return false
    }
    // 创建管理员账号 开始
    await user.findOne({ where: { role: 'admin' } }).then(res => {
      if (!res) {
        // 如果不存在管理员账号，则创建
        // 插入数据库时，对密码进行加密
        const slat = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync('admin123', slat)
        user.create({
          username: 'admin',
          password,
          role: 'admin'
        }).then(() => console.log('管理员创建成功！'))
      } else {
        console.log('管理员已存在！')
      }
    })
    // 创建管理员账号 结束
    // 创建数据表联系
    createAssociation(models)
  })
  .catch(err => {
    console.error('错误:', err)
  })

module.exports = {
  sequelize,
  ...models
}
