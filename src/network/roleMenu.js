import request from './request'

export function getHomeList() {
  return request({
    url: '/system/menu/home/list',
    method: 'get'
  })
}

export function getMenuList(menuName) {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: {
      menuName
    }
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
