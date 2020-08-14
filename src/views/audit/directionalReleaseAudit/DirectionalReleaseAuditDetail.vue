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
                <template slot-scope="scope">
                    <template v-if='scope.row.item==="发放明细"'>
                        <img height="20" src='https://d1icd6shlvmxi6.cloudfront.net/gsc/A7CXW8/c0/88/b9/c088b93ed41248db8eaef89c38eb29f6/images/shanghuguanli_chaxun_3/u660.png?token=fb1d9c17ccade4c1b6c8605c3501a07414f3da75eed8f62fbe16e79aa811b727' alt="">
                        <a :href='scope.row.value.src' > {{scope.row.value.name}}</a>
                    </template>
                    <template v-else>
                        {{scope.row.value}}
                    </template>

                </template>
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
                {item:"发放类型",value:"XXXXXXXXXXX"},
                {item:"发放明细",value:{src:"http://www.baidu.com",name:'baidu'}},
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


