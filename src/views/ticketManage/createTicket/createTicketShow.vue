<!--4.优惠券展示图-->
<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>票券展示图</h3>
      <el-form ref="componentForm" label-position="left" :model="componentForm" label-width="140px" class="componentForm" size="medium">
        <el-form-item label="优惠券主图" prop="mainPicture">
          <imgUpload
            v-show="!componentForm.primaryImgUrl "
            tips="仅支持上传一张图片"
            action=""
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          />
        </el-form-item>
        <el-form-item label="适用范围简称">
          <el-input v-model="componentForm.useScopeAbbre" :clearable="true" placeholder="最多可输入9个汉字" />
        </el-form-item>
        <el-form-item label="按钮样式">
          <el-select v-model="componentForm.buttonStyle" :clearable="true" placeholder="请选择按钮类型">
            <el-option label="领取" value="GET" />
            <el-option v-show="achievetype == 'BUY'" label="购买" value="BUY" />
            <el-option v-show="achievetype == 'BUY'" label="抢购" value="PURCHASE" />
            <el-option v-show="achievetype == 'BUY'" label="秒杀" value="SECKILL" />
          </el-select>
        </el-form-item>
        <el-form-item label=" logo图角标">
          <el-select v-model="componentForm.isSubscript" style="width:100px">
            <el-option label="有" value="true" />
            <el-option label="无" value="false" />
          </el-select>
          <el-select v-if="componentForm.isSubscript == 'true'" v-model="componentForm.subscriptType" style="width:100px;margin-left:20px">
            <el-option label="样式一" value="STYLE1" />
            <el-option label="样式二" value="STYLE2" />
            <el-option label="样式三" value="STYLE3" />
          </el-select>
          <el-input v-if="componentForm.isSubscript == 'true'" v-model="componentForm.subscriptDesc" maxlength="4" style="width:100px;margin-left:20px" />
        </el-form-item>
        <el-form-item label="营销话术展示">
          <el-select v-model="componentForm.mktAdsType" :clearable="true" placeholder="请选择按钮类型">
            <el-option label="已售出x张" value="SOLD" />
            <el-option label="限时热销" value="BUY" />
            <el-option label="限时抢券" value="RUSH" />
            <el-option label="已发放" value="GRANT" />
          </el-select>
          <span v-show="componentForm.mktAdsType == 'SOLD'" style="margin-left:10px;">已售起始值</span><el-input v-show="componentForm.mktAdsType == 'SOLD'" v-model="componentForm.mktAdsInitValue" :clearable="true" style="width:90px;margin:0 8px;" placeholder="XXX" /><span v-show="componentForm.mktAdsType == 'SOLD'">张</span>
        </el-form-item>
        <el-form-item label="票券效果图预览" prop="merchtOptType">

          <coupon-item
            style="float:left"
            :couponname="couponname"
            :faceprice="faceprice"
            :currentprice="currentprice"
            :primary-img-url="componentForm.primaryImgUrl"
            :use-scope-abbre="componentForm.useScopeAbbre"
            :button-style="componentForm.buttonStyle"
            :mkt-ads-type="componentForm.mktAdsType"
            :mkt-ads-init-value="componentForm.mktAdsInitValue"
          />
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="el-card-mt20" shadow="hover">
      <h3>票券说明</h3>
      <el-form>
        <el-form-item v-show="coupontype == 'PRODUCT'" label="是否展示商品介绍">
          <el-select v-model="componentForm.isDisplayProductDesc" :clearable="true" placeholder="请选择按钮类型" style="margin:0 27px">
            <el-option label="展示" value="true" />
            <el-option label="不展示" value="false" />
          </el-select>
        </el-form-item>

        <el-form-item v-show="coupontype == 'PRODUCT'" label="商品介绍内容">
          <el-input v-model="desc" maxlength="200" :rows="8" type="textarea" style="width:540px;margin:12px 55px" placeholder="请输入展示于用户端票券详情页的商品介绍内容，如：套餐内容明细、商品介绍说明等（展示在优惠券详情页，最多200个字）" show-word-limit />
        </el-form-item>
        <el-form-item label="票券使用规则">
          <el-input v-model="componentForm.ruleDescription" :rows="12" maxlength="350" type="textarea" style="width:540px;margin:12px 55px" placeholder="请输入票券使用规则或使用说明（展示在优惠券详情页，最多350个字）" show-word-limit />
        </el-form-item>

      </el-form>
    </el-card>
    <el-card v-show="coupontype == 'PRODUCT'" class="el-card-mt20" shadow="hover">
      <h3>商品图片</h3>
      <el-form>
        <el-form-item label="商品图片上传">
          <ul class="uploadbox">

            <li v-for="(item,index) in componentForm.mediaList" :key="index" class="upload">
              <imgUpload
                v-show="!componentForm.mediaList[index].imageUrl "
                action=""
                :on-success="function(res,file){return handleMediaSuccess(res,file,index)}"
                :before-upload="beforeMediaUpload"
              />
              <img v-if="componentForm.mediaList[index].imageUrl" :src="imageUrl" class="avatar">
              <el-input v-model="componentForm.mediaList[index].imageDescribe" placeholder="输入图片标题" />
            </li>
          </ul>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>
