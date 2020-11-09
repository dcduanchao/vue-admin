import request from './request'

export function getImageList() {
  return request({
    url: '/file/image/list',
    method: 'get',

  })
}

export function uploadFile(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data: data,


  })
}

