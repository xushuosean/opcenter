<template>
  <div class="box">



    <el-card >

      <h3>商户基础信息</h3>
      <AuditTable :data="infoTableData"/>
    </el-card>
    <el-card >
      <h3>商户结算信息</h3>
      <AuditTable :data="infoTableData2"/>
    </el-card>
    <el-card >
      <h3>签约交易类型</h3>
      <el-divider/>
    </el-card>
    <el-card>
      <h3>图片资料上传</h3>
      <div class="imgRow">
        <div class="label">营业执照（组织机构代码证/ 税务登记证）</div>

        <div>
          <el-image
            style="width: 200px; height: 200px"
            :src="url"
            :preview-src-list="srcList"
/>
          <el-image
            style="width: 200px; height: 200px"
            :src="url"
            :preview-src-list="srcList"
/>
        </div>
      </div>
      <div class="imgRow">
        <div class="label">合作协议</div>
        <div>
          <el-carousel height="200px">
            <el-carousel-item v-for="item in 4" :key="item">
              <el-image
                style="width: 200px; height: 200px"
                :src="url"
                fit="contain"
                :preview-src-list="srcList"
/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </el-card>
    <el-card >
      <h3>新增商户下属门店</h3>
      <el-divider/>
    </el-card>

    <el-card >
      <h3>审核结果</h3>
      <div class="formWrapper">
        <el-form>
          <el-form-item :model="formModel" :rules="formRule">
            <el-radio-group v-model="formModel.audit">
              <el-radio label="pass"> 审核通过</el-radio>
              <el-radio label="reject">审核不通过 </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-input v-if="formModel.audit==='reject'" type="textarea" :rows="3" placeholder="请输入审核意见"/>
          <el-form-item/>
        </el-form>
      </div>
    </el-card>


    <div class="buttonWrapper">
      <el-button type="primary">取消返回</el-button>
      <el-button type="primary">提交审核结果</el-button>
    </div>

  </div>
</template>
<script>
// 这是什么？
// import { type } from 'os';
import { mapGetters } from 'vuex'
export default {

  data() {
    return {
      auditOP: '',
      auditOPCN: '',

      infoTableData: [{ key: 'XXXX', value: { type: 'text', value: 'XXXXX', changed: false }},
        { key: 'XXXX', value: { type: 'text', value: 'XXXXX', before: 'xxXXXXX', after: 'XXXXXX' }}
      ],
      infoTableData2: [{ key: 'XXXX', value: { type: 'text', value: 'XXXXX', changed: false }},
        { key: 'XXXX', value: { type: 'text', value: 'XXXXX', before: 'xxXXXXX', after: 'XXXXXX' }}
      ],
      infoTableData3: [{ key: 'XXXX', value: { type: 'text', value: 'XXXXX', changed: false }},
        { key: 'XXXX', value: { type: 'text', value: 'XXXXX', before: 'xxXXXXX', after: 'XXXXXX' }}
      ],

      formModel: {
        audit: 'pass'
      },
      formRule: {},
      url: 'https://cdn.pixabay.com/photo/2019/07/30/06/00/rose-4372048_1280.png',
      srcList: ['https://cdn.pixabay.com/photo/2019/07/30/06/00/rose-4372048_1280.png' ]

    }
  },
  created() {
    this.auditState = this.$route.query.auditState
    if (this.auditState === 'beforeFirstAudit') {
      this.auditOP = 'firstAudit'
      this.auditOPCN = '初审'
    } else if (this.auditState === 'beforeFinalAudit') {
      this.auditOP = 'finalAudit'
      this.auditOPCN = '终审'
    }
    console.log(this.auditState)
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.box{margin:40px 20px 0 20px;
    }
.el-card{
    margin-top:10px;
}
.buttonWrapper{
    margin-top:20px;
    display: flex;
    justify-content: center;
    button{
        margin-right:20px;
    }
}
.el-table {
    border:none;
   /deep/ td{border:none ;}
    &::before{
        height: 0px;
    }
    /deep/ th.is-leaf{
        display: none;
        // height: 0px;
        // padding:0;
        // border-bottom:none !important
    }
}
h3{
    margin-bottom:15px;
    &.secondH3{
        margin-bottom:25px;
        margin-top:40px;
    }
}

h4{
  color:#606266
}
.formWrapper{
    width: 800px;
    min-height: 150px;
}

.imgRow{
    display: flex;
    justify-content: left;
    margin-bottom: 20px;
    .label{
        width: 180px;
        margin-right: 50px;
    }
    .el-image{
        margin-right: 30px;
    }

    .el-carousel{
        width: 200px;
    }
}
.auditOP{
   /deep/ .el-card__body{
    //     padding-top:10px;
    // padding-bottom:10px;
    color:#606266;
   }



}

</style>

