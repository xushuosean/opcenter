<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>自定义聚合审核</h3>
            <el-form ref="form" :inline="true" size="medium" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item  label="聚合名称" prop="aggregationName">
                    <el-input v-model="formModel.aggregationName" placeholder="请输入聚合名称"> </el-input>
                </el-form-item>
                
                <el-form-item label="聚合编号" prop="aggregationCode">
                    <el-input v-model="formModel.aggregationCode" placeholder="请输入聚合编号"> </el-input>
                </el-form-item>
                <el-form-item label="聚合对象" prop="aggregationObj">
                    <el-select v-model="formModel.aggregationObj" >
                        <el-option label="全部" value="all"></el-option>  
                        <el-option label="票券红包" value="ticketRedPacket"></el-option>
                        <el-option label="门店" value="shop"></el-option>      
                     </el-select>
                </el-form-item>
                
                <el-form-item class="timeRange" label="创建时间" prop="creatDate">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.submitDate" 
                        type="daterange" 
                        range-separator="至" 
                        start-placeholder="开始日期" 
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="timeRange" label="有效期限" prop="avalibleDate">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.submitDate" 
                        type="daterange" 
                        range-separator="至" 
                        start-placeholder="开始日期" 
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
               
                    <el-form-item class="searchButton " label=' ' >
                        <el-button  type="primary" @click="submitForm">查询</el-button>
                        <el-button  type="primary" @click="download">导出表格</el-button>
                    </el-form-item>                     
                
                                                                                 
            </el-form>
        </div>


        <el-table :data="tableData" size="small" border style="width:100%">
            <el-table-column
            
                prop="aggregationName"
                label="聚合名称"
            >
            </el-table-column>
            <el-table-column
                prop="aggregationCode"
                label="聚合编号"
            >
            </el-table-column>
            <el-table-column
                prop="aggregationObj"
                label="聚合对象"
                width="220"
               
                >
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
                prop="createTime"
                label="创建时间">
             </el-table-column>
           
             <el-table-column
                prop="avalibleTime"
                label="有效期限">
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
            shopTypeOptions:[{label:"选项1",value:"1",children:[{label:"子选项1-1",value:"1-1"},{label:"子选项1-2",value:"1-2"}]}],
            formModel:{
                aggregationName:"",
               aggregationCodeCode:"",
                // auditState:"",
                aggregationObj:"",
                // firstAuditPersonId:"",
                // finalAuditPersonId:"",
                creatDate:"",
                avalibleDate:''

            },
            formRule:{},
            tableData:[
                {   
                    aggregationName:'火锅热门店',
                    aggregationCode:'412341234321',
                    aggregationObj:"门店",
                    firstAuditPersonId:"无",
                    finalAuditPersonId:"无",
                    auditState:"待初审",
                    createTime:"2018/09/28 10:00",
                    avalibleTime:"2018/09/28 10:00"
                },
                {   
                    aggregationName:'火锅热门店',
                    aggregationCode:'412341234321',
                    aggregationObj:"门店",
                    firstAuditPersonId:"无",
                    finalAuditPersonId:"无",
                    auditState:"审核通过",
                    createTime:"2018/09/28 10:00",
                    avalibleTime:"2018/09/28 10:00"
                },
                       
            ],
            beforeAuditStatus:["待初审","待终审"],
            afterAuditStatus:["审核通过","审核不通过"]
                    
        }
    },
    methods:{
        
        submitForm(){
            
        },
        handleAudit(scope,index, row){
            this.$router.push( '/audit/customAggregationAudit/CustomAggregationAuditF')
        },
        viewDetails(){this.$router.push( '/audit/customAggregationAudit/CustomAggregationAuditDetail')},
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




