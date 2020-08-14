import Service from '../config/service.config'

class searchManageService {
//  新增分词
  createDict(data) {
    return Service({
      url: '/searchManage/dict/createDict',
      method: 'post',
      data: data
    })
  }
  // 删除分词
  deleteDict(data) {
    return Service({
      url: `/searchManage/dict/delDict/${data.id}`,
      method: 'delete'
    })
  }
  // 查询分词列表
  getDictList(data) {
    return Service({
      url: '/searchManage/dict/getDictList',
      method: 'get',
      params: data
    })
  }
  // 修改分词
  updateDict(data) {
    return Service({
      url: '/searchManage/dict/updateDict',
      method: 'post',
      data: data
    })
  }

  // 查询用户搜索历史
  getSearchHistory(data) {
    return Service({
      url: '/searchManage/searchHistory/getSearchHistoryList',
      method: 'get',
      params: data
    })
  }

  // 新增同义词
  createSynonym(data) {
    return Service({
      url: '/searchManage/synonym/createSynonym',
      method: 'post',
      data: data
    })
  }
  // 查询同义词详情
  getSynonymInfo(data) {
    return Service({
      url: `/searchManage/synonym/getSynonymInfo/${data.id}`,
      method: 'get'

    })
  }
  // 删除同义词
  delSynonym(data) {
    return Service({
      url: `/searchManage/synonym/delSynonym/${data.id}`,
      method: 'delete'
    })
  }
  // 分页查询同义词
  getSynonymList() {
    return Service({
      url: '/searchManage/synonym/getSynonymList',
      method: 'get'
    })
  }

  // 修改同义词
  updateSynonym(data) {
    return Service({
      url: '/searchManage/synonym/updateSynonym',
      method: 'post',
      data: data
    })
  }

  // 根据ID查询搜索模板详情
  getSearchTemplateInfo(data) {
    return Service({
      url: `/searchManage/template/getSearchTemplateInfo/${data.id}`,
      method: 'get'
    })
  }

  // 分页查询搜索模板列表
  getSearchTemplateList(data) {
    return Service({
      url: '/searchManage/template/getSearchTemplateList',
      method: 'get',
      params: data
    })
  }
  // 新增搜索模板
  createSearchTemplate(data) {
    return Service({
      url: '/searchManage/template/createSearchTemplate',
      method: 'post',
      data: data
    })
  }
  // 根据代码查询搜索模板
  selectTemplateByCode(data) {
    return Service({
      url: `/searchManage/template/selectTemplateByCode/${data.code}`,
      method: 'get'
    })
  }
  // 修改模板
  updateSearchTemplate(data) {
    return Service({
      url: '/searchManage/template/updateSearchTemplate',
      method: 'post',
      data: data
    })
  }

  // 删除搜索模板
  delSearchTemplate(data) {
    return Service({
      url: `/searchManage/template/delSearchTemplate/${data.id}`,
      method: 'delete'
    })
  }

  // 新增热门搜索词
  createHotSearch(data) {
    return Service({
      url: '/searchManage/hotSearch/createHotSearch',
      method: 'post',
      data: data
    })
  }

  // 删除热门搜索词
  delHotSearch(data) {
    return Service({
      url: `/searchManage/hotSearch/delHotSearch/${data.id}`,
      method: 'delete'
    })
  }

  // 修改热门搜索词
  updateHotSearch(data) {
    return Service({
      url: '/searchManage/hotSearch/updateHotSearch',
      method: 'post',
      data: data
    })
  }

  // 查询热门搜索词详情
  getHotSearchInfo(data) {
    return Service({
      url: `/searchManage/hotSearch/getHotSearchInfo/${data.id}`,
      method: 'get',
      params: data
    })
  }

  // 分页查询热门搜索词
  getHotSearchList(data) {
    return Service({
      url: '/searchManage/hotSearch/getHotSearchList',
      method: 'get',
      params: data
    })
  }

  // 热门搜索词排序调整
  adjustSeq(data) {
    return Service({
      url: '/searchManage/hotSearch/adjustSeq',
      method: 'post',
      data: data
    })
  }
}

export default new searchManageService()
