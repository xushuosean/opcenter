<template>
  <div :class="['relation-container-box',type==='EDIT'?'margin20':'']">
    <el-card class="el-card-mt20" shadow="hover">
      <el-collapse v-model="activeName">
        <el-collapse-item name="merchantRelation">
          <template slot="title">
            <span v-if="type==='EDIT'">编辑"{{ merchantName }}"的</span>
            <h3 class="head-title">商户关联关系<el-button v-if="type==='SHOW'" type="primary" size="small" style="margin-left:48px;" @click.stop="editMerRelation">编辑商户关联关系</el-button></h3>
          </template>
          <merRelationTree
            :type="type"
            :mer-relation-tree="type==='EDIT'?merRelationTreeUPD:merRelationTree"
            @delMerRelation="delMerRelation"
          />
          <selectTableData
            v-if="type==='EDIT'"
            ref="selectTableData"
            class="select-table"
            :searched-list="searchedList"
            :selected-list="handledSelectedList.allChildIds"
            @on-search="searchMerbyCondition"
            @on-selection-change="handleSelectionChange"
            @on-delete="deleteRow"
          >
            <template slot="searchedListTitle">
              <h3 class="title">新增子级关系:</h3>
            </template>
            <template slot="searchedList">
              <el-table-column type="selection" />
              <el-table-column prop="merchantName" label="全选" />
            </template>
            <template slot="selectedListTitle">
              <h3 class="title">{{ merchantName }}的商户关系编辑记录:</h3>
            </template>
            <template slot="selectedList">
              <el-table-column prop="opreateStatusName" />
              <el-table-column prop="merchantName" />
              <el-table-column prop="merchantId" />
            </template>
          </selectTableData>
        </el-collapse-item>
      </el-collapse>
      <el-row v-if="type==='EDIT'" class="el-row-flex">
        <el-button type="primary" size="medium" @click="cancle">
          取消返回
        </el-button>
        <el-button style="margin-left:24px;" type="primary" size="medium" @click="merRelateAndSubAudit">
          确认并审核
        </el-button>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import merRelationTree from '@com/treeComponent/merRelationTree.vue'
