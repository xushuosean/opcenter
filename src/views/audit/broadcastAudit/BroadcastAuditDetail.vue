<template>
<div>
    <el-card>
        <h3 >消息详情</h3>
        <el-table :data="infoTableData"  :cell-style="{'vertical-align':'top'}" >
            <el-table-column
                prop="item"
                width="138"
            >
            </el-table-column>
            <el-table-column
                prop="value"
                width="900"                 
            >
            </el-table-column>
        </el-table>  
    </el-card>
    <el-card class="follow">
        <h3 >审核日志</h3>
        <h4>初审1</h4>
        <el-table :data=auditTableData1>
            <el-table-column
                prop="item"
                width="138"
            >
            </el-table-column>
            <el-table-column
                prop="value"
                width="900"                 
            >
            </el-table-column>
        </el-table>
        <el-divider></el-divider> 
        <h4>终审1</h4>
        <el-table :data=auditTableData2>
            <el-table-column
                prop="item"
                width="138"
            >
            </el-table-column>
            <el-table-column
                prop="value"
                width="900"                 
            >
            </el-table-column>
        </el-table>
       
    </el-card>
       
    <div class="buttonWrapper">
        <el-button type="primary">返回</el-button>
    </div>
</div>    
</template>
<script>
export default {
    data(){
        return{
            infoTableData:[
                {item:"消息流水号",value:"XXXXXXXXXXX"},
                {item:"消息名称",value:'XXXXXXXXXXX'},
                {item:"接收者范围",value:"XXXXXXXXXXXXXXXXXXXXXXXXX"},
            ],
            auditTableData1:[{item:"审核时间",value:"XXXXXXXXXXX"},],
            auditTableData2:[{item:"审核时间",value:"XXXXXXXXXXX"},],
            formModel:{
                 audit:'pass'
            },
            formRule:{}
           
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
    &.follow{
        margin-top:30px;
    }
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

</style>


