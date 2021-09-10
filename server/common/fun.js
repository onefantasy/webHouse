// 实现分页的函数
const pageData = (data, page, pageSize) => {
   const res = {data: [], total: 0}
   // 不是数组，直接返回
   if (!Array.isArray) return res
   // 查询的索引不在数组中，直接返回
   const start_page = (page - 1) * pageSize
   let end_page = start_page + pageSize
   if (start_page > data.length || end_page < 0) return res
   end_page > data.length && (end_page = data.length) 
   return {data: data.slice(start_page, end_page), total: data.length}
}

module.exports = {
  pageData
}