import request from './request'


export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}

export function regUser(data) {
  return request({
    url: '/register',
    method: 'post',
    data: data
  })
}

export function getImageList(data) {
  return request({
    url: '/file/image/list',
    method: 'post',
    data: data
  })
}



