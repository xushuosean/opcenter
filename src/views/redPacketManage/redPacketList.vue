<template>
  <el-container class="container-box">
    <el-main>
      <el-card class="el-card-mt20" shadow="hover">
        <div class="page-title">
          <h3>红包列表</h3>
        </div>
        <el-form ref="componentForm" class="component-form" :model="componentForm" label-width="96px">
          <el-row :gutter="10" class="el-row-mt20">
            <el-col :span="8">
              <el-form-item label="红包名称">
                <el-input v-model="componentForm.rpkName" :clearable="true" size="medium" placeholder="请输入票券名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="红包类型">
                <el-select v-model="componentForm.rpkType" :clearable="true" size="medium" placeholder="请选择票券类型">
                  <el-option label="全部" value="" />
                  <el-option label="满减红包" value="FULLREDUCE" />
                  <el-option label="折扣红包" value="DISCOUNT" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="红包批次号">
                <el-input v-model="componentForm.rpkId" :clearable="true" size="medium" placeholder="请输入票券批次号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="红包状态">
                <el-select v-model="componentForm.rpkStatus" :clearable="true" size="medium" placeholder="请选择票券状态">
                  <el-option label="全部" value="all" />
                  <el-option label="正常" value="normal" />
                  <el-option label="过期" value="outofdate" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态">
                <el-select v-model="componentForm.currentAuditState" :clearable="true" size="medium" placeholder="请选择审核状态">
                  <el-option label="全部" value="all" />>
                  <el-option label="创建待初审" value="FIRSTAUDIT" />
                  <el-option label="创建待终审" value="FINALAUDIT" />
                  <el-option label="创建审核通过" value="PASS" />
                  <el-option label="创建审核不通过" value="NOTPASS" />
                  <el-option label="变更待初审" value="U_FIRSTAUDIT" />
                  <el-option label="变更待终审" value="U_FINALAUDIT" />
                  <el-option label="变更审核通过" value="U_PASS" />
                  <el-option label="变更审核不通过" value="U_NOTPASS" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="适用门店名称">
                <el-input v-model="componentForm.storeName" :clearable="true" size="medium" placeholder="请输入适用门店名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="创建时间">
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
            <el-col :span="8">
              <el-form-item label="有效期限">
                <el-date-picker
                  v-model="componentForm.maxEffectTime"
                  type="daterange"
                  size="medium"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="适用门店编号">
                <el-input v-model="componentForm.storeNumber" :clearable="true" size="medium" placeholder="请输入适用门店编号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-button type="primary" style="margin-left:96px;" @click="submitForm">查询</el-button>
              <el-button type="primary" @click="download">导出表格</el-button>
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
            prop="rpkName"
            label="红包名称"
            width="120"
            fixed
          />
          <el-table-column
            prop="rpkId"
            label="红包批次号"
            width="150"
          />
          <el-table-column
            prop="shopName"
            label="适用门店名称"
            width="150"
          />
          <el-table-column
            prop="rpkType"
            width="100"
            label="类型"
          />
          <el-table-column
            prop="stock"
            label="总库存"
          />
          <el-table-column
            prop="ticketUsed"
            label="已获取"
          />
          <el-table-column
            prop="ticketDestory"
            label="已核销"
          />
          <el-table-column
            prop="rpkStatus"
            label="红包状态"
          />
          <el-table-column
            prop="currentAuditState"
            label="审核状态"
            width="150"
          />
          <el-table-column
            prop="createTime"
            width="150"
            label="创建时间"
          />
          <el-table-column
            prop="maxEffectTime"
            width="150"
            label="有效期限"
          />
          <el-table-column
            label="操作"
            width="260"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
              >详情</el-button>
              <el-button
                size="mini"
              >上架</el-button>
              <el-button
                size="mini"
              >变更日志</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-size="100"
          layout="sizes, prev, pager, next, total,jumper"
          :page-sizes="[10, 20, 30]"
          :total="1000"
          :current-page.sync="pageNum"
           @current-change="handleCurrentChange"
        />
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@store/mutation-types'
import rpkManage from '@api/rpkManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
let id = 0
export default {
  data() {
    return {
      routeMeta: {},
      componentForm: {
        rpkName: '', // 票券名称
        rpkType: null, // 票券类型
        rpkId: '', // 票券批次号
        shopName: '', // 适用门店名称
        currentAuditState: '', // 票券状态
        achieveType: '', // 获取方式
        producerType: '', // 票券生成方
        shopId: '', // 适用门店编号
        facePrice: '', // 票券面额
        currentAuditState: '', // 审核状态
        createTime: '', // 创建时间
        maxEffectTime: ''// 有效期限
      },
      componentTableData: [
        {
          rpkName: '',
          rpkId: '',
          shopName: '',
          rpkType: '',
          producerType: '',
          ticketRule: '',
          facePrice: '',
          currentPrice: '',
          stock: '',
          ticketUsed: '',
          ticketDestory: '',
          currentAuditState: '',
          currentAuditState: '',
          createTime: '',
          maxEffectTime: ''
        }
      ],
      // 页码
      pageNum: 1,
      pageSize: 10,
      rowTotal: 0
    }
  },
  methods: {
    submitForm() {
      this.$refs.componentForm.validate(vali => {
        if (vali) {
          this.pageNum = 1
          this.pageSize = 10
          //   this.formChanged = false
          this.getTableData()
        }
      })
    },
    async getTableData() {
      // const flag = await this.$refs.form.validate()

      // if (!flag) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }
      try { await this.$refs.componentForm.validate() } catch (err) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }

      var formData = {
        rpkName:this.componentForm.rpkName,
        rpkType:this.componentForm.rpkType,
        rpkId:this.componentForm.rpkId,
        rpkStatus:this.componentForm.rpkStatus,
        shopName:this.componentForm.shopName,
        currentAuditState:this.componentForm.currentAuditState,
        achieveType:this.componentForm.achieveType,
        shopName:this.componentForm.shopName,
        maxEffectStartTime:this.componentForm.maxEffectTime[0],
        maxEffectEndTime:this.componentForm.maxEffectTime[1],
        shopId:this.shopId,
        createStartTime:this.componentForm.createTime[0],
        createEndTime:this.componentForm.createTime[1],
        producerType:this.componentForm.producerType
      }
      console.log("data")
      console.log(formData)
      // 将值为空的属性值剔除掉
      var _formData = formData
      for (let k in _formData) {
        if (_formData[k] == '') {
          delete _formData[k]
        }
      }
      var data = objectTool.addValidPropertyToTarget(
        {
          body: {
            ..._formData,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }
      )
      try {
        var res = await rpkManage.getRpkList(data)
        console.log(res.header.returnCode)
        if (res.header.returnCode === AjaxReturnType.SUCCESS) {
          this.componentTableData = []
          var _componentTableData = []
          _componentTableData = res.body.rpkList
          if (_componentTableData == null) {
            return
          }
          _componentTableData.forEach(e => {
            //票券类型
            if (e.rpkType == 'FULLREDUCE') {
              e.rpkType = '满减红包'
            } else if (e.rpkType == 'DISCOUNT') {
              e.rpkType = '折扣红包'
            }

            //获取规则
            if (e.achieveType == 'GET') {
              e.achieveType = '领取'
            } else if (e.achieveType == 'GRANT') {
              e.achieveType = '发放'
            }
            

            //审核状态
            if (e.currentAuditState == 'FIRSTAUDIT') {
              e.currentAuditState = '创建待初审'
            } else if (e.currentAuditState == 'FINALAUDIT') {
              e.currentAuditState = '创建待终审'
            } else if (e.currentAuditState == 'EDIT') {
              e.currentAuditState = '编辑'
            } else if (e.currentAuditState == 'PASS') {
              e.currentAuditState = '创建审核通过'
            } else if (e.currentAuditState == 'NOTPASS') {
              e.currentAuditState = '创建审核不通过'
            } else if (e.currentAuditState == 'U_FIRSTAUDIT') {
              e.currentAuditState = '变更待初审'
            } else if (e.currentAuditState == 'U_FINALAUDIT') {
              e.currentAuditState = '变更待终审'
            } else if (e.currentAuditState == 'U_PASS') {
              e.currentAuditState = '变更审核通过'
            } else if (e.currentAuditState == 'U_NOTPASS') {
              e.currentAuditState = '变更审核不通过'
            }
            this.componentTableData.push(e)

          })
          // sourceTableData.forEach(item => {
          //   item.rpkName = rpkName
          //   item.auditStateShow = this.$AUDIT_STATUS_OBJ[item.auditState]
          //   item.displayStatusShow = discountPayEnum.displayStatus[item.displayStatus]
          //   if (item.totalStock === -1) { item.totalStock = '无限制' }
          // })

          // this.tableData = sourceTableData
          this.rowTotal = res.body.rowTotal
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询优惠买单审核信息失败'
          })
          console.error(res)
        }
      } catch (err) {
        console.error(err)
        this.$notify.error({
          titile: '错误', message: '查询优惠买单审核信息时发生错误'
        })
      }
    },
    // 页数改变时触发
    handleCurrentChange() {
      this.getTableData()
    },
    download() {
      var formData = {
        rpkName: this.componentForm.rpkName,
        rpkType: this.componentForm.rpkType,
        rpkId:this.componentForm.rpkId,
        currentAuditState:this.componentForm.currentAuditState,
        achieveType:this.componentForm.achieveType,
        shopName:this.componentForm.shopName,
        facePrice:this.componentForm.facePrice,
        maxEffectTime:this.componentForm.maxEffectTime,
        maxEffectStartTime:this.componentForm.maxEffectStartTime,
        maxEffectEndTime:this.componentForm.maxEffectEndTime,
        shopId:this.shopId,
        currentAuditState:this.componentForm.currentAuditState,
        createTime:this.componentForm.currentAuditState,
        createStartTime:this.componentForm.createStartTime,
        createEndTime:this.componentForm.createEndTime,
        producerType:this.componentForm.producerType
      }
      var data = objectTool.addValidPropertyToTarget(
        {
          ...formData
        }
      )
      let paramsList = []
      for (let i in data) {
        paramsList.push(`${i}=${data[i]}`)
      }
      let params = paramsList.join('&')
      let { origin, pathname } = window.location
      window.location.href = origin + '/' + pathname.split('/')[1] + '/rpk/export.json' + '?' + params
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
    .el-pagination{
        text-align:center;
        margin-top:20px;
    }
}
</style>
