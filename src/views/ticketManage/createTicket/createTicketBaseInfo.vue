<!--1.票券基本信息-->
<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>票券基本信息</h3>
      <el-form ref="componentForm" label-position="left" label-width="140px" class="componentForm" size="medium">
        <el-form-item label="导入已有票券模板">
          <el-input v-model="componentForm.merchantName" :clearable="true" placeholder="请输入票券名称或票券批次号" />
        </el-form-item>
        <el-form-item label="票券生成方">
          <el-select v-model="componentForm.producerType" :clearable="true" placeholder="请选择商户类型">
            <el-option label="内部券" value="INNER" />
            <el-option label="外部券" value="OUTER" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="componentForm.producerType == 'OUTER'" label="合作方批次号">
          <el-input v-model="componentForm.coopBatchNo" :clearable="true" placeholder="请输入外部券合作方批次号" />
        </el-form-item>
        <el-form-item v-if="componentForm.producerType == 'OUTER'" label="券码展示规则">
          <el-select v-model="componentForm.outerDisPlayRule" :clearable="true">
            <el-option label="只展示字符券码" value="INNER" />
            <el-option label="展示字符券码、条码机二维码" value="OUTER" />
          </el-select>

        </el-form-item>
        <el-form-item label="票券类型">
          <el-select v-model="componentForm.couponType" :clearable="true" placeholder="请选择票券类型">
            <el-option label="代金券" value="CASH" />
            <el-option label="商品券" value="PRODUCT" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="componentForm.couponType == 'PRODUCT'">
          <el-checkbox v-model="showUrl">显示跳转外部App按钮</el-checkbox>
          <el-input v-if="showUrl" v-model="componentForm.outerUrl" placeholder="请输入跳转App的url" />
        </el-form-item> 
        <el-form-item label="用券买单规则">
          <span v-if="componentForm.couponType == 'PRODUCT'">不可用券买单</span>
          <el-select v-show="componentForm.couponType == 'CASH'" v-model="componentForm.overlayDiscountPay" :clearable="true">
            <el-option label="可用券买单" value="true" />
            <el-option label="不可用券买单" value="false" />
          </el-select>
          <el-select v-show="(componentForm.overlayDiscountPay == 'true')&&(componentForm.couponType == 'CASH')" v-model="componentForm.overlayPay" :clearable="true" style="margin-left:20px">
            <el-option label="买单时可叠加优惠买单" value="true" />
            <el-option label="买单时不可叠加优惠买单" value="false" />
          </el-select>
        </el-form-item>

        <el-form-item label="票券获取规则">
          <el-select v-model="componentForm.achieveType" :clearable="true" placeholder="请选择票券获取规则">
            <el-option label="购买" value="BUY" />
            <el-option label="领取" value="GET" />
            <el-option label="发放" value="GRANT" />
          </el-select>
        </el-form-item>
        <el-form-item label="适用门店范围">
          <el-select v-model="appliType" :clearable="true" placeholder="请选择系统内门店/系统内">
            <el-option label="门店维度(系统内门店)" value="shop" />
            <el-option label="商户维度(可导入自定义门店)" value="mcht" />
          </el-select>
          <mendianweidu v-if="appliType == 'shop'" @getShopList="getShopList" />
          <shanghuweidu v-if="appliType == 'mcht'" @getMerchant="getMerchant" />

        </el-form-item>
        <!-- <el-form-item label="在线买单叠加满减">
          <el-select v-model="componentForm.merchantType" :clearable="true" placeholder="请选择商票券类型">
            <el-option label="可叠加优惠买单满减" value="all" />
            <el-option label="正常" value="normal" />
            <el-option label="过期" value="outofdate" />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="适用门店范围" required>
          <el-select v-model="componentForm.merchantType" :clearable="true" placeholder="请选择系统内门店/系统内">
            <el-option label="门店维度(系统内门店)" value="all" />
            <el-option label="正常" value="normal" />
            <el-option label="过期" value="outofdate" />
          </el-select>
          <div class="el-card-mt20">
            <el-select v-model="componentForm.merchantType" :clearable="true" placeholder="手动选择门店">
              <el-option label="手动选择门店" value="all" />
              <el-option label="批量导入门店" value="normal" />
              <el-option label="过期" value="outofdate" />
            </el-select>
          </div>
          <div class="el-card-mt20 search-box">
            <el-select v-model="componentForm.searchMethod">
              <el-option label="按门店名称或编号搜索" value="byNameOrCode" />
              <el-option label="按商户地区及类别筛选" value="byArea" />
            </el-select>
            <template v-if="componentForm.searchMethod==='byNameOrCode'">
              <el-input v-model="componentForm.searchNameOrCode" class="ml20" placeholder="请输入商户名称或商户编号" />
              <el-button type="primary" class="ml20">搜索</el-button>
            </template>
            <div v-if="componentForm.searchMethod==='byArea'" class="merchantArea">
              <div class="el-form-item-flex el-card-mt20">
                <span>商户地区</span>
                <el-form-item prop="province" class="ml20" style="width:200px;">
                  <el-select placeholder="请选择省" />
                </el-form-item>
                <el-form-item prop="city" class="ml20">
                  <el-select placeholder="请选择市" />
                </el-form-item>
                <el-form-item prop="district" class="ml20">
                  <el-select placeholder="请选择区" />
                </el-form-item>
              </div>
              <div class="el-form-item-flex el-card-mt20">
                <span>门店类别</span>
                <el-form-item prop="province" class="ml20">
                  <el-select placeholder="请选择一级分类" />
                </el-form-item>
                <el-form-item prop="city" class="ml20">
                  <el-select placeholder="请选择二级分类" />
                </el-form-item>
                <el-button type="primary" class="ml20">筛选</el-button>
              </div>
            </div>
            <el-table ref="merchantList" max-height="300" :data="merchantList">
              <el-table-column type="selection" />
              <el-table-column prop="merchant" label="全选" />
            </el-table>
            <h5>已选择商户及其属下门店</h5>
            <el-table ref="selectedMerchantList" class="selectedMerchantList" max-height="300" :data="selectedMerchantList">
              <el-table-column width="100">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="merchantName" />
              <el-table-column prop="merchantCode" />
            </el-table>
          </div>
        </el-form-item> -->

        <!-- <el-form-item label="票券获取规则" prop="merchantType">
          <el-select v-model="componentForm.merchantType" :clearable="true" placeholder="请选择票券获取规则">
            <el-option label="购买" value="all" />
            <el-option label="领取" value="normal" />
            <el-option label="发放" value="outofdate" />
          </el-select>
        </el-form-item> -->
        <el-form-item v-show="componentForm.achieveType=='BUY'" label="支付方式">
          <span style="display:inline-block;margin-right:20px">本金</span>
          <el-checkbox v-model="componentForm.supportCreditCard">信用卡</el-checkbox>
          <el-checkbox v-model="componentForm.supportDebitCard">借记卡</el-checkbox>
        </el-form-item>
        <el-form-item label="票券面额">
          <el-input v-model="componentForm.facePrice" :clearable="true" placeholder="票券面额" />元
        </el-form-item>
        <el-form-item label="票券现价">
          <tempate v-if="componentForm.achieveType != 'BUY'">
            0
          </tempate>
          <el-input v-show="componentForm.achieveType == 'BUY'" v-model="componentForm.currentPrice" :clearable="true" placeholder="用户购买现价" />元
        </el-form-item>
        <el-form-item label="票券名称">
          <el-input v-model="componentForm.couponName" :clearable="true" placeholder="将显示在用户端，尽量只写现价+代金券，如：10元代金券（最多11个字）" />
        </el-form-item>
        <el-form-item label="总库存">
          <el-input v-model="componentForm.stock" :clearable="true" placeholder="请输入票券库存" />张
        </el-form-item>
        <el-form-item label="限制购买数量">
          绑卡用户
          <el-select v-model="showUnbindCardLimit" :clearable="true">
            <el-option label="限购" value="li" />
            <el-option label="不限购" value="noli" />
          </el-select>
          <el-input v-show="showUnbindCardLimit == 'li'" v-model="componentForm.bindCardLimit" class="ml20" :clearable="true" placeholder="最多可购" /><span v-show="showUnbindCardLimit == 'li'">张</span>

          <template>
            <div v-show="componentForm.achieveType != 'BUY'">
              非绑卡用户
              <el-select v-model="showBindCardLimit" :clearable="true">
                <el-option label="限购" value="li" />
                <el-option label="不限购" value="noli" />
              </el-select>
              <el-input v-show="showBindCardLimit == 'li'" v-model="componentForm.unbindCardLimit" class="ml20" :clearable="true" placeholder="最多可购" /><span v-show="showBindCardLimit == 'li'">张</span>
            </div>
          </template>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import mendianweidu from './comp/mendianweidu'
