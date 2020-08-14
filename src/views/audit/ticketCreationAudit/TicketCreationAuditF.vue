<template>
<div class='box'>
    <el-card  >
        <h3 >票券基本信息</h3>
        <AuditTable :data="infoTableData" ></AuditTable>
    </el-card >
    <el-card  >
        <h3 >票券展示图</h3>
        <AuditTable :data="infoTableData2" ></AuditTable>
    </el-card >
    <el-card  >
        <h3 >商品图片</h3>
        <AuditTable :data="infoTableData3" ></AuditTable>
    </el-card >  
    <el-card  >
        <h3 >配置票券时间</h3>
        <AuditTable :data="infoTableData4" ></AuditTable>
    </el-card > 
    <el-card  >
        <h3 >活动规则及结算模式</h3>
        <AuditTable :data="infoTableData5" ></AuditTable>
    </el-card >
    <el-card  >
        <h3 >活动信息配置</h3>
        <AuditTable :data="infoTableData6" ></AuditTable>
    </el-card >     
    <el-card  >
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
import { type } from 'os';
export default {
    data(){
        return{
            infoTableData:[{key:'XXXX',value:{type:'text',value:'XXXXX', changed:false}},
                            {key:'总库存',value:{type:'text',value:'123213个', before:'限量123笔',after:'2343243个'}},
            ],
            infoTableData2:[{key:'票券效果图',value:{value:'https://cdn.pixabay.com/photo/2019/07/30/06/00/rose-4372048_1280.png',type:"image"}}
            ],
            infoTableData3:[{key:'XXXXXX',value:{type:'text',value:'XXXXXXX', changed:false}},                 
            ],
            infoTableData4:[{key:'XXXXXX',value:{type:'text',value:'XXXXXXX', changed:false}},                 
            ],
            infoTableData5:[{key:'XXXXXX',value:{type:'text',value:'XXXXXXX', changed:false}},                 
            ],
            infoTableData6:[{key:'XXXXXX',value:{type:'text',value:'XXXXXXX', changed:false}},                 
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


