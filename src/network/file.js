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

export function getMinioFileList() {
  return request({
    url: '/file/minio/list',
    method: 'get',

  })
}


export function uploadMinioFile(data) {
  return request({
    url: '/file/minio/upload',
    method: 'post',
    data: data,
  })
}

export function deleteFile(id) {
  return request({
    url: '/file/minio/delete',
    method: 'get',
    params: { id },
  })
}
export function downloadFile(id) {
  return request({
    url: '/file/minio/download',
    method: 'get',
    responseType: "blob",
    params: { id },
  })
}