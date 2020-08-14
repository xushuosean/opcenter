<template>
  <div class="business-container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <el-collapse v-model="activeName">
        <el-collapse-item name="merchantInfo">
          <template slot="title">
            <h3 class="head-title">图片资料上传<el-button v-if="isShowEditButton" type="primary" size="small" style="margin-left:48px;" @click.stop="editShopInfo">修改商户信息</el-button></h3>
          </template>
          <el-form ref="componentForm" label-position="left" :model="componentForm" :rules="rules" label-width="140px" class="componentForm el-form-mt20" :disabled="isDisabledCopy">
            <el-form-item v-for="item in pictureUploadList" :key="item.prop" :label="item.label" :prop="item.prop+'.annexUrls'" :required="item.isRequired">
              <imgUpload :tips="item.tips" :file-list="item.fileList" :type="item.prop" :limit="item.limit" @upload-success="uploadPictureChange" />
            </el-form-item>
            <el-form-item v-if="!isDisabledCopy">
              <el-button type="primary" :loading="requestLoading" @click="submitComponentForm">保存</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import imgUpload from '@com/imgUpload/imgUpload.vue'
import merchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import merchantInfoMixin from '@/mixin/merchantInfo-mixin.js'
export default {
  // 商户附件信息
  name: 'MerchantPictureResource',
  components: { imgUpload },
  mixins: [merchantInfoMixin],
  data() {
    return {
      currentStep: 2,
      requestLoading: false,
      pictureUploadList: [
        {
          label: '营业执照(组织机构代码证/税务登记证)',
          tips: '必须上传营业执照，如有组织机构代码证或税务登记证请上传至此处',
          prop: 'BIZ_LICENSE',
          limit: 10,
          isRequired: true
        },
        {
          label: '商户法人/经营者身份证件',
          tips: '如身份证件为中国居民身份证，上传的图片应包含身份证正面及反面',
          prop: 'ID_CARD',
          limit: 10,
          isRequired: true
        },
        {
          label: '合作协议',
          tips: '传的图片应至少包含合作协议首页以及签章页',
          prop: 'CPA',
          limit: 10,
          isRequired: true
        },
        {
          label: '食品经营许可证',
          tips: '餐饮类商户务必上传食品经营许可证',
          prop: 'FOOD_CERT',
          limit: 10,
          isRequired: true
        },
        {
          label: '其他资料',
          tips: '请上传商户的门头照片或其他利于审核的图片资料',
          prop: 'OTHER',
          limit: 10,
          isRequired: false
        }
      ],
      componentForm: {
        BIZ_LICENSE: {
          applyId: '',
          annexType: '',
          annexUrls: ''
        },
        ID_CARD: {
          applyId: '',
          annexType: '',
          annexUrls: ''
        },
        CPA: {
          applyId: '',
          annexType: '',
          annexUrls: ''
        },
        FOOD_CERT: {
          applyId: '',
          annexType: '',
          annexUrls: ''
        },
        OTHER: {
          applyId: '',
          annexType: '',
          annexUrls: ''
        }
      },
      rules: {
        'BIZ_LICENSE.annexUrls': [{
          required: true, message: '营业执照不能为空', trigger: 'change'
        }],
        'ID_CARD.annexUrls': [{
          required: true, message: '商户法人/经营者身份证件不能为空', trigger: 'change'
        }],
        'CPA.annexUrls': [{
          required: true, message: '合作协议不能为空', trigger: 'change'
        }],
        'FOOD_CERT.annexUrls': [{
          required: true, message: '食品经营许可证不能为空', trigger: 'change'
        }]
      }
    }
  },
  computed: {
    ...mapGetters('merchantManage', ['merchantStep', 'applyId']),
    // 判断是否为更新操作 (总进度 > 当前项进度)
    isUpdateOperation() {
      return this.merchantStep > this.currentStep
    },
    // 整合图片数据
    annexList() {
      let annexList = []
      for (const key in this.componentForm) {
        annexList = annexList.concat([this.componentForm[key]])
      }
      return annexList
    }
  },
  created() {
    /**
     * type||merchantInfoData为props 定义在mixin中
     * merchantInfoData数据格式传入前做处理
     */
    if (this.type === 'UPDATE') {
      // this.componentForm = this.merchantInfoData
    } else {
      if (!this.isUpdateOperation) {
        this.getDefaultData()
      } else {
        this[`${types.SET_MERCHANT_STEP}`](this.currentStep)
      }
    }
  },
  methods: {
    ...mapMutations('merchantManage', [`${types.SET_MERCHANT_STEP}`]),
    // 图片上传||移除
    uploadPictureChange(fileList, type) {
      let imgUploads = []
      this.componentForm[type].annexUrls = ''
      fileList.map(e => {
        if (e.response) {
          imgUploads.push(e.response.data)
        } else {
          imgUploads.push(e.url)
        }
      })
      this.componentForm[type] = {
        applyId: this.applyId,
        annexType: type,
        annexUrls: imgUploads.join(',')
      }
    },
    // 保存||更新数据
    submitComponentForm() {
      if (this.saveStatus) {
        return false
      }
      this.$refs['componentForm'].validate(async valid => {
        if (valid) {
          this.requestLoading = true
          const requestData = {
            list: this.annexList
          }
          let responseData = null
          try {
            responseData = await merchantManageService.saveOrUpdateMerAnnexs(requestData)
            this.requestLoading = false
            if (responseData.resultCode === AjaxReturnType.SUCCESS) {
              this.saveStatus = true
              this.$message({
                message: '保存成功',
                type: 'success',
                duration: 1000
              })
            }
          } catch (e) {
            console.log(e)
            this.requestLoading = false
            this.$message.error('保存失败')
          }
        }
      })
    },
    // 处理数据回显
    handleDefaultData(defaultData) {
      if (defaultData.annexList.length > 0) {
        defaultData.annexList.map(e => {
          this.pictureUploadList.map(item => {
            if (e.annexType == item.prop) {
              let annexUrls = e.annexUrls.split(',').map(c => ({ url: c, type: e.annexType }))
              this.$set(item, 'fileList', annexUrls)
              this.componentForm[e.annexType] = {
                annexType: e.annexType,
                applyId: this.applyId,
                annexUrls: e.annexUrls
              }
            }
          })
        })
      }
    },
    // 数据回显
    async getDefaultData() {
      try {
        const requestData = { applyId: this.applyId }
        if (this.applyId) {
          const responseData = await merchantManageService.queryMerchantInfo(requestData)
          if (responseData.resultCode === AjaxReturnType.SUCCESS) {
            this.handleDefaultData(responseData.data)
          } else {
            this.$message.error('查询失败')
          }
        }
      } catch (error) {
        this.$message.error('查询时发生错误')
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-collapse{
    border:none !important;
}
/deep/.el-collapse-item__header{
    border:none;
}
/deep/.el-collapse-item__wrap{
    border:none;
}
.container-box{
    .head-title{
        margin-right:20px;
        line-height:40px;
        font-size:16px;
    }
    .page-title{
        display:flex;
        align-items:center;
    }
    .tips{
        font-size:14px;
    }
    /deep/.el-form-item__label{
        line-height:20px;
    }
}
</style>
