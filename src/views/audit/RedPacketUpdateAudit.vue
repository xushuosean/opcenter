<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>红包变更审核</h3>
            <el-form ref="form" :inline="true" size="medium" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item  label="红包名称" prop="rpkName">
                    <el-input v-model="formModel.rpkName" placeholder="请输红包名称"> </el-input>
                </el-form-item>
                <el-form-item  label="红包批次号" prop="rpkId">
                    <el-input v-model="formModel.rpkId" placeholder="红包批次号"> </el-input>
                </el-form-item>
                <el-form-item label="适用门店名称" prop="shopName">
                    <el-input v-model="formModel.shopName" placeholder="请输入适用门店名称"> </el-input>
                </el-form-item>
                <el-form-item label="红包类型" prop="rpkType">
                    <el-select v-model="formModel.rpkType">
                        <el-option label="全部" value="allType" ></el-option>
                        <el-option label="满减" value="reduction" ></el-option>
                        <el-option label="折扣" value="discount" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态" prop="currentAuditState">
                    <el-select v-model="formModel.currentAuditState" >
                        <el-option label="全部" value="" />>
                        <el-option label="变更待初审" value="U_FIRSTAUDIT" />
                        <el-option label="变更待终审" value="U_FINALAUDIT" />
                        <el-option label="变更审核通过" value="U_PASS" />
                        <el-option label="变更审核不通过" value="U_NOTPASS" />
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
                prop="rpkName"
                label="红包名称"
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="rpkId"
                label="红包批次号"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="shopName"
                label="适用门店名称"
                width="220"
                >
            </el-table-column>

            <el-table-column
                prop="rpkType"
                label="红包类型"
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
                prop="currentAuditState"
                label="审核状态"
                width="100">
             </el-table-column>
             <el-table-column
                prop="createTime"
                label="提交审核时间"
                width="140">
             </el-table-column>
             <el-table-column
                width="90"   
                label="操作">
                <template slot-scope="scope">
                    <el-button v-if="beforeAuditStatus.includes(scope.row.currentAuditState)"
                    size="mini"
                    @click="handleAudit(scope,scope.$index, scope.row)">审核</el-button>
                    <el-button v-if="afterAuditStatus.includes(scope.row.currentAuditState)"
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
            shopTypeOptions:[{label:"选项1",value:"1",children:[{label:"子选项1-1",value:"1-1"},{label:"子选项1-2",value:"1-2"}]}],
            formModel:{
                rpkName:"",
                rpkId:"",
                shopName:"",
                rpkType:"",
                currentAuditState:"",
                firstAuditPersonId:"",
                finalAuditPersonId:"",
                submitDate:"",
            },
            formRule:{},
            tableData:[
                {   
                    rpkName:"双十一红包",
                    rpkId:"123456789101",
                    shopName:"全家（襄阳北路一店）(多店...)",
                    rpkType:"满减",
                    firstAuditPersonId:"无",
                    finalAuditPersonId:"无",
                    currentAuditState:"待初审",
                    createTime:"2018/09/28 10:00"
                },
                {   
                    rpkName:"双十一红包",
                    rpkId:"123456789101",
                    shopName:"全家（襄阳北路一店）(多店...)",
                    rpkType:"满减",
                    firstAuditPersonId:"012345",
                    finalAuditPersonId:"012345",
                    currentAuditState:"审核通过",
                    createTime:"2018/09/28 10:00"
                },
                        
            ],
            beforeAuditStatus:["待初审","待终审"],
            afterAuditStatus:["审核通过","审核不通过"]
                    
        }
    },
    methods:{
        
        submitForm(){},
        handleAudit(scope,index, row){
            this.$router.push('/audit/redPacketUpdateAudit/RedPacketUpdateAuditF')
        },
        viewDetails(){
            this.$router.push('/audit/redPacketUpdateAudit/RedPacketUpdateAuditDetail')
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




