<template>
  <el-container class="mtop40">
    <el-main>
      <div>
        <h3>优惠买单基本信息</h3>
        <el-form ref="form" :disabled="isDisabled" :inline="true" :model="formData" :rules="formRule">
          <template v-if="!isDisabled">
            <div class="oneLine">

              <div>
                <el-form-item v-if="!modifyMode" id="model" label="导入优惠买单模板" prop="modelId">
                  <el-input v-model="formData.modelId" :disabled="!!applyId" clearable />
                  <el-button :disabled="!!applyId" type="primary" @click="importByModel">导入</el-button>
                </el-form-item>
              </div>

              <div>
                <el-form-item label="适用门店范围" prop="importShopStyle">
                  <el-select v-model="formData.importShopStyle">
                    <el-option label="手动输入" value="MANUALINPUT" />
                    <el-option label="批量导入" value="BATCHIMPORT" />
                  </el-select>
                </el-form-item>
              </div>
            </div>

            <!-- 批量导入方式 -->
            <template v-if="formData.importShopStyle==='BATCHIMPORT'">
              <div class="fileTrans fileDownload">
                <el-button type="primary" class="batchImportButton" @click="downloadTemplate">
                  下载Excel模板
                </el-button>
              </div>

              <el-upload
                class="fileTrans"
                :action="uploadPath"
                on-success="uploadSuc"
              >
                <div class="upload-inner">
                  <el-button type="primary" class="batchImportButton">
                    上传门店名单
                  </el-button>
                  <div class="tip">一次最多上传20个门店</div>
                </div>

              </el-upload>

            </template>
            <!-- 手动输入方式 -->
            <template v-if="formData.importShopStyle==='MANUALINPUT'">
              <div class="manualInput">
                <el-form-item prop="searchMethod">
                  <el-select v-model="formData.searchMethod">
                    <el-option label="按门店名或编号搜索" value="byNameOrCode" />
                    <el-option label="按门店地区及类别筛选" value="byArea" />
                  </el-select>
                </el-form-item>
                <!-- 按照名字或者编号搜索 -->
                <template v-if="formData.searchMethod==='byNameOrCode'">
                  <el-form-item prop="searchNameOrCode">
                    <el-input v-model="formData.searchNameOrCode" placeholder="请输入门店名称或门店编号" />
                  </el-form-item>
                  <el-button type="primary" @click="searchShopbyKey">搜索</el-button>
                </template>
                <!-- 按照地区搜索 -->
                <div v-if="formData.searchMethod==='byArea'" class="shopArea">
                  <span>门店地区</span>
                  <el-form-item prop="searchArea">
                    <el-cascader
                      v-model="formData.searchArea"
                      :props="{ checkStrictly: true,value:'id',label:'name' }"
                      :options="regionData"
                    />
                  </el-form-item>
                  <span>门店类别</span>
                  <el-form-item prop="searchArea">
                    <el-cascader
                      v-model="formData.searchShopCat"
                      :props="{ checkStrictly: true ,value:'catId',label:'catName'}"
                      :options="shopClassifyData"
                    />
                  </el-form-item>
                  <el-button type="primary" @click="searchShopbyAreaCat">筛选</el-button>
                </div>
                <!-- 搜索结果，待选择的门店列表 -->
                <el-table
                  ref="searchedShopList"
                  max-height="300"
                  :data="searchedShopList"
                  @select-all="handleSelectionChange"
                  @select="handleSelectionChange"
                >
                  <el-table-column type="selection" />
                  <el-table-column prop="shopName" label="全选" />
                </el-table>
                <h5>已选择门店</h5>
                <el-table ref="shopList" class="selectedShopList" max-height="300" :data="shopList">
                  <el-table-column width="100">
                    <template slot-scope="scope">
                      <el-button :disabled="isDisabled" size="mini" type="danger" @click="deleteRow(scope.$index,scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="shopName" />
                  <el-table-column prop="shopCode" />
                </el-table>
              </div>
            </template>
          </template>
          <div v-else class="showList">
            <div class="label">适用门店范围</div>
            <div class="content">
              <el-table ref="shopList" class="selectedShopList" max-height="300" :data="shopList">
                <el-table-column prop="shopName" />
                <el-table-column prop="shopCode" />
              </el-table>
            </div>
          </div>
          <!-- 底部的优惠相关表单 -->
          <div class="bottom-box">

            <div id="discountsRule">
              <div class="row">
                <el-form-item label="满减规则" prop="discountsRule">
                  <el-select v-model="formData.discountsRule" :disabled="modifyMode">
                    <el-option label="总金额满减" value="TOTAL" />
                    <el-option label="阶梯式满减" value="LADDER" />
                    <el-option label="每满立减" value="FULL" />
                    <el-option label="满额折扣" value="REBATE" />
                  </el-select>
                </el-form-item>
              </div>
              <div v-if=" formData.discountsRule==='TOTAL' " class="discountDetail">
                <el-form-item label="总金额满" prop="TOTAL_sum"> <el-input v-model="formData.TOTAL_sum" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                <el-form-item label="共减免" prop="TOTAL_reduce"> <el-input v-model="formData.TOTAL_reduce" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
              </div>
              <div v-if=" formData.discountsRule==='LADDER' " class="discountDetail">
                <div>
                  <div class="tip"> 注：第三层金额 > 第二层金额 > 第一层金额</div>
                  <el-form-item label="第一层 金额满" prop="LADDER_sum1"> <el-input v-model="formData.LADDER_sum1" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                  <el-form-item label="减免" prop="LADDER_reduce1"> <el-input v-model="formData.LADDER_reduce1" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                </div>
                <div>
                  <el-form-item label="第二层 金额满"> <el-input v-model="formData.LADDER_sum2" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                  <el-form-item label="减免"> <el-input v-model="formData.LADDER_reduce2" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                </div>
                <div>
                  <el-form-item label="第三层 金额满"> <el-input v-model="formData.LADDER_sum3" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                  <el-form-item label="减免"> <el-input v-model="formData.LADDER_reduce3" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                </div>

              </div>

              <div v-if=" formData.discountsRule==='FULL' " class="discountDetail">
                <div>
                  <el-form-item label="金额每满" prop="FULL_sum"> <el-input v-model="formData.FULL_sum":disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                  <el-form-item label="每次立减" prop="FULL_reduce"> <el-input v-model="formData.FULL_reduce":disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                </div>
                <div>
                  <el-form-item label="设置优惠封顶" prop="setFullReduceLimit">
                    <el-select v-model="formData.setFullReduceLimit" :disabled="modifyMode">
                      <el-option label="设置封顶金额" :value="true" />
                      <el-option label="无封顶" :value="false" />
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if=" formData.setFullReduceLimit===true" label="优惠封顶金额" prop="fullReduceLimit"> <el-input v-model="formData.fullReduceLimit" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                </div>
              </div>

              <div v-if=" formData.discountsRule==='REBATE' " class="discountDetail">
                <div>
                  <el-form-item label="金额每满" prop="REBATE_sum"> <el-input v-model="formData.REBATE_sum" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                  <el-form-item label="全单折扣" prop="REBATE_disc"> <el-input v-model="formData.REBATE_disc" :disabled="modifyMode"><template slot="append">折</template></el-input></el-form-item>
                </div>
                <div>
                  <el-form-item label="设置优惠封顶" prop="setRebateLimit">
                    <el-select v-model="formData.setRebateLimit" :disabled="modifyMode">
                      <el-option label="设置封顶金额" :value="true" />
                      <el-option label="无封顶" :value="false" />
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if=" formData.setRebateLimit===true" label="优惠封顶金额" prop="setRebateLimit"> <el-input v-model="formData.rebateLimit" :disabled="modifyMode"><template slot="append">元</template></el-input></el-form-item>
                </div>
              </div>

            </div>
            <!-- 设置优惠买单名称 -->
            <div class="row">
              <el-form-item label="优惠买单名称" prop="discountsRule">
                <el-input v-model="formData.discountsPayName" />
              </el-form-item>
            </div>
            <!-- 设置库存 -->
            <div class="rowA">
              <el-form-item class="firstLabel" label="总库存" prop="setInventoryLimit">
                <el-select v-model="formData.setInventoryLimit">
                  <el-option label="限制优惠" :value="true" />
                  <el-option label="无限制" :value="false" />
                </el-select>
              </el-form-item>
              <el-form-item v-if=" formData.setInventoryLimit===true" label="" prop="totalInventory">
                <el-input v-model="formData.totalInventory"><template slot="append">笔订单</template></el-input>
              </el-form-item>
            </div>
            <!-- 优惠次数 -->
            <div class="rowA">
              <el-form-item class="firstLabel" label="限制优惠次数" prop="setLimitNum">
                <el-select v-model="formData.setLimitNum">
                  <el-option label="限制优惠" :value="true" />
                  <el-option label="无限制" :value="false" />
                </el-select>
              </el-form-item>
              <el-form-item v-if=" formData.setLimitNum===true" label="" prop="maxDiscountsNum">
                <el-input v-model="formData.maxDiscountsNum"><template slot="append">笔订单/人</template></el-input>
                （超出限量次数后的在线买单将以原价付款，不享用此优惠）
              </el-form-item>
            </div>
            <!-- 支付方式 -->
            <div class="rowA">
              <el-form-item class="firstLabel" label="支付方式" prop="payWay">

                <el-checkbox-group v-model="formData.payWay" :disabled="modifyMode">
                  <el-checkbox label="信用卡" />
                  <el-checkbox label="借记卡" />
                </el-checkbox-group>

              </el-form-item>

            </div>

          </div>

        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import discountPaymentService from '@api/discountPaymentManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import objectTool from '@tool/objectTool.js'
