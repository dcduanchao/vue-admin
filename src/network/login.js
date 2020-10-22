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

export function getMenuList() {
  return request({
    url: '/menu/list',
    method: 'get'
  })
}

export function getRoleList(roleName) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: {
      roleName
    }
  })
}


export function saveRole(data) {
  return request({
    url: '/system/role/addoredit',
    method: 'post',
    data: data
  })
}


export function deleteRoleById(id) {
  return request({
    url: '/system/role/deleted',
    method: 'get',
    params: {
      id
    }
  })
}