import shanghuweidu from './comp/shanghuweidu'
export default {
  components: {
    mendianweidu,
    shanghuweidu
  },
  data() {
    return {
      currentStep: 0,
      couponUseRule: '', // 用券买单规则
      primaryImgUrl: '', // 优惠券主图
      componentForm: {
        producerType: 'INNER', // 票券生成方 INNER-内部券 OUTER-外部券
        couponType: 'CASH', // 票券类型 CASH-现金券 PRODUCT-商品券
        outerDisPlayRule: '', // 外部券展示规则
        couponRule: '', // 用券买单规则
        outerUrl: '', // 外部券跳转url
        coopBatchNo: '', // 合作方批次号
        overlayPay: '', // 能否叠加购买 false/true
        overlayDiscountPay: '',
        suitDimen: '', // 适用维度
        achieveType: 'BUY', // 券获取方式 BUY-购买 GET-领取 GRANT-发放
        payMethod: '0', // 券支付方式 0-本金 1-积分
        supportCreditCard: false, // 是否支持本行贷记卡 true/false
        supportDebitCard: false, // 是否支持本行借记卡 true/false
        facePrice: '', // 券面额
        currentPrice: '', // 券现价
        couponName: '', // 券名称
        stock: '', // 总库存
        unbindCardLimit: '', // 非绑卡限购
        bindCardLimit: '', // 绑卡限购
        shopList: [
          {
            suitType: '', // SHOP-门店  MCHT-商户
            suitAttrId: '', // 门店Id或者商户Id
            suitAttrName: '' // 门店名称或商户名称
          }
        ]
      },
      showUrl: false,
      showUnbindCardLimit: 'li',
      showBindCardLimit: 'li',
      merchantTypeChoice: [],
      rules: {
      },
      // merchantList: [
      // ],
      appliType: 'shop'
    }
  },
  computed: {
  },
  watch: {
    // // 监听借记卡类型
    // merchantTypeChoice(newVale, oldVale) {
    //   if (newVale.length == 0) {
    //     this.componentForm.supportCreditCard = false
    //     this.componentForm.supportDebitCard = false
    //   } else if (newVale.length == 2) {
    //     this.componentForm.supportCreditCard = true
    //     this.componentForm.supportDebitCard = true
    //   } else if (newVale[0] == '借记卡') {
    //     this.componentForm.supportCreditCard = false
    //     this.componentForm.supportDebitCard = true
    //   } else {
    //     this.componentForm.supportCreditCard = true
    //     this.componentForm.supportDebitCard = false
    //   }
    // },
    componentForm: {
      handler: function(newVal, oldVal) {
        this.$emit('getForm1data', this.componentForm)
      },
      deep: true
    }
  },
  created() {
  },
  methods: {
    updataform() {
      this.$emit('getForm1data', this.componentForm)
    },
    // 处理选中的门店信息
    getShopList(data) {
      let dealedList = []
      data.map(e => {
        let listitem = {
          suitType: 'SHOP',
          suitAttrId: e.shopId,
          suitAttrName: e.shopName,
          merShopRuleType: '',
          merShopUrl: ''
        }
        dealedList.push(listitem)
      })
      this.componentForm.shopList = dealedList
    },
    // 处理选中商户信息
    getMerchant(data) {
      this.componentForm.shopList = [{
        suitType: 'MCHT',
        suitAttrId: data[0].merchantId,
        suitAttrName: data[0].merchantName,
        merShopRuleType: data[1],
        merShopUrl: data[2]
      }]
    }
  }

}
</script>
<style lang="scss" scoped>
.container-box{
    .page-title{
        display:flex;
        align-items:center;
        h3{
            margin-right:20px;
            line-height:40px;
        }
    }
    .componentForm{
        margin-top:20px;
        .el-input{
            max-width:350px;
        }
        .el-textarea{
            max-width:350px;
        }
    }
    .selectedMerchantList /deep/ thead.has-gutter{
        height:0px;
        line-height:0px;
        tr{
            height:0px;
        }
        th{
            height:0px;
            padding:0px;
        }
    }
}
</style>

