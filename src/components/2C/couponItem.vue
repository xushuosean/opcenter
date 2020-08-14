<template>
  <div :class="['coupon-item-box',type]">

    <div class="left-box">
      <div class="img-box">
        <div v-if="festival" class="festival-box">
          <span>{{ festival }}</span>
        </div>
        <img :src="primaryImgUrl" alt="">
      </div>

    </div>
    <div class="middle-box">
      <p class="title">{{ couponname }}</p>
      <div class="classify-box">
        <span class="name">{{ useScopeAbbre }}</span>
        <!-- <span
          v-for="(ite, index) in shopCtgrName"
          :key="index"
          class="type"
        >{{ item }}</span> -->
      </div>
      <div class="price-box">
        <div>
          <span class="new-price">¥{{ currentprice }}</span>
          <span class="old-price">¥{{ faceprice }}</span>
        </div>
        <p v-if="mktAdsType == 'SOLD'" class="num-box">
          已售出<span>{{ mktAdsInitValue }}</span>张
        </p>
        <p v-if="mktAdsType == 'BUY'" class="num-box">
          限时热销
        </p>
        <p v-if="mktAdsType == 'RUSH'" class="num-box">
          限时抢券
        </p>
        <p v-if="mktAdsType == 'GRANT'" class="num-box">
          已发放
        </p>

      </div>
      <div v-if="recommend" class="recommend">
        <span>{{ recommend }}</span>
      </div>

    </div>
    <div class="right-box">

      <div class="buy-btn">{{ buttonstyle }}</div>

    </div>
    <div class="scril-top" />
    <div class="scril-bottom" />
  </div>
