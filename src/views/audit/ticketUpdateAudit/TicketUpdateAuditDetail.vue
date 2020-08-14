<template>
<div class='box'>
    <el-card  >
        <h3 >票券基本信息</h3>
        <AuditTable :data="infoTableData" ></AuditTable>
    </el-card >
   
    <el-card >
        <h3 >审核日志</h3>
        <h4>初审1</h4>
        <el-table :data=auditTable1>
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
        <el-table :data=auditTable2>
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
import { type } from 'os';
export default {
    data(){
        return{
            infoTableData:[{key:'XXXX',value:{type:'text',value:'XXXXX', changed:false}},
                            {key:'总库存',value:{type:'text',value:'123213个', before:'限量123笔',after:'2343243个',changed:true}},
            ],
          
            auditTable1:[{item:"审核时间",value:"XXXXXXXXXXX"},],
            auditTable2:[{item:"审核时间",value:"XXXXXXXXXXX"},],            
        }
    },
    mounted(){    
    }
}
</script>

<style scoped lang="scss">
.box{margin:40px 20px 0 20px;
    }
.el-card{
    margin-top:30px;
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


