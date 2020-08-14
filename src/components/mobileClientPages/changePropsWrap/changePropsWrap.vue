<template>
  <div class="changePropsWrap">
    <div class="changePropsTitle">
      <span v-if="mode !='structure'">组件配置</span>
      <el-button v-if="mode ==='structure'" type="danger" @click="handleDelCpt">删除组件</el-button>
    </div>
    <div class="changePropsCont">
      <component :is="componentName+'Form'" :edit-props="editProps" @on-submit="submitComponentForm" />
    </div>
  </div>
</template>
<script>
import contentService from '@api/contentManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
export default {
  name: 'ChangeProps',
  props: {
    handleChangeProps: {
      type: Function,
      default: null
    },
    editProps: {
      type: Object,
      default: () => ({})
    },
    pushMsg: {
      type: Function,
      default: null
    },
    componentName: {
      type: String,
      default: ''
    },
    componentData: {
      type: Object,
      default: () => ({})
    },
    mode: {
      type: String,
      default: ''
    },
    /**
     * 页面所属站点
     */
    cityCode: {
      type: Number,
      default: null
    },
    /**
     * 页面类型
     */
    pageType: {
      type: String,
      default: ''
    }
  },
  methods: {
    /**
     * 保存组件数据
     */
    async saveComponentsData(data, props) {
      delete data.key
      const { uuid, component } = data
      return new Promise(async(resolve, reject) => {
        try {
          let res = await contentService.saveComponentsData({
            cityCode: this.cityCode,
            pageType: this.pageType,
            compNo: uuid,
            compType: component,
            compDataJson: data
          })
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.$message.success('保存成功')
            resolve(true)
          } else {
            this.$message.error('查询页面结构发生错误')
            resolve(false)
          }
        } catch (e) {
          console.log(e)
          reject(e)
        }
      })
    },
    /**
     * 删除组件
     */
    handleDelCpt: function() {
      this.$confirm('是否删除该组件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.pushMsg({
          type: 'delCpt'
        })
      }).catch(() => {
        // 取消
      })
    },
    /** 保存配置的信息 */
    async submitComponentForm(data) {
      this.handleChangeProps(data)
      let result = await this.saveComponentsData(this.componentData, data)
      // 保存成功，刷新页面
      if (result) {
        this.$emit('renderPage')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.changePropsWrap {
  padding: 0 16px;
  flex: 1;
  .changePropsTitle {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .changePropsCont {

    .changePropsItem {
      margin-top: 6px;

      .propsTypeWrap {
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 6px 8px;
        margin-top: 6px;

        &:first-child {
          margin-top: 0;
        }
      }
      .changePropsItemKey {
        height: 40px;
        line-height: 40px;
      }
      .propsTypeArrayAdd {
        width: 100%;
        margin-top: 10px;
      }
      .propsTypeArrayItemWrap {
        position: relative;
        margin-top: 6px;

        &:first-child {
          margin-top: 0;
        }
        .propsTypeArrayItemRemove {
          position: absolute;
          right: 0;
          top: 0;
          width: 24px;
          height: 24px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
