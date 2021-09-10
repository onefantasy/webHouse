const router = require('koa-router')()
const crawler = require('../common/crawler.js')

// 数据库操作
const { catalog, web } = require('../model/index.js')

router.prefix('/web')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a web response!'
})

router.post('/setWeb', async (ctx, next) => {
  // crawler
  const params = ctx.request.body
  const res = await crawler(params.data.url)
  ctx.body = {
    code: 200,
    data: res,
    message: 'Test: crawler return value!'
  }
  // const params = ctx.request.body
  // const targetCatalog = await catalog.findOne({ where: { catalogId: params.catalogId } })
  // const res = await targetCatalog.createWeb(params.data)
  // ctx.body = {
  //   code: res ? 200 : 500,
  //   data: res,
  //   message: res ? 'createSuccess' : 'createFail'
  // }
})

router.post('/getWebs', async (ctx, next) => {
  const { withPassword } = ctx
  const params = ctx.request.body
  const targetCatalog = await catalog.findOne({ where: { catalogId: params.catalogId } })
  const where = {}
  withPassword || (where.isLock = false)
  const res = await targetCatalog.getWebs({ where })
  ctx.body = {
    code: res ? 200 : 500,
    message: res ? 'querySuccess' : 'queryFail',
    data: res
  }
})

router.post('/removeWeb', async (ctx, next) => {
  const params = ctx.request.body
  const res = await web.destroy({ where: { webId: params.webId } })
  ctx.body = {
    code: res ? 200 : 500,
    data: res,
    message: res ? 'removeSuccess' : 'removeFail'
  }
})

router.post('/renameWeb', async (ctx, next) => {
  const params = ctx.request.body
  await web.update({ webName: params.webName }, { where: { webId: params.webId } }).then(res => {
   ctx.body = {
      code: res ? 200 : 500,
      data: res,
      message: res ? 'updataSuccess' : 'updataFail'
    }
  })
})

router.post('/changeLockStatus', async (ctx, next) => {
  const params = ctx.request.body
  await web.update({ isLock: !params.isLock }, { where: { webId: params.webId } }).then(res => {
   ctx.body = {
      code: res[0] ? 200 : 500,
      data: res,
      message: res ? 'updataSuccess' : 'updataFail'
    }
  })
})

module.exports = router
