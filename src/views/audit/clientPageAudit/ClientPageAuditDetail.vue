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
// 这是什么？
// import { type } from 'os';
export default {
    data(){
        return{
            infoTableData:[{key:'XXXX',value:{type:'text',value:'XXXXX', changed:false}},
                {key:'编辑区域',value:{type:'text',value:'区域1', changed:false}},
                            
            ],
            infoTableData2:[{key:'XXXX',value:{type:'text',value:'XXXXX', changed:false}},
                {key:'banner图片',value:{type:'image',value:'https://cdn.pixabay.com/photo/2019/07/30/06/00/rose-4372048_1280.png', changed:false}},
                            
            ],
            infoTableData3:[{key:'XXXX',value:{type:'text',value:'XXXXX', changed:false}},
                {key:'banner图片',value:{type:'image',value:'https://cdn.pixabay.com/photo/2019/07/30/06/00/rose-4372048_1280.png', changed:false}},
                            
            ],
           
          
            url:'https://cdn.pixabay.com/photo/2019/07/30/06/00/rose-4372048_1280.png',
            srcList:['https://cdn.pixabay.com/photo/2019/07/30/06/00/rose-4372048_1280.png',],
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
  color:#606266;
  margin-top:15px;
  margin-bottom:15px;
}
.formWrapper{
    width: 800px;
    min-height: 150px;
}

</style>


