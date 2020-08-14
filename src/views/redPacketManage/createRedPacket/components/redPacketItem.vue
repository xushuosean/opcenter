<template>
  <div class="packet-box">
    <div class="main">
      <div class="main-left">
        <div class="discount"><span class="rmb">￥</span><span class="yuan">5</span></div>
        <div class="situation">满100元可用</div>
      </div>
      <div class="main-right">
        <div class="desc">
          <div class="desc-text">
            <div class="title">红包标题</div>
            <div class="scope">适用范围</div>
            <div class="validity">有效期至 2008/8/28</div>
          </div>
          <div class="button"><div class="receiveButton">立即领取</div> </div>

        </div>
        <div class="useIllum">
          <div class="illum-text">使用说明
            <span v-if="!open" class="shenglue">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          </div>
          <div class="icon">
            <i :class="[open?'el-icon-arrow-up':'el-icon-arrow-down']" />
          </div>
        </div>
      </div>
    </div>
    <div :class="{'collaps-box':true,open:open}">
      <div :class="{collaps:true}">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    args: {
      default: () => { return {} }
    },
    open: {
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}

</script>
<style lang="scss" scoped>
.packet-box{
    margin:10px auto 0;

    width: 335px;
    border-radius:5px;
    overflow: hidden;
     background: #ffffff;
  box-shadow: 0px 3px 10px -1px rgba(153,153,153,0.11);

    .main{
        height: 120px;
        display:flex;
        .main-left{
            width: 91px;
            color:#fff;
            background: linear-gradient(90deg, #FF6172, #FF3C54);
            padding-top:31px;
            text-align: center;
            .discount{
                .rmb{color: #ffffff;
                    font-family: "PingFangSC-Semibold";
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 19px;
                    text-align: center;
            }
                .yuan{
                     color: #ffffff;
                    font-family: "PingFangSC-Semibold";
                    font-size: 28px;
                    font-weight: 400;
                    line-height: 36px;
                    text-align: center;
                 }
            }
            .situation{
                color: #ffffff;
                font-family: "PingFang SC";
                font-size: 11px;
                font-weight: 400;
                line-height: 15px;
                text-align: center;
            }

            }
            .main-right{
                display:flex;
                flex:1;
                flex-direction: column;
                .useIllum{
                    height:25px;
                    display: flex;
                    padding-left:10px;
                    padding-right:5px;
                    .illum-text{
                        flex:1;
                        color: #666666;
                        font-family: "PingFang SC";
                        font-size: 10px;
                        font-weight: 400;
                        line-height: 25px;
                        .shenglue {
                          display: inline-block;
                          float: right;
                          width:150px;
                          overflow:hidden;
                          text-overflow:ellipsis;
                          -o-text-overflow:ellipsis;
                          -webkit-text-overflow:ellipsis;
                          -moz-text-overflow:ellipsis;
                          white-space:nowrap;
                        }
                    }
                    .icon{
                        i {
                          float: right;
                          line-height: 25px;
                        }
                    }

                }
                .desc{
                    display:flex;
                    justify-content: space-between;
                    flex:1;
                    padding-left:10px;
                    padding-right:10px;
                    padding-top:16px;

                    border-bottom: dashed 2px #f3f5f9;
                    .desc-text{flex:1}
                    .title{
                        height: 19px;
                        color: #333333;
                        font-family: "PingFangSC-Medium";
                        font-size: 15px;
                        font-weight: 400;
                        line-height: 19px;
                        margin-bottom: 8px;
                        }
                        .scope{
                            height: 15px;
                            color: #333333;
                            font-family: "PingFang SC";
                            font-size: 11px;
                            font-weight: 400;
                            line-height: 15px;
                            margin-bottom:12px;
                        }
                        .validity{
                              height: 15px;
                                color: #999999;
                                font-family: "PingFang SC";
                                font-size: 11px;
                                font-weight: 400;
                                line-height: 15px;
                        }
                    .button{
                        padding-top:32px;
                        .receiveButton{
                              width: 64px;
                                height: 26.22px;
                                background: linear-gradient(90deg, #FF6172, #FF3C54);
                                color: #ffffff;
                                font-family: "PingFangSC-Medium";
                                font-size: 12px;
                                font-weight: 400;
                                line-height:  26.22px;
                                text-align: center;
                                border-radius:13.11px;
                        }
                    }
                }
            }
        }
.collaps-box{
             max-height:0;
            overflow: hidden;
            transition: all ease-in-out 0.4s;
            &.open{
    max-height:60px

}
}
        .collaps{
            box-sizing: border-box;
            color: #666666;
            font-family: "PingFang SC";
            font-size: 10px;
            font-weight: 400;
            line-height: 14px;
            padding:8px 25px 8px 11px;
            background-color: #f9f9f9;

        }
    }

.base{transition: all ease-in-out 0.4s;
}
.up{
    transform: rotate(-180deg)
}
</style>
