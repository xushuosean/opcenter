<template>
  <el-row>
    <el-cascader
      :disabled="disabled"
      :value="multilevelSelectionValueCopy"
      :options="multilevelSelectionData"
      :props="multileveProps"
      @change="handleMultilevelSelection"
    />
  </el-row>
</template>
<script>
// 商户地区 开户银行 开户网点等多级选择器
export default {
  props: {
    multilevelSelectionValue: {
      type: Array,
      default: () => []
    },
    multilevelSelectionOptions: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 根据type渲染不同选择器
    type: {
      type: String,
      default: 'Area'
    }
  },
  data() {
    return {
      value: [],
      porpsObj: {
        value: 'id',
        label: 'name'
      }
    }
  },
  computed: {
    multilevelSelectionValueCopy() {
      return this.multilevelSelectionValue
    },
    multilevelSelectionData() {
      return this.multilevelSelectionOptions
    },
    multileveProps() {
      const commonProps = {
        checkStrictly: true
      }
      switch (this.type) {
        // 商户地区
        case 'areaCode':
          return {
            ...commonProps,
            value: 'id',
            label: 'name'
          }
          // 开户网点
        case 'siteCode':
          return {
            ...commonProps,
            value: 'code',
            label: 'name'
          }
          // 分行机构
        case 'orgCode':
          return {
            ...commonProps,
            value: 'orgId',
            label: 'orgName'
          }
          // 门店分类
        case 'shopClassifyCode':
          return {
            ...commonProps,
            value: 'catId',
            label: 'catName'
          }
        default:
          break
      }
    }
  },
  methods: {
    handleMultilevelSelection(value) {
      console.log(value)
      this.$emit('on-select', value)
    }
  }
}
</script>
