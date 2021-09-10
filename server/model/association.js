// 建立数据表联系
module.exports =  (models) => {
  models.user.hasMany(models.catalog, { foreignKey: 'userId' })
  models.catalog.belongsTo(models.user, { foreignKey: 'userId' })

  models.catalog.hasMany(models.web, { foreignKey: 'catalogId' })
  models.web.belongsTo(models.catalog, { foreignKey: 'catalogId' })
}