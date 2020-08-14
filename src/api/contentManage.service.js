import Service from '../config/service.config'
class ContentManageService {
  // 用户端结构信息查询
  queryPageStructure(data) {
    return Service({
      url: '/content/pageStru/getDetail.json',
      method: 'get',
      params: data
    })
  }
  // 用户端页面数据查询
  queryPageContent(data) {
    return Service({
      url: '/content/page/getPageContent.json',
      method: 'get',
      params: data
    })
  }
  // 用户端页面组件信息保存
  saveComponentsData(data) {
    return Service({
      url: '/content/pageData/save.json',
      method: 'post',
      data
    })
  }
  // 用户端页面组件信息查询
  queryComponentsData(data) {
    return Service({
      url: '/content/pageData/getDetail.json',
      method: 'get',
      params: data
    })
  }
}
export default new ContentManageService()
