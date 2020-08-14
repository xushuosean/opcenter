<template>
  <div class="storetage">
    <div class="left">
      <div class="imgbox">
        <img :src="storeData.shopLogoPath" alt="" class="img">
      </div>
    </div>
    <div class="right">
      <div class="title_line">
        {{ storeData.shopName }}
      </div>
      <div class="info_line">
        <div class="text">{{ storeData.distance }}km</div>
        <div class="divition" />
        <div class="text">{{ storeData.cbdName }}</div>
        <div class="divition" />
        <div v-for="(item,index) in storeData.shopCtgrName" :key="index" class="typetage">{{ item }}</div>
      </div>
      <div class="crossdivition" />
      <div v-if="Boolean(storeData.disccoutsPayId)" class="discontline">
        <div class="hui">惠</div>
        优惠买单
      </div>
      <div class="discount_info_box">
        <div v-for="(item0,index0) in storeData.productLabel" :key="index0" class="discount_info">
          <div class="color_font">{{ item0.buttonStyle }}</div>
          <div class="discount_info_desc">{{ item0.productName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DiscountStoreItem',
  props: {
    storeData: {
      type: Object,
      default: () => ({
        'shopId': '002',
        'shopName': '肯德基（张江店）',
        'siteCode': '001',
        'detailAddr': '浦东新区金科路',
        'cbdName': '水游城',
        'shopLogoPath': require('./img/hdl.png'),
        'distance': 2.2,
        'shopCtgrName': ['快餐', '可乐', '汉堡'],
        'disccoutsPayId': '1',
        'productLabel': [
          {
            'productId': '001',
            'productName': '80抵100代⾦券',
            'buttonStyle': 'ROB'
          }
        ]
      })
    }
  },
  methods: {
    getConfig: function() {
      return {

      }
    }
  }
}
</script>

<style lang='scss' scoped>
.storetage {
    width: 375px;
    background: #fff;
    min-height: 140px;
    flex-shrink: 1;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    border-bottom:1px solid rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    overflow: hidden;
    .left {
        width: 88px;
        height: 140px;
        overflow: hidden;
        float: left;
        .imgbox {
            height: 66px;
            width: 66px;
            margin-left: 20px;
            margin-top: 16px;
            .img {
                width: 66px;
                height: 66px;
            }
        }
    }
    .right {
        width: 287px;
        float: left;
        min-height: 140px;
        padding:20px 0 16px 10px;
        box-sizing:border-box;
        .title_line {
            width: 210px;
            height: 21px;
            font-family: PingFangSC-Medium;
            font-size: 15px;
            color: #333333;
            letter-spacing: 0;
            line-height: 21px;
            margin-bottom: 9px;
        }
        .info_line {
            height: 16px;
            width: 278px;
            font-family: PingFangSC-Regular;
            font-size: 11px;
            color: #333333;
            letter-spacing: 0;
            line-height: 16px;
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            .text {
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #333333;
                letter-spacing: 0;
                line-height: 16px;
                height: 16px;
            }
            .divition {
                height: 9px;
                width: 0px;
                border-left: 1px #C4C4C4 solid;
                margin: 0 6px;
            }
            .typetage {
                height: 14px;
                text-align: center;
                font-size: 10px;
                border: 1px #5084FF solid;
                color: #5084FF;
                line-height: 12px;
                padding: 0 2px;
                margin-right: 6px;
            }
        }
        .crossdivition {
            height: 0;
            width: 287px;
            border-top: 1px #EAEAEA solid;
            margin-bottom: 6px;
        }
        .discontline {
            height: 16px;
            font-size: 11px;
            line-height: 16px;
            margin-bottom: 5px;
            .hui {
                width: 16px;
                height: 16px;
                background-image: linear-gradient(84deg, #5084FF 25%, #85A5FA 100%);
                font-size: 10px;
                line-height: 16px;
                text-align: center;
                color: #fff;
                border-radius: 2px;
                margin-right: 5px;
                float: left;
            }
        }
        .discount_info_box {
            width: 287px;
            display: flex;
            flex-wrap: wrap;
            .discount_info {
                width: 135px;
                height: 16px;
                line-height: 16px;
                font-size: 11px;
                margin-right: 5px;
                margin-bottom: 5px;
                .color_font {
                    width: 16px;
                    height: 16px;
                    background-image: linear-gradient(-90deg, #FF9500 0%, #FF5A00 100%);
                    font-size: 10px;
                    line-height: 16px;
                    text-align: center;
                    color: #fff;
                    border-radius: 2px;
                    margin-right: 5px;
                    float: left;
                }
                .discount_info_desc {
                    float: left;
                    height: 16px;
                    line-height: 16px;
                }
            }
        }
    }
}
</style>
