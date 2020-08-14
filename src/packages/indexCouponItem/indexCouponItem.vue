<template>
  <div class="coupon-item-box">
    <div class="left-bar" />
    <div class="left-box">
      <img :src="couponDetail.couponPicPath" alt="">
    </div>
    <div class="middle-box">
      <p class="title">{{ couponDetail.productName }}</p>
      <div class="classify-box">
        <span class="name">{{ couponDetail.abbreviName }}</span>
        <span v-for="(item,index) in couponDetail.shopCtgrName" :key="index" class="type">{{ item }}</span>
      </div>
      <p class="price-box">
        <span class="new-price">¥{{ couponDetail.marketPrice }}</span>
        <span class="old-price">¥{{ couponDetail.couponDenomt }}</span>
        <span class="num-box">
          已售出<span>{{ couponDetail.sellNum }}</span>张
        </span>
      </p>
    </div>
    <div :class="['right-box',couponDetail.buttonStyle === 'BUY'?'BUY':'RECEIVE']">
      <template v-if="couponDetail.buttonStyle === 'BUY'">
        购<br>买
      </template>
      <template v-else>
        立<br>即<br>领<br>取
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexCouponItem',
  props: {
    couponDetail: {
      type: Object,
      default: () => ({
        couponPicPath: require('./img/review-mine-none.png'),
        productName: '屈臣氏抵用券',
        abbreviName: '美妆',
        marketPrice: '100',
        couponDenomt: '50',
        sellNum: '200',
        buttonStyle: 'BUY'
      })
    }
  },
  data() {
    return {}
  },
  methods: {
    getConfig: function() {
      return {
        couponDetail: this.couponDetail
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .coupon-item-box {
        width:335px;
        height:100px;
        display:flex;
        align-items: center;
        margin:0 auto;
        border-radius:4px;
        box-shadow:rgba(0,0,0,.1) 0px 0px 5px;
        background: url("./img/indexCouponBg.png") no-repeat center;
        background-size:100% 100%;
        margin-top:15px;
        .left-bar {
          width: 5px;
          height: 100%;
          background: #FF7206;
        }
        .left-box {
          margin-left: 5px;
            // width:90px;
            // display:flex;
            // justify-content: center;
            // align-items: center;
            img {
                width:75px;
                max-height:90px;
            }
        }
        .middle-box {
            margin-left:10px;
            flex:1;
            display:flex;
            flex-direction:column;
            justify-content: flex-start;
            .title {
                font-size: 15px;
                color: #333333;
                letter-spacing: 0;
                font-weight:500;
                line-height:21px;
            }
            .classify-box {
                margin-top:4px;
                display:flex;
                align-items: flex-start;
                .name{
                    font-size: 11px;
                    color: #333333;
                    letter-spacing: 0;
                    line-height:15px;
                }
                .type {
                    display:inline-block;
                    font-size:8px;
                    padding:2px;
                    color: #5084FF;
                    letter-spacing: 0;
                    line-height:11px;
                    margin-left:2px;
                    border:1px solid #5084ff;
                }
            }
            .price-box {
                margin-top:6px;
                .new-price {
                    font-size: 20px;
                    color: #FF3B30;
                    letter-spacing: 0;
                    text-align: center;
                    font-weight:500;
                    line-height:21px;
                }
                .old-price {
                    opacity: 0.3;
                    font-size: 11px;
                    color: #000000;
                    letter-spacing: 0;
                    text-align: center;
                    text-decoration: line-through;
                    margin-left:2px;
                }
                .num-box {
                    display:block;
                    font-size: 10px;
                    color: #BCBCBC;
                    letter-spacing: 0;
                    text-align: center;
                    line-height:14px;
                    margin-top:5px;
                    white-space:nowrap;
                    margin-right: 10px;
                    float: right;
                }
            }
        }
        .right-box {
            width:40px;
            text-align:center;
            display: flex;
            justify-content: center;
            align-items: center;
            position:relative;
            height: 100px;

            color: #fff;
            font-size: 15px;
            line-height: 20px;
            // .buy-btn {
            //     width: 69px;
            //     height:28px;
            //     background-image: linear-gradient(-90deg, #FF9500 0%, #FF5A00 100%);
            //     // box-shadow: 0 1px 2px 0 rgba(255,96,0,0.50);
            //     border-radius: 28px;
            //     font-size: 13px;
            //     color: #FFFFFF;
            //     letter-spacing: 0;
            //     text-align: center;
            //     line-height:28px;
            //     margin:0 auto;
            // }
        }
        .BUY {
          background-image: linear-gradient(-90deg, #FF7104 0%, #FF9C39 100%);
        }
        .RECEIVE {
          background-image: linear-gradient(-90deg, #FF3B3B 0%, #FF6A68 100%);
        }
    }
</style>
