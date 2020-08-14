<!--1.红包基本信息-->
<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>红包基本信息</h3>
      <el-form ref="componentForm" label-position="left" :model="componentForm" :rules="rules" label-width="140px" class="componentForm" size="medium">
        <el-form-item label="导入已有红包模板" prop="merchantName" required>
          <el-input v-model="componentForm.name" :clearable="true" placeholder="请输入红包批次号" />
        </el-form-item>
        <el-form-item label="红包类型" prop="merchantName" required>
          <el-select v-model="componentForm.rpkType" :clearable="true" placeholder="请选择票券获取规则">
            <el-option label="满减红包" value="FULLREDUCE" />
            <el-option label="折扣红包" value="DISCOUNT" />
          </el-select>
        </el-form-item>
        <el-form-item label="适用门店范围" required>
          <search-store style="margin-top:-20px" @getShopList="getShopList" />
        </el-form-item>
        <el-form-item label="红包获取规则" prop="merchantType">
          <el-select v-model="componentForm.achieveType" :clearable="true" placeholder="请选择票券获取规则" style="width:100px;">
            <el-option label="领取" value="GET" />
            <el-option label="发放" value="GRANT" />
          </el-select>
        </el-form-item>
        <el-form-item :label="componentForm.rpkType == 'FULLREDUCE'?'减满规则':'折扣规则'">
          <template v-if="componentForm.rpkType == 'DISCOUNT'">
            <el-select v-model="componentForm.discountRule" :clearable="true" style="width:150px;">
              <el-option label="无门槛折扣" value="NOTHRESHOLD" />
              <el-option label="满额折扣" value="FULLDISCOUNT" />
            </el-select>
            <template v-if="componentForm.discountRule == 'FULLDISCOUNT'">
              满 <el-input v-model="componentForm.discountReqAmount" style="width:50px" /> 元 可享全额 <el-input v-model="componentForm.discountRate" style="width:50px" /> 折
            </template>
            <template v-if="componentForm.discountRule == 'NOTHRESHOLD'">
              全额 <el-input v-model="componentForm.discountRate" style="width:50px" /> 折
            </template>
          </template>
          <template v-else>
            总金额满 <el-input v-model="componentForm.fullRdcReqAmount" style="width:50px" /> 元 减免 <el-input v-model="componentForm.reduceAmount" style="width:50px" />元
          </template>

        </el-form-item>
        <el-form-item v-if="componentForm.rpkType == 'DISCOUNT'">
          优惠封顶 <el-select v-model="componentForm.isReduceLimit" :clearable="true" style="width:100px;">
            <el-option label="设置封顶金额" value="true" />
            <el-option label="无封顶" value="false" />
          </el-select>
          <template v-if="componentForm.isReduceLimit== 'true'">
            优惠封顶金额 <el-input v-model="componentForm.maxReduceAmount" style="width:50px" /> 元
          </template>

        </el-form-item>
        <el-form-item label="红包名称" prop="businessPerson" required>
          <el-input v-model="componentForm.rpkName" :clearable="true" placeholder="将显示在用户端，尽量只写优惠信息+红包" style="width:700px" />
        </el-form-item>
        <el-form-item label="总库存" prop="businessPerson" required>
          <el-input v-model="componentForm.stock" :clearable="true" style="width:100px" /> 个
        </el-form-item>
        <el-form-item v-if="componentForm.achieveType == 'GET'" label="限制领取数量">
          <div>
            绑卡用户
            <el-select v-model="showBindCardLimit" style="width:120px;margin:0 10px;" :clearable="true" placeholder="请选择票券获取规则">
              <el-option label="限领" :value="`true`" />
              <el-option label="不限领" :value="`false`" />
            </el-select>
            <el-input v-model="componentForm.bindCardLimit" style="width:120px;margin:0 10px;" :clearable="true" placeholder="最多可领" />个人
          </div>
          <div class="mt10">
            非绑卡用户
            <el-select v-model="showUnbindCardLimit" style="width:120px;margin:0 10px;" :clearable="true" placeholder="请选择票券获取规则">
              <el-option label="限领" :value="`true`" />
              <el-option label="不限领" :value="`false`" />
            </el-select>
            <el-input v-model="componentForm.unbindCardLimit" style="width:120px;margin:0 10px;" :clearable="true" placeholder="最多可领" />个人
          </div>
        </el-form-item>
        <el-form-item label="退款后恢复使用">
          <el-select v-model="componentForm.allowRefundReuse" :clearable="true" placeholder="请选择" style="width:100px">
            <el-option label="允许" :value="`true`" />
            <el-option label="不允许" :value="`false`" />
          </el-select>
          <span style="color:#BEBEBE"> 若选择“允许”，当使用该红包的订单退款成功后，红包将退回用户可再使用</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
let id = 0
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import searchStore from './components/searchStore.vue'
export default {
  components: {
    searchStore
  },
  data() {
    return {
      showUnbindCardLimit: '',
      showBindCardLimit: '',
      componentForm: {
        rpkType: '', // 红包类型 FULLREDUCE-满减'', DISCOUNT-折扣券
        achieveType: '', // 券获取方式 BUY-购买 GET-领取 GRANT-发放
        fullRdcReqAmount: '', // 达标满减金额
        reduceAmount: '', // 满减减免金额
        discountRule: '', // 折扣规则   NOTHRESHOLD-无门槛'',FULLDISCOUNT-满额折扣
        maxReduceAmount: '', // 1 封顶金额
        discountReqAmount: '', // 折扣达标金额
        discountRate: '', // 折扣打折率
        isReduceLimit: '', // 是否设置封顶金额  true/false
        rpkName: '', // 红包名称
        allowRefundReuse: '', // 是否退款后恢复使用  true/false
        stock: '', // 总库存
        unbindCardLimit: '', // 非绑卡限购
        bindCardLimit: '', // 绑卡限购
        shopList: [
          {
            shopId: '', // 门店Id
            shopName: '' // 门店名称
          }
        ]
      },
      rules: {
        merchantName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' }
        ]
      },
      merchantList: [
        { merchant: '金拱门(中国)有限公司' },
        { merchant: '金拱门(中国)有限公司' },
        { merchant: '金拱门(中国)有限公司' },
        { merchant: '金拱门(中国)有限公司' }
      ],
      selectedMerchantList: [
        { merchantName: '金拱门(广州)有限公司', merchantCode: '1234566787898' },
        { merchantName: '金拱门(广州)有限公司', merchantCode: '1234566787898' }
      ],
      merchantProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      },
      branchOfficePropsProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['redPacketStep'])
  },
  methods: {
    ...mapMutations([types.SET_REDPACKET_STEP]),
    getShopList(shoplist) {
      this.componentForm.shopList = shoplist
    },
    getForm() {
      this.$emit('getForm', this.componentForm)
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

