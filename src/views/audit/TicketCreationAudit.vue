<template>
<el-container class="auditPage">
    <el-main>
    <div>
            <h3>票卷新增审核</h3>
            <el-form ref="form" :inline="true" size="medium" :model="form"  :rules="formRule" label-width="114px">
                <el-form-item  label="票卷名称" prop="couponName">
                    <el-input v-model="form.couponName" placeholder="请输入票卷名称"> </el-input>
                </el-form-item>
                <el-form-item  label="票券批次号" prop="couponId">
                    <el-input v-model="form.couponId" placeholder="请输入票券批次号"> </el-input>
                </el-form-item>
                <el-form-item label="适用门店名称" prop="shopName">
                    <el-input v-model="form.shopName" placeholder="请输入适用门店名称"> </el-input>
                </el-form-item>
                <el-form-item label="审核状态" prop="currentAuditState">
                    <el-select v-model="form.currentAuditState" >
                        <el-option label="全部" value="" />>
                        <el-option label="变更待初审" value="U_FIRSTAUDIT" />
                        <el-option label="变更待终审" value="U_FINALAUDIT" />
                        <el-option label="变更审核通过" value="U_PASS" />
                        <el-option label="变更审核不通过" value="U_NOTPASS" /> 
                     </el-select>
                </el-form-item>
                <el-form-item label="生成方" prop="producerType">
                    <el-select v-model="form.producerType">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="内部券" value="INNER" ></el-option>
                        <el-option label="外部券" value="OUTTER" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="票卷类型" prop="couponType">
                    <el-select v-model="form.couponType">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="商品券" value="PRODUCT" ></el-option>
                        <el-option label="代金券" value="CASH" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="初审人编号" prop="firstAuditPersonId">
                    <el-input v-model="form.firstAuditPersonId" placeholder="请输入初审人编号"> </el-input>
                </el-form-item>
                <el-form-item label="终审人编号" prop="finalAuditPersonId">
                    <el-input v-model="form.finalAuditPersonId" placeholder="请输入终审人编号"> </el-input>
                </el-form-item>
                <el-form-item class="timeRange" label="提交审核时间" prop="createTime">
                    <el-date-picker                         
                        unlink-panels
                        v-model="form.submitDate" 
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
                prop="couponName"
                label="票卷名称"
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="couponId"
                label="票卷批次号"
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
                prop="producerType"
                label="生成方"
                >
            </el-table-column>
            <el-table-column
                prop="couponType"
                label="票卷类型"
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
                prop="submitTime"
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
import ticketsManage from '@api/ticketsManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
export default {
    data(){
        return{
            shopTypeOptions:[{label:"选项1",value:"1",children:[{label:"子选项1-1",value:"1-1"},{label:"子选项1-2",value:"1-2"}]}],
            form:{
                couponName:"",
                couponId:"",
                shopName:"",
                currentAuditState:"",
                producerType:"",
                couponType:"",
                firstAuditPersonId:"",
                finalAuditPersonId:"",
                submitDate:"",
            },
            formRule:{},
            tableData:[ 
            ],
            beforeAuditStatus:["待初审","待终审"],
            afterAuditStatus:["审核通过","审核不通过"],
            // 页码
            pageNum: 0,
            pageSize: 10,
            rowTotal: 0
                    
        }
    },
    methods:{
        
        submitForm() {
        this.$refs.form.validate(vali => {
            if (vali) {
            this.pageNum = 0
            this.pageSize = 10
            //   this.formChanged = false
            this.getTableData()
            }
        })
        },
        handleAudit(scope,index, row){
            this.$router.push('/audit/ticketCreationAudit/TicketCreationAuditF')
        },
        viewDetails(){
            this.$router.push('/audit/ticketCreationAudit/TicketCreationAuditDetail')
        },
        handleSizeChange(){},
        handleCurrentChange(){},
        download(){},
        async getTableData() {
        // const flag = await this.$refs.form.validate()

        // if (!flag) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }
        try { await this.$refs.form.validate() } catch (err) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }

        var formData = {
            couponName: this.form.couponName,
            couponType: this.form.couponType,
            couponId:this.form.couponId,
            couponStatus:this.form.couponStatus,
            achieveType:this.form.achieveType,
            shopName:this.form.shopName,
            facePrice:this.form.facePrice,
            firstAuditPersonId:this.form.firstAuditPersonId,
            finalAuditPersonId:this.form.finalAuditPersonId,
            maxEffectStartTime:this.form.maxEffectStartTime,
            maxEffectEndTime:this.form.maxEffectEndTime,
            shopId:this.shopId,
            currentAuditState:this.form.currentAuditState,
            createTime:this.form.currentAuditState,
            createStartTime:this.form.submitDate[0],
            createEndTime:this.form.submitDate[1],
            producerType:this.form.producerType
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
            var res = await ticketsManage.getTicketAddAudit(data)
            console.log(res.header.returnCode)
            if (res.header.returnCode === AjaxReturnType.SUCCESS) {
            this.tableData = []
            var _tableData = []
            _tableData = res.body.couponList
            _tableData.forEach(e => {
                //票券类型
                if (e.couponType == 'CASH') {
                e.couponType = '代金券'
                } else if (e.couponType == 'PRODUCT') {
                e.couponType = '商品券'
                }

                //票券状态
                if (e.couponStatus == 'INVALID') {
                e.couponStatus = '未生效'
                } else if (e.couponStatus == 'ON') {
                e.couponStatus = '已上架'
                } else if (e.couponStatus == 'OFF') {
                e.couponStatus = '已下架'
                } else if (e.couponStatus == 'EXPIRE') {
                e.couponStatus = '已上架'
                }

                //获取规则
                if (e.achieveType == 'BUY') {
                e.achieveType = '购买'
                } else if (e.achieveType == 'GET') {
                e.achieveType = '领取'
                } else if (e.achieveType == 'GRANT') {
                e.achieveType = '发放'
                }
                
                //生成方
                if (e.producerType == 'INNER') {
                e.producerType = '内部券'
                } else if (e.producerType == 'OUTER') {
                e.producerType = '外部券'
                }

                //审核状态
                if (e.currentAuditState == 'FIRSTAUDIT') {
                e.achieveType = '创建待初审'
                } else if (e.achieveType == 'FINALAUDIT') {
                e.achieveType = '创建待终审'
                } else if (e.achieveType == 'PASS') {
                e.achieveType = '创建审核通过'
                } else if (e.achieveType == 'NOTPASS') {
                e.achieveType = '创建审核不通过'
                } else if (e.achieveType == 'U_FIRSTAUDIT') {
                e.achieveType = '变更待初审'
                } else if (e.achieveType == 'U_FINALAUDIT') {
                e.achieveType = '变更待终审'
                } else if (e.achieveType == 'U_PASS') {
                e.achieveType = '变更审核通过'
                } else if (e.achieveType == 'U_NOTPASS') {
                e.achieveType = '变更审核不通过'
                }
                this.tableData.push(e)

            })
            // sourceTableData.forEach(item => {
            //   item.couponName = couponName
            //   item.auditStateShow = this.$AUDIT_STATUS_OBJ[item.auditState]
            //   item.displayStatusShow = discountPayEnum.displayStatus[item.displayStatus]
            //   if (item.totalStock === -1) { item.totalStock = '无限制' }
            // })

            // this.tableData = sourceTableData
            this.rowTotal = res.body.rowTotal
            } else {
            this.$notify.error({
                title: '错误',
                message: '查询优惠券审核信息失败'
            })
            console.error(res)
            }
        } catch (err) {
            console.error(err)
            this.$notify.error({
            titile: '错误', message: '查询优惠券审核信息时发生错误'
            })
        }
        }
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




