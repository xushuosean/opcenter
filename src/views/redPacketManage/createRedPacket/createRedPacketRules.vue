<!--2.配置红包时间分摊规则及结算模式-->
<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>配置红包时间</h3>
      <el-form label-position="left" label-width="140px" class="componentForm el-card-mt20" size="medium">
        <el-form-item label="红包展示时间">
          起始时间
          <el-select v-model="componentForm.timeConfList[0].setAppointTime" :clearable="true" placeholder="请选择按钮类型">
            <el-option label="审核后立即显示" value="false" />
            <el-option label="指定时间段" value="true" />
          </el-select>
          <el-date-picker
            v-if="componentForm.timeConfList[0].setAppointTime == 'true'"
            v-model="componentForm.timeConfList[0].startTime"
            style="margin:0 20px"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item>
          结束时间
          <el-date-picker
            v-model="componentForm.timeConfList[0].endTime"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="允许领取时间">
          <el-select v-model="componentForm.timeConfList[1].setAppointTime" :clearable="true" placeholder="请选择按钮类型">
            <el-option label="与展示时间相同" value="true" />
            <el-option label="指定时间段" value="false" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="componentForm.timeConfList[1].setAppointTime == 'false'">
          自
          <el-date-picker
            v-model="componentForm.timeConfList[1].startTime"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item v-show="componentForm.timeConfList[1].setAppointTime == 'false'">
          至
          <el-date-picker
            v-model="componentForm.timeConfList[1].endTime"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="componentForm.timeConfList[1].setCycle">设置循环周期</el-checkbox>
        </el-form-item>
        <el-form-item v-show="componentForm.timeConfList[1].setCycle">
          每周
          <el-checkbox v-model="checkForm1.selectWorkDay">平日</el-checkbox>
          <el-checkbox v-model="checkForm1.selectWeekend">周末</el-checkbox>
          <el-checkbox v-model="checkForm1.checkedList[0]">一</el-checkbox>
          <el-checkbox v-model="checkForm1.checkedList[1]">二</el-checkbox>
          <el-checkbox v-model="checkForm1.checkedList[2]">三</el-checkbox>
          <el-checkbox v-model="checkForm1.checkedList[3]">四</el-checkbox>
          <el-checkbox v-model="checkForm1.checkedList[4]">五</el-checkbox>
          <el-checkbox v-model="checkForm1.checkedList[5]">六</el-checkbox>
          <el-checkbox v-model="checkForm1.checkedList[6]">日</el-checkbox>
          <el-checkbox v-model="checkForm1.selectAll">全选</el-checkbox>
        </el-form-item>
        <el-form-item v-show="componentForm.timeConfList[1].setCycle">
          <el-time-picker
            v-model="componentForm.timeConfList[1].cycleStartTime"
            placeholder="任意时间点"
          />
          至
          <el-time-picker
            v-model="componentForm.timeConfList[1].cycleEndTime"
            placeholder="任意时间点"
          />
        </el-form-item>
        <el-form-item v-show="componentForm.timeConfList[1].setCycle">
          <el-checkbox v-model="componentForm.setSubStock">设置子库存</el-checkbox>
          <el-select v-show="componentForm.setSubStock" v-model="componentForm.subStockType" placeholder="请选择">
            <el-option
              label="每天"
              value="DAY"
            />
            <el-option
              label="每周"
              value="WEEK"
            />
          </el-select>
          <el-input v-show="componentForm.setSubStock" v-model="componentForm.subStockNum" style="width:100px;margin:0 5px" /><span v-show="componentForm.setSubStock">张(最多X张)</span>
        </el-form-item>
        <el-form-item v-show="componentForm.timeConfList[1].setCycle">
          <el-checkbox v-model="componentForm.setSubLimit">设置子限购</el-checkbox>
          <el-select v-show="componentForm.setSubLimit" v-model="componentForm.subLimitType" placeholder="请选择">
            <el-option
              label="每天"
              value="DAY"
            />
            <el-option
              label="每周"
              value="WEEK"
            />
          </el-select>
          <el-input v-show="componentForm.setSubLimit" v-model="componentForm.subLimitNum" style="width:100px;margin:0 5px" /><span v-show="componentForm.setSubLimit">张(最多X张)</span>
        </el-form-item>

        <el-form-item label="允许使用时间">
          <el-select v-model="componentForm.timeConfList[3].setAppointTime" :clearable="true" placeholder="请选择按钮类型">
            <el-option label="与展示时间相同" value="true" />
            <el-option label="指定时间段" value="false" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="componentForm.timeConfList[3].setAppointTime== 'false'">
          自
          <el-date-picker
            v-model="componentForm.timeConfList[3].startTime"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item v-show="componentForm.timeConfList[3].setAppointTime== 'false'">
          至
          <el-date-picker
            v-model="componentForm.timeConfList[3].endTime"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="componentForm.timeConfList[3].setCycle">设置循环周期</el-checkbox>
        </el-form-item>
        <el-form-item v-show="componentForm.timeConfList[3].setCycle">
          每周
          <el-checkbox v-model="checkForm2.selectWorkDay">平日</el-checkbox>
          <el-checkbox v-model="checkForm2.selectWeekend">周末</el-checkbox>
          <el-checkbox v-model="checkForm2.checkedList[0]">一</el-checkbox>
          <el-checkbox v-model="checkForm2.checkedList[1]">二</el-checkbox>
          <el-checkbox v-model="checkForm2.checkedList[2]">三</el-checkbox>
          <el-checkbox v-model="checkForm2.checkedList[3]">四</el-checkbox>
          <el-checkbox v-model="checkForm2.checkedList[4]">五</el-checkbox>
          <el-checkbox v-model="checkForm2.checkedList[5]">六</el-checkbox>
          <el-checkbox v-model="checkForm2.checkedList[6]">日</el-checkbox>
          <el-checkbox v-model="checkForm2.selectAll">全选</el-checkbox>
        </el-form-item>
        <el-form-item v-show="componentForm.timeConfList[3].setCycle">
          <el-time-picker
            v-show="componentForm.timeConfList[3].setCycle"
            v-model="componentForm.timeConfList[3].cycleStartTime"
            placeholder="任意时间点"
          />
          至
          <el-time-picker
            v-show="componentForm.timeConfList[3].setCycle"
            v-model="componentForm.timeConfList[3].cycleEndTime"
            placeholder="任意时间点"
          />
        </el-form-item>

        <el-form-item label="红包有效期">
          <el-select v-model="timeType" :clearable="true">
            <el-option label="指定时间段" value="false" />
            <el-option label="T+n" value="true" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="timeType == 'true'">
          自票券获取时间起 至 票券获取时间 <el-input v-model="componentForm.timeConfList[4].validAbsValue" style="width:100px;margin:0 5px" placeholder="+n" />日
        </el-form-item>
        <el-form-item v-show="timeType == 'false'">
          自
          <el-date-picker
            v-model="componentForm.timeConfList[4].startTime"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item v-show="timeType == 'false'">
          至
          <el-date-picker
            v-model="componentForm.timeConfList[4].endTime"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>

      </el-form>
    </el-card>
    <el-card class="el-card-mt20" shadow="hover">
      <h3>分摊规则及结算模式</h3>
      <el-form label-position="left" label-width="140px" class="componentForm el-card-mt20" size="medium">
        <el-form-item label="补贴结算模式">
          见票后结算
        </el-form-item>
        <el-form-item label="分摊规则">
          <div>
            补贴总金额 {{ subsidy }}
            <span v-if="formdata.rpkType == 'DISCOUNT'">折</span>
            <span v-else>元</span>
          </div>
          <div>
            总行 <el-input v-model="bankSubsidyAmt" style="width:100px;margin:0 5px" placeholder="补贴金额" /><span v-if="formdata.rpkType == 'DISCOUNT'">%</span>
          </div>
          <div class="mt10">
            分行 <el-input v-model="branchSubsidyAmt" style="width:100px;margin:0 5px" placeholder="补贴金额" /><span v-if="formdata.rpkType == 'DISCOUNT'">%</span>
          </div>
          <div class="mt10">
            商户 <el-input v-model="mchtSubsidyAmt" style="width:100px;margin:0 5px" placeholder="补贴金额" /><span v-if="formdata.rpkType == 'DISCOUNT'">%</span>
          </div>
        </el-form-item>
        <el-form-item label="结算方式">
          按核销结算
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import imgUpload from '@com/imgUpload/imgUpload.vue'
export default {
  components: { imgUpload },
  props: {
    subsidy: {
      type: Number
    },
    achievetype: {
      type: String
    },
    formdata: {
      type: Object,
      default: () => ({
      })
    }
  },
  data() {
    return {
      value1: '',
      selectAll: '',
      createTime: '',
      bankSubsidyAmt: '', // 总行补贴
      branchSubsidyAmt: '', // 分行补贴
      mchtSubsidyAmt: '', // 商户补贴
      // 允许购买时间循环周
      checkForm1: {
        selectAll: false,
        selectWorkDay: false,
        selectWeekend: false,
        checkedList: [false, false, false, false, false, false, false]
      },
      // 允许核销时间循环周
      checkForm2: {
        selectAll: false,
        selectWorkDay: false,
        selectWeekend: false,
        checkedList: [false, false, false, false, false, false, false]
      },
      componentForm: {
        timeConfList: [{
          timeType: 'DISPLAY', // 展示时间-DISPLAY，领取时间-RECEIVE，购买时间-BUY，使用(核销)时间-USE，有效期-VALID
          setAppointTime: '', // 是否与展示时间相同
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          setCycle: '', // 是否设置循环  true/false
          cycleType: '', // WEEK-按周 DAY-按日
          cycleContent: '', // 循环点,eg:“1110000”，
          cycleStartTime: '', // 循环开始时间
          cycleEndTime: '', // 循环结束时间
          validAbsValue: '' // 有效期相对值
        }, {
          timeType: 'RECEIVE', // 展示时间-DISPLAY，领取时间-RECEIVE，购买时间-BUY，使用(核销)时间-USE，有效期-VALID
          setAppointTime: '', // 是否与展示时间相同
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          setCycle: '', // 是否设置循环  true/false
          cycleType: '', // WEEK-按周 DAY-按日
          cycleContent: '', // 循环点,eg:“1110000”，
          cycleStartTime: '', // 循环开始时间
          cycleEndTime: '', // 循环结束时间
          validAbsValue: '' // 有效期相对值
        }, {
          timeType: 'BUY', // 展示时间-DISPLAY，领取时间-RECEIVE，购买时间-BUY，使用(核销)时间-USE，有效期-VALID
          setAppointTime: 'true', // 是否与展示时间相同
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          setCycle: '', // 是否设置循环  true/false
          cycleType: '', // WEEK-按周 DAY-按日
          cycleContent: '', // 循环点,eg:“1110000”，
          cycleStartTime: '', // 循环开始时间
          cycleEndTime: '', // 循环结束时间
          validAbsValue: '' // 有效期相对值
        }, {
          timeType: 'USE', // 展示时间-DISPLAY，领取时间-RECEIVE，购买时间-BUY，使用(核销)时间-USE，有效期-VALID
          setAppointTime: '', // 是否与展示时间相同
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          setCycle: '', // 是否设置循环  true/false
          cycleType: '', // WEEK-按周 DAY-按日
          cycleContent: '', // 循环点,eg:“1110000”，
          cycleStartTime: '', // 循环开始时间
          cycleEndTime: '', // 循环结束时间
          validAbsValue: '' // 有效期相对值
        }, {
          timeType: 'VALID', // 展示时间-DISPLAY，领取时间-RECEIVE，购买时间-BUY，使用(核销)时间-USE，有效期-VALID
          setAppointTime: '', // 是否与展示时间相同
          startTime: '', // 开始时间VALID
          endTime: '', // 结束时间
          setCycle: '', // 是否设置循环  true/false
          cycleType: '', // WEEK-按周 DAY-按日
          cycleContent: '', // 循环点,eg:“1110000”，
          cycleStartTime: '', // 循环开始时间
          cycleEndTime: '', // 循环结束时间
          validAbsValue: '' // 有效期相对值
        }
        ],
        setSubStock: false, // 是否设置子库存   true/false
        subStockType: '', // 子库存类型 DAY-每天 WEEK-每周
        subStockNum: '', // 子库存数量
        setSubLimit: false, // 是否设置子限购   true/false
        subLimitType: '', // 子限购类型   DAY-每天 WEEK-每周
        subLimitNum: '', // 子限购数量
        bankSubsidyAmt: '', // 总行补贴
        branchSubsidyAmt: '', // 分行补贴
        mchtSubsidyAmt: '', // 商户补贴
        settleWay: 'VERIFY'// 结算方式    BUY-按购买结算,  VERIFY-按核销结算
      },
      timeType: 'false',
      dealType: ''
    }
  },
  computed: {
  },
  watch: {
    bankSubsidyAmt() {
      if (this.formdata.rpkType == 'FULLREDUCE') {
        this.componentForm.bankSubsidyAmt = this.bankSubsidyAmt.toString()
      } else {
        this.componentForm.bankSubsidyAmt = this.bankSubsidyAmt + '%'
      }
    },
    branchSubsidyAmt() {
      if (this.formdata.rpkType == 'FULLREDUCE') {
        this.componentForm.branchSubsidyAmt = this.branchSubsidyAmt.toString()
      } else {
        this.componentForm.branchSubsidyAmt = this.branchSubsidyAmt + '%'
      }
    },
    mchtSubsidyAmt() {
      if (this.formdata.rpkType == 'FULLREDUCE') {
        this.componentForm.mchtSubsidyAmt = this.mchtSubsidyAmt.toString()
      } else {
        this.componentForm.mchtSubsidyAmt = this.mchtSubsidyAmt + '%'
      }
    },
    formdata: {
      handler: function(newVal, oldVal) {
        console.log(newVal)
      },
      deep: true
    },
    'checkForm1.selectAll'(newVal, oldVal) {
      if (newVal == true) {
        this.checkForm1.checkedList = [true, true, true, true, true, true, true]
      } else {
        this.checkForm1.checkedList = [false, false, false, false, false, false, false]
        this.checkForm1.selectWorkDay = false
        this.checkForm1.selectWeekend = false
      }
    },
    'checkForm1.selectWorkDay'(newVal, oldVal) {
      if (newVal == true) {
        for (var i = 0; i < 5; i++) {
          this.checkForm1.checkedList[i] = true
        }
      } else {
        for (var j = 0; j < 5; j++) {
          this.checkForm1.checkedList[j] = false
        }
      }
    },
    'checkForm1.selectWeekend'(newVal, oldVal) {
      if (newVal == true) {
        for (var i = 5; i < 7; i++) {
          this.checkForm1.checkedList[i] = true
        }
      } else {
        for (var j = 5; j < 7; j++) {
          this.checkForm1.checkedList[j] = false
        }
      }
    },

    'checkForm2.selectAll'(newVal, oldVal) {
      if (newVal == true) {
        this.checkForm2.checkedList = [true, true, true, true, true, true, true]
      } else {
        this.checkForm2.checkedList = [false, false, false, false, false, false, false]
        this.checkForm2.selectWorkDay = false
        this.checkForm2.selectWeekend = false
      }
    },
    'checkForm2.selectWorkDay'(newVal, oldVal) {
      if (newVal == true) {
        for (var i = 0; i < 5; i++) {
          this.checkForm2.checkedList[i] = true
        }
      } else {
        for (var j = 0; j < 5; j++) {
          this.checkForm2.checkedList[j] = false
        }
      }
    },
    'checkForm2.selectWeekend'(newVal, oldVal) {
      if (newVal == true) {
        for (var i = 5; i < 7; i++) {
          this.checkForm2.checkedList[i] = true
        }
      } else {
        for (var j = 5; j < 7; j++) {
          this.checkForm2.checkedList[j] = false
        }
      }
    },
    // 转换为循环点格式
    'checkForm1.checkedList'() {
      var a = ''
      this.checkForm1.checkedList.forEach(e => {
        if (e) {
          a += '1'
        } else {
          a += '0'
        }
      })
      this.componentForm.timeConfList[1].cycleContent = a
    },
    'checkForm2.checkedList'() {
      var a = ''
      this.checkForm1.checkedList.forEach(e => {
        if (e) {
          a += '1'
        } else {
          a += '0'
        }
      })
      this.componentForm.timeConfList[3].cycleContent = a
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getForm() {
      this.componentForm.timeConfList.forEach(e => {
        for (var k in e) {
          if (e[k] == '') {
            delete e[k]
          }
        }
      })
      this.$emit('getForm', this.componentForm)
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
}
</style>
