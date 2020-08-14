<template>
    <el-card>
        <h3 >票券核销详情</h3>
        <el-table :data="verifiDetailTable"  :cell-style="{'vertical-align':'top'}" >
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
        <h3 class=secondH3>操作日志</h3>
        <h4>发起</h4>
        <el-table :data="sponserTable"  :cell-style="{'vertical-align':'top'}" >
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
        <el-divider></el-divider>
        <h4>初审1</h4>
        <el-table :data="firstAuditTable1"  :cell-style="{'vertical-align':'top'}" >
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
        <el-divider></el-divider>       
        <h4>终审1</h4>
        <el-table :data="lastAuditTable1"  :cell-style="{'vertical-align':'top'}" >
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
            verifiDetailTable:[
                {item:"核销券码",value:"XXXXXXXXXXX"},
                {item:"票券名称",value:'XXXXXXXXXXX'},
                {item:"所属分行机构",value:"XXXXXXXXXXXXXXXXXxXXXXXXXX"},
            ],
            sponserTable:[
                {item:"发起时间",value:"XXXXXXXXXXX"},
                {item:"发起人编号",value:'XXXXXXXXXXX'},
            ],
            firstAuditTable1:[
                {item:"审核时间",value:"XXXXXXXXXXX"},
            ],
            lastAuditTable1:[
                {item:"审核时间",value:"XXXXXXXXXXX"},
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
    &.secondH3{
        margin-bottom:25px;
        margin-top:40px;
    }
}

h4{
  color:#606266
}

</style>


