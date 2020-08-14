<template>
  <el-container class="auditPage">
    <el-main>
      <div>
        <h3>用户端页面审核</h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="114px">
          <el-form-item label="用户端站点" prop="clientSite">
            <el-cascader v-model="formModel.clientSite" :options="clientSiteOptions" />
          </el-form-item>

          <el-form-item label="审核状态" prop="auditState">
            <el-select v-model="formModel.auditState">
              <el-option label="全部" value="allStatus" />
              <el-option label="待初审" value="forFirstAudit" />
              <el-option label="待终审" value="forLastAudit" />
            </el-select>
          </el-form-item>
          <el-form-item label="编辑页面" prop="editedPage">
            <el-select v-model="formModel.editedPage">
              <el-option label="全部" value="allPages" />
              <el-option label="本地优惠首页" value="localDiscountHomePage" />
              <el-option label="优惠券展示页" value="ticketDisplayPage" />
              <el-option label="附近优惠展示页" value="nearbyDiscountDisplayPage" />
            </el-select>
          </el-form-item>
          <el-form-item label="编辑区域" prop="editedArea">
            <el-select v-model="formModel.editedArea">
              <el-option label="全部" value="allAreas" />
            </el-select>
          </el-form-item>
          <el-form-item class="timeRange" label="提交审核时间" prop="submitDate">
            <el-date-picker
              v-model="formModel.submitDate"
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

      <el-table :data="tableData" border size="small" style="width:100%">
        <el-table-column
          size="small"
          prop="clientSite"
          label="用户端站点"
        />
        <el-table-column
          prop="editedPage"
          label="编辑页面"
        />
        <el-table-column
          prop="editedArea"
          label="编辑区域"
        />
        <el-table-column
          prop="firstAuditPersonId"
          label="初审人"
          width="120"
        />
        <el-table-column
          prop="finalAuditPersonId"
          label="终审人"
          width="120"
        />
        <el-table-column
          prop="auditState"
          label="审核状态"
          width="120"
        />
        <el-table-column
          prop="submitTime"
          label="提交审核时间"
        />
        <el-table-column
          width="100"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              v-if="beforeAuditStatus.includes(scope.row.auditState)"
              size="mini"
              @click="handleAudit(scope,scope.$index, scope.row)"
            >审核</el-button>
            <el-button
              v-if="afterAuditStatus.includes(scope.row.auditState)"
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
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        background
        :total="totalNumber"
      />
    </el-main>
  </el-container>

</template>

<script>
export default {
  data() {
    return {
      clientSiteOptions: [{ label: '选项1', value: '1', children: [{ label: '子选项1-1', value: '1-1' }, { label: '子选项1-2', value: '1-2' }] }],
      formModel: {
        clientSite: '',
        auditState: '',
        editedPage: '',
        editedArea: '',
        submitDate: ''

      },
      formRule: {},
      tableData: [
        {
          clientSite: '福建省福州市',
          editedPage: '附近优惠展示页',
          editedArea: '上部banner（区域1）',
          firstAuditPersonId: '无',
          finalAuditPersonId: '无',
          auditState: '待初审',
          submitTime: '2018/09/28 10:00'
        },
        {
          clientSite: '福建省福州市',
          editedPage: '附近优惠展示页',
          editedArea: '上部banner（区域1）',
          firstAuditPersonId: '无名',
          finalAuditPersonId: '12345',
          auditState: '审核通过',
          submitTime: '2018/09/28 10:00'
        }
      ],
      beforeAuditStatus: ['待初审', '待终审'],
      afterAuditStatus: ['审核通过', '审核不通过']

    }
  },
  methods: {

    submitForm() {},
    handleAudit(scope, index, row) {
      this.$router.push('/audit/clientPageAudit/ClientPageAuditF')
    },
    viewDetails() {
      this.$router.push('/audit/clientPageAudit/ClientPageAuditDetail')
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    download() {}
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

</style>