import selectTableData from '@com/selectTableData/selectTableData'
import MerchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
export default {
  // 商户关联关系
  name: 'MerchantRelation',
  components: { merRelationTree, selectTableData },
  props: {
    // 组件用途：分编辑关联关系(EDIT)与显示关联关联(SHOW)
    type: {
      type: String,
      default: 'EDIT'
    },
    // 关联关系树
    merRelationTree: {
      type: Object,
      default: () => ({})
    },
    // 详情页商户id
    merchantId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeName: ['merchantRelation'],
      // 商户名称
      merchantName: '',
      // 商户id
      merId: '',
      // 变更状态下数据
      merRelationTreeUPD: {},
      // 搜索结果
      searchedList: [],
      // 选择结果
      selectedList: []
    }
  },
  computed: {
    // 处理选择结果数据
    handledSelectedList() {
      let addChildIds = this.selectedList.filter(e => e.opreateStatusCode == 'ADD')
      let delChildIds = this.selectedList.filter(e => e.opreateStatusCode == 'DELETE')
      addChildIds.map((e, i) => {
        e.opreateStatusName = `新增子级商户${i + 1}`
      })
      delChildIds.map((e, i) => {
        e.opreateStatusName = `移除子级商户${i + 1}`
      })
      return {
        addChildIds: addChildIds.map(e => e.merchantId),
        delChildIds: delChildIds.map(e => e.merchantId),
        allChildIds: [...addChildIds, ...delChildIds]
      }
    }
  },
  created() {
    if (this.type === 'EDIT') {
      this.merId = this.$route.query.merchantId
      this.queryMerRelationTree()
    }
  },
  methods: {
    // 编辑商户关联关系
    editMerRelation() {
      this.$router.push({
        name: 'merchantRelation',
        query: {
          merchantId: this.merchantId
        }
      })
    },
    // 查询商户关联关系
    async queryMerRelationTree() {
      try {
        let res = await MerchantManageService.merRelationTree({
          merchantId: this.merId
        })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          if (res.data != null) {
            this.merRelationTreeUPD = res.data
            this.merchantName = res.data.merchantName
            // 为根节点指定标识
            this.$set(this.merRelationTreeUPD, 'root', true)
          } else {
            this.$message.error('暂无数据')
          }
        } else {
          this.$message.error('查询商户关联关系失败')
        }
      } catch (e) {
        this.$message.error('查询商户关联关系发生错误')
        console.log(e)
      }
    },
    // 根据商户名称商户编号查询商户
    async searchMerbyCondition(data) {
      try {
        let res = await MerchantManageService.merByCondition({
          keyword: data
        })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          if (res.data != null) {
            this.searchedList = res.data
          } else {
            this.$message.error('暂无数据')
          }
        } else {
          this.$message.error('查询商户失败')
        }
      } catch (e) {
        this.$message.error('查询商户发生错误')
        console.log(e)
      }
    },
    // 表格勾选
    handleSelectionChange(selection) {
      // 加入选择项
      selection.forEach(item => {
        let check = this.selectedList.find(j => {
          if (j.merchantId === item.merchantId) { return true }
        })
        if (!check) {
          // 新增商户标识 ADD
          item.opreateStatusCode = 'ADD'
          this.selectedList.unshift(item)
        }
      })
      // 未勾选项
      let unselectedList = this.searchedList.filter(item => {
        let check = selection.find(j => {
          if (j.merchantId === item.merchantId) { return true }
        })
        if (!check) { return true }
      })
      // 滤除未选项
      this.selectedList = this.selectedList.filter(item => {
        let check = unselectedList.find(j => {
          if (j.merchantId === item.merchantId) { return true }
        })
        if (!check) { return true }
      })
    },
    // 删除选择项
    deleteRow(index, row) {
      this.selectedList.map((e, i) => {
        if (e.merchantId === row.merchantId) {
          this.selectedList.splice(i, 1)
          this.$nextTick(() => {
            this.$refs['selectTableData'].echoSearchList()
          })
        }
      })
    },
    // 解除商户关系
    delMerRelation(data) {
      let check = this.selectedList.find(j => {
        if (j.merchantId === data.merchantId) { return true }
      })
      if (!check) {
        // 删除商户标识 DELETE
        data.opreateStatusCode = 'DELETE'
        this.selectedList.unshift(data)
      } else {
        this.$message.warning('不能重复添加')
      }
    },
    // 取消返回
    cancle() {
      this.$router.go(-1)
    },
    // 提交审核
    async merRelateAndSubAudit() {
      try {
        let request = {
          merchantId: this.merId,
          addChildIds: this.handledSelectedList.addChildIds,
          delChildIds: this.handledSelectedList.delChildIds,
          auditObjId: '',
          auditObjType: 'MERCHANT',
          changeType: 'MER_RELATION'
        }
        let res = await MerchantManageService.merRelateAndSubAudit(request)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success('提交审核成功')
        } else {
          this.$message.error('提交审核失败')
        }
      } catch (e) {
        this.$message.error('提交审核发生错误')
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.margin20{
  margin:20px;
}
.title{
    margin-top:24px;
    font-size:13px;
}
.el-row-flex{
  display: flex;
  justify-content: center;
  margin-top:24px;
}
.relation-container-box{
  overflow: hidden;
}
.select-table{
  margin-top:24px;
}
/deep/.el-collapse{
    border:none !important;
}
/deep/.el-collapse-item__header{
    border:none;
    font-size: inherit;
}
/deep/.el-collapse-item__wrap{
    border:none;
}
/deep/.el-collapse-item__content{
    font-size:inherit;
}
/deep/.el-collapse{
    border:none !important;
}
/deep/.el-collapse-item__header{
    border:none;
}
/deep/.el-collapse-item__wrap{
    border:none;
}
.container-box{
    .head-title{
        margin-right:20px;
        line-height:40px;
        font-size:16px;
    }
    .page-title{
        display:flex;
        align-items:center;
    }
}
</style>
