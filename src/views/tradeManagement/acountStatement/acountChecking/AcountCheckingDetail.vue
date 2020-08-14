<template>
    <el-card>
        <h3 >对账详情</h3>
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
            <el-button type="primary">返回</el-button>
        </div>
    </el-card>
    
</template>
<script>
export default {
    data(){
        return{
            tableData:[
                {item:"YYYYYYY",value:"XXXXXXXXXXX"},
            ],
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
    &.secondH3{
        margin-top:40px;
    }
}

</style>


