import request from '@/utils/request'

export function exportHtml() {
  return request({
    url: '/html/exportHtml',
    method: 'post'
  })
}

export function importHtml(data) {
  return request({
    url: '/html/importHtml',
    method: 'post',
    data
  })
}
