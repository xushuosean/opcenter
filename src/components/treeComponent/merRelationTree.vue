<template>
  <el-row>
    <el-col :span="10">
      <el-tree
        :data="JSON.parse(JSON.stringify([merRelationTree]))"
        node-key="merchantId"
        default-expand-all
        :expand-on-click-node="true"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <template>
            <i v-if="data.root" class="el-icon-folder-opened" />
            <i v-else class="el-icon-document" />
          </template>
          <span class="node-label">{{ data.merchantName }}</span>
          <i v-if="!data.root&&type==='EDIT'" class="el-icon-close del-relation" @click.stop="delMerRelation(data)" />
        </span>
      </el-tree>
    </el-col>
  </el-row>
</template>
<script>
export default {
  // 商户关联关系树组件
  name: 'MerRelationTree',
  props: {
    merRelationTree: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'EDIT'
    }
  },
  data() {
    return {}
  },
  methods: {
    // 解除商户关联关系
    delMerRelation(data) {
      this.$emit('delMerRelation', data)
    }
  }
}
</script>
<style lang="scss" scoped>
    .custom-tree-node{
        .node-label{
            margin-left:10px;
        }
        .del-relation{
          margin-left:24px;
          cursor: pointer;
        }
    }
</style>
