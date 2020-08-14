<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>退款记录</h3>
            <el-form ref="form" size="medium" :inline="true" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item  label="订单编号" prop="orderCode">
                    <el-input v-model="formModel.orderCode" placeholder="请输入订单编号"> </el-input>
                </el-form-item>
                <el-form-item  label="商品名称" prop="goodsName">
                    <el-input v-model="formModel.goodsName" placeholder="请输入商品名称"> </el-input>
                </el-form-item>                
                <el-form-item label="退款类型" prop="refundType">
                    <el-select v-model="formModel.refundType" >
                        <el-option label="全部" value="allType"></el-option>  
                        <el-option label="全额退款" value="fullRefund"></el-option>
                        <el-option label="部分退款" value="partlyRefund"></el-option>      
                     </el-select>
                </el-form-item>
                <el-form-item label="订单类型" prop="orderType">
                    <el-select v-model="formModel.orderType" >
                        <el-option label="全部" value="allType"></el-option>  
                        <el-option label="内部代金券" value="innerCash"></el-option>
                        <el-option label="内部商品券" value="innerGoods"></el-option>
                        <el-option label="外部代金券" value="outerCash"></el-option>
                        <el-option label="外部商品券" value="outerGoods"></el-option>
                        <el-option label="在线买单" value="onlinePay"></el-option>                               
                     </el-select>
                </el-form-item>
                <el-form-item  label="用户手机号" prop="userPhone">
                    <el-input v-model="formModel.userPhone" placeholder="请输入用户手机号"> </el-input>
                </el-form-item>
                <el-form-item label="退款状态" prop="refundStatus">
                    <el-select v-model="formModel.refundStatus" >
                        <el-option label="全部" value="allStatus"></el-option>  
                        <el-option label="等待退款" value="waitRefund"></el-option>
                        <el-option label="已退款" value="refundFinished"></el-option>
                        <el-option label="退款失败" value="refundFailed"></el-option>
                        <el-option label="退款中" value="refunding"></el-option>
                        <el-option label="已取消" value="canceled"></el-option>
                        <el-option label="退款中券被核销" value="verifiedInRefund"></el-option>      
                    </el-select>
                </el-form-item>                                
                <el-form-item label="所属分行机构" prop="branch">
                    <el-cascader v-model="formModel.branch"  :options="branchOptions">
                    </el-cascader>
                </el-form-item>
                <el-form-item class="timeRange" label="支付时间" prop="payDate">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.submitDate" 
                        type="daterange" 
                        range-separator="至" 
                        start-placeholder="开始日期" 
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>                
                <el-form-item class="timeRange" label="发起退款时间" prop="submitDate">
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


        <el-table :data="tableData" border  style="width:100%">
            <el-table-column 
                fixed          
                prop="orderCode"
                label="订单编号"
                width="200"
            >
            </el-table-column>
            <el-table-column           
                prop="goodsName"
                label="商品名称"
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="oderStyle"
                label="订单类型"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="branch"
                label="所属分行机构"
                width="250"   
                >
            </el-table-column>
            <el-table-column
                prop="userPhone"
                label="用户手机号"
                width="120"
            >
            </el-table-column>            
            <el-table-column
                prop="payCard"
                label="支付卡号"
                width="120"
               >
             </el-table-column>
            <el-table-column
                prop="payedMoney"
                label="实付金额"
                width="90"
                >
            </el-table-column>
            <el-table-column
                prop="refundMoney"
                label="退款金额"
                width="90">
            </el-table-column>
            <el-table-column
                prop="refundStatus"
                label="退款状态"
                width="90">
             </el-table-column>
            <el-table-column
                prop="payTime"
                label="支付时间"
                width="150">
             </el-table-column>             
             <el-table-column
                prop="submitTime"
                label="发起退款时间"
                width="150">
             </el-table-column>
             <el-table-column
                fixed="right"
                width="120"   
                label="操作">
                <template slot-scope="scope">
                    
                    <el-button 
                    size="mini"
                    type="info"
                    @click="viewDetails(scope.$index, scope.row)">查看详情</el-button>
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
                orderCode:"",
                goodsName:"",
                refundType:"",
                orderType:"",
                userPhone:"",
                refundStatus:"",
                branch:"",
                payDate:"",
                submitDate:"",
            },
            formRule:{},
            tableData:[
                {   
                    orderCode:"1540869283721233472",
                    goodsName:"肯德基80抵100代金券",
                    oderStyle:"在线买单",
                    branch:"厦门分行-XX支行-零售产品营销中心",
                    userPhone:13800000000,
                    payCard:"622909118333803511",
                    payedMoney:80,
                    refundMoney:45,
                    refundStatus:"退款中",
                    payTime:"2018/08/28 10:05",
                    submitTime:"2018/09/28 10:00"
                },           
            ],
            beforeAuditStatus:["待初审","待终审"],
            afterAuditStatus:["审核通过","审核不通过"]
                    
        }
    },
    methods:{
        
        submitForm(){},
        handleEdit(scope,index, row){
            console.log(scope)
        },
        viewDetails(){
            this.$router.push("/afterSaleManage/refundRecord/RefundRecordDetail")
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




