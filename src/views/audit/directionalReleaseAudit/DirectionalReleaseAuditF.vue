<template>
<div>
    <el-card>
        <h3 >定向发放审核</h3>
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
        <h3 >审核结果</h3>
        <div class='formWrapper'>
            <el-form>
                <el-form-item :model="formModel" :rules="formRule" >
                    <el-radio-group v-model='formModel.audit'> 
                        <el-radio label="pass"> 审核通过</el-radio>
                        <el-radio label="reject">审核不通过 </el-radio>
                    </el-radio-group>
                </el-form-item>
                    <el-input v-if="formModel.audit==='reject'" type="textarea" :rows="3" placeholder="请输入审核意见"></el-input>
                <el-form-item>

                </el-form-item>
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
export default {
    data(){
        return{
            infoTableData:[
                {item:"发放类型",value:"XXXXXXXXXXX"},
                {item:"发放明细",value:{src:"http://www.baidu.com",name:'baidu'}},
            ],
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


