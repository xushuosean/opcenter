<!--3.活动信息配置-->
<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>活动信息配置</h3>
      <el-form label-position="left" label-width="140px" class="componentForm" size="medium">
        <el-form-item label="设置购买资格" prop="merchantType">
          <el-select v-model="componentForm.achieveRule" :clearable="true" placeholder="请选择商户类型">
            <el-option label="不设置" value="UNLMINT" />
            <el-option label="收藏门店后" value="FAVSHOP" />
            <el-option label="门店新户" value="NEWSHOP" />
            <el-option label="白名单" value="WHITELIST" />
            <el-option label="关联活动" value="ACT" />
          </el-select>
        </el-form-item>
        <el-form-item label="可支付卡片">
          <span v-show="supportcreditcard">兴业银行信用卡</span>
          <span v-show="supportdebitcard" class="ml10">兴业银行借记卡</span>
        </el-form-item>
        <!--<el-form-item label="指定信用卡" prop="merchantType">
          <el-select v-model="componentForm.merchantType" :clearable="true" placeholder="请选择商票券类型">
            <el-option label="不指定" value="all" />
            <el-option label="仅限特定信用卡支付" value="normal" />
          </el-select>
          <template>
            <el-form-item>
              <el-radio v-model="radio" label="1">指定信用卡品牌及级别</el-radio>
            </el-form-item>
            <el-form-item label="卡片品牌">
              <el-checkbox-group v-model="componentForm.type">
                <el-checkbox label="银联" name="type" />
                <el-checkbox label="Visa" name="type" />
                <el-checkbox label="MasterCard" name="type" />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="卡片级别">
              <el-checkbox-group v-model="componentForm.type">
                <el-checkbox label="普卡" name="type" />
                <el-checkbox label="金卡" name="type" />
                <el-checkbox label="白金卡" name="type" />
                <el-checkbox label="钻石卡" name="type" />
                <el-checkbox label="钛金卡" name="type" />
                <el-checkbox label="世界卡" name="type" />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-radio v-model="radio" label="1">指定信用卡产品</el-radio>
              <template>
                <div>
                  <el-input v-model="componentForm.searchNameOrCode" class="ml20" placeholder="请输入银行卡产品或bin号" />
                  <el-button type="primary" class="ml20">搜索</el-button>
                </div>
                <el-table ref="merchantList" max-height="300" :data="merchantList">
                  <el-table-column type="selection" />
                  <el-table-column prop="merchant" label="全选" />
                </el-table>
              </template>
            </el-form-item>
            <el-form-item>
              <p>已指定信用卡</p>
              <p>银联/Visa/MasterCard+普卡/金卡/白金卡</p>
            </el-form-item>
          </template>
        </el-form-item>
        <el-form-item label="可支付卡片用户端展示问题">
          <el-input v-model="componentForm.remark" type="textarea" :clearable="true" placeholder="请输入展示于用户端“优惠券详情”页中“可支付卡片”的说明文字（请根据上方已配置的指定支付卡片填写展示于用户端的文字）" />
        </el-form-item> -->
      </el-form>
    </el-card>
  </div>
</template>
<script>
let id = 0
export default {
  props: {
    supportcreditcard: {
      type: Boolean,
      default: true
    },
    supportdebitcard: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentStep: 3,
      componentForm: {
        achieveRule: '' // UNLMINT-不设置  FAVSHOP-收藏门店 NEWSHOP-门店新户 WHITELIST-白名单 ACT-关联活动
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
  },
  watch: {
    componentForm: {
      handler: function(newVal, oldVal) {
        this.$emit('getForm3data', this.componentForm)
      },
      deep: true
    }
  },
  created() {
  },
  methods: {
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

