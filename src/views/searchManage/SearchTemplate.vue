<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>搜索模板管理  </h3>
            <el-form ref="form" size="medium" :inline="true" :model="formModel"  :rules="formRule" label-width="136px">
                <el-button size="medium" type="primary" @click="createTemplate">新增搜索模板</el-button>
                <el-button size="medium" type="primary" @click="getSearchTemplateList">查询搜索模板列表</el-button>
                <el-form-item  label="根据ID查询" prop="templateId" style="margin-left:40px">
                    <el-input v-model="formModel.templateId" placeholder=""> </el-input>
                    <el-button  type="primary" @click="searchById">查询</el-button>
                </el-form-item>
                <el-form-item  label="根据模板代码查询" prop="code" style="margin-left:40px">
                    <el-input v-model="formModel.code" placeholder=""> </el-input>
                    <el-button  type="primary" @click="searchByCode">查询</el-button>
                </el-form-item>
                                                                                                                                    
            </el-form>
        </div>


        <el-table :data="tableData" border  style="width:100%">
            <el-table-column     
                prop="templateId"
                label="模板ID"
            >
            </el-table-column>
            <el-table-column           
                prop="templateCode"
                label="模板代码"
            >
            </el-table-column>
            <el-table-column
                prop="indexName"
                label="索引名称"

            >
            </el-table-column>
             <!-- <el-table-column
                prop="templateContent"
                label="索引内容"  
            >
            </el-table-column> -->
            
                    
            <el-table-column
                fixed="right"
                width="300"   
                label="操作">
                <template slot-scope="scope">
                   <el-button 
                        size="mini"
                        type="info"
                        @click="viewTemplate( scope.row)">详情
                    </el-button>
                    <el-button 
                        size="mini"
                        type="info"
                        @click="updateTemplate(scope.row)">修改
                    </el-button>
                    <el-button 
                        size="mini" type="danger"
                        @click="deleteTemplate(scope.row)">删除
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
  
    <!-- 创建/修改/查询/详情 模板  依照opration变量 -->
    <el-dialog :visible.sync="opVisible" width="600px" :title="title" @close="closeOp">
            <el-form ref="op" :model="opModel" :rules="opRule"  :inline="true" label-width="116px">
                <el-form-item v-if="opration!=='create'" label="模板Id" prop="templateId">
                    <el-input v-model="opModel.templateId" :disabled="opration==='update'"> </el-input>
                </el-form-item> 
                
                <el-form-item label="模板代码" prop="templateCode">
                    <el-input v-model="opModel.templateCode" placeholder="请输入模板代码"> </el-input>
                </el-form-item> 
                <el-form-item label="索引名称" prop="indexName">
                    <el-input v-model="opModel.indexName" placeholder="请输入索引名称"></el-input>
                </el-form-item>
                <el-form-item label="模板内容" prop="templateContent">
                    <el-input type="textarea" v-model="opModel.templateContent" placeholder="请输入模板内容"></el-input>
                </el-form-item> 
                                
            </el-form>
            <div slot="footer">
                <template v-if="opration==='create'||opration==='update'">
                <el-button type="primary" @click="cancelOp">取消</el-button>
                <el-button type="primary" @click="affirmOp">确认</el-button>
                </template>
                <el-button v-else type="primary" @click="cancelOp">返回</el-button>

            </div>
    </el-dialog>
    


    
    <!-- 删除模板 -->
    <el-dialog :visible.sync="deleteVisible" width="500px" title="确认要删除模板吗?" >
        
        <div class="textCenter" >模板Id: {{delId}}</div>
        <div slot="footer">
            <el-button type="primary" @click="cancelDelete">取消</el-button>
            <el-button type="primary" @click="affirmDelete">确认删除</el-button>
        </div>  
    </el-dialog>
</el-container>

</template>

<script>
import searchService from '@api/searchManage.service.js'
import { AjaxReturnType} from '@enum/service-enum.js'

