<template>
  <el-container class="auditPage">
    <el-main>
      <div>
        <h3>订单记录</h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="114px">
          <el-form-item label="订单编号" prop="orderNumber">
            <el-input v-model="formModel.orderNumber" placeholder="请输入订单的编号" />
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="formModel.goodsName" placeholder="请输入订单的商品名称" />
          </el-form-item>
          <el-form-item label="门店名称" prop="shopName">
            <el-input v-model="formModel.shopName" placeholder="请输入订单的门店名称" />
          </el-form-item>
          <el-form-item label="订单类型" prop="orderType">
            <el-select v-model="formModel.orderType">
              <el-option label="全部" value="allType" />
              <el-option label="内部代金券" value="innerCash" />
              <el-option label="内部商品券" value="innerGoods" />
              <el-option label="外部代金券" value="outerCash" />
              <el-option label="外部商品券" value="outerGoods" />
              <el-option label="在线买单" value="onlinePay" />
            </el-select>
          </el-form-item>
          <el-form-item label="用户手机号" prop="userPhone">
            <el-input v-model="formModel.userPhone" placeholder="请输入用户手机号" />
          </el-form-item>
          <el-form-item label="支付卡号" prop="payCard">
            <el-input v-model="formModel.payCard" placeholder="请输入支付卡号" />
          </el-form-item>

          <el-form-item label="所属分行机构" prop="branch">
            <el-cascader v-model="formModel.branch" :options="branchOptions" />
          </el-form-item>
          <el-form-item label="订单状态" prop="orderStatus">
            <el-select v-model="formModel.orderStatus">
              <el-option label="全部" value="allStatus" />
              <el-option label="待付款" value="waitPay" />
              <el-option label="待使用" value="waitUse" />
              <el-option label="已完成" value="finished" />
              <el-option label="交易关闭" value="closed" />
              <el-option label="退款中" value="refunding" />
            </el-select>
          </el-form-item>

          <el-form-item class="timeRange" label="下单时间" prop="orderDate">
            <el-date-picker
              v-model="formModel.submitDate"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>

          <el-form-item class="searchButton" label=" ">
            <el-button type="primary" @click="submitForm">查询</el-button>
            <el-button type="primary" @click="download">导出表格</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="tableData" border style="width:100%">

        <el-table-column
          fixed
          prop="orderNumber"
          label="订单编号"
          width="200"
        />
        <el-table-column
          prop="goodsName"
          label="商品名称"
          width="180"
        />

        <el-table-column
          prop="shopName"
          label="门店名称"
          width="150"
        />
        <el-table-column
          prop="orderType"
          label="订单类型"
          width="100"
        />
        <el-table-column
          prop="userPhone"
          label="用户手机号"
          width="120"
        />
        <el-table-column
          prop="payCard"
          label="支付卡号"
          width="150"
        />
        <el-table-column
          prop="price"
          label="单价"
          width="120"
        />
        <el-table-column
          prop="count"
          label="数量"
          width="90"
        />
        <el-table-column
          prop="totalMoney"
          label="商品总额(元)"
          width="90"
        />
        <el-table-column
          prop="reducedMoney"
          label="减免总额(元)"
          width="90"
        />
        <el-table-column
          prop="payedMoney"
          label="实付金额(元)"
          width="90"
        />
        <el-table-column
          prop="orderStatus"
          label="订单状态"
          width="90"
        />
        <el-table-column
          prop="branch"
          label="所属分行"
          width="150"
        />
        <el-table-column
          prop="orderTime"
          label="下单时间"
          width="150"
        />
        <el-table-column
          prop="payTime"
          label="支付时间"
          width="150"
        />
        <el-table-column
          fixed="right"
          width="120"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="viewDetails(scope.$index, scope.row)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="1"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="totalNumber"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-main>
  </el-container>

</template>

<script>
export default {
  data() {
    return {
      branchOptions: [{ label: '选项1', value: '1', children: [{ label: '子选项1-1', value: '1-1' }, { label: '子选项1-2', value: '1-2', children: [{ label: '子选项1-2-1', value: '1-2-1' }, { label: '子选项1-2-2', value: '1-2-2' }] }] }],
      formModel: {
        orderNumber: '',
        goodsName: '',
        shopName: '',
        orderType: '',
        userPhone: '',
        payCard: '',
        submitter: '',
        branch: '',
        orderStatus: '',
        orderDate: ''
      },
      formRule: {},
      tableData: [
        {
          orderNumber: '1540869283721233472 ',
          goodsName: '肯德基满100减5元优惠买单',
          shopName: '全家襄阳南路一店',
          orderType: '外部代金券',
          userPhone: '13800000000',
          payCard: '622909118333803511',
          price: '80.00',
          count: '1',
          totalMoney: '100.00',
          reducedMoney: '20.00',
          payedMoney: '80.00',
          orderStatus: '待付款',
          branch: '厦门分行-XX支行-零售产品营销中心',
          orderTime: '2018/09/28 10:00',
          payTime: ''
        }

      ]

    }
  },
  methods: {

    submitForm() {},
    handleEdit(scope, index, row) {
      console.log(scope)
    },
    viewDetails() { this.$router.push('/manageRecord/orderRecord/OrderDetail') },
    handleSizeChange() {},
    handleCurrentChange() {},
    download() {}
  }
}
</script>

<style lang="scss" scoped>
form.el-form{
    margin-bottom: 25px;
}
.aboveTable{
    display: flex;
    justify-content:flex-end;

   div> span{
        height:100%;
        line-height: 35px;
        margin-right:30px;
    }

}
h3{
    margin-bottom: 15px;
}
.el-breadcrumb{
    line-height: 30px;
}

</style>

