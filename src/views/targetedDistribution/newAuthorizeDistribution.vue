<template>
  <el-container class="auditPage">
    <el-main>
      <h3>新增授权</h3>
      <el-form ref="form" size="medium" :inline="true" :model="formData" :rules="formRule" label-width="114px">
        <section>
          <div class="label">授权发放人</div>
          <div class="content">
            <div><el-form-item>
              <el-input v-model="formData.userId" placeholder="请输入业务员id" />
              <el-button type="primary" @click="add">确定</el-button>
            </el-form-item>
            </div>
            <p>待授权的发放人</p>
            <el-table ref="userList" class="userList" max-height="300" :data="userList">
              <el-table-column width="100">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="deleteUser(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column width="100">
                <template slot-scope="scope">
                  <span v-text=" '发放人'+scope.$index" />
                </template>
              </el-table-column>
              <el-table-column prop="userId" />
            </el-table>
          </div>
        </section>
        <section>
          <div class="label">授权发放票券红包</div>
          <div class="content">
            <el-form-item>
              <el-input v-model="formData.searchKey" />
              <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
            <!-- 搜索出的列表 -->
            <el-table
              ref="searchedList"
              max-height="300"
              :data="searchedList"
              class="userList"
              @select-all="handleSelectionChange"
              @select="handleSelectionChange"
            >
              <el-table-column type="selection" />
              <el-table-column prop="grantName" label="全选" />
            </el-table>
            <p>待授权的票券红包</p>
            <!-- 待选择的列表 -->
            <el-table ref="grantList" class="userList" max-height="300" :data="grantList">
              <el-table-column width="100">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="deleteRow(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column width="100">
                <template slot-scope="scope">
                  <span v-text=" '票券红包'+scope.$index" />
                </template>
              </el-table-column>
              <el-table-column prop="grantName" />
              <el-table-column width="100">
                <template slot-scope="scope">
                  <span v-text="`（批次号: ${scope.row.grantId}）`" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </section>
        <section>
          <div class="label">授权发放库存</div>
          <div id="stock" class="content">
            <span class="label-like">每个发放人对每种券最多可发放</span>
            <el-form-item prop="stock">
              <el-input v-model="formData.stock" />
            </el-form-item>
          </div>
        </section>
        <section>
          <div class="label">可发放时间</div>
          <div class="content">
            <el-form-item label="起始时间">
              <el-select v-model="formData.startTimeType">
                <el-option label="审核通过后立即生效" value="afterAudit" />
                <el-option label="自定义" value="custom" />
              </el-select>
            </el-form-item>

            <el-form-item v-if="formData.startTimeType==='custom'">
              <el-date-picker
                v-model="formData.grantStartTime"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
            <br>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="formData.grantEndTime"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>

          </div>
        </section>
      </el-form>
      <footer><el-button type="primary" @click="authorize">确认授权</el-button></footer>
    </el-main>
  </el-container>
