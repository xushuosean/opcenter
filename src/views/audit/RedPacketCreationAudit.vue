<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>红包新增审核</h3>
            <el-form ref="formModel" :inline="true" size="medium" :model="formModel"  :rules="formRule" label-width="114px">
                <el-form-item  label="红包名称" prop="rpkName">
                    <el-input v-model="formModel.rpkName" placeholder="请输红包名称"> </el-input>
                </el-form-item>
                <el-form-item  label="红包批次号" prop="rpkId">
                    <el-input v-model="formModel.rpkId" placeholder="红包批次号"> </el-input>
                </el-form-item>
                <el-form-item label="适用门店名称" prop="shopName">
                    <el-input v-model="formModel.shopName" placeholder="请输入适用门店名称"> </el-input>
                </el-form-item>
                <el-form-item label="红包类型" prop="rpkType">
                    <el-select v-model="formModel.rpkType">
                        <el-option label="全部" value="" />
                        <el-option label="满减红包" value="FULLREDUCE" />
                        <el-option label="折扣红包" value="DISCOUNT" />
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态" prop="currentcurrentAuditState">
                    <el-select v-model="formModel.currentcurrentAuditState" >
                        <el-option label="全部" value="" />
                        <el-option label="创建待初审" value="FIRSTAUDIT" />
                        <el-option label="创建待终审" value="FINALAUDIT" />
                        <el-option label="创建审核通过" value="PASS" />
                        <el-option label="创建审核不通过" value="NOTPASS" />
                     </el-select>
                </el-form-item>
               <el-form-item label="初审人编号" prop="firstAuditPersonId">
                    <el-input v-model="formModel.firstAuditPersonId" placeholder="请输入初审人编号"> </el-input>
                </el-form-item>
                <el-form-item label="终审人编号" prop="finalAuditPersonId">
                    <el-input v-model="formModel.finalAuditPersonId" placeholder="请输入终审人编号"> </el-input>
                </el-form-item>
                <el-form-item class="timeRange" label="提交审核时间" prop="createTime">
                    <el-date-picker                         
                        unlink-panels
                        v-model="formModel.createTime" 
                        type="daterange" 
                        range-separator="至" 
                        start-placeholder="开始日期" 
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>            
                    <el-form-item class="searchButton"  label=' '>
                        <el-button  type="primary" @click="submitForm">查询</el-button>
                        <el-button  type="primary" @click="download">导出表格</el-button>
                    </el-form-item>                                                                                                     
            </el-form>
        </div>

        <el-table :data="tableData" size="small" border style="width:100%">
            <el-table-column
                prop="rpkName"
                label="红包名称"
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="rpkId"
                label="红包批次号"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="shopName"
                label="适用门店名称"
                width="220"
                >
            </el-table-column>

            <el-table-column
                prop="rpkType"
                label="红包类型"
                >
            </el-table-column>            
            <el-table-column
                prop="firstAuditPersonId"
                label="初审人"
                width="90"
               >
             </el-table-column>
            <el-table-column
                prop="finalAuditPersonId"
                label="终审人"
                width="90"
                >
             </el-table-column>
             <el-table-column
                prop="currentAuditState"
                label="审核状态"
                width="100">
             </el-table-column>
             <el-table-column
                prop="createTime"
                label="提交审核时间"
                width="140">
             </el-table-column>
             <el-table-column
                width="90"   
                label="操作">
                <template slot-scope="scope">
                    <el-button v-if="beforeAuditStatus.includes(scope.row.currentAuditState)"
                    size="mini"
                    @click="handleAudit(scope,scope.$index, scope.row)">审核</el-button>
                    <el-button v-if="afterAuditStatus.includes(scope.row.currentAuditState)"
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
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@store/mutation-types'
import rpkManage from '@api/rpkManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
export default {
    data(){
        return{
            
            formModel:{
                rpkName:"",
                rpkId:"",
                shopName:"",
                rpkType:"",
                currentAuditState:"",
                firstAuditPersonId:"",
                finalAuditPersonId:"",
                createTime:"",
            },
            formRule:{},
            tableData:[
                {   
                    rpkName:"",
                    rpkId:"",
                    shopName:"",
                    rpkType:"",
                    firstAuditPersonId:"",
                    finalAuditPersonId:"",
                    currentAuditState:"",
                    submitTime:""
                }       
            ],
            beforeAuditStatus:["待初审","待终审"],
            afterAuditStatus:["审核通过","审核不通过"]
                    
        }
    },
    methods: {
        submitForm() {
        this.$refs.formModel.validate(vali => {
            if (vali) {
            this.pageNum = 1
            this.pageSize = 10
            //   this.formChanged = false
            this.getTableData()
            }
        })
        },
        async getTableData() {
            console.log("getTableData")
            // const flag = await this.$refs.form.validate()

            // if (!flag) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }
            try { await this.$refs.formModel.validate() } catch (err) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }

            var formData = {
                rpkName:this.formModel.rpkName,
                rpkType:this.formModel.rpkType,
                rpkId:this.formModel.rpkId,
                rpkStatus:this.formModel.rpkStatus,
                shopName:this.formModel.shopName,
                currentcurrentAuditState:this.formModel.currentcurrentAuditState,
                achieveType:this.formModel.achieveType,
                createStartTime:this.formModel.createTime[0],
                createEndTime:this.formModel.createTime[1],
                firstAuditPersonId:this.formModel.firstAuditPersonId,
                finalAuditPersonId:this.formModel.finalAuditPersonId
            }
            console.log("data")
            console.log(formData)
            // 将值为空的属性值剔除掉
            var _formData = formData
            for (let k in _formData) {
                if (_formData[k] == '') {
                delete _formData[k]
                }
            }
            var data = objectTool.addValidPropertyToTarget(
                {
                body: {
                    ..._formData,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }
                }
            )
            try {
                var res = await rpkManage.getRpkAuditList(data)
                console.log(res.header.returnCode)
                if (res.header.returnCode === AjaxReturnType.SUCCESS) {
                this.tableData = []
                var _tableData = []
                _tableData = res.body.rpkList
                if (_tableData == null) {
                    return
                }
                _tableData.forEach(e => {
                    //票券类型
                    if (e.rpkType == 'FULLREDUCE') {
                    e.rpkType = '满减红包'
                    } else if (e.rpkType == 'DISCOUNT') {
                    e.rpkType = '折扣红包'
                    }

                    //获取规则
                    if (e.achieveType == 'GET') {
                    e.achieveType = '领取'
                    } else if (e.achieveType == 'GRANT') {
                    e.achieveType = '发放'
                    }
                    

                    //审核状态
                    if (e.currentcurrentAuditState == 'FIRSTAUDIT') {
                    e.currentcurrentAuditState = '创建待初审'
                    } else if (e.currentcurrentAuditState == 'FINALAUDIT') {
                    e.currentcurrentAuditState = '创建待终审'
                    } else if (e.currentcurrentAuditState == 'EDIT') {
                    e.currentcurrentAuditState = '编辑'
                    } else if (e.currentcurrentAuditState == 'PASS') {
                    e.currentcurrentAuditState = '创建审核通过'
                    } else if (e.currentcurrentAuditState == 'NOTPASS') {
                    e.currentcurrentAuditState = '创建审核不通过'
                    } else if (e.currentcurrentAuditState == 'U_FIRSTAUDIT') {
                    e.currentcurrentAuditState = '变更待初审'
                    } else if (e.currentcurrentAuditState == 'U_FINALAUDIT') {
                    e.currentcurrentAuditState = '变更待终审'
                    } else if (e.currentcurrentAuditState == 'U_PASS') {
                    e.currentcurrentAuditState = '变更审核通过'
                    } else if (e.currentcurrentAuditState == 'U_NOTPASS') {
                    e.currentcurrentAuditState = '变更审核不通过'
                    }
                    this.tableData.push(e)

                })
                // sourceTableData.forEach(item => {
                //   item.rpkName = rpkName
                //   item.currentAuditStateShow = this.$AUDIT_STATUS_OBJ[item.currentAuditState]
                //   item.displayStatusShow = discountPayEnum.displayStatus[item.displayStatus]
                //   if (item.totalStock === -1) { item.totalStock = '无限制' }
                // })

                // this.tableData = sourceTableData
                this.rowTotal = res.body.rowTotal
                } else {
                this.$notify.error({
                    title: '错误',
                    message: '查询优惠买单审核信息失败'
                })
                console.error(res)
                }
            } catch (err) {
                console.error(err)
                this.$notify.error({
                titile: '错误', message: '查询优惠买单审核信息时发生错误'
                })
            }
        },
        handleAudit(scope,index, row){
            this.$router.push('/audit/redPacketCreationAudit/RedPacketCreationAuditF')
        },
        viewDetails(){
            this.$router.push('/audit/redPacketCreationAudit/RedPacketCreationAuditDetail')
        },
        handleSizeChange(){},
        handleCurrentChange(){},
        download(){
            var formData = {
                rpkName:this.formModel.rpkName,
                rpkType:this.formModel.rpkType,
                rpkId:this.formModel.rpkId,
                rpkStatus:this.formModel.rpkStatus,
                shopName:this.formModel.shopName,
                currentcurrentAuditState:this.formModel.currentcurrentAuditState,
                achieveType:this.formModel.achieveType,
                createStartTime:this.formModel.createTime[0],
                createEndTime:this.formModel.createTime[1],
                firstAuditPersonId:this.formModel.firstAuditPersonId,
                finalAuditPersonId:this.formModel.finalAuditPersonId
            }
            var data = objectTool.addValidPropertyToTarget(
                {
                ...formData
                }
            )
            let paramsList = []
            for (let i in data) {
                paramsList.push(`${i}=${data[i]}`)
            }
            let params = paramsList.join('&')
            let { origin, pathname } = window.location
            window.location.href = origin + '/' + pathname.split('/')[1] + '/rpkAudit/export.json' + '?' + params
        },
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




