<!--创建票券-进度-->
<template>
  <el-container class="container-box">
    <el-main>
      <form1 v-show="stepNum == 0" @getForm1data="getForm1data" />
      <form2 v-show="stepNum == 1" :subsidy="subsidy" :achievetype="formdata.achieveType" @getForm2data="getForm2data" />
      <form3
        v-show="stepNum == 2"
        :supportcreditcard="formdata.supportCreditCard"
        :supportdebitcard="formdata.supportDebitCard"
        @getForm3data="getForm3data"
      />
      <form4
        v-show="stepNum == 3"
        :achievetype="formdata.achieveType"
        :couponname="formdata.couponName"
        :faceprice="formdata.facePrice"
        :currentprice="formdata.currentPrice"
        :coupontype="formdata.couponType"
        @getForm4data="getForm4data"
      />
      <form5
        v-show="stepNum == 4"
      />
      <el-card class="el-card-mt20" shadow="hover">
        <steps class="steps-box" :steps-data="stepsData" :current-step="stepNum" />
        <div class="button-box">
          <el-button v-if="(stepNum != 0)&&(stepNum != 4)" class="next-step-button" type="primary" size="medium" @click="toPreStep">
            上一步
          </el-button>
          <el-button v-if="stepNum != 4" class="next-step-button" type="primary" size="medium" @click="toNextStep">
            下一步
          </el-button>
          <el-button v-if="stepNum === 4" class="jump-step-button" type="primary" size="medium" @click="toFristStep">
            返回并修改
          </el-button>
          <el-button v-if="stepNum === 4" class="jump-step-button" type="primary" size="medium" @click="confirmResultAndAudit">
            确认并审核
          </el-button>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import steps from '@com/steps/steps.vue'
import TicketsManage from '@api/ticketsManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import objectTool from '@tool/objectTool.js'
import Form1 from './createTicketBaseInfo'
import Form2 from './createTicketRules'
import Form3 from './createTicketActivityMessage'
import Form4 from './createTicketShow'
import Form5 from './createTicketResultAudit'

export default {
  components: { steps, Form1, Form2, Form3, Form4, Form5 },
  data() {
    return {
      stepNum: 0,
      stepsData: [ // 商户入驻进度条数据
        {
          name: '票券基本信息'
          // to: '/ticketManage/createTicket/createTicketBaseInfo'
        },

        {
          name: '配置票券时间分摊规则及结算模式'
          // to: '/ticketManage/createTicket/createTicketRules'
        },
        {
          name: '活动信息配置'
          // to: '/ticketManage/createTicket/createTicketActivityMessage'
        },
        {
          name: '优惠券展示图'
          // to: '/ticketManage/createTicket/createTicketShow'
        },
        {
          name: '确认提交审核'
          // to: '/ticketManage/createTicket/createTicketResultAudit'
        }
      ],
      formdata: {
        facePrice: 0,
        currentPrice: 0,
        couponName: ''
      }
    }
  },
  computed: {
    subsidy() {
      return this.formdata.facePrice - this.formdata.currentPrice
    }
  },
  watch: {
  },
  methods: {
    toNextStep() {
      this.stepNum += 1
    },
    toPreStep() {
      this.stepNum -= 1
      // this.$router.push(this.nextStepPath)
    },
    toFristStep() {
      this.stepNum = 0
      // this.$router.push(this.nextStepPath)
    },
    toJumpStep() {
      this.toNextStep()
    },
    confirmResultAndAudit() {
      this.creatNewTicket()
      this.$router.push('/ticketManage/ticketList')
    },
    getForm1data(data) {
      this.formdata = Object.assign(this.formdata, data)
    },
    getForm2data(data) {
      this.formdata = Object.assign(this.formdata, data)
    },
    getForm3data(data) {
      this.formdata = Object.assign(this.formdata, data)
    },
    getForm4data(data) {
      this.formdata = Object.assign(this.formdata, data)
    },
    // 创建新票券请求
    async creatNewTicket() {
      return new Promise(async(resolve, reject) => {
        let data = this.formdata
        for (let k in data) {
          if (data[k] == '') {
            delete data[k]
          }
        }
        if (data.timeConfList) {
          for (let j = 0; j <= data.timeConfList.length - 1; j++) {
            if (data.timeConfList[j].setAppointTime == '' && data.timeConfList[j].startTime == '' && data.timeConfList[j].endTime == '' && data.timeConfList[j].setCycle == '' && data.timeConfList[j].cycleType == '' && data.timeConfList[j].cycleContent == '' && data.timeConfList[j].cycleStartTime == '' && data.timeConfList[j].cycleEndTime == '' && data.timeConfList[j].validAbsValue == '') {
              data.timeConfList.splice(j, 1)
              j--
            }
          }
        }
        data = objectTool.addValidPropertyToTarget(data)
        data = { body: {
          ...data
        }}
        try {
          let res = await TicketsManage.createNewTicket(data)
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            // this.config = res.data.pageContentJson.structrue
            // if (res.data.pageContentJson.structrue.length > 0) {
            //   resolve(true)
            // } else {
            //   resolve(false)
            // }
            if (res.data.couponId.length != 0) {
              this.$message({
                message: '票券创建成功',
                type: 'success'
              })
            } else {
              this.$message.error('票券创建失败')
            }
          } else {
            this.$message.error('创建票券请求失败')
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
    .steps-box {
        width:80%;
        margin:0 auto;
        margin-top:20px;
        /deep/.el-step__title {
            font-size:15px;
        }
    }
    .button-box{
        text-align:center;
        margin-top:40px;
        .prev-step-button{
            display:inline-block;
        }
        .next-step-button{
            display:inline-block;
            margin-left:40px;
        }
    }
}
</style>

