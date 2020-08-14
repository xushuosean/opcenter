<template>
    <el-card>
        <h3 >发起退款</h3>
        <el-table :data="tableData"  :cell-style="{'vertical-align':'top'}" >
            <el-table-column
                prop="item"
                width="128"
            >
            </el-table-column>
            <el-table-column
                prop="value"
                width="800"
                 
            >
            </el-table-column>
        </el-table>
        <div class="buttonWrapper">
            <el-button type="primary">取消返回</el-button>
            <el-button type="primary">确认退款，提交审核</el-button>
        </div>
    </el-card>
</template>
<script>
export default {
    data(){
        return{
            tableData:[
                {item:"订单号",value:"123213213213"},
                {item:"订单号",value:"123213213213"},
                {item:"订单号",value:"123213213213"},
                {item:"订单号",value:"123213213213"},
                {item:"订单号",value:"123213213213"},
                {item:"订单号",value:"123213213213"},
            ]
        }
    },
    mounted(){    
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


