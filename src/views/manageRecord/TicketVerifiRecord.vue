<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>票券核销记录</h3>
            <el-form ref="form"  :inline="true" size="medium" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item  label="核销流水号" prop="verifiSerial">
                    <el-input v-model="formModel.verifiSerial" placeholder="请输入核销券的流水号"> </el-input>
                </el-form-item>
                <el-form-item  label="票券名称" prop="ticketName">
                    <el-input v-model="formModel.ticketName" placeholder="请输入核销券的券码"> </el-input>
                </el-form-item>
                <el-form-item  label="核销券码" prop="ticketCode">
                    <el-input v-model="formModel.ticketCode" placeholder="请输入核销券的名称"> </el-input>
                </el-form-item>                
                <el-form-item  label="订单编号" prop="orderNumber">
                    <el-input v-model="formModel.orderNumber" placeholder="请输入核销券的订单编号"> </el-input>
                </el-form-item>
                <el-form-item  label="门店名称" prop="shopName">
                    <el-input v-model="formModel.shopName" placeholder="请输入核销券门店的名称"> </el-input>
                </el-form-item>                
                <el-form-item label="门店操作员ID" prop="shopOperaterID">
                    <el-input v-model="formModel.shopOperaterID" placeholder="请输入门店核销操作员的ID"></el-input>
                </el-form-item>
                <el-form-item label="核销方式" prop="verifiWay">
                    <el-select v-model="formModel.verifiWay" >
                        <el-option label="券码核销" value="ticketVerifi"></el-option>
                        <el-option label="用券买单" value="ticketPay"></el-option>      
                     </el-select>
                </el-form-item>
                <el-form-item label="票券类型" prop="ticketType">
                    <el-select v-model="formModel.verifiWay" >
                        <el-option label="全部类型" value="allType"></el-option>
                        <el-option label="内部代金" value="innerCash"></el-option>
                        <el-option label="内部商品" value="innerGoods"></el-option>
                        <el-option label="外部代金" value="outerCash"></el-option>
                        <el-option label="外部商品" value="outerGoods"></el-option>       
                     </el-select>
                </el-form-item>

                 <el-form-item class="timeRange" label="核销时间" prop="verifiDate">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.verifiDate" 
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
          
                <span>已结算比数：7</span>
                <span>已结算比数：7</span>  
                <span>待结算比数比数：7</span>
        </div>

        <el-table :data="tableData" border  style="width:100%">
            <el-table-column
                label="核销流水号"
                prop="verifiSerial"
                width="120"                
            >
            </el-table-column>             
            <el-table-column
                label="票券名称"
                prop="ticketName"
                width="120"                
            >
            </el-table-column>  
            <el-table-column
                
                label="核销券码"
                prop="ticketCode"
                width="180"                
            >
            </el-table-column> 
            <el-table-column
                label="票券名称"
                prop="ticketName"
                width="120"                
            >                            
            </el-table-column>
            <el-table-column          
                prop="ticketType"
                label="票券类型"
                width="100"
            >
            </el-table-column>            
            <el-table-column          
                prop="orderNumber"
                label="订单编号"
                width="200"
            >
            </el-table-column>
             
            <el-table-column           
                prop="shopName"
                label="核销门店名称"
                width="150"
            >
            </el-table-column>
            <el-table-column           
                prop="verifiWay"
                label="核销方式"
                width="100"
            >
            </el-table-column>
            <el-table-column           
                prop="settlementStatus"
                label="结算状态"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="shopOperaterID"
                label="门店操作员ID"
                width="120"
            >
            </el-table-column>

            <el-table-column
                prop="verifiTime"
                label="核销时间"
                width="150"   
                >
            </el-table-column>

             <el-table-column
                fixed="right"
                width="90"   
                label="操作">
                <template slot-scope="scope">          
                    <el-button 
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
                verifiSerial:"",
                ticketName:"",
                ticketCode:"",
                orderNumber:"",
                shopName:"",
                shopOperaterID:"",
                verifiWay:"",
                ticketType:"",
                verifiDate:"",
            },
            formRule:{},
            tableData:[
                { 
                verifiSerial:"1324234135 ",
                ticketName:"肯德基80抵100代金券",
                ticketCode:"8225758951" , 
                orderNumber:"1540869283721233472",
                ticketName:"80元代金券",
                ticketType:"内部代金券",
                orderNumber:"1540869283721233472",
                shopName:"肯德基（南京西路）",
                verifiWay:"券码核销",
                settlementStatus:"已结算",
                shopOperaterID:"13800000000",
                verifiTime:"2018/04/28 10:00",
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
            this.$router.push("/manageRecord/ticketVerifiRecord/VerifiDetail")
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




