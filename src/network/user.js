import request from './request'

export function userList(data) {
  return request({
    url: '/user/page/list',
    method: 'post',
    data: data
  })
}
// export function userList(userName) {
//   return request({
//     url: '/user/list',
//     method: 'get',
//     params: {
//       userName
//     }
//   })
// }
export function saveUser(data) {
  return request({
    url: '/user/addoredit',
    method: 'post',
    data: data
  })
}


export function deleteUserById(id) {
  return request({
    url: '/user/deleted',
    method: 'get',
    params: {
      id
    }
  })
}