import { mapGetters, mapMutations } from 'vuex'

import * as types from '@store/mutation-types'

export default {
  props: {
    isDisabled: { type: Boolean },
    modifyMode: { default: false }
  },
  data() {
    return {

      options: [],
      formData: {
        modelId: '',
        importShopStyle: 'MANUALINPUT',
        searchMethod: 'byNameOrCode',
        searchArea: [],
        searchNameOrCode: '',
        searchShopCat: [],
        discountsRule: '',
        TOTAL_sum: '',
        TOTAL_reduce: '',
        LADDER_sum1: '',
        LADDER_reduce1: '',
        LADDER_sum2: '',
        LADDER_reduce2: '',
        LADDER_sum3: '',
        LADDER_reduce3: '',
        FULL_sum: '',
        FULL_reduce: '',
        setFullReduceLimit: false,
        fullReduceLimit: '',
        REBATE_sum: '',
        REBATE_disc: '',
        setRebateLimit: false,
        rebateLimit: '',
        discountsPayName: '',
        setInventoryLimit: false,
        totalInventory: '',
        setLimitNum: false,
        maxDiscountsNum: '',
        payWay: []

      },
      formRule: {
        importShopStyle: [{ required: true, trigger: 'blur', message: '请选择输入门店输入方式' }],
        discountsRule: [{ required: true, trigger: 'blur', message: '请选择优惠种类' }],
        TOTAL_sum: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        TOTAL_reduce: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        LADDER_sum1: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        LADDER_reduce1: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        FULL_sum: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        FULL_reduce: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        REBATE_sum: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        REBATE_disc: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        fullReduceLimit: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        rebateLimit: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        discountsPayName: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        totalInventory: [{ required: true, trigger: 'blur', message: '请输入总库存数值' }],
        maxDiscountsNum: [{ required: true, trigger: 'blur', message: '请输入数值' }],
        setInventoryLimit: [{ required: true, trigger: 'blur', message: '请设置总库存' }],
        setLimitNum: [{ required: true, trigger: 'blur', message: '请设置限制优惠次数' }],
        payWay: [{ required: true, trigger: 'blur', message: '请选择支付方式' }]
      },
      searchedShopList: [

      ],
      shopList: [
      ]
    }
  },

  computed: {
    ...mapGetters('commonData', ['regionData', 'shopClassifyData']),
    ...mapGetters('discountPayment', ['applyId', 'modelId']),
    uploadPath() {
      let res
      let locationAffix = window.location.pathname.split('/')[1]
      res = `${window.location.origin}/${locationAffix}/discount/pay/shopUpload.json`
      return res
    }
  },
  created() { if (this.applyId) { this.getData() } },
  methods: {
    ...mapMutations('discountPayment', [types.SET_DISCOUNTPAYMENT_APPLYID, 'setModelId']),
    // 文件上传成功的钩子
    uploadSuc(response) {
      this.shopList.push(response.data)
      console.log(response)
    },
    async saveComponentInfo() {
      try { await this.$refs.form.validate() } catch (err) { this.$message.error({ message: '表单不合法' }); return }
      let data = {
        importShopStyle: this.formData.importShopStyle, // 导入门店方式 FILEUPLOAD文件上传,CHECK普通勾选
        discountsPayName: this.formData.discountsPayName, // 优惠买单名称
        'setLimitNum': this.formData.setLimitNum, // 是否设置优惠次数限制true设置;false不设置
        'maxDiscountsNum': this.formData.maxDiscountsNum, // 最大优惠次数（每人）
        'payWay': this.handlePayWay(), // 支付方式CREDIT-信用卡;DEBIT-借记卡 多个以","分隔
        'discountsRule': this.formData.discountsRule, // 满减规则TOTAL-总额满减;LADDER-阶梯式满减; FULL-每满立减; REBATE-满减折扣
        'discountsReduceValue': this.handleReduceValue(), // 满减值 存储格式：满减达标金额1:减免值1|满减达标金额2:减免值2|满减达标金额3:减免值3|
        'totalInventory': this.formData.totalInventory, // 总库存
        'setInventoryLimit': this.formData.setInventoryLimit, // 总库存是否限量;false不设置
        'setLimitAmt': this.formData.setFullDiscLimit, // 是否设置优惠封顶false不设置
        'maxDiscountsAmt': this.formData.fullDiscLimit, // 最大优惠金额
        shopList: this.shopList
      }
      if (this.applyId) { data.applyId = this.applyId } // update时候用
      data = objectTool.addValidPropertyToTarget(data)
      if (this.modifyMode) { return data }
      console.log('修改或保存ing...')
      let res
      try {
        if (this.applyId) { res = await discountPaymentService.updateBaseInfo(data) } else { res = await discountPaymentService.saveBaseInfo(data) }

        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '保存成功' })
          if (!this.applyId) { this.setModelId(this.formData.modelId) }
          this[types.SET_DISCOUNTPAYMENT_APPLYID](res.data.applyId)
          return true
        } else {
          throw new Error('保存或修改失败')
        }
      } catch (err) {
        this.$message.error({ message: '保存失败' })
        return false
      }
    },
    // 处理payway
    handlePayWay() {
      let tempList = []
      this.formData.payWay.forEach(item => {
        if (item === '借记卡') {
          tempList.push('DEBIT')
        } else if (item === '信用卡') {
          tempList.push('CREDIT')
        }
      })
      return tempList.join(',')
    },
    echoPayWay(str) {
      let arr = str.split(',')
      for (let i = 0; i < arr.length; i++) {
        arr[i] = { DEBIT: '借记卡', 'CREDIT': '信用卡' }[arr[i]]
      }
      return arr
    },
    // 优惠细则上传预处理
    handleReduceValue() {
      if (this.formData.discountsRule === 'TOTAL') {
        return `${this.formData.TOTAL_sum}:${this.formData.TOTAL_reduce}`
      } else if (this.formData.discountsRule === 'LADDER') {
        return `${this.formData.LADDER_sum1}:${this.formData.LADDER_reduce1}|${this.formData.LADDER_sum2}:${this.formData.LADDER_reduce2}|${this.formData.LADDER_sum3}:${this.formData.LADDER_reduce3}`
      } else if (this.formData.discountsRule === 'FULL') {
        return `${this.formData.FULL_sum}:${this.formData.FULL_reduce}`
      } else if (this.formData.discountsRule === 'REBATE') {
        return `${this.formData.REBATE_sum}:${this.formData.REBATE_disc}`
      }
    },
    // 待选表格的变化
    handleSelectionChange(selection) {
      // shoplist加入选择项
      selection.forEach(item => {
        let check = this.shopList.find(j => {
          if (j.shopId === item.shopId) { return true }
        })
        if (!check) {
          this.shopList.unshift(item)
        }
      })
      // 获取未选项
      let unselectedList = this.searchedShopList.filter(item => {
        let check = selection.find(j => {
          if (j.shopId === item.shopId) { return true }
        })
        if (!check) { return true }
      })

      console.log('unselectedList', unselectedList)
      // 滤除未选项
      this.shopList = this.shopList.filter(item => {
        let check = unselectedList.find(j => {
          if (j.shopId === item.shopId) { return true }
        })
        if (!check) { return true }
      })
    },
    // 回显已选择列表
    echoSearchList() {
      this.searchedShopList.forEach((item, index) => {
        let check = this.shopList.find(j => {
          if (j.shopId === item.shopId) { return true }
        })
        if (check) {
          this.$refs.searchedShopList.toggleRowSelection(item, true)
        } else {
          this.$refs.searchedShopList.toggleRowSelection(item, false)
        }
      })
    },

    // 按照名称或者商户名搜索
    async searchShopbyKey() {
      let data = {
        keyWord: this.formData.searchNameOrCode
      }
      if (!this.formData.searchNameOrCode) {
        this.$message({ message: '请输出准确的编号或者名称查询' })
        return
      }
      data = objectTool.addValidPropertyToTarget(data)
      try {
        let res = await discountPaymentService.shopInfoByCondition(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.searchedShopList = res.data
          this.$nextTick(this.echoSearchList)
        } else { throw new Error('门店搜索失败') }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '门店搜索失败' })
      }
    },

    // 按照地区或者类别筛选
    async searchShopbyAreaCat() {
      let data = {
        provinceId: this.formData.searchArea[0],
		    cityId: this.formData.searchArea[1],
  	    areaId: this.formData.searchArea[2],
        firstCatId: this.formData.searchShopCat[0],
        secondCatId: this.formData.searchShopCat[1]
      }
      data = objectTool.addValidPropertyToTarget(data)
      try {
        let res = await discountPaymentService.shopInfoByCondition(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.searchedShopList = res.data
          this.$nextTick(this.echoSearchList)
        } else { throw new Error('门店搜索失败') }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '门店搜索失败' })
      }
    },
    // 删除某行
    deleteRow(index, row) {
      this.shopList.splice(index, 1)
      this.$nextTick(this.echoSearchList)
    },
    // 回显页面数据
    async getData(arg) {
      try {
        let res
        if (arg) { res = await discountPaymentService.getDetailByDisId({ discountspayId: this.formData.modelId }) } else {
          res = await discountPaymentService.queryDiscountPayDetail({ applyId: this.applyId })
        }

        if (res.resultCode === '000000') {
          let echoData = res.data
          if (echoData.importShopStyle) { this.formData.importShopStyle = echoData.importShopStyle }

          this.formData.setLimitNum = echoData.setLimitNum
          this.formData.maxDiscountsNum = echoData.maxDiscountsNum
          this.formData.payWay = this.echoPayWay(echoData.payWay)
          this.formData.discountsRule = echoData.discountsRule
          this.formData.totalInventory = echoData.totalInventory
          this.formData.setInventoryLimit = echoData.setInventoryLimit
          // this.formData.setFullDiscLimit = echoData.setLimitAmt
          this.formData.discountsPayName = echoData.discountsPayName
          this.shopList = echoData.shopList

          // 回显优惠买单规则
          let ruleArr = echoData.discountsReduceValue.split('|').map(item => { return item.split(':').map(j => Number.parseFloat(j)) })

          if (echoData.discountsRule === 'LADDER') {
            console.log('ruleArr', ruleArr)
            this.formData.LADDER_sum1 = ruleArr[0][0]
            this.formData.LADDER_reduce1 = ruleArr[0][1]
            this.formData.LADDER_sum2 = ruleArr[1][0]
            this.formData.LADDER_reduce2 = ruleArr[1][1]
            this.formData.LADDER_sum3 = ruleArr[2][0]
            this.formData.LADDER_reduce3 = ruleArr[2][1]
          } else if (echoData.discountsRule === 'FULL') {
            this.formData.FULL_sum = this.formData.LADDER_sum1 = ruleArr[0][0]
            this.formData.FULL_reduce = this.formData.LADDER_sum1 = ruleArr[0][1]
            this.formData.setFullReduceLimit = echoData.setLimitAmt
            if (echoData.setLimitAmt) { this.formData.fullReduceLimit = echoData.maxDiscountsAmt }
          } else if (echoData.discountsRule === 'REBATE') {
            this.formData.REBATE_sum = this.formData.LADDER_sum1 = ruleArr[0][0]
            this.formData.REBATE_disc = this.formData.LADDER_sum1 = ruleArr[0][1]
            this.formData.setRebateLimit = echoData.setLimitAmt
            if (echoData.setLimitAmt) { this.formData.rebateLimitt = echoData.maxDiscountsAmt }
          }
          if (echoData.discountsRule === 'TOTAL') {
            this.formData.TOTAL_sum = this.formData.LADDER_sum1 = ruleArr[0][0]
            this.formData.TOTAL_reduce = this.formData.LADDER_sum1 = ruleArr[0][1]
          }
        // eslint-disable-next-line brace-style
        }
        // 没请求到回显数据时报错
        else {
          throw new Error('查询优惠买单详情错误')
        }
      } catch (err) {
        console.error(err)
        this.$message.error('查询优惠买单详情错误')
      }
    },
    importByModel() {
      if (!this.applyId) {
        this.getData(true)
      }
    },
    // 下载模板
    downloadTemplate() {
      let locationAffix = window.location.pathname.split('/')[1]
      window.location.href = `${window.location.origin}/${locationAffix}/discount/pay/shopDownload.json`
    }
  }

}
</script>

