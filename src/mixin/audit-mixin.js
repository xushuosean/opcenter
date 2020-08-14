import AuditStatusBar from '@com/audit/AuditStatusBar.vue'
import AuditLog from '@com/audit/AuditLog.vue'
export default {
  components: { AuditStatusBar, AuditLog },
  methods: {
    // 整理过滤出需要的信息
    filterData(sourceData, dataBase) {
      if (!dataBase) {
        this.$message.error({ message: '目标数据库为空' })
        return
      }
      let res = sourceData.map(item => {
        if (item.keyList) {
          item.currentData = item.keyList.map(key => {
            return dataBase[key]
          })
        } else if (item.keyObj) {
          item.currentData = {}
          item.keyObj.forEach(key => {
            item.currentData[key] = dataBase[key]
          })
        } else if (item.keyBool) {
          // 若字段为布尔值则根据值为true/false来显示boolEnum中的对应true和false属性
          if (!item.boolEnum) { item.boolEnum = { true: '是', false: '否' } } // 设置默认值 “是”，“否”
          if (dataBase[item.keyBool]) {
            item.currentData = item.boolEnum.true
          } else if (dataBase[item.keyBool] == false) {
            item.currentData = item.boolEnum.false
          }
        } else if (item.keyEnum) {
          item.currentData = {}
          item.currentData.enumName = item.keyEnum
          item.currentData.enumValue = dataBase[item.keyEnum]
        } else if (item.key) {
          item.currentData = dataBase[item.key]
        } else {
          throw new Error('未识别的参数结构')
        }
        return item
      }
      )
      return res
    }
  }

}
