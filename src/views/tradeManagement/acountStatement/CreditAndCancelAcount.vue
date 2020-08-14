<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>挂销账报表</h3>
            
            <el-form ref="form" size="medium" :inline="true" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item label="订单类型" prop="orderType">
                    <el-select v-model="formModel.orderType" >
                    <el-option label="全部类型" value="allType"></el-option>  
                    <el-option label="已核销票券" value="verifiedTicket"></el-option>
                    <el-option label="在线买单" value="onlinePay"></el-option>                               
                    </el-select>
                </el-form-item>
                <el-form-item label="挂账状态" prop="acountStatus">
                    <el-select v-model="formModel.checkingResult" >
                    <el-option label="全部类型" value="allType"></el-option>  
                    <el-option label="挂账" value="credit"></el-option>
                    <el-option label="已销账" value="canceled"></el-option>                               
                    </el-select>
                </el-form-item>
                <el-form-item  label="订单编号" prop="orderNumber">
                    <el-input v-model="formModel.orderNumber" placeholder="请输入订单的编号"> </el-input>
                </el-form-item>
               
                <el-form-item  label="门店名称" prop="shopName">
                    <el-input v-model="formModel.shopName" placeholder="请输入订单的门店名称"> </el-input>
                </el-form-item>                
                <el-form-item label="所属分行机构" prop="branch">
                    <el-cascader v-model="formModel.branch"  :options="branchOptions">
                    </el-cascader>
                </el-form-item>

                <el-form-item class="timeRange" label="账单日期" prop="billDate">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.billDate" 
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
        <div   class="aboveTable">
          
                <span>挂账比数：7</span>
                <span>已销账比数：7</span>  
        </div>

        <el-table :data="tableData" border style="width:100%">

            <el-table-column 
                fixed          
                prop="orderNumber"
                label="订单编号"
                width="200"
            >
            </el-table-column>
            <el-table-column           
                prop="shopName"
                label="门店名称"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="orderType"
                label="订单类型"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="acountStatus"
                label="挂账状态"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="acountMoney"
                label="挂销账金额（元）"
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
                prop="dealTime"
                label="交易时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="billTime"
                label="账单时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="creditAcountTime"
                label="挂账时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="cancelAcountTime"
                label="销账时间"
                width="150">
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
            branchOptions:[{label:"选项1",value:"1",children:[{label:"子选项1-1",value:"1-1"},{label:"子选项1-2",value:"1-2",children:[{label:"子选项1-2-1",value:"1-2-1"},{label:"子选项1-2-2",value:"1-2-2"}]}]}],
            formModel:{
                orderType:"",
                acountStatus:"",
                orderNumber:"",
                shopName:"",
                branch:"",
                billDate:"",
            },
            formRule:{},
            tableData:[
                { 
                orderNumber:"1540869283721233472 ",
                shopName:"全家襄阳南路一店",
                orderType:"已核销票券",
                acountStatus:"挂账",
                acountMoney:"80.00",
                branch:"厦门分行-XX支行-零售产品营销中心",
                dealTime:"2018/09/28 10:00",
                billTime:"2018/09/28 10:00",
                creditAcountTime:"2018/09/28 10:00",
                cancelAcountTime:"2018/09/28 10:00"
                },
            
            ],

                    
        }
    },
    methods:{
        
        submitForm(){},
        handleEdit(scope,index, row){
            console.log(scope)
        },
        viewDetails(){},
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
.aboveTable{
    display: flex;
    justify-content:flex-start;
    span{
        height:100%;
        line-height: 35px;
        margin-right:30px;
        color:#606226    }
}
h3{
    margin-bottom: 15px;
}
.el-breadcrumb{
    line-height: 30px;
}


</style>




