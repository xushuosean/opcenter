<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>自定义聚合基本信息</h3>
      <el-form ref="componentForm" label-position="left" :model="componentForm" label-width="140px" class="componentForm" size="medium">
        <el-form-item label="聚合名称" required>
          <el-input v-model="componentForm.polyName" :clearable="true" placeholder="自定义聚合名称，将显示于用户端（最多7个字）" />
        </el-form-item>
        <el-form-item label="聚合对象">
          <el-select v-model="componentForm.polyType" :clearable="true">
            <el-option label="门店" value="SHOP" />
            <el-option label="优惠券" value="COUPON" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择聚合对象" required>
          <search-store v-if="componentForm.polyType == 'SHOP'" style="margin-top:-20px" @getShopList="getShopList" />
          <search-ticket v-if="componentForm.polyType == 'COUPON'" style="margin-top:-20px" @getShopList="getShopList" />
        </el-form-item>
        <el-form-item label="分享链接显示内容">
          <el-select v-model="componentForm.shareType" :clearable="true">
            <el-option label="使用默认值" value="DEFAULT" />
            <el-option label="自定义" value="CUSTOM" />
          </el-select>
        </el-form-item>
        <template v-if="componentForm.shareType == 'CUSTOM'">
          <el-form-item label="分享标题">
            <el-select v-model="sharetitle" :clearable="true">
              <el-option label="与聚合名称相同" value="same" />
              <el-option label="自定义" value="custom" />
            </el-select>
            <el-input v-if="sharetitle == 'custom'" v-model="componentForm.shareTitle" :clearable="true" style="width:260px;margin-left:20px" />
          </el-form-item>
          <el-form-item label="分享描述">
            <el-input v-model="componentForm.shareContent" :clearable="true" placeholder="请输入微信端分享链接显示的描述（副标题）" style="width:440px" />
          </el-form-item>
          <el-form-item label="分享图片">
            <imgUpload
              tips="仅支持上传一张图片"
              @before-upload="beforeAvatarUpload"
              @upload-success="handleUploadSuccess"
            />

          </el-form-item>
        </template>

      </el-form>
    </el-card>
  </div>
</template>
<script>
let id = 0
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import searchStore from './componets/searchStore'
import searchTicket from './componets/searchTicket '
import { AjaxReturnType } from '@enum/service-enum.js'
import imgUpload from '@com/imgUpload/imgUpload.vue'

export default {
  components: {
    searchStore,
    searchTicket,
    imgUpload
  },
  data() {
    return {
      imageUrl: '',
      shareContent: 'default', // 分享链接显示内容
      sharetitle: '', //  分享标题
      componentForm: {
        polyName: '', // 聚合名称
        polyType: 'COUPON', // 聚合类型 票券-COUPON,门店-SHOP
        shareType: '',								 // 分享类型
        shareTitle: '',							 // 分享标题
        shareContent: '',							 // 分享内容
        shareImageUrl: '',							 // 分享图片url
        visitUrl: '',						 // 访问url
        polyDataVOList: [
          {
	           polyObjId: '123213111', // 聚合对象标识编号
	           polyObjName: 'xxxx代金券1', // 聚合对象名称
	           polyObjType: 'COUPON'				// 聚合对象类型 票券-COUPON 门店- SHOP
          },
          {
	           polyObjId: '1232131112',
	           polyObjName: 'xxxx票券1',
	           polyObjType: 'COUPON'
        	}
        ]
      }
    }
  },
  computed: {
    dealedForm() {
      let _componentForm = this.componentForm
      for (let k in _componentForm) {
        if (_componentForm[k] == '') {
          delete _componentForm[k]
        }
      }
      return _componentForm
    }
  },
  created() {
  },
  methods: {
    getShopList(data) {
      this.componentForm.polyDataVOList = data
    },
    getFormData() {
      this.$emit('getFormData', this.dealedForm)
    },
    // 上传图片成功
    handleUploadSuccess(res, file) {
      this.componentForm.shareImageUrl = res[0].url
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

