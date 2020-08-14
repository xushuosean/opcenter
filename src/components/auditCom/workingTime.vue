<template>
  <div class="box">
    <template v-if="show">
      <div v-if=" noDay">
        {{ noDay }}

      </div>
      <div v-for="(item,index) in weekArr" v-else :key="index">
        {{ item }}<span v-if="index !== weekArr.length-1">、</span>
      </div>
      <div v-if="!!args.bussiStartTime && !!args.bussiEndTime " class="time">{{ args.bussiStartTime }} - {{ args.bussiEndTime }}</div>
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
      show: '',
      noDay: '',
      week: '',
      content: '',
      weekArr: [],
      timeStr: '',
      weekEnum: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  created() {
    if (!this.args) { this.show = false; return }
    if (!this.args.bussinessWeeks) { this.show = false; return }
    this.getweek()
  },

  methods: {
    getweek() {
      this.week = this.args.bussinessWeeks

      if (this.week.length !== 7) {
        throw new Error('时间数据错误')
      } else if (this.week === '0000000') {
        this.noDay = '周一至周日不营业'
        return
      } else {
        let recordArr = []
        for (let i = 0; i <= 6; i++) {
          if (this.week[i] === '1') {
            if (recordArr.length === 0) {
              recordArr.push([i])
            } else {
              var last = recordArr[recordArr.length - 1]
              if (last.length === 1) {
                if (i - last[0] === 1) { last.push(i) } else { recordArr.push([i]) }
              } else if (last.length === 2) {
                if (i - last[1] === 1) { last[1] = i } else { recordArr.push([i]) }
              }
            }
          }
        }
        let resultArr = []
        for (let item of recordArr) {
          if (item.length === 1) {
            resultArr.push(this.weekEnum[item[0]])
          } else {
            resultArr.push(this.weekEnum[`${item[0]}至${item[1]}`])
          }
        }

        this.weekArr = resultArr
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.box{
    display: flex;
    flex-wrap: wrap;
    .time{
        margin-left:20px;
    }
}
</style>
