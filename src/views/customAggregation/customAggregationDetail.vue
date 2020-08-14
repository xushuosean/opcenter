<!-- 自定义聚合详情 -->
<template>
  <div class="box">
    <el-card>
      <h3>自定义聚合详情</h3>
      <div class="contentbox">
        <ul>
          <li class="item-row">
            <div class="row-label">
              聚合编号
            </div>
            <div class="row-content">
              {{ baseInfoData.polyId }}
            </div>
          </li>
          <li class="item-row">
            <div class="row-label">
              聚合名称
            </div>
            <div class="row-content">
              {{ baseInfoData.polyName }}
            </div>
          </li>
          <li class="item-row">
            <div class="row-label">
              聚合对象
            </div>
            <div class="row-content">
              {{ baseInfoData.polyType }}
            </div>
          </li>
          <li class="item-row">
            <div class="row-label">
              选择聚合对象
            </div>
            <div class="row-content">
              <ul>
                <li v-for="(item,index) in couponlist" :key="index" class="inner-li">
                  票券/红包{{ index+1 }} {{ item.polyObjName }}(票券批次号：{{ item.polyObjId }})
                </li>
                <li v-for="(item,index) in shoplist" :key="index" class="inner-li">
                  门店{{ index+1 }} {{ item.polyObjName }}(门店Id：{{ item.polyObjId }})
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
import CustomAggregation from '@api/customAggregation.service.js'
export default {
  components: { },
  data() {
    return {
      baseInfoData: {
        polyId: 17, // 聚合编号
        polyName: '票券编号1', // 聚合名称
        polyType: 'COUPON', // 聚合类型   票券-COUPON ,门店-SHOP
        visitUrl: '/xxx/xxx',					 // 访问url
        polyDataDetailVOList: [ // 聚合对象列表
          {
            polyObjType: 'COUPON',		// 聚合对象类型  票券-COUPON 门店- SHOP
            polyObjName: 'xxxx代金券1',	// 聚合属性名称
            polyObjId: '123213111'		// 聚合属性编号
          },
          {
            polyObjType: 'COUPON',
            polyObjName: 'xxxx票券1',
            polyObjId: '123213112'
          }
        ]
      },
      couponlist: [],
      shoplist: [],
      resData: []
    }
  },
  computed: {},
  watch: {},
  async created() {
    await this.getData()
  },
  mounted() {

  },
  methods: {
    async getData() {
      try {
        let res = await CustomAggregation.searchAggregationDetail({ polyId: this.$route.query.polyId })
        if (res.resultCode === '000000') {
          this.baseInfoData = this.dealData(res.data)
        } else {
          throw new Error('查询自定义聚合详情失败')
        }
      } catch (err) {
        console.error(err)
        console.log('this.resData', this.resData)
        this.$message.error({ message: '查询自定义聚合详情失败' })
      }
    },
    dealData(obj) {
      let _obj = obj
      _obj.polyType = _obj.polyType == 'COUPON' ? '票券/红包' : '门店'
      _obj.polyDataDetailVOList.forEach(e => {
        if (e.polyObjType == 'COUPON') {
          this.couponlist.push(e)
        } else if (e.polyObjType == 'SHOP') {
          this.shoplist.push(e)
        }
      })
      return _obj
    }
  }

}
</script>
<style lang='scss' scoped>
.box{margin:40px 20px 0 20px;
    padding-top:5px;padding-bottom: 5px;
  .item-row{
  padding:10px;
  display: flex;
  .row-label{ width: 180px;margin-right:15px;}
  .row-content{ flex:1;
    .inner-li {
      margin-bottom: 5px;
    }
  }
  &:hover{
    background-color: rgba(200, 216, 240, 0.6);
  }
}
}
.el-card{
    margin-top:30px;
}
.buttonWrapper{
    margin-top:20px;
    display: flex;
    justify-content: center;
    button{
        margin-right:20px;
    }
}
.el-table {
    border:none;
   /deep/ td{border:none ;}
    &::before{
        height: 0px;
    }
    /deep/ th.is-leaf{
        display: none;

    }
}
h3{
    font-size: 18px;
    font-weight:bold;
    margin-bottom:15px;
    &.secondH3{
        margin-bottom:25px;
        margin-top:40px;
    }
}

h4{
  // color:#606266
  font-weight:bold;
  margin:10px 0;
}
.formWrapper{
    width: 800px;
    min-height: 150px;
}

.imgRow{
    display: flex;
    justify-content: left;
    margin-bottom: 20px;
    .label{
        width: 180px;
        margin-right: 50px;
    }
    .el-image{
        margin-right: 30px;
    }

    .el-carousel{
        width: 200px;
    }
}

</style>
