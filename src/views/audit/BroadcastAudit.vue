<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>平台广播审核</h3>
            <el-form ref="form" size="medium" :inline="true" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item  label="消息名称" prop="messageName">
                    <el-input v-model="formModel.messageName" placeholder="请输入消息名称"> </el-input>
                </el-form-item>
                <el-form-item label="消息流水号" prop="messageCode">
                    <el-input v-model="formModel.merchantCode" placeholder="请输入消息流水号"> </el-input>
                </el-form-item>
                <el-form-item label="发布者姓名" prop="promulgator">
                    <el-input v-model="formModel.promulgator" placeholder="请输入发布者姓名"> </el-input>
                </el-form-item>
                                
                <el-form-item label="审核状态" prop="auditState">
                    <el-select v-model="formModel.auditState" >
                        <el-option label="全部" value="allStatus"></el-option>  
                        <el-option label="待初审" value="forFirstAudit"></el-option>
                        <el-option label="待终审" value="forLastAudit"></el-option>     
                     </el-select>
                </el-form-item>
                
                <el-form-item label="接收者" class="receiver-select" prop="receiver">
                    <el-select v-model="formModel.receiver" >
                        <el-option label="全部商户" value="allMerchant"></el-option>
                        <el-option label="指定商户" value="specilfiedMerchant"></el-option>                        
                    </el-select>
                </el-form-item>
                <el-form-item  v-show="formModel.receiver=='specilfiedMerchant'"  class="receiver-input" prop="specilfiedReceiver" label="指定商户接受者">
                        <el-input v-if="formModel.receiver=='specilfiedMerchant'" v-model="formModel.specilfiedReceiver" placeholder="请输入商户名称"></el-input>
                </el-form-item>                
                <el-form-item class="timeRange" label="提交审核时间" prop="submitTime">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.submitTime" 
                        type="daterange" 
                        range-separator="至" 
                        start-placeholder="开始日期" 
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
              
                <el-form-item class="searchButton" label=" ">
                    <el-button  type="primary" @click="submitForm">查询</el-button>
                    <el-button  type="primary" @click="download">导出表格</el-button>
                </el-form-item>                     
               
                                                                                 
            </el-form>
        </div>


        <el-table :data="tableData" size="small" border style="width:100%">

            <el-table-column
                prop="messageCode"
                label="消息流水号"
                width="200"
                >
            </el-table-column>
            <el-table-column
                prop="messageName"
                label="消息名称" 
                >
            </el-table-column>
             <el-table-column
                prop="receiver"
                label="接收者"> 
            </el-table-column>
            <el-table-column
                prop="promulgatorName"
                label="发布者姓名"
                width="100"
               >
             </el-table-column>
            <el-table-column
                prop="promulgatorCode"
                label="发布者编号"
                width="100"
               >
             </el-table-column>                                               
            <el-table-column
                prop="auditState"
                label="审核状态"
                width="90">
             </el-table-column>
            <el-table-column
                prop="firstAuditPersonId"
                label="初审人"
                width="90"
               >
             </el-table-column>
            <el-table-column
                prop="finalAuditPersonId"
                label="终审人"
                width="90"
                >
             </el-table-column>             
             <el-table-column
                prop="submitTime"
                label="提交审核时间">
             </el-table-column>
              <el-table-column
                width="90"   
                label="操作">
                <template slot-scope="scope">
                    <el-button v-if="beforeAuditStatus.includes(scope.row.auditState)"
                    size="mini"
                    @click="handleAudit(scope,scope.$index, scope.row)">审核</el-button>
                    <el-button v-if="afterAuditStatus.includes(scope.row.auditState)"
                    size="mini"
                    type="info"
                    @click="viewDetails(scope.$index, scope.row)">详情</el-button>
                </template>
             </el-table-column>                                       
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 30]"                
            layout="total, sizes, prev, pager, next, jumper"
            background
            :total="totalNumber">
        </el-pagination>
    </el-main>
</el-container>

</template>

<script>
export default {
    data(){
        return{
            formModel:{
                messageName:"",
                messageCode:"",
                promulgator:"",
                receiver:"",
                specilfiedReceiver:"",
                auditState:"",
                submitTime:"",
            },
            formRule:{},
            tableData:[
                {
                messageName:"系统更新消息",
                messageCode:"1540869283721233472 ",
                promulgatorName:"xxx",
                promulgatorCode:"23452",
                receiver:"百胜中国控股有限公司",
                firstAuditPersonId:"无",
                finalAuditPersonId:"无",
                auditState:"待初审",
                submitTime:"2018/09/28 10:00",
                },
                {
                messageName:"系统更新消息",
                messageCode:"1540869283721233472 ",
                promulgatorName:"xxx",
                promulgatorCode:"23452",
                receiver:"百胜中国控股有限公司",
                firstAuditPersonId:"无",
                finalAuditPersonId:"无",
                auditState:"审核通过",
                submitTime:"2018/09/28 10:00",
                },
    
            ],
            beforeAuditStatus:["待初审","待终审"],
            afterAuditStatus:["审核通过","审核不通过"]
                    
        }
    },
    methods:{
        
        submitForm(){},
        handleEdit(scope,index, row){

        },
        handleAudit(){
            this.$router.push('/audit/broadcastAudit/BroadcastAuditF')
        },
        viewDetails(){
             this.$router.push('/audit/broadcastAudit/BroadcastAuditDetail')
        },
        handleSizeChange(){},
        handleCurrentChange(){},
        download(){},

    }
}
</script>

<style lang="scss" scoped>
form.el-form{
    margin-bottom: 25px;
}

h3{
    margin-bottom: 15px;
}
.el-breadcrumb{
    line-height: 30px;
}
// .el-form-item.receiver-input{margin-left:0px}
.addMessage{
    margin-left: 2em
}

</style>




