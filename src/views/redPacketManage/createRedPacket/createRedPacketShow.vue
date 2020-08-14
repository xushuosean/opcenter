<!--4.红包展示图-->
<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>红包展示图</h3>
      <el-form ref="componentForm" label-position="left" :model="componentForm" :rules="rules" label-width="140px" class="componentForm" size="medium">
        <el-form-item label="适用范围简称" prop="singleName" required>
          <el-input v-model="componentForm.suitScopeAbbr" :clearable="true" style="width:100px" />
          <span style="color:#BEBEBE">
            请概括输入该红包适用的门店范围，最多输入19个字
          </span>
        </el-form-item>
        <el-form-item label="红包使用限制" prop="buttonStyle">
          <el-row class="mt10">
            <el-input v-model="componentForm.limitDescContent" :rows="12" maxlength="93" type="textarea" style="width:550px" placeholder="请概括输入该红包的使用说明或使用限制，最多输入93个字" show-word-limit />
          </el-row>
        </el-form-item>
        <el-form-item label="红包效果图" prop="merchtOptType">
          <red-packet-item style="float:left" />
        </el-form-item>
        <el-form-item>
          <red-packet-item style="float:left" :open="`true`" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import * as types from '@store/mutation-types.js'
import imgUpload from '@com/imgUpload/imgUpload.vue'
import redPacketItem from './components/redPacketItem'
export default {
  components: {
    redPacketItem
  },
  data() {
    return {
      componentForm: {
        suitScopeAbbr: '', // 4 适用范围简称
        limitDescContent: '' // 4 使用限制描述
      },
      rules: {

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
}
</style>

