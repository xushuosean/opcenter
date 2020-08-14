<!--3.活动信息配置-->
<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>活动信息配置</h3>
      <el-form ref="componentForm" label-position="left" :model="componentForm" :rules="rules" label-width="140px" class="componentForm" size="medium">
        <el-form-item label="红包资格限制" prop="merchantType">
          <el-select v-model="getlimit" :clearable="true">
            <el-option label="无条件领取或使用" value="1" />
            <el-option label="限制领取资格" value="2" />
            <el-option label="限制使用资格" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="关联活动平台" prop="merchantType">
          <el-select v-model="toActive" :clearable="true">
            <el-option label="是" value="true" />
            <el-option label="否" value="false" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="getlimit !='1' && toActive=='true'">
          <el-input v-model="componentForm.receiveActId" placeholder="请输入关联的活动号" />
        </el-form-item>
        <el-form-item v-if="getlimit == '2'&&toActive=='false'" label="设置领取资格" prop="merchantType">
          <el-select v-model="componentForm.receiveLimitType" :clearable="true">
            <el-option label="门店新户领取" value="NEWSHOP" />
            <el-option label="收藏门店后领取" value="FAVSHOP" />
            <el-option label="指定用户名单" value="WHITELIST" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="getlimit == '3'&&toActive=='false'" label="设置使用资格" prop="merchantType">
          <el-select v-model="componentForm.useLimitType" :clearable="true">
            <el-option label="门店新户领取" value="NEWSHOP" />
            <el-option label="收藏门店后领取" value="FAVSHOP" />
            <el-option label="指定用户名单" value="WHITELIST" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="设置使用资格" prop="merchantType">
          <span>指定支付卡片</span>
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
        </el-form-item> -->
      </el-form>
    </el-card>
  </div>
</template>
<script>
let id = 0
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
export default {
  data() {
    return {
      getlimit: '',
      toActive: '',
      componentForm: {
        receiveLimitType: '', // 3 领取限制资格类型   UNLMINT-不设置,FAVSHOP-收藏门店,NEWSHOP-门店新户,WHITELIST-白名单,ACT-关联活动
		    receiveActId: '', // 3 领取关联活动Id
		    useLimitType: '' // 3 使用限制资格类型  UNLMINT-不设置,FAVSHOP-收藏门店,NEWSHOP-门店新户,WHITELIST-白名单,ACT-关联活动
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
  methods: {
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

