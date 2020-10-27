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

export function saveMenu(data) {
  return request({
    url: '/system/menu/addoredit',
    method: 'post',
    data: data
  })
}

export function deleteMenuById(id) {
  return request({
    url: '/system/menu/deleted',
    method: 'get',
    params: {
      id
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

export function getRoleAllMenu() {
  return request({
    url: '/system/all/role/menu',
    method: 'get'
  })
}

export function saveRoleMenu(data) {
  return request({
    url: '/system/save/role/menu',
    method: 'post',
    data: data
  })
}




export function roleMenuList(roleId) {
  return request({
    url: '/system/role/menu',
    method: 'get',
    params: {
      roleId
    }
  })
}

