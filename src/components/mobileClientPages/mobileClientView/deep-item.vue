<template>
  <draggable
    class="dragArea"
    :class="{
      'dragAreaEdit': edit
    }"
    :disabled="mode === 'content'"
    :list="list"
    :group="{ name: 'g1' }"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
  >
    <template v-for="(item, index) in list">
      <component
        :is="item.component"
        :key="index"
        :ref="`cpt-${indexKey(index)}`"
        v-bind="item.props"
        :class="{
          'viewCptItem': edit,
          'active': activeKey === indexKey(index)
        }"
        :index-list="indexKey(index)"
        @click.native.stop="handleSelect(indexKey(index),item.component,item.uuid)"
      >
        <DeepItem
          v-if="item.child"
          :list="item.child"
          :edit="edit"
          :prev-index-key="indexKey(index)"
          :active-key="activeKey"
          :select="select"
          :init-key="initKey"
        />
      </component>
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'DeepItem',
  components: {
    draggable
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    edit: {
      type: Boolean,
      default: false
    },
    activeKey: {
      type: String,
      default: ''
    },
    select: {
      type: Function,
      default: null
    },
    prevIndexKey: {
      type: String,
      default: ''
    },
    initKey: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      mode: '',
      drag: false
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: !this.edit,
        ghostClass: 'ghost'
      }
    }
  },
  watch: {
    drag: function() {
      this.initKey()
    }
  },
  created() {
    this.mode = this.$route.query.mode
  },
  methods: {
    /**
     * 生成 key 值
     */
    indexKey: function(index) {
      return this.prevIndexKey ? this.prevIndexKey + '-' + index : index.toString()
    },

    /**
     * 选择组件
     */
    handleSelect: function(key, componentName, uuid) {
      const props = this.$refs[`cpt-${key}`][0].getConfig()
      console.log(props)
      this.select(key, props, componentName, uuid)
    }
  }
}
</script>

<style lang="scss">
.viewWrap {
  // background-color: lightblue;
  min-height: 100vh;
}
::-webkit-scrollbar-track-piece {
  width: 6px
}

::-webkit-scrollbar {
  width: 6px;
  height: 0
}

::-webkit-scrollbar-thumb {
  height: 50px;
  border-radius: 3px;
  background-color: rgba(0,0,0,.4)
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group-item {
  cursor: move;
}
.viewCptItem,.active {
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: 1px dashed transparent;
    box-sizing: border-box;
    pointer-events: none;
  }
}
.viewCptItem {
  &:after {
    border-color: #ddd;
  }
}
.active {
  &:after {
    border-color: #e93030;
  }
}
.empty-box-wrap {
  .dragArea {
    width:100%;
    display:flex;
    flex-wrap: wrap;
  }
}
.empty-box-between {
  .dragArea {
    width:100%;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.dragAreaEdit {
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    // line-height: 100px;
    box-sizing: border-box;
    border: 1px dashed #409eff;
    flex: 0 0 100%;
    position:absolute;
    bottom:0;
    font-size:10px;
  }
}
</style>