<style lang="scss" scoped>
.mtop40{margin-top:40px;}
#model{width: 650px;}
.el-breadcrumb{
    line-height: 30px;
}

.el-main{
    padding-top:15px;
    margin-left: 15px;
    background-color: #fff;
}
h3{
    margin-bottom:30px;
    font-weight: bold;
    font-size: 18px;
    color: #333;
}

.oneLine {
    .el-form-item {  .el-input,.el-select{
            width:350px
            }
    }
    .el-form-item{
        width:500px;

    }

/deep/ label{
            width:150px ;
            text-align: left;
        }

}
.fileTrans{
  display:flex;
  flex-direction: column;
  width: 600px;
  margin-left:150px;
  padding-bottom:10px;
  .upload-inner{display: flex;flex-direction: row;align-items: center}
  .tip{font-size:12px;color:#666;margin-left:10px;}
}
.batchImportButton{
    display:block;

    width:140px;

}
.manualInput{
    margin-left: 150px;
}
.shopArea{
    span{margin-right:10px}
    .el-select{width:160px}
}
.el-table{
    width:550px;
}
h5{margin-top:30px}
.textarea{
    /deep/ label{
            width:150px ;
            text-align: left
        }
    margin-top:50px;
    .el-textarea{width:600px}
}

.selectedShopList /deep/ thead.has-gutter{
    height:0px;
    th{
        height:0px;
        padding:0px;
    }
}
.submit{
    margin-left:150px;
    button{
        margin:15px;
    }

}
.bottom-box {
  margin-top: 40px;
  #discountsRule{
    height: 275px;
    .tip{
      margin-bottom:5px;
      font-size:12px;
      color:#666
    }
  }

  .row{
      .el-form-item{
          width:500px ;
      }
      /deep/.el-form-item__label{width:150px ;text-align: left;}
      .el-form-item {  .el-input,.el-select{
            width:350px
            }
    }

    }

    .rowA{

      // /deep/.el-form-item__label{width:150px ;}
      .el-form-item {  .el-input,.el-select{
            width:200px
            }
    }
       .firstLabel  /deep/.el-form-item__label{width:150px ;text-align: left;}

    }
.discountDetail{
  margin-left:150px;
   .el-form-item {  .el-input,.el-select{
            width:200px
            }
    }

}
}

.showList{
  display: flex;

  .label{
    width: 150px;
    color: #606266;
    padding-top:10px;
  }
  .content{
    width: 400px;
  }
}
.diy-required::before{
  content: '*';
    color: #F56C6C;
    margin-right: 4px;
}
</style>

