import { Input } from "element-ui";

<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>分摊报表</h3>
            
            <el-form ref="form" size="medium" :inline="true" :model="formModel"  :rules="formRule" label-width="114px">
            <el-form-item label="订单编号" prop="orderNumber">
                <el-input v-model="formModel.orderNumber" placeholder="请输入订单编号"></el-input>

                </el-form-item>
                <el-form-item  label="买单优惠名称" prop="dispayName">
                    <el-input v-model="formModel.dispayName" placeholder="请输入买单优惠名称"> </el-input>
                </el-form-item>
                <el-form-item  label="买单优惠编号" prop="dispayId">
                    <el-input v-model="formModel.dispayId" placeholder="请输入买单优惠编号"> </el-input>
                </el-form-item>
                <el-form-item  label="门店编号" prop="shopId">
                    <el-input v-model="formModel.shopId" placeholder="请输入门店编号"> </el-input>
                </el-form-item>
                <el-form-item  label="门店名称" prop="shopName">
                    <el-input v-model="formModel.shopName" placeholder="请输入门店名称"> </el-input>
                </el-form-item>             
                <el-form-item label="所属分行机构" prop="branch">
                    <el-cascader v-model="formModel.branch"  :options="branchOptions">
                    </el-cascader>
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
                prop="orderNumber"
                label="订单编号"
                width="200"
            >
            </el-table-column>
            <el-table-column           
                prop="dispayName"
                label="买单优惠名称"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="dispayId"
                label="买单优惠编号"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="shopId"
                label="门店编号"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="shopName"
                label="门店名称"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="branch"
                label="所属分行"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="mchtSubsidyAmt"
                label="商户分摊"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="bankSubsidyAmt"
                label="总行分摊"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="branchSubsidyAmt"
                label="分行分摊"
                width="100"
            >
            </el-table-column>
          
            <el-table-column
                prop="payTime"
                label="支付时间"
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
            totalNumber:0,
            branchOptions:[{label:"选项1",value:"1",children:[{label:"子选项1-1",value:"1-1"},{label:"子选项1-2",value:"1-2",children:[{label:"子选项1-2-1",value:"1-2-1"},{label:"子选项1-2-2",value:"1-2-2"}]}]}],
            formModel:{
                orderNumber:"",
                dispayName:"",
                dispayId:"",
                shopId:"",
                shopName:"",
                branch:"",
               
            },
            formRule:{},
            tableData:[
                { 
                orderNumber:"1540869283721233472 ",
                dispayName:"全家襄阳南路一店",
                dispayId:"已核销票券",
                shopId:"对平",
                branch:"厦门分行-XX支行-零售产品营销中心",
                mchtSubsidyAmt:"20.00",
                bankSubsidyAmt:"80.00",
                branchSubsidyAmt:"20.00",
                payTime:"2018/09/28 10:00",
                },
            
            ],

                    
        }
    },
    methods:{
        
        submitForm(){},
        handleEdit(scope,index, row){
            console.log(scope)
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




