<template>
  <div class="img-upload-box">
    <el-upload
      :class="['upload-box',uploadLoadShow?'':'upload-show']"
      action="/opcenter-oms/picture/upload.json"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :show-file-list="true"
      :file-list="fileList"
      :limit="limit"
    >
      <i class="el-icon-plus" />
      <div slot="tip" class="el-upload__tip">{{ tips }}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {

  // action="/opcenter-oms/images/upload"
  props: {
    // 上传的相关提示
    tips: {
      type: String,
      default: ''
    },
    // 图片上传数量
    limit: {
      type: Number,
      default: 1
    },
    // 用于数据回显 格式：[{ur:""},{url:""}]
    fileList: {
      type: Array,
      default: () => { return [] }
    },
    // 图片对应的字段值，需要时可以用到
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      hasUploadList: []
    }
  },
  computed: {
    // 只能上传一张时隐藏上传按钮
    uploadLoadShow() {
      let showState = true
      if (this.limit === 1) {
        if (this.hasUploadList.length >= 1) {
          showState = false
        }
      }
      return showState
    }
  },
  methods: {
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 图片上传成功
    handleSuccess(response, file, fileList) {
      if (this.type) {
        // type是为了满足传参要求{type:XXX,path:XXXX}格式
        file.type = this.type
      }
      this.hasUploadList = fileList
      this.$emit('upload-success', fileList, this.type)
      this.$message({
        message: '上传成功',
        type: 'success',
        duration: 1000
      })
    },
    // 移除图片
    handleRemove(file, fileList) {
      this.hasUploadList = fileList
      this.$emit('upload-success', fileList, this.type)
    }
  }
}
</script>
<style lang="scss" scoped>
    .img-upload-box{
        .el-swiper-box {
            width:400px;
        }
        /deep/.el-upload-list--picture{
            width:200px;
            height:200px;
            .el-upload-list__item{
                height:200px;
                img{
                    width:180px;
                    height:180px;
                    z-index:-1;
                }
            }
        }
        .upload-show{
            /deep/.el-upload--picture-card{
                display:none;
            }
        }
    }
</style>