export default {
    data(){
        return{
            // 操作类型 含update,view,search,create
            opration:'',
            
            formModel:{
                templateId:'',
                code:''              
            },
            formRule:{
                templateId:[{required:true,message:'搜索ID不能为空',trigger:'blur'}],
                code:[{required:true,message:'搜索代码不能为空',trigger:'blur'}],


            },
            
            tableData:[],
            opVisible:false,
            opModel:{
                templateId:'',
                templateCode:'',
                indexName:'',
                templateContent:''
            },
            opRule:{
               templateCode:[{required:true,message:'模板代码不能为空',trigger:"blur"}],
               indexName:[{required:true,message:'索引名称不能为空',trigger:'blur'}],
               templateContent:[{required:true,message:'模板内容不能为空',trigger:'blur'}]
            },

            deleteVisible:false,
            title:'',

            // 页码
            pageNum:1,
            pageSize:10,
            totalNumber:0, 



            // 删除的模板ID
            delId:''
                   


           
            
        }
    },
    methods:{ 
        
    //    关闭弹框
        closeOp(){
           this.opModel={
                templateId:'',
                templateCode:'',
                indexName:'',
                templateContent:''
            }
            this.$refs.op.clearValidate()
        },
    // 搜索列表
        getSearchTemplateList(){
            this.pageNum = 1
            this.getTableData()
        },
    // 获取表格数据
        async getTableData(msg='获取搜索模板列表失败'){
            let data={
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }            
            try{              
                let res = await searchService.getSearchTemplateList(data)
                if(res.resultCode===AjaxReturnType.SUCCESS){
                    this.tableData = res.data.listRows
                    this.totalNumber = res.data.rowTotal
                }
                else{
                    this.$notify.error({message:msg})
                    console.log('resultCode',res.resultCode)
                }                
            }
            catch(err){
                console.log(err)
                this.$notify.error({message:msg})
            }
        },
// 修改页面条目
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
        // 根据ID查询
        searchById(){
            this.opration="search"
            this.$refs.form.validateField("templateId",async res=>{
               if(!res){ 
                  this.getTemplateById(this.formModel.templateId)
                }   
            })
        },
        // 根据模板代码查询
        searchByCode(){
            this.opration="search"
            this.$refs.form.validateField("code",async res=>{
                if(!res){
                    try{                   
                let res= await searchService.selectTemplateByCode({code:this.formModel.cdoe})
                if(res.resultCode===AjaxReturnType.SUCCESS){
                    this.title="模板详情"
                    this.opVisible=true
                    this.opModel = res.data
                }
                else{
                    this.$notify.error({message:'查询模板失败'})
                }                    
            }
            catch(err){
                console.log(err);
                this.$notify.error({message:'查询模板失败'})
            }
                } 
            })
        },
        // 创建模板
        createTemplate(){
            this.title="新建模板"
            this.opration= "create"
            this.opVisible = true;
            

        },
        // 根据ID查询模板 并渲染到弹框 titlt为查看模板详情
        async getTemplateById(id){
            try{                   
                let res= await searchService.getSearchTemplateInfo({id:id})
                if(res.resultCode===AjaxReturnType.SUCCESS){
                    this.title="模板详情"
                    this.opVisible=true
                    this.opModel = res.data
                }
                else{
                    this.$notify.error({message:'查询模板失败'})
                }                    
            }
            catch(err){
                console.log(err);
                this.$notify.error({message:'查询模板失败'})
            }
        },
        // 查看模板详情
        viewTemplate(row){
            this.opration= 'view'
            this.getTemplateById(row.templateId)
        },
        // 修改模板
        updateTemplate(row){
            this.opration="update"
            this.getTemplateById(row.templateId)
            this.getTableData('更新列表失败')

        },
       
        cancelOp(){
            this.opVisible=false

        },
        affirmOp(){
            // 新增模板操作
            if(this.opration==="create"){
                this.$refs.op.validate(res=>{
                    if(res){
                        let data={
                            templateCode:this.opModel.templateCode,
                            indexName:this.opModel.indexName,
                            templateContent:this.opModel.templateContent
                        }
                        searchService.createSearchTemplate(data).then(
                            res=>{
                                if(res.resultCode===AjaxReturnType.SUCCESS){
                                    this.$notify.success({message:"新增搜索模板成功"})
                                    this.getTableData('更新列表失败')
                                }
                                else{
                                    this.$notify.error({message:'新增模板失败'})
                                }
                            }
                        ).catch(err=>{
                             this.$notify.error({message:'新增模板失败'})
                             console.error(err)
                        })
                        this.opVisible = false
                    }
                })

            }
            //修改模板操作
            if(this.opration==='update'){
                this.$refs.op.validate(res=>{
                    if(res){
                        let data={
                            templateId:this.opModel.templateId,
                            templateCode:this.opModel.templateCode,
                            indexName:this.opModel.indexName,
                            templateContent:this.opModel.templateContent
                        }
                        searchService.updateSearchTemplate(data).then(
                            res=>{
                                if(res.resultCode===AjaxReturnType.SUCCESS){
                                    this.$notify.success({message:"修改索模板成功"})
                                    this.getTableData('更新列表失败')
                                }
                                else{
                                    this.$notify.error({message:'修改模板失败'})
                                }
                            }
                        ).catch(err=>{
                             this.$notify.error({message:'修改模板失败'})
                             console.error(err)
                        })
                        this.opVisible = false
                    }
                })
            }

        },
 // 删除模板
        deleteTemplate(row){
            this.deleteVisible=true
            this.delId=row.templateId
        },
        cancelDelete(){
            this.deleteVisible=false
        },
        async affirmDelete(){
            try{
                let res = await searchService.delSearchTemplate({id:this.delId})
                if(res.resultCode===AjaxReturnType.SUCCESS){
                    this.$notify.success({message:'删除模板成功'})
                    this.getTableData('更新列表失败')
                }
                else{
                    this.$notify.error({message:'删除模板失败'})

                }

            }
            catch(err){
                console.error(err)
                this.$notify.error({message:'删除模板失败'})

            }
            this.deleteVisible = false

        }, 
     
       
    },
   created(){
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
        width: 360px;
    }
    /deep/ .el-input{
        width: 360px;
    }
    .el-select{
        width: 360px;
    }
    .el-cascader{
        width: 360px;
    }
    .el-textarea{
        width: 360px;
    }
}

.auditPage .el-main .el-form-item{
    width: 380px;
}
.auditPage .el-main .el-form-item__content .el-input{
    width: 160px;
}
.textCenter{
    text-align: center;
    font-size: 16px;
}
</style>




