<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>在线买单退款审核</h3>
            <el-form ref="form" :inline="true" size="medium" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item  label="订单编号" prop="orderNumber">
                    <el-input v-model="formModel.orderNumber" placeholder="请输入订单编号"> </el-input>
                </el-form-item>
                <el-form-item  label="门店名称" prop="shopName">
                    <el-input v-model="formModel.shopName" placeholder="请输入门店名称"> </el-input>
                </el-form-item>                
                <el-form-item  label="用户手机号" prop="userPhone">
                    <el-input v-model="formModel.userPhone" placeholder="请输入用户手机号"> </el-input>
                </el-form-item>
                <el-form-item label="退款提交人" prop="submitter">
                    <el-input v-model="formModel.submitter" placeholder="退款提交人"> </el-input>
                </el-form-item>
                <el-form-item label="所属分行机构" prop="branch">
                    <el-cascader v-model="formModel.branch"  :options="branchOptions">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="审核状态" prop="auditState">
                    <el-select v-model="formModel.auditState" >
                        <el-option label="全部" value="allStatus"></el-option>  
                        <el-option label="待初审" value="forFirstAudit"></el-option>
                        <el-option label="待终审" value="forLastAudit"></el-option>      
                     </el-select>
                </el-form-item>
                 <el-form-item class="timeRange" label="支付时间" prop="payDate">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.payDate" 
                        type="daterange" 
                        range-separator="至" 
                        start-placeholder="开始日期" 
                        end-placeholder="结束日期">
                    </el-date-picker>
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
               
                    <el-form-item class="searchButton" label=' '>
                        <el-button  type="primary" @click="submitForm">查询</el-button>
                        <el-button  type="primary" @click="download">导出表格</el-button>
                    </el-form-item>                     
                
                                                                                 
            </el-form>
        </div>


        <el-table :data="tableData" size="small" border style="width:100%">
            <el-table-column 
                fixed          
                prop="orderNumber"
                label="订单编号"
                width="220"
            >
            </el-table-column>
            <el-table-column           
                prop="shopName"
                label="门店名称"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="userPhone"
                label="用户手机号"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="payedMoney"
                label="实付金额"
                width="90"   
                >
            </el-table-column>
  
            <el-table-column
                prop="branch"
                label="所属分行"  
                width="180" 
                >
            </el-table-column>
            <el-table-column
                prop="payTime"
                label="支付时间"
                width="150"   
                >
            </el-table-column>
            <el-table-column
                prop="submitTime"
                label="提交审核时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="submitter"
                label="提交人"
                width="100">
            </el-table-column>      
            <el-table-column
                prop="firstAuditPersonId"
                label="初审人"
                width="120"
               >
             </el-table-column>
            <el-table-column
                prop="finalAuditPersonId"
                label="终审人"
                width="120"
                >
             </el-table-column>
             <el-table-column
                prop="auditState"
                label="审核状态"
                width="120">
             </el-table-column>
             
             <el-table-column
                fixed="right"
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
            branchOptions:[{label:"选项1",value:"1",children:[{label:"子选项1-1",value:"1-1"},{label:"子选项1-2",value:"1-2"}]}],
            formModel:{
                orderNumber:"",
                shopName:"",
                userPhone:"",
                submitter:"",
                branch:"",
                auditState:"",
                firstAuditPersonId:"",
                finalAuditPersonId:"",
                payDate:"",
                submitDate:"",
            },
            formRule:{},
            tableData:[
                {   
                orderNumber:"1540869283721233472",
                shopName:"肯德基（南京西路）",
                userPhone:"13800000000",
                submitter:"012345",
                branch:"上海分行-XX支行-零售产品营销中心",
                auditState:"待初审",
                firstAuditPersonId:"012345",
                finalAuditPersonId:"012345",
                payTime:"2018/04/28 10:00",
                submitTime:"2018/04/28 10:00",
                payedMoney:123,
                },
                {   
                orderNumber:"1540869283721233472",
                shopName:"肯德基（南京西路）",
                userPhone:"13800000000",
                submitter:"012345",
                branch:"上海分行-XX支行-零售产品营销中心",
                auditState:"审核通过",
                firstAuditPersonId:"012345",
                finalAuditPersonId:"012345",
                payTime:"2018/04/28 10:00",
                submitTime:"2018/04/28 10:00",
                payedMoney:123,
                },                
            
            ],
            beforeAuditStatus:["待初审","待终审"],
            afterAuditStatus:["审核通过","审核不通过"]
                    
        }
    },
    methods:{
        
        submitForm(){},
        handleAudit(scope,index, row){
           this.$router.push('/audit/onlinePayRefundAudit/OnlinePayRefundAuditF')
        },
        viewDetails(){
            this.$router.push('/audit/onlinePayRefundAudit/OnlinePayRefundAuditDetail')
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




