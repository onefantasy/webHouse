import request from '@/utils/request'

export function setCatalog(data) {
  return request({
    url: '/catalog/setCatalog',
    method: 'post',
    data
  })
}

export function getCatalogs() {
  return request({
    url: '/catalog/getCatalogs',
    method: 'get'
  })
}

export function removeCatalog(data) {
  return request({
    url: '/catalog/removeCatalog',
    method: 'post',
    data
  })
}

export function renameCatalog(data) {
  return request({
    url: '/catalog/renameCatalog',
    method: 'post',
    data
  })
}

export function changeLockStatus(data) {
  return request({
    url: '/catalog/changeLockStatus',
    method: 'post',
    data
  })
}
