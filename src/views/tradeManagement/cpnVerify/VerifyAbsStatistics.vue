<template>
<el-container class="auditPage">
    <el-main>
    <div>
            
            <el-form ref="form" size="medium" :inline="true" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item label="一级分行信息" prop="branch">
                    <el-select v-model="formModel.orderType" >
                        <el-option v-for="item in branchs" :key="item.id" :lable="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单类型" prop="orderType">
                    <el-select v-model="formModel.orderType" >
                    <el-option label="全部" value="allType"></el-option>  
                    <el-option label="购买券" value="buyCoupon"></el-option>
                    <el-option label="领取券" value="receiveCoupon"></el-option> 
                    <el-option label="买单" value="onlinePay"></el-option>                               
                    </el-select>
                </el-form-item>
               
                <el-form-item class="timeRange" label="月份" prop="dealDate">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.dealDate" 
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

        <el-table :data="tableData" border style="width:100%">

            <el-table-column 
                fixed          
                prop="branch"
                label="分行"
                width="100"
            >
            </el-table-column>
            <el-table-column           
                prop="orderType"
                label="类型"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="saleAmount"
                label="销售金额"
                width="90"
            >
            </el-table-column>
            <el-table-column
                prop="saleNum"
                label="销售数量"
                width="90"
            >
            </el-table-column>
            <el-table-column
                prop="buyUserNum"
                label="购买人数"
                width="90"
            >
            </el-table-column>
            <el-table-column
                prop="verifyAmount"
                label="核销金额"
                width="90"
            >
            </el-table-column>                        
            <el-table-column
                prop="verifyNum"
                label="核销数量"
                width="90"
               >
            </el-table-column>
            <el-table-column
                prop="verifyUserNum"
                label="核销人数"
                width="90"
            >
            </el-table-column>
            <el-table-column
                prop="refundAmount"
                label="退款金额"
                width="90"
            >
            </el-table-column>
            <el-table-column
                prop="refundNum"
                label="退款数量"
                width="90"
            >
            </el-table-column>
            <el-table-column
                prop="refundUserNum"
                label="退款人数"
                width="90"
            >
            </el-table-column>
            <el-table-column
                prop="month"
                label="月份"
                width="90">
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
            branch:'',
            branchs:[],

            formModel:{
                orderType:"",
                checkingResult:"",
                orderNumber:"",
                shopName:"",
                branch:"",
                dealDate:"",
            },
            formRule:{},
            tableData:[
                { 
                branch:"厦门分行",
                orderType:"全部",
                saleAmount:"11.00",
                saleNum:1,
                buyUserNum:1,
                verifyAmount:"80.00",
                verifyNum:20,
                refundAmount:"200.00",
                verifyUserNum:"200",
                refundNum:200,
                refundUserNum:200,
                month:"2019-10"
                }
            
            ],

                    
        }
    },
    mounted(){
        this.getBranchs()
    },
    methods:{
        getBranchs() {

        },
        submitForm(){},
        handleEdit(scope,index, row){
            console.log(scope)
        },
        viewDetails(){
            this.$router.push("/acountStatement/acountChecking/AcountCheckingDetail")
        },
        handleSizeChange(){},
        handleCurrentChange(){},
        download(){}
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




