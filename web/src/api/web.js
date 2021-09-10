import request from '@/utils/request'

export function setWeb(data) {
  return request({
    url: '/web/setWeb',
    method: 'post',
    data
  })
}

export function getWebs(data) {
  return request({
    url: '/web/getWebs',
    method: 'post',
    data
  })
}

export function removeWeb(data) {
  return request({
    url: '/web/removeWeb',
    method: 'post',
    data
  })
}

export function renameWeb(data) {
  return request({
    url: '/web/renameWeb',
    method: 'post',
    data
  })
}

export function changeLockStatus(data) {
  return request({
    url: '/web/changeLockStatus',
    method: 'post',
    data
  })
}
