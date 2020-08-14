<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>清分报表</h3>
            
            <el-form ref="form" size="medium" :inline="true" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item label="清分状态" prop="clearStatus">
                    <el-select v-model="formModel.clearStatus" >
                    <el-option label="全部类型" value="all"></el-option>  
                    <el-option label="清分中" value="clearing"></el-option>
                    <el-option label="清分完成" value="finished"></el-option>
                    <el-option label="清分失败" value="failed"></el-option>                                
                    </el-select>
                </el-form-item>
               
                <el-form-item  label="门店名称" prop="shopName">
                    <el-input v-model="formModel.shopName" placeholder="请输入订单的门店名称"> </el-input>
                </el-form-item> 
                <el-form-item  label="门店编号" prop="shopCode">
                    <el-input v-model="formModel.shopCode" placeholder="请输入订单的门店编号"> </el-input>
                </el-form-item>               
                <el-form-item  label="收款账号" prop="payeeAcount">
                    <el-input v-model="formModel.payeeAcount" placeholder="请输入收款账号"> </el-input>
                </el-form-item>  
                <el-form-item class="timeRange" label="清分日期" prop="clearDate">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.clearDate" 
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
                <span>清分成功比数：7</span>
                <span>清分成功总金额（元）：7</span>  
                <span>清分失败比数：7</span>
                <span>清分失败总金额（元）：7</span>           
        </div>

        <el-table :data="tableData" border style="width:100%">
            <el-table-column           
                prop="shopName"
                label="门店名称"
                
            >
            </el-table-column>
            <el-table-column
                prop="shopCode"
                label="门店编号"
               
            >
            </el-table-column>
            <el-table-column
                prop="clearStatus"
                label="清分状态"
              
            >
            </el-table-column>
            <el-table-column
                prop="clearMoney"
                label="清分金额（元）"
                
            >
            </el-table-column>
            <el-table-column
                prop="payeeAcount"
                label="收款账号"
               
            >
            </el-table-column>          
            <el-table-column
                prop="clearTime"
                label="清分时间"
               >
            </el-table-column>                                          
            <!-- <el-table-column
                fixed="right"
                width="120"   
                label="操作">
                <template slot-scope="scope">
                    <el-button 
                    size="mini"
                    type="info"
                    @click="viewDetails(scope.$index, scope.row)">查看详情</el-button>
                </template>
             </el-table-column>                                         -->
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
                clearStatus:"",
                shopName:"",
                shopCode:"",
                payeeAcount:"",
                clearDate:""
            },
            formRule:{},
            tableData:[
                {
                shopName:"全家襄阳南路一店",
                shopCode:"123432524534",
                clearStatus:"清分中",
                clearMoney:"80.00",
                payeeAcount:"6547456375437648",
                clearTime:"2018/09/28 10:00"
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




