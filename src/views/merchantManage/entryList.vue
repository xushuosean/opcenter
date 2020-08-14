<template>
  <el-container class="container-box">
    <el-main>
      <el-card class="el-card-mt20" shadow="hover">
        <div class="page-title">
          <h3>进件记录</h3>
        </div>
        <el-form ref="componentForm" class="component-form" :model="componentForm" label-width="96px">
          <el-row :gutter="10" class="el-row-mt20">
            <el-col :span="8">
              <el-form-item label="进件类别">
                <el-select v-model="componentForm.entryType" :clearable="true" size="medium" placeholder="请选择进件类别">
                  <el-option label="全部" value="all" />
                  <el-option label="正常" value="normal" />
                  <el-option label="过期" value="outofdate" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="进件状态">
                <el-select v-model="componentForm.entryState" :clearable="true" size="medium" placeholder="请选择进件状态">
                  <el-option label="全部" value="all" />
                  <el-option label="正常" value="normal" />
                  <el-option label="过期" value="outofdate" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态">
                <el-select v-model="componentForm.entryAuditState" :clearable="true" size="medium" placeholder="请选择审核状态">
                  <el-option label="全部" value="all" />
                  <el-option label="正常" value="normal" />
                  <el-option label="过期" value="outofdate" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="经营类别">
                <el-select v-model="componentForm.businessType" :clearable="true" size="medium" placeholder="请选择经营类别">
                  <el-option label="全部" value="all" />
                  <el-option label="正常" value="normal" />
                  <el-option label="过期" value="outofdate" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商户名称" class="el-form-item-flex">
                <el-input v-model="componentForm.belongBusinessName" :clearable="true" size="medium" placeholder="请输入商户名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商户编号" class="el-form-item-flex">
                <el-input v-model="componentForm.belongBusinessNumber" :clearable="true" size="medium" placeholder="请输入商户编号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item class="el-form-item-flex" label="门店名称">
                <el-input v-model="componentForm.storeName" :clearable="true" size="medium" placeholder="请输入门店名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="el-form-item-flex" label="门店编号">
                <el-input v-model="componentForm.storeNumber" :clearable="true" size="medium" placeholder="请输入门店编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="进件时间" class="el-form-item-flex">
                <el-date-picker
                  v-model="componentForm.createTime"
                  type="daterange"
                  size="medium"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属地区">
                <el-cascader :props="belongAreaProps" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属分行机构" class="el-form-item-flex">
                <el-cascader :props="branchOfficeProps" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="el-form-item-flex" label="业务员编号">
                <el-input v-model="componentForm.sellerNumber" :clearable="true" size="medium" placeholder="请输入门店名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-button type="primary" style="margin-left:96px;">查询</el-button>
              <el-button type="primary">导出表格</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="el-card-mt20" shadow="hover">
        <el-table
          :data="componentTableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="incomingTypeShow"
            label="进件类别"
            width="120"
            fixed
          />
          <el-table-column
            prop="auditStatus"
            label="审核状态"
          />
          <el-table-column
            prop="merchantName"
            width="100"
            label="商户名称"
          />
          <el-table-column
            prop="merchantId"
            label="商户编号"
          />
          <el-table-column
            prop="shopName"
            label="门店名称"
          />
          <el-table-column
            prop="shopId"
            label="门店编号"
          />
          <el-table-column
            prop="areaStr"
            label="所属地区"
          />
          <el-table-column
            prop="bizClassesId"
            label="经营类别"
          />
          <el-table-column
            prop="orgStr"
            label="所属分行机构"
            width="100"
          />
          <el-table-column
            prop="clerkNo"
            label="业务员编号"
            width="100"
          />
          <el-table-column
            prop="incomingTime"
            label="进件时间"
          />
          <el-table-column
            prop="createTime"
            label="操作"
            width="220"
          >
            <template>
              <el-button
                size="mini"
              >编辑</el-button>
              <el-button
                size="mini"
              >详情</el-button>
              <el-button
                size="mini"
              >关闭</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-size="pageSizes"
          layout="sizes, prev, pager, next, total,jumper"
          :page-sizes="[10, 20, 30]"
          :total="total"
        />
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import multilevelSelection from '@com/multilevelSelection/multilevelSelection.vue'
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@store/mutation-types.js'
import merchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import { merchantCooperType, merchantAuditStatus, merchantIncomingType, merchantStatus } from '@enum/merchantManage-enum.js'
let id = 0
export default {
  data() {
    return {
      routeMeta: {},
      componentForm: {
        entryType: '', // 进件类别
        entryState: '', // 进件状态
        entryAuditState: '', // 审核状态
        businessType: '', // 经营类别
        belongBusinessName: '', // 所属商户名称
        belongBusinessNumber: '', // 所属商户编号
        storeName: '', // 门店姓名
        storeNumber: '', // 门店编号
        entryTime: '', // 进件时间
        belongArea: '', // 所属地区
        branchOffice: '', // 所属分行机构
        sellerNumber: '' // 业务员编号
      },
      belongAreaProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      },
      branchOfficeProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      },
      componentTableData: [
        {
          entryType: '商户快速进件',
          entryState: '未提交',
          entryAuditState: '待初审',
          storeName: '星巴克(百联世纪)',
          storeNumber: '123456',
          belongBusinessName: '金拱门(中国)有限公司',
          belongBusinessNumber: '123456789',
          belongArea: '福建省福州市xx区',
          businessType: '餐饮类',
          branchOffice: '上海分行-徐汇区-xx网点',
          sellerNumber: '012345',
          entryTime: '2018/09/28'
        }
      ],
      pageSizes: [10, 20, 30],
      total: 0,
      pageSize: 10,
      currentPage: 1 // 当前列表的页数
    }
  },
  watch: {
    // 页码改变,重新查询
    currentPage() {
      console.log(this.currentPage)
      this.queryTableData(this.currentPage)
    }
  },
  mounted() {
    this.queryTableData(1)
  },
  methods: {
    queryTableData(currentPage) {
      const params = {// 参数未写完全
        ...this.componentForm,
        pageSize: this.pageSize,
        pageNum: currentPage
      }
      this.$refs['componentForm'].validate(async(valid) => {
        if (valid) {
          try {
            const responseData = await merchantManageService.selectIncomingList(
              params
            )
            if (responseData.resultCode === AjaxReturnType.SUCCESS) {
              this.componentTableData = responseData.data.listRows
              this.componentTableData.forEach(item => {
                if (item.incomingType === 'NORMAL') {
                  item.incomingTypeShow = '商户普通进件'
                }
              })
              this.total = responseData.data.rowTotal
            } else {
              this.$message.error(responseData.resultMsg)
            }
          } catch (error) {
            this.$message.error('查询进件列表发生错误')
            console.log(error)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container-box{
    .page-title{
        display:flex;
        align-items:center;
        h3{
            margin-right:20px;
            line-height:40px;
        }
    }
    .el-form-item__content{
        flex:1;
        .el-date-editor{
            width:100% !important;
        }
    }
    /deep/.el-form-item__label{
        white-space: nowrap;
    }
    .el-pagination{
        text-align:center;
        margin-top:20px;
    }
}
</style>
