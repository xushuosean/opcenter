<template>
<div>
    <el-card>
        <h3 >自定义聚合审核</h3>
        <AuditTable :data="infoTableData">
           
        </AuditTable>  
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
                {key:"聚合编号",value:{value:"XXXXXXXXXXX",type:'text'}},
                {key:"聚合名称",value:{value:"dsafdsfdsds",type:'text'}},
                {key:"聚合对象",value:{value:"<p>dsafdsfdsds</p><p>werewrew qeeqwq</p>",type:'text'}},
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
.AuditTable {
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


