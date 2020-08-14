<template>
  <el-container class="auditPage">
    <el-main>
      <div>
        <h3>用户搜索历史查询</h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="114px">
          <el-form-item label="用户ID" prop="userId">
            <el-input v-model="formModel.userId" placeholder="请输入用户ID"/>
          </el-form-item>

          <el-form-item class="searchButton" label="">
            <el-button type="primary" @click="submitForm">查询</el-button>

          </el-form-item>
        </el-form>
      </div>

      <!-- 原生的el组件 -->
      <el-table :data="tableData" border style="width:100%">
        <el-table-column
          prop="userId"
          label="用户ID"
        />
        <el-table-column
          prop="searchContent"
          label="搜索词"
        />
        <el-table-column
          prop="searchSceneType"
          label="搜索场景"
        />
        <el-table-column
          prop="sceneEvent"
          label="场景事件"
        />
        <el-table-column
          prop="isExistResult"
          label="搜索结果"
        />
        <el-table-column
          prop="createTime"
          label="时间"
          width="250"
        />
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        :current-page="pageNum"
            @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="totalNumber"
/>
    </el-main>



  </el-container>

</template>

<script>
import searchService from '@api/searchManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
export default {
  data() {
    return {
      formModel: {
        userId: ''
      },
      formRule: {},

      tableData: [],
      // 页码
      pageNum: 1,
      pageSize: 10,
      totalNumber: 0
    }
  },
  methods: {
    submitForm() {
      this.pageNum = 1
      this.getTableData()
    },
    async getTableData() {
      let formData = {
        userId: this.formModel.userId
      }
      let data = objectTool.addValidPropertyToTarget({
        ...data,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      try {
        let res = await searchService.getSearchHistory(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.tableData = res.data.listRows
          this.tableData.forEach(item => {
            item.isExistResult = item.isExistResult === true ? '有':'无'
          })
          this.totalNumber = res.data.rowTotal
        } else {
          this.$notify.error({ message: '查询用户搜索历史失败' })
        }
      }catch (err) {
        console.log(err)
        this.$notify.error({ message: '查询用户搜索历史失败' })
      }
    },
    // 改变一页条目数
    handleSizeChange(size) {
      this.pageSize = size
      if (this.tableData.length === 0) { return }
      this.getTableData()
    },
    // 改变页码
    handleCurrentChange(num) {
      this.pageNum = num
      if (this.tableData.length === 0) { return }
      this.getTableData()
    }

  }
}
</script>

<style lang="scss" scoped>
form.el-form{
    margin-bottom: 25px;
}

h3{
    margin-bottom: 15px;
    button{
        margin-left:2em;
    }
}
.el-breadcrumb{
    line-height: 30px;
}
.el-dialog{
    .el-input{
        width: 260px;
    }
    /deep/ .el-input{
        width: 260px;
    }
    .el-select{
        width: 260px;
    }
    .el-cascader{
        width: 260px;
    }
}

</style>

