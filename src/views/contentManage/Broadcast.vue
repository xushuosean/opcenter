<template>
  <el-container class="auditPage">
    <el-main>
      <div>
        <h3>平台广播 <el-button class="addMessage" @click="addMessage">+发布消息</el-button></h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="114px">
          <el-form-item label="消息名称" prop="newsName">
            <el-input v-model="formModel.newsName" placeholder="请输入消息名称" />
          </el-form-item>
          <el-form-item label="消息流水号" prop="newsId">
            <el-input v-model="formModel.merchantCode" placeholder="请输入消息流水号" />
          </el-form-item>

          <el-form-item label="消息状态" prop="newsStates">
            <el-select v-model="formModel.newsStates">
              <el-option label="全部" value="all" />
              <el-option label="待初审" value="beforeFirstAudit" />
              <el-option label="待终审" value="beforeFinalAudit" />
              <el-option label="审核不通过" value="failedAudit" />
              <el-option label="已发布" value="passedAudit" />
            </el-select>
          </el-form-item>
          <el-form-item label="发布者姓名" prop="publisherName">
            <el-input v-model="formModel.publisherName" placeholder="请输入发布者姓名" />
          </el-form-item>
          <el-form-item label="接收者" class="receiver-select" prop="receiverType">
            <el-select v-model="formModel.receiverType">
              <el-option label="全部商家" value="allMerchant" />
              <el-option label="指定商家" value="specilfiedMerchant" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="formModel.receiverType=='specilfiedMerchant'" class="receiver-input" prop="merchantName">
            <el-input v-model="formModel.merchantName" placeholder="请输入商户名称" />
          </el-form-item>
          <el-form-item class="timeRange" label="创建时间" prop="createDate">
            <el-date-picker
              v-model="formModel.createDate"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>

          <el-form-item class="searchButton" label=" ">
            <el-button type="primary" @click="submitForm">查询</el-button>
            <el-button type="primary" @click="download">导出表格</el-button>
          </el-form-item>

        </el-form>
      </div>

      <el-table :data="tableData" border style="width:100%">

        <el-table-column
          prop="newsId"
          label="消息流水号"
        />
        <el-table-column
          prop="newsName"
          label="消息名称"
        />
        <el-table-column
          prop="receiver"
          label="接收者"
        />
        <el-table-column
          prop="publisherName"
          label="发布者姓名"
          width="120"
        />
        <el-table-column
          prop="publisherId"
          label="发布者编号"
          width="120"
        />
        <el-table-column
          prop="newsState"
          label="消息状态"
          width="120"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
        />
        <el-table-column
          width="100"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="viewDetails(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="1"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="totalNumber"
        @size-change="handlePageSizeChange"
        @current-change="handlePageChange"
      />
    </el-main>
  </el-container>

</template>

<script>
import { AjaxReturnType } from '../../enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
import contentManageService from '@api/contentManage.service.js'
// import Trans from '@/enum/auditEnum.js' 已删除

export default {
  data() {
    return {
      formModel: {
        newsName: '',
        newsId: '',
        publisherName: '',
        receiverType: '',
        merchantName: '',
        newsStates: '',
        createDate: ''
      },
      formRule: {
        merchantName: [{ required: true, message: '请输入商户名', trigger: 'blur' }]
      },
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalNumber: 0
    }
  },
  watch: {
    formModel: {
      handler() { this.formChanged = true },
      deep: true
    }
  },
  methods: {

    submitForm() {
      console.log(this.$refs['form'])
      this.pageNum = 1
      this.formChanged = false
      this.getTableData()
    },

    async getTableData() {
      try { await this.$refs.form.validate() } catch (e) { console.log(e); return }
      let formData = {
        newsName: this.formModel.newsName,
        newsId: this.formModel.newsId,
        publisherName: this.formModel.publisherName,
        receiverType: this.formModel.receiverType,
        merchantName: this.formModel.merchantName,
        newsStates: this.formModel.newsStates,
        createTimeStart: this.formModel.createDate[0],
        createTimeEnd: this.formModel.createDate[1]
      }
      var data = objectTool.addValidPropertyToTarget(
        {
          ...formData,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      )
      try {
        var res = await contentManageService.listNews(data)

        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.sourceTableData = res.data.listRows
          this.tableData = this.sourceTableData.slice()
          this.tableData.forEach(
            item => {
              item.newsState = Trans.transAuditStateToChinse(item.newsState)
            })
          this.totalNumber = res.data.rowTotal
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询平台消息失败'
          })
          console.error(res)
        }
      } catch (err) {
        console.log(err)
        this.$notify.error({
          titile: '错误', message: '查询平台消息时发生错误'
        })
      }
    },

    viewDetails() {
      this.$router.push('/contentManage/broadcast/MessageDetail')
    },
    // 换页
    handlePageChange(num) {
      this.pageNum = num
      if (this.tableData.length === 0) { return }
      if (this.formChanged) {
        this.$notify.error({ title: '不合法操作', message: '表单数据改变，请重新查询' })
        return
      }
      this.getTableData()
    },
    // 换每页条目
    handlePageSizeChange(size) {
      this.pageSize = size
      if (this.tableData.length === 0) { return }
      if (this.formChanged) {
        this.$notify.error({ title: '不合法操作', message: '表单数据改变，请重新查询' })
        return
      }
      this.getTableData()
    },
    download() {},
    addMessage() {
      this.$router.push('/contentManage/broadcast/AddMessage')
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
}
.el-breadcrumb{
    line-height: 30px;
}
.el-form-item.receiver-input{margin-left:0px}
.addMessage{
    margin-left: 2em
}

</style>

