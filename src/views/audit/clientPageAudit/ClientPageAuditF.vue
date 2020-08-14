<template>
<div class='box'>
    <el-card >
        <div class="flexContainer">
            <div class="left">
        
                <h3 >商户基础信息</h3>
                <AuditTable :data="infoTableData" ></AuditTable>
                <h4>编辑前内容</h4>
                <AuditTable :data="infoTableData2" ></AuditTable>
                <h4>编辑后内容</h4>
                <AuditTable :data="infoTableData3" ></AuditTable>
            </div>
            <div class="right">
                <iframe src="https://m.baidu.com/" frameborder="1" width="375" height='812'></iframe>
            </div>
        </div>
    </el-card>
    <el-card>
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
// 这是什么？
// import { type } from 'os';
export default {
    data(){
        return{
            infoTableData:[{key:'XXXX',value:{type:'text',value:'XXXXX', changed:false}},
                {key:'编辑区域',value:{type:'text',value:'区域1', changed:false}},
                            
            ],
            infoTableData2:[{key:'XXXX',value:{type:'text',value:'XXXXX', changed:false}},
                {key:'banner图片',value:{type:'image',value:'sssss', changed:false}},
                            
            ],
            infoTableData3:[{key:'XXXX',value:{type:'text',value:'XXXXX', changed:false}},
                {key:'banner图片',value:{type:'image',value:'sssss', changed:false}},
                            
            ],
           
           formModel:{
                 audit:'pass'
            },
            formRule:{},
            url:'https://cdn.pixabay.com/photo/2019/07/30/06/00/rose-4372048_1280.png',
            srcList:['https://cdn.pixabay.com/photo/2019/07/30/06/00/rose-4372048_1280.png',],
           
        }
    },
    mounted(){    
    }
}
</script>

<style scoped lang="scss">
.box{margin:40px 20px 0 20px;
    }
.flexContainer{
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    flex-direction: row
}
.left{
    width: 700px;
    
}
.right{
    width: 400px;
    
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


