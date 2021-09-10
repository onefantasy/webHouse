const router = require('koa-router')()

// 数据库操作
const { user, catalog, web } = require('../model/index.js')

router.prefix('/html')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a web response!'
})

router.post('/exportHtml', async (ctx, next) => {
  const where = {}
  const { withPassword } = ctx
  withPassword || (where.isLock = false)
  const res = await user.findAll({
    attributes: ['username'],
    where: { username: ctx.username },
    include: [{
      model: catalog,
      attributes: ['catalogName'],
      where,
      include: [{
        model: web,
        attributes: ['webName', 'url', 'iconUrl']
      }]
    }]
  })
  ctx.body = {
    code: res ? 200 : 500,
    message: res ? 'exportSuccess' : 'exportFail',
    data: res
  }
})

router.post('/importHtml', async (ctx, next) => {
  const params = ctx.request.body
  const { username } = ctx
  const targetUser = await user.findOne({ where: { username } })
  const catalogs = Object.keys(params)
  for (let i = 0, lenOfCatalogs = catalogs.length; i < lenOfCatalogs; i++) {
    const catalogName = catalogs[i]
    const catalogId = await targetUser.getCatalogs({ where: { catalogName } })
    const targetCatalog = catalogId[0] ? await catalog.findOne({ where: { catalogId: catalogId[0].catalogId } }) : await targetUser.createCatalog({ catalogName, isLock: false })
    const webs = await web.bulkCreate(params[catalogName])
    targetCatalog.addWebs(webs)
  }
  ctx.body = {
    code: 200,
    message: 'createSuccess'
  }
})

module.exports = router
