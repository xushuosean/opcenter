<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>配置优惠买单时间</h3>
      <div class="sec">
        <div class="label diy-required">展示时间</div>
        <div class="content">
          <el-form ref="displayForm" :disabled="isDisabled" :inline="true" :model="dispalyData" :rules="displayRule" label-width="116px">
            <el-form-item label="起始时间类型" prop="startTimeType">
              <el-select v-model="dispalyData.startTimeType" label="起始时间">
                <el-option label="自定义" value="CUSTOM" />
                <el-option label="审核后立即展示" value="AUDITVALID" />
              </el-select>
            </el-form-item>
            <br>
            <el-form-item v-if="dispalyData.startTimeType==='CUSTOM'" prop="startTime" label="起始时间">
              <el-date-picker
                v-model="dispalyData.startTime"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="dispalyData.endTime"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>

          </el-form>
        </div>
      </div>
      <!-- 允许使用时间 -->
      <div class="sec">
        <div class="label  diy-required">
          允许使用时间
        </div>
        <div class="content">
          <el-form ref="useForm" :disabled="isDisabled" :inline="true" :model="useForm" :rules="useRule">

            <el-form-item label="是否指定允许时间" prop="setAppointTime">
              <el-select v-model="useForm.setAppointTime">
                <el-option label="指定时间段" :value="true" />
                <el-option label="无指定时间" :value="false" />
              </el-select>
            </el-form-item>
            <br>
            <div v-if="useForm.setAppointTime === true">
              <el-form-item prop="timeRange">
                <el-date-picker
                  v-model="useForm.timeRange"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />

              </el-form-item>
              <br>
              <el-form-item>
                <el-checkbox v-model="useForm.setCycle">设置循环周期</el-checkbox>
              </el-form-item>
              <div v-if="useForm.setCycle===true">
                <el-form-item label="每周" prop="cycleDays">
                  <el-checkbox-group v-model="useForm.cycleDays" @change="cycleChange">
                    <el-checkbox label="周一" />
                    <el-checkbox label="周二" />
                    <el-checkbox label="周三" />
                    <el-checkbox label="周四" />
                    <el-checkbox label="周五" />
                    <el-checkbox label="周六" />
                    <el-checkbox label="周日" />
                  </el-checkbox-group>
                </el-form-item>
                <br>
                <el-form-item prop="cycleTimeRange">
                  <el-time-picker
                    v-model="useForm.cycleTimeRange"
                    is-range
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                  />
                </el-form-item>
              </div>

            </div>
          </el-form></div>

      </div>

      <div class="sec">
        <div class="label  diy-required">
          优惠买单有效期
        </div>
        <div class="content">
          <el-form ref="validForm" :disabled="isDisabled" :inline="true" :model="validForm" :rules="validRule">
            <el-form-item label-width="111px">
              <el-date-picker
                v-model="validForm.timeRange"
                is-range
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>

    <el-card class="el-card-mt20" shadow="hover">
      <h3>分摊规则及结算模式</h3>
      <el-form ref="settleForm" :disabled="isDisabled" :inline="true" :model="settleForm" :rules="settleRule">
        <!-- <div class="sec">
          <div class="label  diy-required">补贴结算模式</div>
          <el-form-item prop="subsidySettleWay">
            <el-select v-model="settleForm.subsidySettleWay">
              <el-option label="见票券前" value="BEFORE" />
              <el-option label="见票券后" value="AFTER" />
            </el-select>
          </el-form-item>
        </div>
        <div class="sec">
          <div class="label  diy-required">结算方式</div>
          <el-form-item prop="settleWay">
            <el-select v-model="settleForm.settleWay">
              <el-option label="按购买结算" value="BUY" />
              <el-option label="按核销结算" value="VERIFY" />
            </el-select>
          </el-form-item>
        </div> -->
        <div class="sec">
          <div class="label  diy-required">分摊规则</div>
          <div class="content">
            <p v-text="discRuleEmum[discountsRule]" />

            <div v-if="discountsRule==='LADDER'">
              <p v-text="apportionText[0]" />
              <el-form-item label="总行" prop="center0">
                <el-input v-model="settleForm.center0"><template slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="分行" prop="division0">
                <el-input v-model="settleForm.division0"><template slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="商户" prop="merchant0">
                <el-input v-model="settleForm.merchant0"><template slot="append">元</template></el-input>
              </el-form-item>
              <br>
              <template v-if="ruleArr[1]">
                <p v-text="apportionText[1]" />
                <el-form-item label="总行" prop="center1">
                  <el-input v-model="settleForm.center1"><template slot="append">元</template></el-input>
                </el-form-item>
                <el-form-item label="分行" prop="division1">
                  <el-input v-model="settleForm.division1"><template slot="append">元</template></el-input>
                </el-form-item>
                <el-form-item label="商户" prop="merchant1">
                  <el-input v-model="settleForm.merchant1"><template slot="append">元</template></el-input>
                </el-form-item>
              </template>
              <br>
              <template v-if="ruleArr[2]">
                <p v-text="apportionText[2]" />

                <el-form-item label="总行" prop="center2">
                  <el-input v-model="settleForm.center2"><template slot="append">元</template></el-input>
                </el-form-item>
                <el-form-item label="分行" prop="division2">
                  <el-input v-model="settleForm.division2"><template slot="append">元</template></el-input>
                </el-form-item>
                <el-form-item label="商户" prop="merchant2">
                  <el-input v-model="settleForm.merchant2"><template slot="append">元</template></el-input>
                </el-form-item>
                <br>
              </template>
            </div>
            <div v-if="discountsRule==='TOTAL' || discountsRule==='REBATE' || discountsRule==='FULL'">
              <p v-text="apportionText[0]" />
              <el-form-item label="总行" prop="center0">
                <el-input v-model="settleForm.center0"><template v-if=" discountsRule==='REBATE'" slot="append">%</template><template v-else slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="分行" prop="division0">
                <el-input v-model="settleForm.division0"><template v-if=" discountsRule==='REBATE'" slot="append">%</template><template v-else slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="商户" prop="merchant0">
                <el-input v-model="settleForm.merchant0"><template v-if=" discountsRule==='REBATE'" slot="append">%</template><template v-else slot="append">元</template></el-input>
              </el-form-item>
            </div>

          </div>

        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>

