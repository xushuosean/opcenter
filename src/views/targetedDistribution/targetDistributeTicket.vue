<template>
    <el-container class="container-box">
        <el-main>
            <el-card class="el-card-mt20" shadow="hover">
                <h3>发放票券或红包</h3>
                <el-form label-position="left" :model="componentForm" :rules="rules" ref="componentForm" label-width="140px" class="componentForm"  size="medium">
                    <el-form-item label="发放类型" prop="merchantType">
                        <el-select :clearable="true" v-model="componentForm.merchantType" placeholder="请选择发放类型">
                            <el-option label="票券(发放类)" value="all"></el-option>
                            <el-option label="红包(发放类)" value="normal"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发放方式" prop="merchantType">
                        <el-select :clearable="true" v-model="componentForm.merchantType" placeholder="请选择发放方式">
                            <el-option label="手动选择票券及用户" value="all"></el-option>
                            <el-option label="红包(发放类)" value="normal"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择票券" required>
                        <el-select :clearable="true" v-model="componentForm.merchantType" placeholder="请选择系统内门店/系统内">
                            <el-option label="门店维度(系统内门店)" value="all"></el-option>
                            <el-option label="正常" value="normal"></el-option>
                            <el-option label="过期" value="outofdate"></el-option>
                        </el-select>
                        <div class="el-card-mt20">
                            <el-select :clearable="true" v-model="componentForm.merchantType" placeholder="手动选择门店">
                                <el-option label="手动选择门店" value="all"></el-option>
                                <el-option label="批量导入门店" value="normal"></el-option>
                                <el-option label="过期" value="outofdate"></el-option>
                            </el-select>
                        </div>
                        <div class="el-card-mt20 search-box">
                            <el-select v-model="componentForm.searchMethod">
                                <el-option label="按门店名称或编号搜索" value="byNameOrCode"></el-option>
                                <el-option label="按商户地区及类别筛选" value="byArea"></el-option>
                            </el-select>
                            <template v-if="componentForm.searchMethod==='byNameOrCode'">
                                <el-input v-model="componentForm.searchNameOrCode" class="ml20" placeholder="请输入商户名称或商户编号"></el-input>
                                <el-button type="primary" class="ml20">搜索</el-button>
                            </template>
                            <div v-if="componentForm.searchMethod==='byArea'" class="merchantArea">
                                <div class="el-form-item-flex el-card-mt20">
                                    <span>商户地区</span>
                                    <el-form-item prop="province" class="ml20" style="width:200px;">
                                        <el-select placeholder="请选择省"></el-select>
                                    </el-form-item>
                                    <el-form-item prop="city" class="ml20">
                                        <el-select placeholder="请选择市"></el-select>
                                    </el-form-item>
                                    <el-form-item prop="district" class="ml20">
                                        <el-select placeholder="请选择区"></el-select>
                                    </el-form-item>
                                </div>
                                <div class="el-form-item-flex el-card-mt20">
                                    <span>门店类别</span>
                                    <el-form-item prop="province" class="ml20">
                                        <el-select placeholder="请选择一级分类"></el-select>
                                    </el-form-item>
                                    <el-form-item prop="city" class="ml20">
                                        <el-select placeholder="请选择二级分类"></el-select>
                                    </el-form-item>
                                    <el-button type="primary" class="ml20">筛选</el-button>
                                </div>
                            </div>
                            <el-table ref="merchantList" max-height="300" :data="merchantList">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column prop="merchant" label="全选"> </el-table-column>
                            </el-table>
                            <h5>已选择商户及其属下门店</h5>
                            <el-table ref="selectedMerchantList"   class="selectedMerchantList" max-height="300" :data="selectedMerchantList" >
                                <el-table-column  width="100" >
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="danger">删除</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="merchantName" >
                                </el-table-column>
                                <el-table-column prop="merchantCode" >
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>
                    <el-form-item label="接收用户">
                        <el-row>
                            <el-input style="width:120px;margin:0 10px;" :clearable="true" v-model="componentForm.juriPersonName" placeholder="最多可领"></el-input>个人
                            <el-button type="primary">确定</el-button> 
                        </el-row>
                        <el-row class="mt10">
                        <el-table ref="selectedMerchantList"   class="selectedMerchantList" max-height="300" :data="selectedMerchantList" >
                                <el-table-column  width="100" >
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="danger">删除</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="merchantName" >
                                </el-table-column>
                                <el-table-column prop="merchantCode" >
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-button class="confirm-btn" type="primary">确认并提交审核</el-button>
        </el-main>
    </el-container>
