<template>
  <el-container class="container-box">
    <el-main>
      <form1 v-show="stepnum == 0" ref="form1" @getFormData="getFormData" />
      <form2 v-show="stepnum == 1" :form-data="formData" />
      <el-card class="el-card-mt20" shadow="hover">
        <steps class="steps-box" :steps-data="stepsData" :current-step="stepnum" />
        <div class="button-box">
          <el-button v-if="stepnum != 1" class="next-step-button" type="primary" size="medium" @click="toNextStep">
            下一步
          </el-button>
          <el-button v-if="stepnum === 1" class="jump-step-button" type="primary" size="medium" @click="stepnum = 0">
            返回修改
          </el-button>
          <el-button v-if="stepnum === 1" class="jump-step-button" type="primary" size="medium" @click="confirmResultAndAudit">
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
import { AjaxReturnType } from '@enum/service-enum.js'
import form1 from './createCustomAggregationBaseInfo.vue'
import form2 from './createCustomAggregationResultAudit.vue'

import CustomAggregation from '@api/customAggregation.service.js'
import objectTool from '../../../tool/objectTool'
export default {
  components: {
    steps,
    form1,
    form2
  },
  data() {
    return {
      stepnum: 0,
      formData: {},
      stepsData: [ // 创建红包进度条数据
        {
          name: '自定义聚合基本信息'
        //   to: '/customAggregation/createCustomAggregation/createCustomAggregationBaseInfo'
        },
        {
          name: '确认创建'
        //   to: '/customAggregation/createCustomAggregation/createCustomAggregationResultAudit'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    toNextStep() {
      this.$refs.form1.getFormData()
      this.stepnum += 1
    },
    toJumpStep() {
      this.toNextStep()
    },
    confirmResultAndAudit() {
      this.createAggregation()
      this.$router.push('/customAggregation/customAggregationList')
    },
    getFormData(data) {
      this.formData = data
    },
    async createAggregation() {
      return new Promise(async(resolve, reject) => {
        let data = this.formData
        data = objectTool.addValidPropertyToTarget(data)
        data = {
          body: {
            ...data
          }
        }
        try {
          let res = await CustomAggregation.createAggregation(data)
          if (res.header.returnCode === AjaxReturnType.SUCCESS) {
            this.$message({
              message: '票券创建成功',
              type: 'success'
            })
          } else {
            this.$message.error('票券创建失败')
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