</template>
<script>
export default {
  name: 'CouponItem',
  props: {
    type: {
      type: String,
      default: 'get'// 'buy' 'get','unval'
    },
    festival: {
    },
    recommend: {},
    couponname: {
      type: String
    },
    currentprice: {
      type: Number
    },
    faceprice: {
      type: Number
    },
    primaryImgUrl: {
      type: String,
      default: '../../assets/img/review-mine-none.png'
    },
    useScopeAbbre: {},
    buttonStyle: {},
    mktAdsType: {},
    mktAdsInitValue: {}
  },
  data() {
    return {}
  },
  computed: {
    buttonstyle() {
      let _buttonStyle
      if (this.buttonStyle === 'BUY') {
        _buttonStyle = '购买'
      } else if (this.buttonStyle === 'PURCHASE') {
        _buttonStyle = '抢购'
      } else if (this.buttonStyle === 'GET') {
        _buttonStyle = '领取'
      } else if (this.buttonStyle === 'SECKILL') {
        _buttonStyle = '秒杀'
      } else if (this.buttonStyle === 'TOBUY') {
        _buttonStyle = '即将开售'
      } else if (this.buttonStyle === 'SELLOUT') {
        _buttonStyle = '售罄'
      } else if (this.buttonStyle === 'RECEIVE') {
        _buttonStyle = '立即领取'
      } else if (this.buttonStyle === 'TORECEIVE') {
        _buttonStyle = '即将抢领'
      } else if (this.buttonStyle === 'RECEIVEOUT') {
        _buttonStyle = '已抢完'
      }
      return _buttonStyle
    },
    mktTrickType() {
      let _mktTrickType
      if (this.mktTrickType === 'LIMITTIME') {
        _mktTrickType = '限时热销'
      } else if (this.mktTrickType === 'FAKESELLNUM') {
        _mktTrickType = '已出售X张'
      } else if (this.mktTrickType === 'FAKERSVNUM') {
        _mktTrickType = '已发放X张'
      } else if (this.mktTrickType === 'LIMITNUM') {
        _mktTrickType = '限量抢券'
      }
      return _mktTrickType
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.coupon-item-box {
  padding-left:5px;
  width: 335px;
  height: 100px;
  display: flex;

  // align-items: center;
  margin: 0 auto;
  border-radius: 4px;

  background: url("../../assets/img/coupon-buy-2x.png") no-repeat center;
  background-color:  rgba(157,157,157,0.05);
  background-size: 100% 100%;
  margin-top: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 2px 16px -10px rgba(157,157,157,0.7);
  &.buy{background-image: url("../../assets/img/coupon-get-2x.png")}
  &.get{background-image: url("../../assets/img/coupon-get-2x.png")}
  &.unval{background-image: url("../../assets/img/coupon-unval-2x.png")}

  // .rect-container {
  //   width: 100px;
  //   height: 18px;
  //   position: absolute;
  //   top: -6px;
  //   right: -6px;
  //   .rect-box {
  //     width: 100px;
  //     height: 18px;
  //     background-color: rgba(255, 67, 56, 0.79);
  //     transform: rotate(45deg);
  //     transform-origin: 50px 50px;
  //     p {
  //       font-size: 10px;
  //       text-align: center;
  //       line-height: 18px;
  //       color: #fff;
  //     }
  //   }
  // }
  .left-box {
    padding-top:15px;
    width: 95px;
    display: flex;
    justify-content: center;

    .img-box{position: relative;border-radius:4px;overflow: hidden;width: 75px;}
    .festival-box {
      padding-left:4px;
       padding-right: 8px;
      position:absolute;
      max-width: 58px;
      height: 15px;
      background-color: #ff223d;

      border-bottom-right-radius: 15px;
      overflow: hidden;
      color: #fff;

      font-family: "PingFang SC";
      font-size: 10px;
      font-weight: 400;
      line-height: 14px;
      text-align: center;
    }
    img {
      width: 70px;
      max-height: 90px;
    }
  }
  .middle-box {
    position: relative;
    padding-top:15px;
    padding-bottom:15px;
    padding-left:8px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .recommend{
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
      padding-left:4px;
       padding: 0 4px;
       right:10px;
       top:0;
      position:absolute;
      max-width: 48px;
      height: 15px;
      background-color: #ff223d;

      overflow: hidden;
      color: #fff;

      font-family: "PingFang SC";
      font-size: 10px;
      font-weight: 400;
      line-height: 14px;
      text-align: center;
    }
    .title {
      font-size: 15px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 500;
      line-height: 21px;
    }
    .classify-box {
      margin-top: 4px;
      display: flex;
      align-items: flex-start;
      .name {
        font-size: 11px;
        color: #333333;
        letter-spacing: 0;
        line-height: 15px;
      }
      .type {
        display: inline-block;
        font-size: 8px;
        padding: 2px;
        color: #5084ff;
        letter-spacing: 0;
        line-height: 11px;
        margin-left: 2px;
        border: 1px solid #5084ff;
      }
    }
    .price-box {
      display: flex;
      margin-top: 6px;
      justify-content: space-between;
      padding-right:10px;
      .new-price {
        font-size: 20px;
        color: #ff3b30;
        letter-spacing: 0;
        text-align: center;
        font-weight: 500;
        line-height: 21px;
      }
      .old-price {
        opacity: 0.3;
        font-size: 11px;
        color: #000000;
        letter-spacing: 0;
        text-align: center;
        text-decoration: line-through;
        margin-left: 2px;
      }
    }
     .num-box {

      font-size: 10px;
      color: #bcbcbc;
      letter-spacing: 0;
      text-align: center;
      line-height: 14px;
      margin-top: 5px;
      white-space: nowrap;
    }
  }
  .right-box {
    width: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100px;
    .buy-btn {
      width: 15px;

      // background-image: linear-gradient(-90deg, #ff9500 0%, #ff5a00 100%);
      // box-shadow: 0 1px 2px 0 rgba(255, 96, 0, 0.5);
      // border-radius: 28px;
      font-size: 15px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 21px;
      margin: 0 auto;
    }

  }
  //   .scril-top {
  //     position: absolute;
  //     left: 90px;
  //     top: -10px;
  //     width: 20px;
  //     height: 20px;
  //     border-radius: 50%;
  //     box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
  //   }
  //   .scril-bottom {
  //     position: absolute;
  //     left: 90px;
  //     bottom: -10px;
  //     width: 20px;
  //     height: 20px;
  //     border-radius: 50%;
  //     box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
  //   }

}
</style>