</template>
<script>
let id = 0;
import {mapMutations,mapGetters} from 'vuex'
import * as types from '@store/mutation-types.js'
export default {
    data(){
        return {
            currentStep:0,
            componentForm: {
                merchantName:'', //商户名称
                province:'', //商户所在省
                city:'', //商户所在市
                area:'', //商户所在区
                detailAddr:'', //详细地址
                merchantType:'', //商户类型
                juriPersonName:'', //法定代表人
                juriPersonCertType:'', //法人证件类型
                juriPersonCertNo:'', //法人证件号码
                merchtContactName:'', //商户联系人姓名
                merchtContactPhoneNum:'', //商户联系人手机号
                bussLicenseType:'', //工商执照类型
                unifSocialCreditCode:'', //统一社会信用代码
                merchtLicenNum:'', //执照编号
                merchtLicenStartDate:'', //营业执照有效开始日期
                merchtLicenEndDate:'', //营业执照有效结束日期
                merchtCooperType:'',//商户合作属性
                merchtOptType:'', //商户经营类别
                contractStartDate:'', //合同有效开始日期
                contractEndDate:'', //合同有效结束日期
                belongFirstInstitu:'', //所属分行机构一级
                belongSecondInstitu:'', //所属分行机构二级
                belongThirdInstitu:'', //所属分行机构三级
                clerkCode:'', //业务员编号
                remark:'', //备注
                type:[]
            },
            rules: {
                merchantName: [
                    { required: true, message: '请输入商户名称', trigger: 'blur' }
                ]
            },
             merchantList:[
                {merchant:"金拱门(中国)有限公司"},
                {merchant:"金拱门(中国)有限公司"},
                {merchant:"金拱门(中国)有限公司"},
                {merchant:"金拱门(中国)有限公司"},
            ],
            selectedMerchantList:[
                {merchantName:"金拱门(广州)有限公司", merchantCode:"1234566787898"},
                {merchantName:"金拱门(广州)有限公司", merchantCode:"1234566787898"}
            ],
            merchantProps:{
                lazy: true,
                lazyLoad (node, resolve) {
                    const { level } = node;
                    setTimeout(() => {
                    const nodes = Array.from({ length: level + 1 })
                        .map(item => ({
                        value: ++id,
                        label: `选项${id}`,
                        leaf: level >= 2
                        }));
                    // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                    resolve(nodes);
                    }, 1000);
                }
            },
             branchOfficePropsProps:{
                lazy: true,
                lazyLoad (node, resolve) {
                    const { level } = node;
                    setTimeout(() => {
                    const nodes = Array.from({ length: level + 1 })
                        .map(item => ({
                        value: ++id,
                        label: `选项${id}`,
                        leaf: level >= 2
                        }));
                    // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                    resolve(nodes);
                    }, 1000);
                }
            },
        };
    },
    computed:{
        ...mapGetters(['redPacketStep'])
    },
    methods:{
        ...mapMutations([types.SET_REDPACKET_STEP])
    },
    created(){
        if(this.redPacketStep <= this.currentStep){
            this.SET_REDPACKET_STEP(this.currentStep)
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
            margin-right:20px;
            line-height:40px;
        }
    }
    .componentForm{
        margin-top:20px;
        .el-input{
            max-width:350px;
        }
        .el-textarea{
            max-width:350px;
        }
    }
    .selectedMerchantList /deep/ thead.has-gutter{
        height:0px;
        line-height:0px;
        tr{
            height:0px;
        }
        th{
            height:0px;
            padding:0px;
        }
    }
}
.confirm-btn{
    display:block;
    margin:0 auto;
    margin-top:20px;
}
</style>

