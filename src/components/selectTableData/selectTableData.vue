<template>
  <el-row>
    <el-col class="flex-center" :span="10">
      <el-input v-model="searchedKey" size="small" placeholder="请输入商户名称或商户编号" />
      <el-button size="small" style="margin-left:24px;" type="primary" @click="searchbyKey">搜索</el-button>
    </el-col>
    <el-col v-if="searchedListLength>0" :span="24">
      <slot name="searchedListTitle" />
      <el-table
        ref="searchedList"
        style="width:41.7%"
        max-height="300"
        stripe
        :data="searchedList"
        @select-all="handleSelectionChange"
        @select="handleSelectionChange"
      >
        <slot name="searchedList" />
      </el-table>
    </el-col>
    <el-col v-if="selectedListLength>0" :span="24">
      <slot name="selectedListTitle" />
      <el-table
        ref="selectedList"
        class="selectedList"
        max-height="300"
        :data="selectedList"
        style="width:41.7%"
        stripe
      >
        <slot name="selectedList" />
        <el-table-column width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
export default {
  // 筛选表格数据
  name: 'SelectTableData',
  props: {
    // 搜索结果
    searchedList: {
      type: Array,
      default: () => ([])
    },
    // 选择结果
    selectedList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      // 搜索关键字
      searchedKey: ''
    }
  },
  computed: {
    searchedListLength() {
      return this.searchedList.length
    },
    selectedListLength() {
      return this.selectedList.length
    }
  },
  methods: {
    // 搜索
    searchbyKey() {
      this.$emit('on-search', this.searchedKey)
    },
    // 勾选
    handleSelectionChange(selection) {
      this.$emit('on-selection-change', selection)
    },
    // 回显已选择列表
    echoSearchList() {
      this.searchedList.forEach((item, index) => {
        let check = this.selectedList.find(j => {
          if (j.merchantId === item.merchantId) { return true }
        })
        if (check) {
          this.$refs.searchedList.toggleRowSelection(item, true)
        } else {
          this.$refs.searchedList.toggleRowSelection(item, false)
        }
      })
    },
    // 删除数据
    deleteRow(index, row) {
      this.$emit('on-delete', index, row)
    }
  }
}
</script>
<style lang="scss" scoped>
.selectedList /deep/ thead.has-gutter{
    height:0px;
    th{
        height:0px;
        padding:0px;
    }
}
</style>
