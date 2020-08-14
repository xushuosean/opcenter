<!--红包创建-总页-->
<template>
  <el-container class="container-box">
    <el-main>
      <form1 v-show="stepNum == 0" ref="form1" @getForm="getForm" />
      <form2 v-show="stepNum == 1" ref="form2" :formdata="formdata" :subsidy="subsidy" @getForm="getForm" />
      <form3 v-show="stepNum == 2" ref="form3" @getForm="getForm" />
      <form4 v-show="stepNum == 3" ref="form4" @getForm="getForm" />
      <form5 v-show="stepNum == 4" ref="form5" @getForm="getForm" />
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
import { AjaxReturnType } from '@enum/service-enum.js'
import objectTool from '@tool/objectTool.js'
import Form1 from './createRedPacketBaseInfo'
import Form2 from './createRedPacketRules'
import Form3 from './createRedPacketActivityMessage'
import Form4 from './createRedPacketShow'
import Form5 from './createRedPacketResultAudit'
import RedPacketManage from '@api/redPacketManage.service.js'

export default {
  components: {
    steps,
    Form1,
    Form2,
    Form3,
    Form4,
    Form5
  },
  data() {
    return {
      stepNum: 0,
      stepsData: [ // 创建红包进度条数据
        {
          name: '红包基本信息'
          // to: '/redPacketManage/createRedPacket/createRedPacketBaseInfo'
        },
        {
          name: '配置时间分摊规则及结算模式'
          // to: '/redPacketManage/createRedPacket/createRedPacketRules'
        },
        {
          name: '活动信息配置'
          // to: '/redPacketManage/createRedPacket/createRedPacketActivityMessage'
        },
        {
          name: '红包展示图'
          // to: '/redPacketManage/createRedPacket/createRedPacketShow'
        },
        {
          name: '确认提交审核'
          // to: '/redPacketManage/createRedPacket/createRedPacketResultAudit'
        }
      ],
      formdata: {
        rpkType: ''
      },
      form2data: {
        rpkType: ''
      }
    }
  },
  computed: {
    subsidy() {
      var _subsidy
      if (this.formdata.rpkType == 'FULLREDUCE') {
        _subsidy = this.formdata.reduceAmount
      } else if (this.formdata.rpkType == 'DISCOUNT') {
        _subsidy = 10 - this.formdata.discountRate
      }
      return _subsidy
    }
  },
  watch: {

  },
  methods: {
    toNextStep() {
      this.stepNum += 1
      for (var k in this.$refs) {
        if (k == 'form' + this.stepNum) {
          this.$refs[k].getForm()
          console.log(k)
        }
      }
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
      this.creatRedPacket()
      this.$router.push('/ticketManage/ticketList')
    },
    getForm(data) {
      this.formdata = Object.assign(this.formdata, data)
    },
    // 创建新票券请求
    async creatRedPacket() {
      return new Promise(async(resolve, reject) => {
        let data = this.formdata
        var _data = data
        for (var k in _data) {
          if (_data[k] == '') {
            delete _data[k]
          }
        }
        data = objectTool.addValidPropertyToTarget(_data)
        console.log(data)
        data = { body: {
          ...data
        }}
        try {
          let res = await RedPacketManage.createNewRedPacket(data)
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            // this.config = res.data.pageContentJson.structrue
            // if (res.data.pageContentJson.structrue.length > 0) {
            //   resolve(true)
            // } else {
            //   resolve(false)
            // }
            if (res.data.couponId.length != 0) {
              this.$message({
                message: '红包创建成功',
                type: 'success'
              })
            } else {
              this.$message.error('红包创建失败')
            }
          } else {
            this.$message.error('创建红包请求失败')
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

