import Service from '../config/service.config'

class PermissionService {
  queryPermissionList(data) {
    return Service({
      url: '/rbac/user/listUserPerm',
      method: 'get',
      params: data
    })
  }
}
export default new PermissionService()
