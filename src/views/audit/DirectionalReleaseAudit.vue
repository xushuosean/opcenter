<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>定向发放审核</h3>
            <el-form ref="form" size="medium" :inline="true" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item  label="票券/红包批次号" prop="ticketOrRedPacketCode">
                    <el-input v-model="formModel.ticketOrRedPacketCode" placeholder="请输票券或红包批次号"> </el-input>
                </el-form-item>
                <el-form-item label="发放类型" prop="releaseType">
                    <el-select v-model="formModel.releaseType" >
                        <el-option label="全部" value="allStatus"></el-option>  
                        <el-option label="票券(发放类)" value="ticket"></el-option>
                        <el-option label="红包(发放类)" value="redPacket"></el-option>      
                     </el-select>
                </el-form-item>
                <el-form-item label="发放方式" prop="releaseWay">
                    <el-select v-model="formModel.releaseWay" >
                        <el-option label="全部" value="allStatus"></el-option>  
                        <el-option label="批量发放" value="batch"></el-option>
                        <el-option label="接口发放" value="port"></el-option>      
                     </el-select>
                </el-form-item>                
                <el-form-item label="审核状态" prop="auditState">
                    <el-select v-model="formModel.auditState" >
                        <el-option label="全部" value="allStatus"></el-option>  
                        <el-option label="待初审" value="forFirstAudit"></el-option>
                        <el-option label="待终审" value="forLastAudit"></el-option>      
                     </el-select>
                </el-form-item>
               <el-form-item label="初审人编号" prop="firstAuditPersonId">
                    <el-input v-model="formModel.firstAuditPersonId" placeholder="请输入初审人编号"> </el-input>
                </el-form-item>
                <el-form-item label="终审人编号" prop="finalAuditPersonId">
                    <el-input v-model="formModel.finalAuditPersonId" placeholder="请输入终审人编号"> </el-input>
                </el-form-item>
                <el-form-item class="timeRange" label="提交审核时间" prop="submitDate">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.submitDate" 
                        type="daterange" 
                        range-separator="至" 
                        start-placeholder="开始日期" 
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>            
                    <el-form-item class="searchButton"  label=' '>
                        <el-button  type="primary" @click="submitForm">查询</el-button>
                        <el-button  type="primary" @click="download">导出表格</el-button>
                    </el-form-item>                                                                                                     
            </el-form>
        </div>

        <el-table :data="tableData" border size="small" style="width:100%">
            <el-table-column
                prop="releaseType"
                label="发放类型"
                
            >
            </el-table-column>
            <el-table-column
                prop="releaseWay"
                label="发放方式"
             
            >
            </el-table-column>
            <el-table-column
                prop="ticketOrRedPacketCode"
                label="票券/红包批次号"               
                >
            </el-table-column>
            <el-table-column
                prop="ticketOrRedPacketAmount"
                label="票券/红包数量"               
                >
            </el-table-column>
            <el-table-column
                prop="reiceverNumber"
                label="接受用户数量"               
                >
            </el-table-column>
            <el-table-column
                prop="releaseSumNumber"
                label="发出总数"               
                >
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
                prop="auditState"
                label="审核状态"
                width="100">
             </el-table-column>
             <el-table-column
                prop="submitTime"
                label="提交审核时间"
                width="140">
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
                ticketOrRedPacketCode:"",
                releaseType:"",
                releaseWay:"",
                auditState:"",
                firstAuditPersonId:"",
                finalAuditPersonId:"",
                submitDate:"",
            },
            formRule:{},
            tableData:[
                {   
                    releaseType:"票券（发放类）",
                    releaseWay:"批量发放",
                    ticketOrRedPacketCode:"12344253464",
                    ticketOrRedPacketAmount:2,
                    reiceverNumber:1000,
                    releaseSumNumber:33222,
                    firstAuditPersonId:"无",
                    finalAuditPersonId:"无",
                    auditState:"待初审",
                    submitTime:"2018/09/28 10:00"
                },
                {   
                    releaseType:"票券（发放类）",
                    releaseWay:"批量发放",
                    ticketOrRedPacketCode:"12344253464",
                    ticketOrRedPacketAmount:2,
                    reiceverNumber:1000,
                    releaseSumNumber:33222,
                    firstAuditPersonId:"012345",
                    finalAuditPersonId:"012345",
                    auditState:"审核通过",
                    submitTime:"2018/09/28 10:00"
                },
                        
            ],
            beforeAuditStatus:["待初审","待终审"],
            afterAuditStatus:["审核通过","审核不通过"]
                    
        }
    },
    methods:{
        
        submitForm(){},
        handleAudit(scope,index, row){
            this.$router.push('/audit/directionalReleaseAudit/DirectionalReleaseAuditF')
        },
        viewDetails(){
            this.$router.push('/audit/directionalReleaseAudit/DirectionalReleaseAuditDetail')
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


</style>