<script>
import imgUpload from '@com/imgUpload/imgUpload.vue'
import couponItem from '@com/2C/couponItem'
export default {
  components: { imgUpload, couponItem },
  props: {
    achievetype: {
    },
    couponname: {

    },
    faceprice: {
    },
    currentprice: {
    },
    coupontype: {}
  },
  data() {
    return {
      currentStep: 1,
      desc: '',
      componentForm: {
        primaryImgUrl: '', // 优惠券主图
        useScopeAbbre: '', // 使用范围简称
        buttonStyle: 'BUY', // 按钮类型  BUY-购买, PURCHASE-抢购, SECKILL-秒杀
        isSubscript: '',
        subscriptType: '', // 角标样式类型   STYLE1/STYLE2/STYLE3
        subscriptDesc: '', // 角标描述
        mktAdsType: '', // 营销话术展示   BUY-限时热销 SOLD-已售, RUSH-限时抢券, GRANT-已发放
        mktAdsInitValue: '', // 已销售/已领取起始数目
        ruleDescription: '', // 券使用规则
        isDisplayProductDesc: '', // 是否展示商品介绍
        mediaList: [
          {
            sortNo: 1, // 序号
            imageUrl: '', // 图片地址
            imageDescribe: '' // 图片描述
          },
          {
            sortNo: 2, // 序号
            imageUrl: '', // 图片地址
            imageDescribe: '' // 图片描述
          },
          {
            sortNo: 3, // 序号
            imageUrl: '', // 图片地址
            imageDescribe: '' // 图片描述
          },
          {
            sortNo: 4, // 序号
            imageUrl: '', // 图片地址
            imageDescribe: '' // 图片描述
          },
          {
            sortNo: 5, // 序号
            imageUrl: '', // 图片地址
            imageDescribe: '' // 图片描述
          },
          {
            sortNo: 6, // 序号
            imageUrl: '', // 图片地址
            imageDescribe: '' // 图片描述
          }
        ]
      },
      rules: {

      },
      mediaList: [
        {
          mediaType: '', // 媒体类型 0-图片，1-视频
          mediaUrl: '', // 媒体地址
          mediaDescribe: '', // 媒体描述
          dialogVisibleL: false
        }
      ],
      couponInfo: {
        primaryImgUrl: '', // 优惠券主图
        useScopeAbbre: '', // 使用范围简称
        buttonStyle: '', // 按钮类型  BUY-购买, PURCHASE-抢购, SECKILL-秒杀
        mktAdsType: '', // 营销话术展示   BUY-限时热销 SOLD-已售, RUSH-限时抢券, GRANT-已发放
        mktAdsInitValue: '' // 已销售/已领取起始数目
      }
    }
  },
  computed: {
  },
  watch: {
    componentForm: {
      handler: function(newVal, oldVal) {
        this.$emit('getForm4data', this.componentForm)
      },
      deep: true
    }
  },
  created() {
    if (this.ticketStep <= this.currentStep) {
      this.SET_TICKET_STEP(this.currentStep)
    }
  },
  methods: {
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      this.primaryImgUrl = URL.createObjectURL(file.raw)
    },
    // 图片上传限制
    beforeAvatarUpload(file) {
      const isInLimit = Boolean((file.width <= 300) && (file.height <= 300))
      if (!isInLimit) {
        this.$message.error('上传图片的宽高不得大于300px')
      }
      return isInLimit
    },
    // 商品图片上传事件
    handleMediaSuccess(res, file, no) {
      this.beforeMediaUpload[no].imageUrl = URL.createObjectURL(file.raw)
    },
    beforeMediaUpload(file) {
      const isJPG = file.type === 'jpg/png'
      const isLt2M = file.size / 1024 / 1024 < 550
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 550MB!')
      }
      return isJPG && isLt2M
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
    .selectedTICKETList /deep/ thead.has-gutter{
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
    .uploadbox{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      width: 510px;
      .upload {
        width: 148px;
        height: 200px;
        overflow: hidden;
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
          width: 148px;
          height: 148px;
          line-height: 148px;
          text-align: center;
        }
        .avatar {
          width: 148px;
          height: 148px;
          display: block;
        }
      }
    }
}
</style>

