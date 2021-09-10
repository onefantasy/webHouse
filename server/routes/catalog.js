const router = require('koa-router')()

// 数据库操作
const { user, catalog } = require('../model/index.js')
const Op = require('sequelize').Op

router.prefix('/catalog')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a catalog response!'
})

router.post('/setCatalog', async (ctx, next) => {
  const params = ctx.request.body
  const { username } = ctx
  const targetUser = await user.findOne({ where: { username } })
  const isExist = await targetUser.getCatalogs({ where: { catalogName: params.catalogName } })
  console.log('catalog_hasCatalog:', targetUser)
  console.log('catalog_is_exist:', isExist)
  if (isExist[0]) {
    ctx.body = {
      code: 500,
      message: 'catalogIsExist'
    }
    return false
  }
  const res = await targetUser.createCatalog({
    catalogName: params.catalogName,
    isLock: params.isLock
  })
  ctx.body = {
    code: res ? 200 : 500,
    data: res,
    message: res ? 'createSuccess' : 'createFail'
  }
})

router.get('/getCatalogs', async (ctx, next) => {
  const { username, withPassword } = ctx
  const targetUser = await user.findOne({ where: { username } })
  const where = {}
  withPassword || (where.isLock = false)
  const res = await targetUser.getCatalogs({ where })
  ctx.body = {
    code: res ? 200 : 500,
    message: res ? 'querySuccess' : 'queryFail',
    data: res
  }
})

router.post('/removeCatalog', async (ctx, next) => {
  const params = ctx.request.body
  const targetCatalog = await catalog.findOne({ where: { catalogId: params.catalogId } })
  const webs = await targetCatalog.getWebs()
  for (const web of webs) {
    await web.destroy()
  }
  const res = await targetCatalog.destroy()
  ctx.body = {
    code: res ? 200 : 500,
    data: res,
    message: res ? 'removeSuccess' : 'removeFail'
  }
})

router.post('/renameCatalog', async (ctx, next) => {
  const params = ctx.request.body
  await catalog.update({ catalogName: params.catalogName }, { where: { catalogId: params.catalogId } }).then(res => {
   ctx.body = {
      code: res ? 200 : 500,
      data: res,
      message: res ? 'updataSuccess' : 'updataFail'
    }
  })
})

router.post('/changeLockStatus', async (ctx, next) => {
  const params = ctx.request.body
  await catalog.update({ isLock: !params.isLock }, { where: { catalogId: params.catalogId } }).then(res => {
   ctx.body = {
      code: res[0] ? 200 : 500,
      data: res,
      message: res ? 'updataSuccess' : 'updataFail'
    }
  })
})

module.exports = router
