<template>
  <div class="componentListWrap">
    <div v-for="typeItem in components" :key="typeItem.name" class="container-box">
      <p class="container-text">{{ typeItem.name }}</p>
      <el-popover
        v-for="cptItem in typeItem.child"
        :key="cptItem.name"
        placement="top-start"
        width="400"
        trigger="click"
      >
        <component :is="cptItem.component" />
        <el-button
          slot="reference"
          class="item"
          @click.native="handleAddComponent(cptItem)"
        >{{ cptItem.name }}</el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
import components from '../../../packages/component.js'
import { generateUUID } from '@utils/helper.js'
export default {
  name: 'ComponentListWrap',
  props: {
  },
  data() {
    return {
      indexSearch: 'indexCouponEntry'
    }
  },
  computed: {
    components: function() {
      return components
    }
  },
  methods: {
    /**
     * 添加组件
     * component 组件名
     * container 是否是容器组件
     */
    handleAddComponent: function({ component, container }) {
      let uuid = generateUUID()
      // 给组件定义一个唯一的id,用户删除，更新等操作
      const componentInfo = {
        component, uuid
      }
      if (container) {
        componentInfo.child = []
      }
      console.log(componentInfo)
      this.$emit('selectComponent', {
        type: 'addCpt',
        data: componentInfo
      })
    }
  }
}
</script>
<style>
  .el-popover{
    min-height:30px;
  }
</style>
<style lang='scss'>
.componentListWrap {
  background:#fff;
  .container-box{
    margin-top:10px;
    background:#efefef;
    padding:12px;
    display:flex;
    flex-direction:row;
    // justify-content: space-between;
    flex-wrap: wrap;
    border-radius:4px;
    position:relative;
    padding-top:40px;
    span {
      width:33%;
      margin-top:12px;
    }
  }
  .container-text{
    position:absolute;
    left:50%;
    transform:translateX(-50%);
    top:10px;
    color:#606266;
  }
  .name {
    margin-bottom:10px;
  }
}
</style>
