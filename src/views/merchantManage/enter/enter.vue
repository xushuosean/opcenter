<template>
  <el-container class="container-box">
    <el-main>
      <router-view ref="routerView" />
      <el-card class="el-card-mt20" shadow="hover">
        <steps ref="steps" class="steps-box" :steps-data="stepsData" :current-step="currentStep" :all-step="merchantStep" />
        <div class="button-box">
          <el-button v-if="currentStep != 0" class="next-step-button" type="primary" size="medium" @click="toPrevStep">
            {{ currentStep === 4 ? '返回修改' : '上一步' }}
          </el-button>
          <el-button v-if="currentStep != 4" class="next-step-button" type="primary" size="medium" @click="toNextStep">
            下一步
          </el-button>
          <el-button v-if="currentStep === 3" class="jump-step-button" type="primary" size="medium" @click="toJumpStep">
            跳过这一步
          </el-button>
          <el-button v-if="currentStep === 4" class="jump-step-button" type="primary" size="medium" @click="confirmResultAndAudit">
            确认并审核
          </el-button>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@store/mutation-types'
import steps from '@com/steps/steps.vue'
export default {
  components: { steps },
  data() {
    return {
      /** 进度条数据 */
      stepsData: [
        {
          name: '商户基本信息',
          to: '/merchantManage/enter/merchantBaseInfo'
        },
        {
          name: '商户结算信息及签约交易类型',
          to: '/merchantManage/enter/merchantSettleAccount'
        },
        {
          name: '图片资料上传',
          to: '/merchantManage/enter/merchantPictureResource'
        },
        {
          name: '新增商户下属门店',
          to: '/merchantManage/enter/merchantStores'
        },
        {
          name: '确认提交审核',
          to: '/merchantManage/enter/merchantResultAudit'
        }
      ]
    }
  },
  computed: {
    /**
    * merchantStep:记录配置的总进度
    * currentStep: 当前所在的进度
    */
    ...mapGetters('merchantManage', ['merchantStep', 'currentStep']),
    stepsLength() {
      return this.stepsData.length
    },
    currentPath() {
      return this.stepsData[this.currentStep].to
    }
  },
  // 切换路由时 清空vuex数据
  beforeRouteLeave(to, form, next) {
    this[`${types.CLEAR_STORE_DATA}`]()
    next()
  },
  methods: {
    ...mapMutations('merchantManage', [types.SET_MERCHANT_STEP, types.CLEAR_STORE_DATA, types.MIUNS_CURRENT_STEP, types.ADD_CURRENT_STEP]),
    // 上一步
    toPrevStep() {
      this[`${types.MIUNS_CURRENT_STEP}`]()
    },
    // 点击下一步要求保存当前页的信息
    toNextStep() {
      this[`${types.ADD_CURRENT_STEP}`]()
      if (this.$route.name === 'merchantSettleAccount') {
        this.$refs['routerView'].submitComponentForm()
        this.$refs['routerView'].$children[1].submitComponentForm()
      } else {
        this.$refs['routerView'].submitComponentForm()
      }
    },
    // 跳过
    toJumpStep() {
      this.toNextStep()
    },
    // 提交商户信息的审核
    async confirmResultAndAudit() {
      try {
        const responseData = await this.$refs['routerView'].submitComponentForm()
        if (responseData) {
          this.$router.push('/merchantManage/entryList')
        }
      } catch (error) {
        console.log(error)
      }
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
        .jump-step-button{
           margin-left:40px;
        }
    }
}
</style>

