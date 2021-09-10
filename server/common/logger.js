const fs = require('fs')
const path = __dirname + '/../logger/'
const fileFormat = 'txt'

const writeLogger = (ctx) => {
  const time = new Date()
  const fileName = `${ path }${ time.getFullYear() }-${ time.getMonth() + 1 }-${ time.getDate() }.${ fileFormat }`
  const responseTime = `${ time.getHours() }:${ time.getMinutes() }:${ time.getSeconds() }`
  const fileExplain = `<=======================================================\n` +
  `* auth: server;\n` +
  `* time: ${ time.getFullYear() }-${ time.getMonth() + 1 }-${ time.getDate() } ${ responseTime };\n` +
  `* Purpose: log;\n` +
  `=======================================================>\r\n`

  fs.existsSync(fileName) || fs.writeFileSync(fileName, fileExplain)
  const log = `<=============${ responseTime }=============\n` +
  `username: ${ ctx.username || 'NULL' }\n` +
  `url: ${ ctx.url }\n` +
  `params: ${ JSON.stringify(ctx.request.body ? ctx.request.body : ctx.query) || 'NULL' }\n` +
  `response: ${ JSON.stringify(ctx.body) }\n` +
  `==================================>\r\n`
  fs.appendFileSync(fileName, log)
}

module.exports = writeLogger
