<template>
<el-container class="auditPage">
    <el-main>
    <div>
            
            <el-form ref="form" size="medium" :inline="true" :model="formModel"  :rules="formRule" label-width="114px">
                   <el-row :gutter="10" class="el-row-mt20">
                        <el-col :span="8">
                        <el-form-item label="店铺编号">
                            <el-input v-model="formModel.shopId" :clearable="true" size="medium" placeholder="请输入店铺编号" />
                        </el-form-item>
                        </el-col>
                    <el-col :span="8">
                        <el-form-item label="店铺名称">
                            <el-input v-model="formModel.shopName" :clearable="true" size="medium" placeholder="请输入店铺名称" />
                        </el-form-item>
                        </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户经理id">
                            <el-input v-model="formModel.customerMgmtId" :clearable="true" size="medium" placeholder="请输入客户经理编号" />
                        </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="8">
                        <el-form-item label="所属分行机构" class="el-form-item-flex">
                            <multilevelSelection type="areaCode" :multilevel-selection-value="formModel.metchantOrg" :multilevel-selection-options="siteData" @on-select="handleOrgCodeSelect" />
                        </el-form-item>
                        </el-col>
                      </el-row>   
                <el-form-item class="searchButton" label=' '>
                        <el-button  type="primary" @click="submitForm">查询</el-button>
                        <el-button  type="primary" @click="download">导出表格</el-button>
                </el-form-item>                                                                                                      
            </el-form>
        </div>

        <el-table :data="tableData" border style="width:100%">

            <el-table-column 
                fixed          
                prop="shopId"
                label="店铺编号"
                width="200"
            >
            </el-table-column>
            <el-table-column           
                prop="shopName"
                label="店铺名称"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="payNum"
                label="买单数量"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="customerMgmtId"
                label="客户经理Id"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="ownerBranch"
                label="所属分行"
                width="300"
            >
            </el-table-column>
            <el-table-column>
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
                shopId:"",
                customerMgmtId:"",
                shopName:"",
                metchantOrg:""
            },
            formRule:{},
            tableData:[
                { 
                shopId:"0000001",
                shopName:"test",
                payNum:11.00,
                customerMgmtId:1,
                ownerBranch:"总行/上海"
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