import { mapMutations, mapGetters } from 'vuex'
import discountPaymentService from '@api/discountPaymentManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import objectTool from '@tool/objectTool.js'
import * as types from '@store/mutation-types.js'

export default {
  props: {
    isDisabled: {},
    modifyMode: { default: false }
  },

  data() {
    return {
      discountsRule: '',
      discRuleEmum: {
        TOTAL: '总额满减', LADDER: '阶梯式满减', FULL: '每满立减', REBATE: '满减折扣'
      },
      apportionText: [],
      dayList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      currentStep: 1,
      dispalyData: {
        startTimeType: '',
        startTime: '',
        endTime: ''
      },
      useForm: {
        timeRange: [],
        setAppointTime: '',
        setCycle: '',
        cycleDays: [],
        cycleTimeRange: [null, null]
      },

      displayRule: {
        startTimeType: [{ required: true, trigger: 'blur', message: '请选择起始时间类型' }],
        startTime: [{ required: true, trigger: 'blur', message: '请设置开始时间' }],
        endTime: [{ required: true, trigger: 'blur', message: '请设置结束时间' }]
      },
      useRule: {
        setAppointTime: [{ required: true, trigger: 'blur', message: '请选择是否指定允许时间' }],
        cycleDays: [],
        cycleTimeRange: []

      },

      validForm: {
        timeRange: ''
      },
      validRule: {
        timeRange: [{ required: true, trigger: 'blur', message: '请设置时间' }]
      },
      settleForm: {
        center0: '',
        division0: '',
        merchant0: '',
        center1: '',
        division1: '',
        merchant1: '',
        center2: '',
        division2: '',
        merchant2: '',

        subsidySettleWay: '',
        settleWay: ''
      },
      settleRule: {
        subsidySettleWay: [{ required: true, trigger: 'blur', message: '请设置补贴结算模式' }],
        settleWay: [{ required: true, trigger: 'blur', message: '请设置结算方式' }],
        center0: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        division0: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        merchant0: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        center1: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        division1: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        merchant1: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        center2: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        division2: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        merchant2: [{ required: true, trigger: 'blur', message: '请输入数值' }]

      }

    }
  },
  computed: {
    ...mapGetters('discountPayment', ['discountPaymentStep', 'applyId', 'modelId']),
    apportionRuleValue() {
      if (this.discountsRule === 'LADDER') {
        return `${this.settleForm.center0}:${this.settleForm.division0}:${this.settleForm.merchant0}|${this.settleForm.center1}:${this.settleForm.division1}:${this.settleForm.merchant1}|${this.settleForm.center2}:${this.settleForm.division2}:${this.settleForm.merchant2}`
      } else return `${this.settleForm.center0}:${this.settleForm.division0}:${this.settleForm.merchant0}`
    }

  },
  methods: {
    ...mapMutations('discountPayment', [types.SET_DISCOUNTPAYMENT_STEP, types.CLEAR_DISCOUNTPAYMENT_DATA, 'setModelId']),
    async saveComponentInfo() {
      try {
        await this.$refs.displayForm.validate()
        await this.$refs.useForm.validate()
        await this.$refs.validForm.validate()
        await this.$refs.settleForm.validate()
      } catch (err) { this.$message({ message: '表单不合法' }); console.error(err); return }

      let data = {
        applyId: this.applyId,
        apportionRuleValue: this.apportionRuleValue,
        settleWay: this.settleForm.settleWay,					// VERIFY-按核销结算,BUY-按购买结算
        subsidySettleWay: this.settleForm.subsidySettleWay
      }
      data.timeConfList = this.handleTimes()
      data = objectTool.addValidPropertyToTarget(data)
      if (this.modifyMode) { return data }
      console.log('正在保存')
      try {
        let res = await discountPaymentService.saveRule(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '保存成功' })
          this.setModelId('')
          return true
        } else {
          throw new Error('保存失败')
        }
      } catch (err) {
        this.$message.error({ message: '保存失败' })
        return false
      }
    },
    // 回显数据
    async getData(arg) {
      if (!this.applyId) { throw new Error('没有applyId') }
      let res
      try {
        if (this.modelId) {
          res = await discountPaymentService.getDetailByDisId({ discountspayId: this.modelId })
        } else {
          res = await discountPaymentService.queryDiscountPayDetail({ applyId: this.applyId })
        }

        if (res.resultCode === '000000') {
          let echoData = res.data
          this.discountsRule = echoData.discountsRule
          this.ruleArr = echoData.discountsReduceValue.split('|').map(item => { return item.split(':').map(j => Number.parseFloat(j)) })

          // 展示时间
          let displayTime = res.data.timeConfList.find(item => item.timeType === 'DISPLAY')
          // 允许使用时间
          let useTime = res.data.timeConfList.find(item => item.timeType === 'USE')
          // 有效期
          let validTime = res.data.timeConfList.find(item => item.timeType === 'VALID')
          // 回显展示时间
          if (displayTime) {
            this.dispalyData.startTimeType = displayTime.startTimeType
            this.dispalyData.startTime = displayTime.startTime
            this.dispalyData.endTime = displayTime.endTime
          }

          // 回显允许使用时间
          if (useTime) {
            this.useForm.setAppointTime = useTime.setAppointTime
            this.useForm.timeRange = [useTime.startTime, useTime.endTime]
            this.useForm.setCycle = useTime.setCycle
            this.useForm.cycleDays = this.dayList.filter((item, index) => { return useTime.cycleContent[index] === '1' })
            this.useForm.cycleTimeRange = [useTime.cycleStartTime, useTime.cycleEndTime]
          }

          // 回显有效期
          if (validTime) {
            this.validForm.timeRange = [validTime.startTime, validTime.endTime]
          }

          // 回显分摊结算模式
          this.settleForm.subsidySettleWay = res.data.subsidySettleWay
          this.settleForm.settleWay = res.data.settleWay

          if (this.discountsRule === 'TOTAL') {
            this.apportionText[0] = `（总金额满${this.ruleArr[0][0]}元 共减免${this.ruleArr[0][1]}元）补贴总金额${this.ruleArr[0][1]}元`
          } else if (this.discountsRule === 'FULL') {
            if (res.data.setLimitAmt) {
              this.apportionText[0] = `（金额每满${this.ruleArr[0][0]}元 每次减免${this.ruleArr[0][1]}元 优惠封顶金额${res.data.maxDiscountsAmt}元）补贴封顶金额 ${res.data.maxDiscountsAmt} 元`
            } else {
              this.apportionText[0] = `（金额每满${this.ruleArr[0][0]}元 每次减免${this.ruleArr[0][1]}元）`
            }
          } else if (this.discountsRule === 'REBATE') {
            if (res.data.setLimitAmt) {
              this.apportionText[0] = `金额满${this.ruleArr[0][0]}元 全单折扣${this.ruleArr[0][1]}折 优惠封顶金额${res.data.maxDiscountsAmt}元）补贴封顶金额 ${res.data.maxDiscountsAmt} 元`
            } else {
              this.apportionText[0] = `（金额满${this.ruleArr[0][0]}元 全单折扣${this.ruleArr[0][1]}折 ）`
            }
          } else if (this.discountsRule === 'LADDER') {
            this.apportionText[0] = `第一层（金额满${this.ruleArr[0][0]}元 减免${this.ruleArr[0][1]}元 ）补贴金额${this.ruleArr[0][1]}元`
            if (this.ruleArr[1]) {
              this.apportionText[1] = `第二层（金额满${this.ruleArr[1][0]}元 减免${this.ruleArr[1][1]}元 ）补贴金额${this.ruleArr[1][1]}元`
            }
            if (this.ruleArr[2]) {
              this.apportionText[2] = `第三层（金额满${this.ruleArr[2][0]}元 减免${this.ruleArr[2][1]}元 ）补贴金额${this.ruleArr[2][1]}元`
            }
          }
          if (res.data.apportionRuleValue) {
            let apportionRuleArr = res.data.apportionRuleValue.split('|').map(item => { return item.split(':') })
            this.settleForm.center0 = apportionRuleArr[0][0]
            this.settleForm.division0 = apportionRuleArr[0][1]
            this.settleForm.merchant0 = apportionRuleArr[0][2]

            if (apportionRuleArr[1]) {
              this.settleForm.center1 = apportionRuleArr[1][0]
              this.settleForm.division1 = apportionRuleArr[1][1]
              this.settleForm.merchant1 = apportionRuleArr[1][2]
            }
            if (apportionRuleArr[2]) {
              this.settleForm.center1 = apportionRuleArr[2][0]
              this.settleForm.division1 = apportionRuleArr[2][1]
              this.settleForm.merchant1 = apportionRuleArr[2][2]
            }
          }

          // 未查询到优惠买单详情的情况
        } else {
          throw new Error('查询优惠买单详情错误')
        }
      } catch (err) {
        console.error(err)
        this.$message.error('查询优惠买单详情错误')
      }
    },
    handleTimes() {
      let displayTime = {
        timeType: 'DISPLAY',				// 时间类型DISPLAY-展示时间,USE-设置使用时间,VALID-有效期
        'startTimeType': this.dispalyData.startTimeType,			// 起始时间类型AUDITVALID-审核通过后立即展示,CUSTOM-自定义

        'startTime': this.dispalyData.startTime,						// 起始时间
        'endTime': this.dispalyData.endTime					// 结束时间
      }
      displayTime = objectTool.addValidPropertyToTarget(displayTime)

      let useTime = {
        'timeType': 'USE',				// 时间类型DISPLAY-展示时间,USE-设置使用时间,VALID-有效期
        'setAppointTime': this.useForm.setAppointTime,				// 是否指定时间
        'startTime': this.useForm.timeRange[0],						// 起始时间
        'endTime': this.useForm.timeRange[1],						// 结束时间
        'setCycle': this.useForm.setCycle,						// 是否设置循环周期
        'cycleContent': this.handleCycleDays(),					// 循环周期内容eg:“1110000”，上面循环类型选择按周循环，则这里代表周一到周三是可用时间
        'cycleStartTime': this.useForm.cycleTimeRange[0],				// 循环起始时间YYYY-MM-DD HH:MM:SS
        'cycleEndTime': this.useForm.cycleTimeRange[1]
      }
      let validTime = {
        'timeType': 'VALID',
        'startTime': this.validForm.timeRange[0],						// 起始时间
        'endTime': this.validForm.timeRange[1]
      }
      return [displayTime, useTime, validTime]
    },
    // 处理CycleDays
    handleCycleDays() {
      const cycleList = this.dayList.map(item => {
        let findRes = this.useForm.cycleDays.find(j => { return j === item })
        if (findRes) { return '1' } else { return '0' }
      })
      return cycleList.join('')
    },
    cycleChange() {
      console.log(this.useForm.cycleDays)
    }
  },

  created() {
    this.getData()
    if (this.discountPaymentStep <= this.currentStep) {
      this.SET_DISCOUNTPAYMENT_STEP(this.currentStep)
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

h3{
    margin-bottom:30px;
    font-weight: bold;
    font-size: 18px;
    color: #333;
}
.sec{
  display:flex;
  .label{
    width: 150px;
    line-height: 40px;
  }
  .content{
    flex:1;
    p{
      padding:2px 0px 8px 0px;
    }
  }
}

.diy-required::before{
  content: '*';
    color: #F56C6C;
    margin-right: 4px;
}
</style>

