<template>
  <el-card>
    <h3>消息详情</h3>
    <el-table :data="tableData" :cell-style="{'vertical-align':'top'}">
      <el-table-column
        prop="item"
        width="128"
      />
      <el-table-column
        prop="value"
        width="800"
      />
    </el-table>
    <div class="buttonWrapper">
      <el-button type="primary">返回</el-button>

    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        { item: '消息名称', value: '系统更新消息' },
        { item: '消息内容', value: `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                                        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` },
        { item: '发布者编号', value: 'XXXXXXXX' },
        { item: '发布时间', value: 'XXXXXXXXXXXX' }
      ]
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.el-card{
    margin-top:40px;
    margin-left:20px;
}
.buttonWrapper{
    margin-top:20px;
    display: flex;
    justify-content: left;
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
}
</style>

