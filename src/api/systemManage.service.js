import Service from '../config/service.config'

class systemManageService {
  // 地址（省市区）列表查询（新增站点用）
  getRegions(data) {
    return Service({
      url: '/site/region.json',
      method: 'get',
      params: data
    })
  }
  // 查询某一地区的站点列表
  querySiteList(data) {
    return Service({
      url: '/site/querySiteList.json',
      method: 'get',
      params: data
    })
  }
  // 新增站点
  insertSite(data) {
    return Service({
      url: '/site/insertSite.json',
      method: 'post',
      data: data
    })
  }
  // 查询站点详细信息
  querySite(data) {
    return Service({
      url: '/site/querySite.json',
      method: 'get',
      params: data
    })
  }
  // 编辑-修改站点
  updateSite(data) {
    return Service({
      url: '/site/updateSite.json',
      method: 'post',
      data: data
    })
  }

  // 删除站点
  deleteSite(data) {
    return Service({
      url: '/site/deleteSite.json',
      method: 'post',
      data: data
    })
  }

  // 查询机构树
  queryOrgTree() {
    return Service({
      url: '/org/queryOrgTree.json',
      method: 'get'

    })
  }
  // 查询机构列表
  queryOrgList(data) {
    return Service({
      url: '/org/queryOrgList.json',
      method: 'get',
      params: data
    })
  }

  //  新增机构
  insertOrg(data) {
    return Service({
      url: '/org/insertOrg.json',
      method: 'post',
      data: data
    })
  }

  // 机构修改
  updateOrg(data) {
    return Service({
      url: '/org/updateOrg.json',
      method: 'post',
      data: data
    })
  }

  // 机构删除
  deleteOrg(data) {
    return Service({
      url: '/org/deleteOrg.json',
      method: 'post',
      data: data
    })
  }

  // 下属机构查询
  queryChildList(data) {
    return Service({
      url: '/org/queryChildList.json',
      method: 'get',
      params: data
    })
  }

  // 等级内机构列表查询
  queryLevelList(data) {
    return Service({
      url: '/org/queryLevelList',
      method: 'get',
      params: data
    })
  }

  // 权限树列表查询（所有的权限）
  queryPermissionTree(data) {
    return Service({
      url: '/systemMan/role/queryPermissionTree.json',
      method: 'get',
      params: data
    })
  }

  // 角色列表查询
  queryRoleList(data) {
    return Service({
      url: '/systemMan/role/queryRoleList.json',
      method: 'get',
      params: data
    })
  }
  // 角色列表导出
  exportRoleList(data) {
    return Service({
      url: '/systemMan/role/exportRoleList.json',
      method: 'get',
      params: data
    })
  }

  // 角色新增
  insertRole(data) {
    return Service({
      url: '/systemMan/role/insertRole.json',
      method: 'post',
      data: data
    })
  }
  // 角色信息修改
  UpdateRole(data) {
    return Service({
      url: '/systemMan/role/UpdateRole.json',
      method: 'post',
      data: data
    })
  }

  // 角色权限查询
  queryRolePermission(data) {
    return Service({
      url: '/systemMan/role/queryRolePermission.json',
      method: 'get',
      params: data
    })
  }
  // 角色权限修改
  updateRolePermission(data) {
    return Service({
      url: '/systemMan/role/updateRolePermission.json',
      method: 'post',
      data: data
    })
  }

  // 删除角色
  deleteRole(data) {
    return Service({
      url: '/systemMan/role/deleteRole.json',
      method: 'post',
      data: data
    })
  }

  // 查询门店类别树
  getShopCateTree(data) {
    return Service({
      url: '/shopCate/getShopCateTree.json',
      method: 'get',
      params: data
    })
  }

  // 查询门店子类列表
  getChildrenList(data) {
    return Service({
      url: '/shopCate/getChildrenList.json',
      method: 'get',
      params: data
    })
  }
  // 新增门店类别
  addShopCat(data) {
    return Service({
      url: '/shopCate/add.json',
      method: 'post',
      data: data
    })
  }
  // 编辑门店类别
  updateShopCat(data) {
    return Service({
      url: '/shopCate/update.json',
      method: 'post',
      data: data
    })
  }
  // 删除门店类别
  delelteShopCat(data) {
    return Service({
      url: '/shopCate/delete.json',
      method: 'post',
      data: data
    })
  }

  // 修改门店类别排序
  changeShopCatSort(data) {
    return Service({
      url: '/shopCate/changeSort.json',
      method: 'post',
      data: data
    })
  }

  // 地区下属商圈列表查询
  queryBizAreaList(data) {
    return Service({
      url: '/bizArea/queryBizAreaList.json',
      method: 'get',
      params: data
    })
  }

  // 商圈新增
  BizAreaInsert(data) {
    return Service({
      url: '/bizArea/BizAreaInsert.json',
      method: 'post',
      data: data
    })
  }

  // 商圈修改
  updateBizArea(data) {
    return Service({
      url: '/bizArea/updateBizArea.json',
      method: 'post',
      data: data
    })
  }

  // 商圈删除
  deleteBizArea(data) {
    return Service({
      url: '/bizArea/deleteBizArea.json',
      method: 'post',
      data: data
    })
  }

  // 商圈详细信息查询
  getBizAreaInfo(data) {
    return Service({
      url: '/bizArea/getBizAreaInfo.json',
      method: 'post',
      data: data
    })
  }
  // 账户新增-账号管理
  addUser(data) {
    return Service({
      url: '/systemMan/user/addUser.json',
      method: 'post',
      data: data
    })
  }
  // 账户列表查询-账号管理
  queryUserList(data) {
    return Service({
      url: '/systemMan/user/queryUserList.json',
      method: 'get',
      params: data
    })
  }
  // 账户信息查询-账号管理
  queryUser(data) {
    return Service({
      url: '/systemMan/user/queryUser.json',
      method: 'post',
      data: data
    })
  }
  // 账户信息修改-账号管理
  updateUser(data) {
    return Service({
      url: '/systemMan/user/updateUser.json',
      method: 'post',
      data: data
    })
  }
  // 密码重置-账号管理
  updateUserPassword(data) {
    return Service({
      url: '/systemMan/user/updateUserPassword.json',
      method: 'post',
      data: data
    })
  }

  // 账户删除-账号管理
  deleteUser(data) {
    return Service({
      url: '/systemMan/user/deleteUser.json',
      method: 'post',
      data: data
    })
  }
  // 菜单列表查询-菜单管理
  queryMenuTree(data) {
    return Service({
      url: '/systemMan/role/queryPermissionTree.json',
      method: 'get',
      params: data
    })
  }
  // 子菜单列表查询-菜单管理
  queryChildPermsList(data) {
    return Service({
      url: '/systemMan/perm/queryChildPermsList.json',
      method: 'get',
      params: data
    })
  }
  // 权限新增-菜单管理
  addPerm(data) {
    return Service({
      url: '/systemMan/perm/addPerm.json',
      method: 'post',
      data: data
    })
  }
  // 编辑权限-菜单管理
  updatePerm(data) {
    return Service({
      url: '/systemMan/perm/updatePerm.json',
      method: 'post',
      data: data
    })
  }
  // 权限信息查询-菜单管理
  queryPermInfo(data) {
    return Service({
      url: '/systemMan/perm/queryPermInfo.json',
      method: 'get',
      params: data
    })
  }
  // 权限删除-菜单管理
  deletePerm(data) {
    return Service({
      url: '/systemMan/perm/deletePerm.json',
      method: 'post',
      params: data
    })
  }
}

export default new systemManageService()