</template>
<script>
import objectTool from '@tool/objectTool.js'
import grantService from '@api/grantManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
export default {
  data() {
    return {
      formData: {
        userId: '',
        searchKey: '',
        stock: '',
        startTimeType: 'afterAudit',
        grantStartTime: '',
        grantEndTime: ''
      },
      formRule: {
        stock: [
          { required: true, message: '请输入库存', trgger: 'blur' }
        ]
      },
      userList: [],
      searchedList: [],
      grantList: []

    }
  },
  methods: {
    add() {
      if (this.formData.userId) {
        let check = this.userList.find(item => { return item.userId === this.formData.userId })
        if (check) { this.$message({ message: '该id已被添加' }) } else {
          this.userList.push({ userId: this.formData.userId })
        }
      }
    },
    deleteUser(index, row) {
      this.userList.splice(index, 1)
    },
    // 待选表格的变化
    handleSelectionChange(selection) {
      // shoplist加入选择项
      selection.forEach(item => {
        let check = this.grantList.find(j => {
          if (j.grantId === item.grantId) { return true }
        })
        if (!check) {
          this.grantList.unshift(item)
        }
      })
      // 获取未选项
      let unselectedList = this.searchedList.filter(item => {
        let check = selection.find(j => {
          if (j.grantId === item.grantId) { return true }
        })
        if (!check) { return true }
      })

      console.log('unselectedList', unselectedList)
      // 滤除未选项
      this.grantList = this.grantList.filter(item => {
        let check = unselectedList.find(j => {
          if (j.grantId === item.grantId) { return true }
        })
        if (!check) { return true }
      })
    },
    // 回显已选择列表
    echoSearchList() {
      this.searchedList.forEach((item, index) => {
        let check = this.grantList.find(j => {
          if (j.grantId === item.grantId) { return true }
        })
        if (check) {
          this.$refs.searchedList.toggleRowSelection(item, true)
        } else {
          this.$refs.searchedList.toggleRowSelection(item, false)
        }
      })
    },

    // 搜索红包或者票券
    async search() {
      // valueList: [this.formData.searchKey]

      if (!this.formData.searchKey) {
        this.$message({ message: '请输出准确的编号或者名称查询' })
        return
      }
      let body1 = { body: { couponSearchWay: 'COUPON_ID', valueList: [this.formData.searchKey] }}
      let body2 = { body: { couponSearchWay: 'COUPON_NAME', valueList: [this.formData.searchKey] }}
      let body3 = { body: { rpkSearchWay: 'RPK_ID', valueList: [this.formData.searchKey] }}
      let body4 = { body: { rpkSearchWay: 'RPK_NAME', valueList: [this.formData.searchKey] }}

      try {
        let [res1, res2, res3, res4] = await Promise.all([grantService.searchCoupon(body1), grantService.searchCoupon(body2), grantService.searchRpk(body3), grantService.searchRpk(body4)])
        if (res1.resultCode === AjaxReturnType.SUCCESS && res2.resultCode === AjaxReturnType.SUCCESS &&
        res3.resultCode === AjaxReturnType.SUCCESS && res4.resultCode === AjaxReturnType.SUCCESS) {
          let sourceList = [...res1.data.body.couponList, ...res2.data.body.couponList, ...res3.data.body.rpkList, ...res4.data.body.rpkList]
          sourceList.forEach(item => {
            if (item.rpkId) {
              item.grantType = 'RPK'
              item.grantId = item.rpkId
              item.grantName = item.rpkName
            } else if (item.couponId) {
              item.grantType = 'COUPON'
              item.grantId = item.couponId
              item.grantName = item.couponName
            }
          })
          this.searchedList = sourceList
          this.$nextTick(this.echoSearchList)
        } else { throw new Error('红包或票券搜索失败') }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '红包或票券搜索失败' })
      }
    },

    // 删除某行
    deleteRow(index, row) {
      this.grantList.splice(index, 1)
      this.$nextTick(this.echoSearchList)
    },
    async  authorize() {
    // 验证表单
      try {
        await this.$refs.form.validate()
      } catch (err) { this.$message.error('表单不合法'); return }

      if (!this.userList.length || !this.grantList.length) {
        this.$message.error('授权发放人员和发放物品不能为空')
        return
      }
      try {
        let data = {
          userIdList: this.userList,
          grantList: this.grantList,
          stock: this.formData.stock,
          grantEndTime: this.formData.grantEndTime
        }
        if (this.formData.startTimeType === 'custom') {
          data.grantStartTime = this.formData.grantStartTime
        }
        let res = await grantService.createGrantAuth(data)
        if (res.resultCode === '000000') {
          this.$message.success({ message: '新增授权成功' })
          this.$router.push('/targetedDistribution/authorizeDistribution')
        } else {
          throw new Error('新增授权失败')
        }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '新增授权失败' })
      }
    }

  }
}
</script>
<style lang="scss">
section{
  display: flex;
  margin-bottom:30px;
  .label{
    width: 180px;
    line-height: 36px;
  &::before{
    content:"* ";
    color:#f56c6c;
  }
}
  .content{flex:1}
}
footer{
  display: flex;
  justify-content: center;
  margin-top:15px;
}
.userList{
  max-width: 400px;
}
.userList /deep/ thead.has-gutter{
    height:0px;
    th{
        height:0px;
        padding:0px;
    }
}
.label-like{
  line-height: 36px;
}

</style>
