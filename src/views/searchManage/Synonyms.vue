<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>搜索同义词管理 </h3>
            <div>
                
             <el-form ref="form" size="medium" :inline="true" :model="formModel"  :rules="formRule" label-width="114px">
                 
                     <el-button type="primary" size="medium" @click="createSynonym">新增同义词</el-button> 
              
                  <el-button  size="medium" type="primary" @click="getSynonymList">同义词列表</el-button>  
               
                 <el-form-item class="item" prop="id">
                     <el-input v-model="formModel.id" placeholder="请输入要查询的同义词的ID"></el-input>
                 </el-form-item>
                    <el-button type="primary" @click="getSynonymInfo">查询同义词详情</el-button>
             </el-form>
            </div>
            
            
        </div>


        <el-table :data="tableData" border  style="width:100%">
            <el-table-column     
                prop="id"
                label="ID"
            >
            </el-table-column>
            <el-table-column           
                prop="original"
                label="搜索词"
            >
            </el-table-column>
            <el-table-column
                prop="synonym"
                label="同义词"
            >
            </el-table-column>
            
                    
            <el-table-column
                fixed="right"
                width="300"   
                label="操作">
                <template slot-scope="scope">
                    <el-button 
                        size="mini"
                        type="info"
                        @click="updateSynonym(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button 
                        size="mini" type="danger"
                        @click="deleteSynonym(scope.$index, scope.row)">删除
                    </el-button>                    
                </template>
            </el-table-column>                                        
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30]"                
            layout="total, sizes, prev, pager, next, jumper"
            background
            :total="totalNumber">
        </el-pagination>
    </el-main>
    <el-dialog :visible.sync="createSynonymVisible" width="800px" title="新增热词" @close="close('createSynonym')">
            <el-form ref="createSynonym" :model="createSynonymModel" :rule="createSynonymRule"  :inline="true" label-width="96px">
                <el-form-item label="搜索词" prop="original">
                    <el-input v-model="createSynonymModel.original" placeholder="请输入搜索词"> </el-input>
                </el-form-item> 
                <el-form-item label="同义词" prop="synomym">
                    <el-input v-model="createSynonymModel.synomym" placeholder="请输入同义词"></el-input>
                </el-form-item> 
                                
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="cancelCreate">取消</el-button>
                <el-button type="primary" @click="affirmCreate">确认</el-button>
            </div>
    </el-dialog>
    <!-- 修改/删除/查看详情 同义词 -->
    <el-dialog :visible.sync="OpVisible" width="500px" :title="OpTitle" @close="close('OpSynonym')">
        
        <el-form ref="OpSynonym" :model="OpSynonymModel" :rule="OpSynonymRule"  :inline="true" label-width="96px">
                <el-form-item label="ID" prop="id" >
                    <el-input v-model="OpSynonymModel.id" disabled> </el-input>
                </el-form-item>
                <el-form-item label="搜索词" prop="original">
                    <el-input v-model="OpSynonymModel.original" placeholder="请输入搜索词" :disabled="disabled"> </el-input>
                </el-form-item> 
                <el-form-item label="同义词" prop="synomym">
                    <el-input v-model="OpSynonymModel.synonym" placeholder="请输入同义词" :disabled="disabled"></el-input>
                </el-form-item> 
                                
            </el-form>
        <div slot="footer">
            <el-button type="primary" @click="cancelOp">取消</el-button>
            <el-button type="primary" @click="affirmOp">确认</el-button>
        </div>  
    </el-dialog>
  
</el-container>

</template>

<script>
import searchService from '@api/searchManage.service.js'
import { AjaxReturnType} from '@enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'

