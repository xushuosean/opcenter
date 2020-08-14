<template>
  <el-container class="container-box">
    <el-main>
      <el-card class="el-card-mt20" shadow="hover">
        <div class="page-title">
          <h3>自定义聚合列表</h3>
        </div>
        <el-form ref="componentForm" class="component-form" :model="componentForm" label-width="124px">
          <el-row :gutter="10" class="el-row-mt20">
            <el-col :span="8">
              <el-form-item label="聚合名称">
                <el-input v-model="componentForm.polyName" :clearable="true" size="medium" placeholder="请输入聚合名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="聚合编号">
                <el-input v-model="componentForm.polyId" :clearable="true" size="medium" placeholder="请输入聚合编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="聚合对象">
                <el-select v-model="componentForm.entryType" :clearable="true" size="medium" placeholder="请选择进件类别">
                  <el-option label="票券红包" value="COUPON" />
                  <el-option label="门店" value="SHOP" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="creatTime"
                  type="daterange"
                  size="medium"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" style="margin-left:130px;" @click="searchList">查询</el-button>
              <el-button type="primary" @click="output">导出表格</el-button>
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
            prop="polyName"
            label="聚合名称"
            fixed
          />
          <el-table-column
            prop="polyId"
            label="聚合编号"
            fixed
          />
          <el-table-column
            prop="polyType"
            label="聚合对象"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
          />

          <el-table-column
            prop="createTime"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="toDetail(scope.$index, scope.row)"
              >查看详情</el-button>
              <el-button
                size="mini"
                @click="deleteAggregation(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                size="mini"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-size="pageSize"
          layout=" total, sizes, prev, pager, next, jumper"
          background
          :total="rowTotal"
          @size-change="handlePageSizeChange"
          @current-change="handlePageChange"
        />
      </el-card>
    </el-main>
    <!--删除提示弹窗-->
  </el-container>
</template>
<script>
import CustomAggregation from '@api/customAggregation.service.js'
import objectTool from '@tool/objectTool'
import { AjaxReturnType } from '@enum/service-enum.js'
export default {
  data() {
    return {
      routeMeta: {},
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页记录数
      rowTotal: 0,
      creatTime: '', // 创建的开始至结束世间
      componentForm: {
        polyName: '', // 聚合名称
        polyId: '', // 聚合编号
        polyType: '', // 聚合类型 不传，票券-COUPON，门店-SHOP
        createStartDate: '2019-01-01', // 创建开始时间
        createEndDate: '2020-01-01' // 创建结束时间
      },
      componentTableData: [
        {
          polyName: 'test',					// 聚合名称
          polyId: '0',							// 聚合编号
          polyType: 'COUPON',				// 聚合对象类型  票券-COUPON 门店-SHOP
          createTime: '2019-01-01 12:00:00'	// 创建时间
        }
      ]
    }
  },
  watch: {
    // 饿了么时间组件格式转化
    creatTime() {
      var d = new Date(this.creatTime[0])
      var d1 = new Date(this.creatTime[1])
      this.componentForm.createStartDate =
          d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
      this.componentForm.createEndDate =
          d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate() + ' '
    }
  },
  created() {
  },
  methods: {
    // 请求列表数据
    async getTableData() {
      return new Promise(async(resolve, reject) => {
        let data = {
          ...this.componentForm,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        data = objectTool.addValidPropertyToTarget(data)
        try {
          let res = await CustomAggregation.searchAggregationList(data)
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.componentTableData = this.dealdata(res.data.listRows)
            this.rowTotal = res.data.rowTotal
          } else {
            this.$message.error('查询请求失败')
            resolve(false)
          }
        } catch (e) {
          console.log(e)
          reject(e)
        }
      })
    },
    searchList() {
      this.getTableData()
    },
    handlePageSizeChange(size) {
      this.pageSize = size
      if (this.tableData.length === 0) { return }

      this.getTableData()
    },
    handlePageChange(num) {
      this.pageNum = num
      if (this.tableData.length === 0) { return }

      this.getTableData()
    },
    // 导出表单
    output() {
      let data = {
        ...this.componentForm
      }
      data = objectTool.addValidPropertyToTarget(data)
      let paramsList = []
      for (let i in data) {
        paramsList.push(`${i}=${data[i]}`)
      }
      let params = paramsList.join('&')
      let { origin, pathname } = window.location
      window.location.href = origin + '/' + pathname.split('/')[1] + '/custom/poly/export.json' + '?' + params
    },
    toDetail(index, row) {
      this.$router.push({ path: '/customAggregation/customAggregationDetail', polyId: { polyId: row.polyId }})
    },
    // 转换字段
    dealdata(obj) {
      let _obj = obj
      _obj.forEach(e => {
        if (e.polyType == 'COUPON') {
          e.polyType = '票券红包'
        } else {
          e.polyType = '门店'
        }
      })
      return _obj
    },
    // 列表删除
    deleteAggregation(index, row) {
      return new Promise(async(resolve, reject) => {
        let data = {
          polyId: row.polyId
        }
        data = objectTool.addValidPropertyToTarget(data)
        try {
          let res = await CustomAggregation.deleteAggregation(data)
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.getTableData()
          } else {
            this.$message.error('删除请求失败')
            resolve(false)
          }
        } catch (e) {
          console.log(e)
          reject(e)
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
    .el-pagination{
        text-align:center;
        margin-top:20px;
    }
    .component-form{
        /deep/.el-input__inner{
            width:240px;
        }
    }
}
</style>
