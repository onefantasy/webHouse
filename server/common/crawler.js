/**
 * 本函数用于爬取网站的ico、title
 * 1.使用第三方插件superagent进行网络请求；
 * 2.使用第三方插件cheerio进行dom解析
 */

const request = require('superagent')
const cheerio = require('cheerio')

const crawler = async (url) => {
  let returnValue = await request.get(url).then(res => {
    const $ = cheeiro.load(res)
    return { icon: false }
  }).catch(err => err)
  console.log('crawler_res:', returnValue)
  return returnValue
}

module.exports = crawler