export default {
    data(){
        return{
            disabled:false,
            //同义词操作 'detail' 'update' 'delete'     
            opration:"",
            formModel:{
                id:''
               
            },
            formRule:{
                id:[{required:true,trigger:"blur",message:'请输入ID'}]
            },
            
            tableData:[],
            // 新增同义词
            createSynonymVisible:false,
            createSynonymModel:{
                original:'',
                synonym:''
            },
            createSynonymRule:{},
            OpSynonymRule:{},


            OpSynonymModel:{
                id:"",
                original:"",
                synonym:""
            },
            updateSynonymRule:{},
           
           OpVisible:false,
           currentRow:"",
        // 弹框标题
           OpTitle:"",
            // 页码
            pageNum:1,
            pageSize:10,
            totalNumber:0,                    
        }
    },
    methods:{
        // 查询同义词详情
        getSynonymInfo(){          
            this.$refs.form.validate(async res=>{
                if(res){
                    this.OpVisible=true
                    this.opration = "detail"
                    this.disabled = true
                    this.OpTitle = "查看同义词"
                    try{
                        let res= await searchService.getSynonymInfo({id:this.formModel.id})
                        if(res.resultCode===AjaxReturnType.SUCCESS){
                            this.OpSynonymModel=res.data
                        }
                        else{
                            this.$notify.error({message:"查询同义词详情失败"})
                        }
                    }
                    catch(err){
                        this.$notify.error({message:"查询同义词详情失败"})
                        console.error(err)
                    }
                }
            })


            
        },
       
        close(ref){
            this.$refs[ref].resetFields()
        } , 
         //查询表格 
        async getTableData(){
            let data={
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            
            try{              
                let res = await searchService.getSynonymList(data)
               
                if(res.resultCode===AjaxReturnType.SUCCESS){
                    this.tableData = res.data.listRows
                    this.totalNumber = res.data.rowTotal
                }
                else{
                    this.$notify.error({message:'获取同义词数据失败'})
                    console.log('resultCode',res.resultCode)
                }                
            }
            catch(err){
                console.log(err)
                this.$notify.error({message:'获取同义词数据失败'})
            }
        },
        getSynonymList(){
            this.pageNum=1
            this.getTableData()
        },
         // 改变一页条目数
        handleSizeChange(size){
            this.pageSize=size
            if(this.tableData.length===0){return}
            this.getTableData()
        },
        // 改变页码
        handleCurrentChange(num){
            this.pageNum =num
            if(this.tableData.length===0){return}
            this.getTableData()
        },
       
        //创建同义词
        createSynonym(){
            this.createSynonymVisible = true
               
        },
        cancelCreate(){
            this.createSynonymVisible = false
        },
        affirmCreate(){
             this.$refs.createSynonym.validate(res=>{
                if(res){
                    let formData = {}
                    Object.assign(formData,this.createSynonymModel)                   
                    searchService.createSynonym(formData).then(res=>{
                        if(res.resultCode===AjaxReturnType.SUCCESS){
                            this.$notify.success({message:"新增同义词成功"})
                        }
                        else{
                            this.$notify.error({message:'新增同义词失败'})
                        }
                    }).catch(err=>{
                        console.log(err)
                        this.$notify.error({message:"新增同义词失败"})
                    })
                }
                this.createSynonymVisible = false
            })       
        },

        //
        affirmOp(){
            if(this.opration==="detail"){
                this.OpVisible = false
            }
            else if(this.opration==="update"){
                this.$refs.OpSynonym.validate(res=>{
                    if(res){
                        let data = {}
                        Object.assign(data, this.OpSynonymModel)
                        searchService.updateSynonym(data).then(
                            res=>{
                                if(res.resultCode===AjaxReturnType.SUCCESS){
                                    this.$notify.success({message:"修改同义词成功"})
                                }
                                else{
                                    this.$notify.success({message:"修改同义词成功"})
                                }
                            }
                        ).catch(err=>{console.log(err);this.$notify.success({message:"修改同义词成功"})})
                        this.OpVisible=false
                    }
                    
                })
            }
            else if(this.opration==="delete"){
                searchService.delSynonym({id:this.OpSynonymModel.id}).then(res=>{
                    if(res.resultCode===AjaxReturnType.SUCCESS){
                        this.$notify.success({message:"删除同义词成功"})
                    }
                    else{
                        this.$notify.erroe({message:"删除同义词失败"})
                    }
                }
                ).catch(err=>{
                    this.$notify.erroe({message:"删除同义词失败"})
                    console.error({err})
                })
                this.OpVisible = false
            }
        },
        cancelOp(){
                this.OpVisible = false 
        },


        // 修改同义词
        updateSynonym(i,row){
            this.OpTitle= "修改同义词"
            this.OpVisible = true
            this.opration = 'update'
            Object.assign(this.OpSynonymModel,row)
            this.disabled = false
        },
   
        // 删除同义词
        deleteSynonym(i,row){
            this.OpTitle= "确认删除该同义词吗？"
            this.OpVisible = true
            this.opration = 'delete'
            Object.assign(this.OpSynonymModel,row)
            this.disabled = true
        }
    }
}
</script>

<style lang="scss" scoped>
form.el-form{
    margin-bottom: 25px;
}

h3{
    margin-bottom: 15px;
    button{
        margin-left:2em;
    }
}
.el-breadcrumb{
    line-height: 30px;
}
.el-dialog{
    .el-input{
        width: 260px;
    }
    /deep/ .el-input{
        width: 260px;
    }
    .el-select{
        width: 260px;
    }
    .el-cascader{
        width: 260px;
    }
}

.auditPage .el-main .el-form-item{
    width:200px;
    margin-left: 40px;
}
.auditPage .el-main .el-form-item__content .el-input{
    width:200px
}


</style>




