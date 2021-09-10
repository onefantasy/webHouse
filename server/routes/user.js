const router = require('koa-router')()
// token 
const token = require ('../common/jwt.js')
// 引入bcryptjs 对密码进行加密解密
const bcrypt = require('bcryptjs');

// 数据库操作
const { user } = require('../model/index.js')
const Op = require('sequelize').Op

router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a user response!'
})

// 用户注册
router.post('/register', async (ctx, next) => {
  const params = ctx.request.body
  // 加密用的盐
  const slat = bcrypt.genSaltSync(10)
  // 插入数据库时，对密码进行加密
  params.password = bcrypt.hashSync(params.password, slat)
  params.role = params.role || 'guest'
  const targetUser = await user.findOne({ where: { username: params.username } })
  if (targetUser) {
    ctx.body = {
      code: 103,
      message: 'userIsEXist'
    }
    return false
  }
  const res = await user.create(params)
  ctx.body = {
    code: res ? 200 : 104,
    data: res,
    message: res ? 'createSuccess' : 'createFail'
  }
})

// 登录验证
router.post('/login', async (ctx, next) => {
  const params = ctx.request.body
  const data = await user.findOne({
    where: {
      username: {
        [Op.eq]: `${params.username}`
      }
    }
  })
  if (!data) {
    ctx.body = {
      code: 404,
      message: 'userNotExist'
    }
    return false
  }
  const withPassword = !!params.password
  if (withPassword && !bcrypt.compareSync(params.password, data.password)) {
    // 对密码进行校验，如果不对，则返回下面语句
    ctx.body = {
      code: 103,
      message: 'passwordError'
    }
    return false
  }
  // 对密码进行校验，如果密码正确，则返回下面语句
  const latestLoginTime = Date.now()
  await data.update({ latestLoginTime, origin: ctx.header.origin, withPassword })
  const tag = token.create({ username: params.username, latestLoginTime })
  ctx.body = {
    code: 200,
    message: 'loginSuccess',
    data: { token: tag }
  }
})

// // 获取用户信息
// router.get('/info', async (ctx, next) => {
//   const params = ctx.username
//   // 查询要设置信息的账户是否存在
//   const res = await user.findOne({
//     where: {
//       username: {
//         [Op.eq]: `${params}`
//       }
//     },
//     attributes: { exclude: ['password'] }
//   })
//   ctx.body = {
//     code: res ? 200 : 404,
//     message: res ? '查询成功' : '不存在该用户',
//     data: res
//   }
// })

// // 设置用户信息
// router.post('/setInfo', async (ctx, next) => {
//   const params = ctx.request.body
//   // 查询要设置信息的账户是否存在
//   const user = await user.findOne({
//     where: {
//       username: {
//         [Op.eq]: `${ctx.username}`
//       }
//     }
//   })
//   // 如果不存在此账户，则说明不存在
//   if (!user) {
//     ctx.body = {
//       code: 404,
//       message: '不存在该用户'
//     }
//     return false
//   }
//   // 更新数据
//   const res = await user.update(params, {
//     where: {
//       username: ctx.username
//     }
//   })

//   ctx.body = {
//     code: res ? 200 : 500,
//     message: res ? '更新成功' : '更新失败'
//   }
// })

// 退出登陆
router.get('/logout', async (ctx, next) => {
  const { username } = ctx
  const targetUser = await user.findOne({ where: { username } })
  const latestLogoutTime = Date.now()
  const res = await targetUser.update({ latestLogoutTime, withPassword: false })
  ctx.body = {
    code: res ? 200 : 500,
    message: res ? 'logoutSuccess' : 'logoutFail'
  }
})

// // 更改密码
// router.post('/changePassword', async (ctx, next) => {
//   const params = ctx.request.body
//   const user = await user.findOne({ where: { username: ctx.username } })
//   if (!user) {
//     ctx.body = {
//       code: 404,
//       message: '不存在此账号'
//     }
//     return false
//   }
//   if (!bcrypt.compareSync(params.old, user.password)) {
//     ctx.body = {
//       code: 103,
//       message: '旧密码不正确！'
//     }
//     return false
//   } else {
//     // 加密用的盐
//     const slat = bcrypt.genSaltSync(10)
//     // 插入数据库时，对密码进行加密
//     params.newOne = bcrypt.hashSync(params.newOne, slat)
//     const res = await user.update({ password: params.newOne })
//     ctx.body = {
//       code: res ? 200 : 103,
//       message: res ? '更新成功' : '更新失败'
//     }
//   }
// })

// // 管理员：强制更换密码
// router.post('/adminChangePassword', async (ctx, next) => {
//   const params = ctx.request.body
//   // 加密用的盐
//   const slat = bcrypt.genSaltSync(10)
//   // 插入数据库时，对密码进行加密
//   const password = bcrypt.hashSync(params.password, slat)
//   const res = await user.update({ password }, { where: { username: params.username } })
//   ctx.body = {
//     code: res ? 200 : 103,
//     message: res ? '更新成功' : '更新失败'
//   }
// })

// // 管理员：更换账号身份
// router.post('/adminChangeRole', async (ctx, next) => {
//   const params = ctx.request.body
//   const where = { username: params.username }
//   const res = await user.update({ role: params.role }, { where })
//   ctx. body = {
//     code: res ? 200 : 103,
//     message: res ? '更新成功' : '更新失败'
//   }
// })

// // 管理员：删除账号
// router.post('/adminDeleteusername', async (ctx, next) => {
//   const params = ctx.request.body
//   const where = { username: params.username }
//   const res = await user.destroy({ where })
//   ctx.body = {
//     code: res ? 200 : 103,
//     message: res ? '删除成功' : '删除失败'
//   }
// })

// // 获取用户列表
// router.get('/userList', async (ctx, next) => {
//   const params = ctx.query
//   const searchKeys = ['username', 'name', 'number', 'role']
//   const where = {}
//   searchKeys.map(item => {
//     params[item] && (where[item] = { [Op.substring]: params[item] })
//   })
//   const { rows: data, count: total } = await user.findAndCountAll({
//     where,
//     offset: (+params.page - 1) * +params.pageSize,
//     limit: +params.pageSize,
//     order: [
//       ['createdAt', 'DESC']
//     ],
//     attributes: { exclude: ['password'] }
//   })
//   const flag = !!data
//   ctx.body = {
//     code: flag ? 200 : 104,
//     message: flag ? '查询成功' : '查询失败',
//     data,
//     total
//   }
// })

module.exports = router
