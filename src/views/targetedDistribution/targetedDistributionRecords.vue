<template>
    <el-container class="container-box">
        <el-main>
               <el-card class="el-card-mt20" shadow="hover">
                    <div class="page-title">
                        <h3>自定向发放记录</h3>
                        <p>- 汇总信息</p>
                    </div>
                    <el-form class="component-form" ref="componentForm" :model="componentForm" label-width="124px">
                        <el-row class="el-row-mt20">
                            <el-col :span="8">
                                <el-form-item label="展示维度">
                                    <el-select :clearable="true" size="medium" v-model="componentForm.entryType" placeholder="请选择进件类别">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="正常" value="normal"></el-option>
                                        <el-option label="过期" value="outofdate"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="发放日期">
                                    <el-date-picker
                                        v-model="componentForm.createTime"
                                        type="daterange"
                                        size="medium"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-button type="primary">查询</el-button>
                                <el-button type="primary">导出表格</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
                <el-card class="el-card-mt20" shadow="hover">
                    <el-table
                        :data="componentTableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="entryType"
                            label="发放日期"
                            fixed
                        >
                        </el-table-column>
                        <el-table-column
                            prop="entryState"
                            label="票券手动发放数量"
                            fixed
                        >
                        </el-table-column>
                        <el-table-column
                            prop="entryAuditState"
                            label="票券批量发放数量"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="belongBusinessName"
                            label="红包手动发放数量">
                        </el-table-column>
                        <el-table-column
                            prop="belongBusinessNumber"
                            label="发出总数">
                        </el-table-column>
                        <el-table-column
                            prop="belongBusinessNumber"
                            label="成功发放数量">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="操作"
                        >
                              <template slot-scope="scope">
                                  <el-button
                                    size="mini"
                                >查看当天记录</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        :page-size="100"
                        layout="sizes, prev, pager, next, total,jumper"
                        :page-sizes="[10, 20, 30]"
                        :total="1000">
                    </el-pagination>
                </el-card>
        </el-main>
    </el-container>
</template>
<script>
let id = 0;
export default {
    data(){
        return {
            routeMeta:{},
            componentForm:{
                entryType:'', //进件类别
                entryState:'', // 进件状态
                entryAuditState:'', //审核状态
                businessType:'', //经营类别
                belongBusinessName:'', //所属商户名称
                belongBusinessNumber:'', //所属商户编号
                storeName: '', //门店姓名
                storeNumber:'', //门店编号
                entryTime:'', //进件时间
                belongArea:'', //所属地区
                branchOffice:'', //所属分行机构
                sellerNumber:'', //业务员编号 
            },
            componentTableData:[
                {
                    entryType: '商户快速进件',
                    entryState:'未提交',
                    entryAuditState:'待初审',
                    storeName: '星巴克(百联世纪)',
                    storeNumber:'123456',
                    belongBusinessName:'金拱门(中国)有限公司',
                    belongBusinessNumber:'123456789',
                    belongArea:'福建省福州市xx区',
                    businessType:'餐饮类',
                    branchOffice:'上海分行-徐汇区-xx网点',
                    sellerNumber:'012345',
                    entryTime:'2018/09/28',
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.container-box{
    .page-title{
        display:flex;
        align-items:center;
        h3{
            margin-right:5px;
            line-height:40px;
        }
    }
    .el-pagination{
        text-align:center;
        margin-top:20px;
    }
}
</style>
