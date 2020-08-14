<template>
  <div class="box">
    <template v-if="args.timeType==='DISPLAY'">
      <template v-if="args.setAppointTime">
        <div class="row">
          <span>指定时间段</span>
          自{{ args.startTime }}至{{ args.endTime }}
        </div>
        <div v-if="args.setCycle" class="row">
          <span>设置循环周期</span>

          <span>每周 {{ daysShow }}</span>
          <span>{{ args.cycleStartTime }}至{{ args.cycleEndTime }}</span>
        </div>
      </template>
      <template v-else>
        <div class="row">
          无指定时间
        </div>
      </template>
    </template>
    <template v-else>
      <div class="row">
        <span>自</span>

        <span v-if="args.startTimeType==='AUDITVALID'">
          审核通过
        </span>
        <span v-else>
          {{ args.startTime }}
        </span>
        <span>至</span>
        <span>
          {{ args.endTime }}
        </span>

      </div>

    </template>

  </div>

</template>

<script>
export default {
  props: {
    args: {}
  },
  data() {
    return {
      daysShow: '',
      dayList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  created() {
    let temp = []
    if (this.args.cycleContent) {
      for (let i = 0; i < 7; i++) {
        if (this.args.cycleContent[i] === '1') {
          temp.push(this.dayList[i])
        }
      }
    }

    let daysShow = temp.join('、')
    if (!daysShow) {
      daysShow = '星期数据为空'
    }
    this.daysShow = daysShow
  }
}

</script>

<style lang="scss" scoped>
.row{
    span{
        margin-right:6px;
    }
}
</style>
