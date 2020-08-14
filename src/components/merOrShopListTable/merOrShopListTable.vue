<template>
  <el-table
    :data="tableData"
    border
  >
    <slot />
    <el-table-column
      prop="createTime"
      width="300px"
      label="操作"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleShopDetail(scope.$index,scope.row)"
        >详情</el-button>
        <!-- 隐藏与显示 -->
        <template v-if="type==='SHOPLIST'">
          <el-button
            v-if="rowButtonShow('HIDE',scope.$index,scope.row)"
            size="mini"
            @click="handleShopState(scope.$index,scope.row,'HIDE')"
          >隐藏</el-button>
          <el-button
            v-if="rowButtonShow('SHOW',scope.$index,scope.row)"
            size="mini"
            @click="handleShopState(scope.$index,scope.row,'NORMAL')"
          >显示</el-button>
        </template>
        <!-- 冻结与恢复 -->
        <template>
          <el-button
            v-if="rowButtonShow('FREEZE',scope.$index,scope.row)"
            size="mini"
            @click="handleShopState(scope.$index,scope.row,'FREEZE')"
          >冻结</el-button>
          <el-button
            v-if="rowButtonShow('RESET',scope.$index,scope.row)"
            size="mini"
            @click="handleShopState(scope.$index,scope.row,'NORMAL')"
          >恢复</el-button>
        </template>
        <el-button
          size="mini"
          @click="handleShopAudit(scope.$index,scope.row)"
        >变更日志</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { merchantStatus, shopStatus } from '@enum/merchantManage-enum.js'
export default {
  // 门店||商户列表表格
  name: 'MerOrShopListTable',
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => ([])
    },
    // 区分是商户列表(MERLIST)还是门店列表(SHOPLIST)
    type: {
      type: String,
      default: 'MERLIST'
    }
  },
  methods: {
    // 按钮显示控制
    rowButtonShow(type, index, row) {
      let _isShow = false
      let merOrShopStatus = this.type === 'MERLIST' ? merchantStatus : shopStatus
      switch (type) {
        // 详情按钮
        case 'DETAIL':
          _isShow = true
          break
        // 隐藏按钮
        case 'HIDE':
          if (row.merOrShopStatus === merOrShopStatus.NORMAL) {
            _isShow = true
          }
          break
        // 显示按钮
        case 'SHOW':
          if (row.merOrShopStatus === merOrShopStatus.HIDE) {
            _isShow = true
          }
          break
        // 冻结按钮
        case 'FREEZE':
          if (row.merOrShopStatus === merOrShopStatus.NORMAL) {
            _isShow = true
          }
          break
        // 恢复按钮
        case 'RESET':
          if (row.merOrShopStatus === merOrShopStatus.FREEZE) {
            _isShow = true
          }
          break
        // 变更日志按钮
        case 'AUDIT':
          _isShow = true
          break
        default:
          break
      }
      return _isShow
    },
    // 门店详情
    handleShopDetail(index, row) {
      this.$emit('handleDetail', index, row)
    },
    // 门店变更日志
    handleShopAudit(index, row) {
      this.$emit('handleAudit', index, row)
    },
    // 变更门店状态
    handleShopState(index, row, type) {
      this.$emit('handleState', index, row)
    }
  }
}
</script>
<style></style>
